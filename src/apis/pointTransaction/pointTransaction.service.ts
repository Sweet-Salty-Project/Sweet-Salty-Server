import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Connection, Repository } from 'typeorm';
import { IamPortService } from '../iamport/iamport.service';
import { PaymentHistory } from '../paymentHistory/entities/paymentHistory.entity';
import { User } from '../user/entities/user.entity';
import {
  PointTransaction,
  POINT_TRANSACTION_STATUS_ENUM,
} from './entities/pointTransaction.entity';

@Injectable()
export class PointTransactionService {
  constructor(
    @InjectRepository(PointTransaction)
    private readonly pointTransactionRepository: Repository<PointTransaction>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private readonly iamportService: IamPortService,
    private readonly connection: Connection,

    @InjectRepository(PaymentHistory)
    private readonly paymentHistoryRepository: Repository<PaymentHistory>,
  ) {}

  async create({ currentUser, impUid, amount }) {
    const queryRunner = await this.connection.createQueryRunner();
    await queryRunner.connect();

    await queryRunner.startTransaction('SERIALIZABLE');

    const token = await this.iamportService.getToken();

    const getData = await this.iamportService.get_data_with_impUid({
      token,
      impUid,
    });

    const overlapPeyment = await this.pointTransactionRepository.findOne({
      where: { impUid },
    });

    if (overlapPeyment) {
      await this.iamportService.CancelPayment({
        token,
        imp_uid: impUid,
        amount: getData.amount,
        reason: '중복 결제',
      });
      throw new ConflictException('중복된 결제가 존재하여 결제를 취소합니다.');
    } else if (amount !== getData.amount) {
      await this.iamportService.CancelPayment({
        token,
        imp_uid: impUid,
        amount: getData.amount,
        reason: '비정상 거래',
      });
      throw new ConflictException(
        '비정상적인 결제가 확인되어 강제 환불이 진행됩니다.',
      );
    }
    try {
      const pointTransaction = await queryRunner.manager.save(
        PointTransaction,
        {
          impUid,
          amount,
          status: POINT_TRANSACTION_STATUS_ENUM.PAYMENT,
          checksum: amount,
          userId: currentUser.userId,
        },
      );

      const user = await queryRunner.manager.findOne(
        User,
        { userEmail: currentUser.userEmail },
        { lock: { mode: 'pessimistic_write' } },
      );

      await queryRunner.manager.update(
        User,
        { userEmail: currentUser.userEmail },
        { userPoint: user.userPoint + amount },
      );

      await queryRunner.manager.save(PaymentHistory, {
        payStatus: '포인트 충전',
        userId: currentUser.userId,
        paymentAmount: amount,
        impUid,
      });

      await queryRunner.commitTransaction();

      return pointTransaction;
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  //
  //
  //
  //
  //
  //

  async cancel({ currentUser, impUid, amount, reason }) {
    const queryRunner = await this.connection.createQueryRunner();
    await queryRunner.connect();

    //
    // transaction 시작!
    await queryRunner.startTransaction('SERIALIZABLE');
    //
    //
    const token = await this.iamportService.getToken();

    const Payment_history = await this.iamportService.get_data_with_impUid({
      token,
      impUid,
    });

    if (!Payment_history)
      throw new ConflictException('결제 내역이 존재하지 않습니다.');
    try {
      const Payment_data = await queryRunner.manager.findOne(
        PointTransaction,
        {
          impUid,
        },
        { lock: { mode: 'pessimistic_write' } },
      );

      const userdata = await queryRunner.manager.findOne(
        User,
        { userEmail: currentUser.userEmail },
        {
          lock: { mode: 'pessimistic_write' },
        },
      );

      if (Payment_data.checksum - amount < 0)
        throw new ConflictException(
          `부분 환불이 진행되어 현재 입력한 포인트는 환불이 불가능합니다. 최대 환불 포인트는 ${Payment_data.checksum} 입니다.`,
        );

      if (amount > userdata.userPoint)
        throw new ConflictException(
          `소유한 포인트가 부족하여 환불이 불가능합니다. 최대 환불 포인트는 ${userdata.userPoint} 입니다.`,
        );

      let point;

      if (amount === 0) {
        // 전액 환불
        await this.iamportService.CancelPayment({
          token,
          imp_uid: impUid,
          reason,
          amount: Payment_data.checksum,
        });

        //
        await queryRunner.manager.update(
          User,
          { userEmail: currentUser.userEmail },
          { userPoint: userdata.userPoint - Payment_data.checksum },
        );

        point = await queryRunner.manager.save(PointTransaction, {
          impUid,
          amount: -Payment_data.checksum,
          checksum: Payment_data.checksum - Payment_data.checksum,
          status: POINT_TRANSACTION_STATUS_ENUM.CANCEL,
          userId: { userId: currentUser.userId },
        });
      } else {
        // 부분 환불

        await this.iamportService.CancelPayment({
          token,
          imp_uid: impUid,
          reason,
          amount,
        });

        point = await queryRunner.manager.save(PointTransaction, {
          impUid,
          amount: -amount,
          checksum: Payment_data.checksum - amount,
          status: POINT_TRANSACTION_STATUS_ENUM.CANCEL,
          userId: { userId: currentUser.userId },
        });

        await queryRunner.manager.update(
          User,
          { user_email: currentUser.user_email },
          { userPoint: userdata.userPoint - amount },
        );
      }

      await queryRunner.manager.save(PaymentHistory, {
        payStatus: '충전 취소',
        userId: currentUser.userId,
        paymentAmount: amount,
        impUid,
      });

      await queryRunner.commitTransaction();

      return point;
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}
