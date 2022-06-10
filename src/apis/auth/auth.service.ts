import {
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { HttpService } from '@nestjs/axios';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER, Inject } from '@nestjs/common';
import { User } from '../user/entities/user.entity';
import { getConnection, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(
    //

    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
    private readonly httpService: HttpService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async isUser({ userEmail, userPassword }) {
    const user = await getConnection()
      .createQueryBuilder()
      .select('user')
      .from(User, 'user')
      .where({ userEmail })
      .getOne();

    if (!user)
      throw new UnprocessableEntityException(
        '아이디 혹은 비밀번호가 다릅니다.',
      );

    const isAuth = await bcrypt.compare(userPassword, user.userPassword);

    if (!isAuth)
      throw new UnprocessableEntityException(
        '아이디 혹은 비밀번호가 다릅니다.',
      );

    return user;
  }

  async blackList({ context }) {
    const now = new Date();
    const access = context.req.headers.authorization.replace('Bearer ', '');

    const access_decoded = this.jwtService.decode(access);

    const access_time = new Date(access_decoded['exp'] * 1000);

    const access_end = Math.floor(
      (access_time.getTime() - now.getTime()) / 1000,
    );

    const refresh = context.req.headers.cookie.replace('refreshToken=', '');

    const refresh_decoded = this.jwtService.decode(refresh);

    const refresh_time = new Date(refresh_decoded['exp'] * 1000);
    const refresh_end = Math.floor(
      (refresh_time.getTime() - now.getTime()) / 1000,
    );

    try {
      jwt.verify(access, this.config.get('ACCESS'));
      jwt.verify(refresh, this.config.get('REFRESH'));
      await this.cacheManager.set(access, 'accessToken', { ttl: access_end });
      await this.cacheManager.set(refresh, 'refreshToken', {
        ttl: refresh_end,
      });

      return '로그아웃에 성공했습니다';
    } catch {
      throw new UnauthorizedException();
    }
  }

  async getAccessToken({ user }) {
    const Access = this.jwtService.sign(
      { userEmail: user.userEmail },
      {
        secret: this.config.get('ACCESS'),
        expiresIn: '1w',
      },
    );

    const obj = {};
    obj['accessToken'] = Access;

    return obj;
  }
  async setRefreshToken({ user, res }) {
    const refreshToken = this.jwtService.sign(
      { userEmail: user.userEmail },
      { secret: this.config.get('REFRESH'), expiresIn: '2w' },
    );

    await res.setHeader(
      'Set-Cookie',
      `refreshToken=${refreshToken}; path=/; Secure; httpOnly; SameSite=None;`,
    );

    // await res.cookie('cookie', 'refreshToken=' + refreshToken, {
    //   sameSite: 'none',
    //   domain: 'localhost',
    //   httpOnly: true,
    //   SameSite: 'None',
    // });
  }

  async social_login({ user, res }) {
    await this.setRefreshToken({ user, res });
    res.redirect(process.env.REDIRECT_URL);
  }

  async isEmail({ email }) {
    const isEmail = await this.userRepository.findOne({ userEmail: email });

    if (!isEmail) {
      return true;
    } else {
      return false;
    }
  }

  async isNickname({ nickname }) {
    const isEmail = await this.userRepository.findOne({
      userNickname: nickname,
    });

    if (!isEmail) {
      return true;
    } else {
      return false;
    }
  }

  async isPassword({ password, currentUser }) {
    const user = await this.userRepository.findOne({
      where: { userEmail: currentUser.userEmail },
    });

    const isAuth = await bcrypt.compare(password, user.userPassword);

    if (!isAuth) {
      return false;
    } else {
      return true;
    }
  }

  async sendTokenToPhone({ phone }) {
    const token = String(Math.floor(Math.random() * 10 ** 6)).padStart(6, '0');
    const tokenData = await this.cacheManager.get(phone);

    await this.cacheManager.set(phone, token, { ttl: 300 });

    await this.httpService
      .post(
        `https://api-sms.cloud.toast.com/sms/v3.0/appKeys/${process.env.SMS_APP_KEY}/sender/sms`,
        {
          body: `안녕하세요 인증번호는 [${token}]입니다.`,
          sendNo: process.env.SMS_SENDER,
          recipientList: [
            {
              internationalRecipientNo: phone,
            },
          ],
        },
        {
          headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'X-Secret-Key': process.env.SMS_X_SECRET_KEY,
          },
        },
      )
      .toPromise();
    if (tokenData === null) {
      return `인증번호가 발송되었습니다.`;
    } else {
      return `인증번호가 변경되었습니다.`;
    }
  }

  async checkToken({ phone, token }) {
    const tokenData = await this.cacheManager.get(phone);
    if (tokenData === token) {
      return true;
    } else {
      return false;
    }
  }
}

// 배포 환경
// res.setHeader('Access-Control-Allow-Origin', 'https://myfrontsite.com') // 허용해주는 사이트
// res.setHeader(
//   'Set-Cookie',
//   `refreshToken=${refreshToken}; path=/; domain=.mybacksite.com;
// SameSite=None; Secure; httpOnly;`
// )
