import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, Repository } from 'typeorm';
import { CommentLike } from './entities/commentLike.entity';
import { Comment } from '../comment/entities/comment.entity';

@Injectable()
export class commentLikeService {
  constructor(
    @InjectRepository(CommentLike)
    private readonly commentLikeRepository: Repository<CommentLike>,
  ) {}

  async create({ currentUser, commentId }) {
    const check = await this.commentLikeRepository
      .createQueryBuilder()
      .select('commentLike')
      .from(CommentLike, 'commentLike')
      .where({
        user: currentUser.userId, //
        comment: commentId,
      })
      .getOne();

    if (check) throw new ConflictException('이미 좋아요를 누르셨습니다.');

    await this.commentLikeRepository.save({
      user: currentUser.userId, //
      comment: commentId,
    });

    await getConnection()
      .createQueryBuilder()
      .update(Comment)
      .set({ commentLikeCount: () => `commentLikeCount+1` })
      .where({ commentId })
      .execute();

    return '좋아요';
  }
}
