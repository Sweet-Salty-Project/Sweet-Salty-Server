import { ObjectType, Field, Int, registerEnumType } from '@nestjs/graphql';
import { User } from 'src/apis/user/entities/user.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum POINT_TRANSACTION_STATUS_ENUM {
  PAYMENT = 'PAYMENT',
  CANCEL = 'CANCEL',
}
registerEnumType(POINT_TRANSACTION_STATUS_ENUM, {
  name: 'POINT_TRANSACTION_STATUS_ENUM',
});

@Entity()
@ObjectType()
export class PointTransaction extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String, { nullable: true })
  impUid: string;

  @Column()
  @Field(() => Int)
  amount: number;

  @Column()
  @Field(() => Int)
  checksum: number;

  @Column({ type: 'enum', enum: POINT_TRANSACTION_STATUS_ENUM })
  @Field(() => POINT_TRANSACTION_STATUS_ENUM)
  status: POINT_TRANSACTION_STATUS_ENUM;

  @ManyToOne(() => User)
  @Field(() => User)
  userId: User;

  @CreateDateColumn()
  @Field(() => Date)
  createdAt: Date;
}
