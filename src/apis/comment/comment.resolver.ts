import { UseGuards } from '@nestjs/common';
import { Query, Args, Mutation, Resolver } from '@nestjs/graphql';
import { GraphQLJSONObject } from 'graphql-type-json';
import { GqlAuthAccessGuard } from 'src/commons/auth/gql-auth.guard';
import { CurrentUser, ICurrentUser } from 'src/commons/auth/gql-user-param';
import { commentService } from './comment.service';
import { Comment } from './entities/comment.entity';

@Resolver()
export class commentResolver {
  constructor(private readonly commentService: commentService) {}

  @Query(() => [GraphQLJSONObject])
  fetchComments(@Args('boardId') boardId: string) {
    return this.commentService.findAll({ boardId });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Comment)
  createComment(
    @Args('boardId') boardId: string,
    @Args('contents') contents: string,
    @CurrentUser() currentUser: ICurrentUser,
  ) {
    return this.commentService.create({ boardId, currentUser, contents });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Comment)
  updateComment(
    @Args('commentId') commentId: string,
    @Args('contents') contents: string,
    @CurrentUser() currentUser: ICurrentUser,
  ) {
    return this.commentService.update({
      currentUser,
      contents,
      commentId,
    });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => String)
  deleteComment(@Args('commentId') commentId: string) {
    return this.commentService.delete({
      commentId,
    });
  }
}
