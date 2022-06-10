import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { Comment } from '../comment/entities/comment.entity';
import { Board } from '../board/entities/board.entity';

@Injectable()
export class commentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll({ boardId }) {
    const data = await this.commentRepository.find({
      where: {
        board: boardId,
      },
      relations: ['board', 'user'],
      order: {
        createAt: 'ASC',
      },
    });

    // 작성자닉네임 , 프로필 , 작성일
    const fetch = [];
    for (let i = 0; i < data.length; i++) {
      fetch[i] = {
        commentId: data[i].commentId,
        userId: data[i].user.userId,
        userNickname: data[i].user.userNickname,
        userImage: data[i].user.userImage,
        commentCreateAt: data[i].createAt,
        commentContents: data[i].commentContents,
        commentLikeCount: data[i].commentLikeCount,
      };
    }

    return fetch;
  }

  async create({ currentUser, boardId, contents }) {
    const userData = await getConnection()
      .createQueryBuilder()
      .select('user')
      .from(User, 'user')
      .where({ userId: currentUser.userId })
      .getOne();

    return await this.commentRepository.save({
      user: currentUser.userId,
      board: boardId,
      writer: userData,
      commentContents: contents,
    });
  }

  async update({ currentUser, commentId, contents }): Promise<Comment> {
    const target = await getConnection()
      .createQueryBuilder()
      .select('comment')
      .from(Comment, 'comment')
      .where({ user: currentUser.userId, commentId })
      .getOne();

    return await this.commentRepository.save({
      ...target,
      commentContents: contents,
    });
  }

  async delete({ commentId }) {
    const result = await getConnection()
      .createQueryBuilder()
      .softDelete()
      .from(Comment, 'comment')
      .where({ commentId })
      .execute();

    if (result.affected) {
      return '삭제되었습니다';
    }

    return '유효하지 않은 commentid입니다.';
  }
}
