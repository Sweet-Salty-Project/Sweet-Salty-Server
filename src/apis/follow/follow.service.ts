import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { Follow } from './entities/follow.entity';

@Injectable()
export class FollowService {
  constructor(
    @InjectRepository(Follow)
    private readonly followRepository: Repository<Follow>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create({ followingUserId, followerNickname }) {
    const checkNickname = await this.userRepository.findOne({
      userNickname: followerNickname,
    });

    // 내가 팔로우를 한 사람인지 체크
    // 내 ID가 팔로잉 상태고, 팔로워하려는 상대의 Id가 팔로워 상태라면 팔로우 한 사람

    const checkFollow = await this.followRepository.findOne({
      followerId: checkNickname.userId,
    });

    const checkFollowing = await this.followRepository.findOne({
      followingId: followingUserId,
    });

    // 2개 모두 객체가 나온다면 팔로워가 되어있는 사람임 언팔로잉
    if (checkFollow && checkFollowing) {
      await this.followRepository.delete({
        followId: checkFollow.followId,
      });

      return `언팔로우`;
    }

    await this.followRepository.save({
      followerId: checkNickname.userId,
      followingId: followingUserId,
    });

    return `팔로우`;
  }

  async count({ followingUserId, followerNickname }) {
    const checkNickname = await this.userRepository.findOne({
      userNickname: followerNickname,
    });

    const followerCount = await this.followRepository.findAndCount({
      followerId: checkNickname.userId,
    });

    followerCount[1];

    const followingCount = await this.followRepository.findAndCount({
      followingId: followingUserId,
    });

    followingCount[1];

    return [`팔로잉`, followerCount[1], `팔로워`, followingCount[1]];
  }
}
