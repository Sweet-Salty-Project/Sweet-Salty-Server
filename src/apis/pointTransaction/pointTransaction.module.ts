import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IamPortService } from '../iamport/iamport.service';
import { PaymentHistory } from '../paymentHistory/entities/paymentHistory.entity';
import { User } from '../user/entities/user.entity';
import { PointTransaction } from './entities/pointTransaction.entity';
import { PointTransactionResolver } from './pointTransaction.resolver';
import { PointTransactionService } from './pointTransaction.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([PointTransaction, User, PaymentHistory]),
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  providers: [
    PointTransactionResolver, //
    PointTransactionService,
    IamPortService,
  ],
})
export class PointTransactionModule {}
