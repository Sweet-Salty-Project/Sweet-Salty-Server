import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { PreferMenu } from '../preferMenu/entities/preferMenu.entity';
import { BoardTag } from '../boardTag/entities/boardTag.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly UserRepository: Repository<User>,
  ) {}
  // Create Api Create Api Create Api Create Api Create Api Create Api Create Api Create Api Create Api //
  async create({ createUserInput }) {
    const overlapEmail = await this.UserRepository.findOne({
      where: {
        userEmail: createUserInput.userEmail,
      },
    });
    if (overlapEmail)
      throw new ConflictException('동일한 이메일로 생성된 계정이 존재합니다.');

    const overlapNickName = await this.UserRepository.findOne({
      where: {
        userNickname: createUserInput.userNickname,
      },
    });
    if (overlapNickName)
      throw new ConflictException('이미 사용중인 닉네임입니다.');

    createUserInput.userPassword = await bcrypt.hash(
      createUserInput.userPassword,
      10,
    );
    const result = await this.UserRepository.save({
      ...createUserInput,
    });

    createUserInput.prefer.map(async (el) => {
      const tag = await getConnection()
        .createQueryBuilder()
        .select('boardTag')
        .from(BoardTag, 'boardTag')
        .where({ boardTagName: el })
        .getOne();

      await getConnection()
        .createQueryBuilder()
        .insert()
        .into(PreferMenu)
        .values({
          user: result,
          boardTag: tag,
        })
        .execute();
    });

    return result;
  }
  //
  //
  async socialCreate({ user }) {
    user;
    const social_user = await this.UserRepository.findOne({
      where: { userEmail: user.userEmail },
    });

    if (!social_user) {
      const result = await this.UserRepository.save({
        ...user,
        userPassword: await bcrypt.hash(
          String(Math.floor(Math.random() * 1000000)).padStart(6, '0'),
          10,
        ),
      });
      return result;
    } else {
      throw new ConflictException('동일한 이메일로 생성된 계정이 존재합니다.');
    }
  }
  //
  //
  // Read Api Read Api Read Api Read Api Read Api Read Api Read Api Read Api Read Api Read Api Read Api  //
  async fewFind({ phone }) {
    const userData = await this.UserRepository.findOne({
      where: { userPhone: phone },
    });
    const fewData = {};
    fewData['userEmail'] = userData.userEmail;
    fewData['createAt'] = userData.createAt;

    return fewData;
  }

  async find({ userEmail, userId, userNickname }) {
    if (!userEmail && !userId && !userNickname)
      throw new InternalServerErrorException('검색어를 입력해주세요.');
    if (userEmail) {
      const data = await this.UserRepository.findOne({ where: { userEmail } });
      if (data) return data;
      throw new InternalServerErrorException('데이터가 존재하지 않습니다.');
    }
    if (userId) {
      const data = await this.UserRepository.findOne({ where: { userId } });
      if (data) return data;
      throw new InternalServerErrorException('데이터가 존재하지 않습니다.');
    }
    if (userNickname) {
      const data = await this.UserRepository.findOne({
        where: { userNickname },
      });
      if (data) return data;
      throw new InternalServerErrorException('데이터가 존재하지 않습니다.');
    }
  }

  async findOne({ userEmail }) {
    return await this.UserRepository.findOne({ where: { userEmail } }); // 마이페이지 읽어올때 사용할거임 조건 댓글같은거 보려면 조건 더 달아야함
  }

  async findId({ userId }) {
    return await this.UserRepository.findOne({
      where: {
        userId,
      },
    });
  }

  async findNickname({ userNickname }) {
    return await this.UserRepository.findOne({
      where: {
        userNickname,
      },
    });
  }
  //
  async findCheck({ userEmail, userSignUpSite }) {
    return await this.UserRepository.findOne({
      where: { userEmail, userSignUpSite },
    });
  }
  //

  //
  async findLoggedIn({ currentUser }) {
    return await this.UserRepository.findOne({
      where: {
        userId: currentUser.userId,
      },
    });
  }
  //
  async finDeleteAll() {
    return await this.UserRepository.find({ withDeleted: true });
  }
  //
  //
  // Update Api Update Api  Update Api  Update Api  Update Api  Update Api  Update Api  Update Api  Update Api  //
  async update({ userEmail, updateUserInput }) {
    const { prefer, ...update } = updateUserInput;
    const user = await this.UserRepository.findOne({ where: { userEmail } });
    const updateData = {
      ...user,
      ...update,
    };

    await getConnection()
      .createQueryBuilder()
      .delete()
      .from(PreferMenu)
      .where({ user })
      .execute();

    if (prefer) {
      prefer.map(async (el) => {
        const tag = await getConnection()
          .createQueryBuilder()
          .select('boardTag')
          .from(BoardTag, 'boardTag')
          .where({ boardTagName: el })
          .getOne();

        await getConnection()
          .createQueryBuilder()
          .insert()
          .into(PreferMenu)
          .values({
            user,
            boardTag: tag,
          })
          .execute();
      });
    }

    return await this.UserRepository.save(updateData);
  }
  //
  //

  async updateImage({ image, currentUser }) {
    const user = await this.UserRepository.findOne({
      where: {
        userId: currentUser.userId,
      },
    });

    return await this.UserRepository.save({
      ...user,
      userImage: image,
    });
  }

  async updateProfile({ profile, currentUser }) {
    const user = await this.UserRepository.findOne({
      where: {
        userId: currentUser.userId,
      },
    });

    return await this.UserRepository.save({
      ...user,
      userProfile: profile,
    });
  }

  async ChangePW({ password, userEmail }) {
    // 인증 절차가 조금 더 필요할 것 같음. 이메일 하나만 받으면 안댐 핸폰 인증 추가 예정
    const PWLoseUser = await this.UserRepository.findOne({
      where: { userEmail },
    });
    if (PWLoseUser) {
      const NewPW = {
        ...PWLoseUser,
        userPassword: await bcrypt.hash(password, 10),
      };
      return await this.UserRepository.save(NewPW);
    }
  }
  //
  //
  async loginUpdate({ userEmail, userPassword }) {
    // 마이페이지에 연동될 예정이라 이것도 여러가지 바꿀 수 있게 해야함
    const user = await this.UserRepository.findOne({ where: { userEmail } });
    user.userPassword = await bcrypt.hash(userPassword, 10);
    const newUserData = {
      ...user,
    };
    return await this.UserRepository.save(newUserData);
  }
  //
  //
  async SocialUpdate({ userEmail, updateSocilaInput }) {
    // 마이페이지에 연동될 예정이라 이것도 여러가지 바꿀 수 있게 해야함
    const user = await this.UserRepository.findOne({ where: { userEmail } });
    const newUser = {
      ...user,
      ...updateSocilaInput,
    };
    return await this.UserRepository.save(newUser);
  }
  //
  //
  //async phoneUpdate ({}){} <- 지금 핸드폰 번호를 받아와야하는 로직이 따로 없음. 근데 이걸 회원가입에서 받아야할지 고민중이라
  // 추가하긴 해야하는데 언제 받을지 고민중
  //
  //
  // Delete Api Delete Api Delete Api Delete Api Delete Api Delete Api Delete Api Delete Api Delete Api Delete Api //
  async delete({ userEmail }) {
    const result = await this.UserRepository.softDelete({ userEmail }); // 이것도 바껴야함
    return result.affected ? true : false;
  }
  //
  //
  async restore({ userEmail }) {
    const result = await this.UserRepository.restore({ userEmail }); // 다양한 조건으로 삭제 가능
    return result.affected ? true : false;
  }
}
