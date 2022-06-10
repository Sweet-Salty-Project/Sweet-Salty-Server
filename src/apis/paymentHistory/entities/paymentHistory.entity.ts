import { Field, Int, ObjectType } from '@nestjs/graphql';
import { User } from 'src/apis/user/entities/user.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class PaymentHistory extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  paymentHistoryId: string;

  @Column({ default: '' })
  @Field(() => String)
  payStatus: string;

  @Column({ default: '' })
  @Field(() => String)
  productStatus: string;

  @Column({ default: '카카오페이' })
  @Field(() => String)
  supplier: string;

  @Column({ default: 0 })
  @Field(() => Int)
  paymentAmount: number;

  @Column({ default: '' })
  @Field(() => String)
  impUid: string;

  @Column({ default: 0 })
  @Field(() => Int)
  stock: number;

  @Column({ default: '' })
  @Field(() => String)
  barcode: string;

  @Column({ default: false })
  @Field(() => Boolean)
  status: boolean;

  @CreateDateColumn()
  @Field(() => Date)
  createdAt: Date;

  @ManyToOne(() => User)
  @Field(() => User)
  userId: User;
}
