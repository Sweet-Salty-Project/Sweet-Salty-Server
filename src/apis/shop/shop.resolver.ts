import { Args, Mutation, Resolver, Query, Int } from '@nestjs/graphql';
import { ShopService } from './shop.service';
import { Shop } from './entities/shop.entity';
import { CreateShopInput } from './dto/createShop.input';
import { updateShopInput } from './dto/updateShop.input';
import { CurrentUser, ICurrentUser } from 'src/commons/auth/gql-user-param';
import { GqlAuthAccessGuard } from 'src/commons/auth/gql-auth.guard';
import { UseGuards } from '@nestjs/common';
import { GraphQLJSONObject } from 'graphql-type-json';
import { User } from '../user/entities/user.entity';
import { PaymentHistory } from '../paymentHistory/entities/paymentHistory.entity';

@Resolver()
export class ShopResolver {
  constructor(
    private readonly shopService: ShopService, //
  ) {}

  @Query(() => GraphQLJSONObject)
  fetchShopTitles(@Args('title') title: string) {
    return this.shopService.elasticsearchFindTitle({ title });
  }

  @Query(() => GraphQLJSONObject)
  fetchShopSeller(@Args('seller') seller: string) {
    return this.shopService.elasticsearchFindSeller({ seller });
  }

  @Query(() => [Shop])
  fetchShops() {
    return this.shopService.findAll();
  }

  @Query(() => Shop)
  fetchShop(
    @Args('shopId') shopId: string, //
  ) {
    return this.shopService.findOne({ shopId });
  }

  @Query(() => [Shop])
  fetchTopShop() {
    return this.shopService.findTop({});
  }

  @Query(() => [Shop])
  realTimeShop() {
    return this.shopService.findRealTime({});
  }

  @Query(() => String)
  fetchBarcode(
    @Args('paymentHistoryId') paymentHistoryId: string, //
  ) {
    return this.shopService.findBarcode({ paymentHistoryId });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Query(() => [PaymentHistory])
  fetchPaymentHistory(
    @CurrentUser() currentUser: ICurrentUser, //
  ) {
    return this.shopService.findHistoryAll({ currentUser });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => String)
  createShop(
    @Args('createShopInput') createShopInput: CreateShopInput, //
    @CurrentUser() currentUser: ICurrentUser,
  ) {
    return this.shopService.create({ createShopInput, currentUser });
  }
  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Shop)
  async updateShop(
    @Args('shopId') shopId: string,
    @CurrentUser() currentUser: ICurrentUser,
    @Args('updateShopInput') updateShopInput: updateShopInput,
  ) {
    // 수정하기
    return await this.shopService.update({
      shopId,
      updateShopInput,
      currentUser,
    });
  }
  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => String)
  payShop(
    @Args({ name: 'stock', type: () => Int }) stock: number,
    @Args('shopId') shopId: string,
    @CurrentUser() currentUser: ICurrentUser,
  ) {
    return this.shopService.paymentShop({ shopId, currentUser, stock });
  }

  // @UseGuards(GqlAuthAccessGuard)
  // @Mutation(() => String)
  // cancelShop(
  //   @Args('shopId') shopId: string,
  //   @CurrentUser() currentUser: ICurrentUser,
  // ) {
  //   return this.shopService.paymentShop({ shopId, currentUser, stock });
  // }
}
