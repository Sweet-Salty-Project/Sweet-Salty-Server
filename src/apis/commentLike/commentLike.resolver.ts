import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { GqlAuthAccessGuard } from 'src/commons/auth/gql-auth.guard';
import { CurrentUser, ICurrentUser } from 'src/commons/auth/gql-user-param';
import { commentLikeService } from './commentLike.service';

@Resolver()
export class commentLikeResolver {
  constructor(private readonly commentLikeService: commentLikeService) {}

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => String)
  createCommentLike(
    @CurrentUser() currentUser: ICurrentUser, //

    @Args('commentId') commentId: string,
  ) {
    return this.commentLikeService.create({ currentUser, commentId });
  }
}
