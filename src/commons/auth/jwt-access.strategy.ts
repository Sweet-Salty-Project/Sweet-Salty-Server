import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Repository } from 'typeorm';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER, Inject } from '@nestjs/common';
import { User } from 'src/apis/user/entities/user.entity';

@Injectable()
export class JwtAccessStrategy extends PassportStrategy(Strategy, 'access') {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {
    super({
      //
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.ACCESS,
      passReqToCallback: true,
    });
  }

  async validate(req, payload) {
    const access = req.headers.authorization.replace('Bearer ', '');

    const check = await this.cacheManager.get(access);

    if (check) throw new UnauthorizedException();

    const user = await this.userRepository
      .createQueryBuilder()
      .where({ userEmail: payload.userEmail })
      .getOne();

    return {
      userEmail: payload.userEmail,
      userId: user.userId,
    };
  }
}
