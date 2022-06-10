import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Resolver } from '@nestjs/graphql';
import { GqlAuthAccessGuard } from 'src/commons/auth/gql-auth.guard';
import { CurrentUser, ICurrentUser } from 'src/commons/auth/gql-user-param';
import { PointTransaction } from './entities/pointTransaction.entity';
import { PointTransactionService } from './pointTransaction.service';

@Resolver()
export class PointTransactionResolver {
  constructor(
    private readonly pointTransactionService: PointTransactionService,
  ) {}

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => PointTransaction)
  createPointTransaction(
    @Args('impUid') impUid: string,
    @Args({ name: 'amount', type: () => Int }) amount: number,
    @CurrentUser() currentUser: ICurrentUser,
  ) {
    return this.pointTransactionService.create({ impUid, amount, currentUser });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => PointTransaction)
  cancelPointTransaction(
    @CurrentUser() currentUser: ICurrentUser,
    @Args('impUid') impUid: string,
    @Args({ name: 'amount', type: () => Int }) amount: number,
    @Args('reason') reason: string,
  ) {
    return this.pointTransactionService.cancel({
      currentUser,
      impUid,
      amount,
      reason,
    });
  }
}
