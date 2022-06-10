import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { GqlAuthAccessGuard } from 'src/commons/auth/gql-auth.guard';
import { CurrentUser, ICurrentUser } from 'src/commons/auth/gql-user-param';
import { Board } from '../board/entities/board.entity';
import { BoardLikeService } from './boardLike.service';
import { BoardLike } from './entities/boardLike.entity';

@Resolver()
export class BoardLikeResolver {
  constructor(private readonly boardLikeService: BoardLikeService) {}

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => String)
  createBoardLike(
    @CurrentUser() currentUser: ICurrentUser, //
    @Args('boardId') boardId: string,
  ) {
    return this.boardLikeService.create({ currentUser, boardId });
  }
}
