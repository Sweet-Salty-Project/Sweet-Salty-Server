import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GraphQLJSONObject } from 'graphql-type-json';
import { GqlAuthAccessGuard } from 'src/commons/auth/gql-auth.guard';
import { CurrentUser, ICurrentUser } from 'src/commons/auth/gql-user-param';
import { BoardService } from './board.service';
import { CreateBoardInput, CreateBoardReqInput } from './dto/createBoard.input';
import { UpdateBoardInput } from './dto/updateBoard.input';
import { Board, BOARD_SUB_CATEGORY_NAME_ENUM } from './entities/board.entity';

@Resolver()
export class BoardResolver {
  constructor(private readonly boardService: BoardService) {}

  @Query(() => GraphQLJSONObject)
  async fetchBoardTitle(@Args('title') title: string) {
    return this.boardService.elasticsearchFindTitle({ title });
  }

  @Query(() => GraphQLJSONObject)
  async fetchBoardContents(@Args('contents') contents: string) {
    return this.boardService.elasticsearchFindContents({ contents });
  }

  @Query(() => GraphQLJSONObject)
  async fetchBoardWithTags(
    @Args({ name: 'tags', type: () => [String] }) tags: string[],
  ) {
    return this.boardService.elasticsearchFindTags({ tags });
  }

  @Query(() => Board)
  fetchBoard(
    //
    @Args('boardId') boardId: string,
    @Context() context: any,
  ) {
    const ip = context.req.clientIp;
    return this.boardService.findOne({ boardId, ip });
  }

  @Query(() => [Board])
  fetchBoards() {
    return this.boardService.findAll();
  }

  @Query(() => [Board])
  fetchBoardCategoryPick(
    //
    @Args({ name: 'category', type: () => BOARD_SUB_CATEGORY_NAME_ENUM })
    category: BOARD_SUB_CATEGORY_NAME_ENUM,
  ) {
    return this.boardService.findPickList({ category });
  }

  @Query(() => [Board])
  fetchBoardBest(
    @Args({ name: 'category', type: () => BOARD_SUB_CATEGORY_NAME_ENUM })
    category: BOARD_SUB_CATEGORY_NAME_ENUM,
  ) {
    return this.boardService.categoryBest({ category });
  }

  @Query(() => [Board])
  fetchPickedBoards(@Args('userNickname') userNickname: string) {
    return this.boardService.findLikeBoard({ userNickname });
  }

  @Query(() => [Board])
  fetchBoardsOfUser(
    //
    @Args('userNickname') userNickname: string,
  ) {
    return this.boardService.findUserWithBoard({ userNickname });
  }

  @Query(() => [Board])
  fetchRecentBoards(
    @Args({ name: 'category', type: () => BOARD_SUB_CATEGORY_NAME_ENUM })
    category: BOARD_SUB_CATEGORY_NAME_ENUM,
  ) {
    return this.boardService.findRecent({ category });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Query(() => [Board])
  fetchPreferBoards(@CurrentUser() currentUser: ICurrentUser) {
    return this.boardService.findPreferList({ currentUser });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Query(() => String)
  fetchBoardCount(
    //
    @CurrentUser() currentUser: ICurrentUser,
  ) {
    return this.boardService.countBoard({ currentUser });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Board)
  createBoard(
    @CurrentUser() currentUser: ICurrentUser,
    @Args('createBoardInput') createBoardInput: CreateBoardInput,
  ) {
    return this.boardService.create({
      createBoardInput,
      currentUser,
    });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Board)
  createBoardRes(
    @Args('reqBoardId') reqBoardId: string,
    @CurrentUser() currentUser: ICurrentUser,
    @Args('createBoardInput') createBoardInput: CreateBoardInput,
  ) {
    return this.boardService.createRes({
      reqBoardId,
      createBoardInput,
      currentUser,
    });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Board)
  createBoardReq(
    @Args('createBoardReqInput')
    createBoardReqInput: CreateBoardReqInput,
    @CurrentUser() currentUser: ICurrentUser,
  ) {
    return this.boardService.createReq({
      createBoardReqInput,
      currentUser,
    });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Board)
  async updateBoard(
    @CurrentUser() currentUser: ICurrentUser,
    @Args('boardId') boardId: string,
    @Args('updateBoardInput') updateBoardInput: UpdateBoardInput,
  ) {
    return await this.boardService.update({
      currentUser,
      boardId,
      updateBoardInput,
    });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Boolean)
  deleteBoard(
    @CurrentUser() currentUser: ICurrentUser,
    @Args('boardId') boardId: string,
  ) {
    return this.boardService.delete({ boardId, currentUser });
  }

  @Query(() => [String])
  searchBoard(
    @Args({ name: 'tags', type: () => [String] }) tags: string[],
    @Args({
      name: 'category',
      nullable: true,
      type: () => BOARD_SUB_CATEGORY_NAME_ENUM,
    })
    category: BOARD_SUB_CATEGORY_NAME_ENUM,
  ) {
    return this.boardService.searchTags({ tags, category });
  }
}
