import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GraphQLJSONObject } from 'graphql-type-json';
import { GqlAuthAccessGuard } from 'src/commons/auth/gql-auth.guard';
import { CurrentUser, ICurrentUser } from 'src/commons/auth/gql-user-param';
import { CreateNoticeInput } from './dto/createNotice.input';
import {
  Notice,
  NOTICE_SUB_CATEGORY_NAME_ENUM,
} from './entities/notice.entity';
import { NoticeService } from './notice.service';

@Resolver()
export class NoticeResolver {
  constructor(private readonly noticeService: NoticeService) {}

  //@UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Notice)
  createNotice(
    //  @CurrentUser() currentUser: ICurrentUser,
    @Args('createNoticeInput') createNoticeInput: CreateNoticeInput,
  ) {
    return this.noticeService.create({ createNoticeInput });
  }

  @Query(() => Notice)
  fetchNotice(@Args('noticeId') noticeId: string) {
    return this.noticeService.findOne({ noticeId });
  }

  @Query(() => GraphQLJSONObject)
  fetchNoticeSearchTitle(@Args('title') title: string) {
    return this.noticeService.elasticsearchFindTitle({ title });
  }

  @Query(() => GraphQLJSONObject)
  fetchNoticeSearchContents(@Args('contents') contents: string) {
    return this.noticeService.elasticsearchFindContents({ contents });
  }

  @Query(() => [Notice])
  fetchNoticeAll(
    //
    @Args({ name: 'page', nullable: true, type: () => Int }) page: number,
  ) {
    return this.noticeService.findALL({ page });
  }

  @Query(() => [Notice])
  fetchNoticeCategoryPick(
    @Args({ name: 'page', nullable: true, type: () => Int }) page: number,
    @Args({ name: 'category', type: () => NOTICE_SUB_CATEGORY_NAME_ENUM })
    category: NOTICE_SUB_CATEGORY_NAME_ENUM,
  ) {
    return this.noticeService.findPick({ page, category });
  }

  @Query(() => String)
  fetchNoticeCount(
    @Args({ name: 'category', type: () => NOTICE_SUB_CATEGORY_NAME_ENUM })
    category: NOTICE_SUB_CATEGORY_NAME_ENUM,
  ) {
    return this.noticeService.getCount({ category });
  }
}
