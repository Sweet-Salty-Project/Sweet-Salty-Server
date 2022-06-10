import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, Repository } from 'typeorm';
import { Board } from '../board/entities/board.entity';
import { BoardLike } from './entities/boardLike.entity';

@Injectable()
export class BoardLikeService {
  constructor(
    @InjectRepository(BoardLike)
    private readonly boardLikeRepository: Repository<BoardLike>,
  ) {}

  async create({ currentUser, boardId }) {
    const check = await this.boardLikeRepository
      .createQueryBuilder()
      .select('boardLike')
      .from(BoardLike, 'boardLike')
      .where({
        user: currentUser.userId, //
        board: boardId,
      })
      .getOne();

    if (check) {
      await getConnection()
        .createQueryBuilder()
        .update(Board)
        .set({ boardLikeCount: () => `boardLikeCount-1` })
        .where({ boardId })
        .execute();

      await getConnection()
        .createQueryBuilder()
        .delete()
        .from(BoardLike)
        .where({ user: currentUser.userId })
        .execute();

      return `좋아요 -1`;
    }

    await this.boardLikeRepository.save({
      user: currentUser.userId, //
      board: boardId,
    });

    await getConnection()
      .createQueryBuilder()
      .update(Board)
      .set({ boardLikeCount: () => `boardLikeCount+1` })
      .where({ boardId })
      .execute();

    return `좋아요 +1`;
  }
}
