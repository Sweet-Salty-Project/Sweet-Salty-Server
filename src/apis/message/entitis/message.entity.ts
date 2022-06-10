import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { MessageInfo } from 'src/apis/messageInfo/entities/messageInfo.entity';

import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum SEND_RECEIVED {
  SEND = 'SEND',
  RECEIVED = 'RECEIVED',
}

registerEnumType(SEND_RECEIVED, {
  name: 'SEND_RECEIVED',
});

@ObjectType()
export class SendMessage {
  @Field(() => String)
  messageId: string;

  @Field(() => String)
  messageReceivedUser: string;

  @Field(() => String)
  messageReceivedUserImage: string;

  @Field(() => MessageInfo)
  messageInfo: MessageInfo;

  @Field(() => Date)
  sendAt: Date;
}

@ObjectType()
export class ReceivedMessage {
  @Field(() => String)
  messageId: string;

  @Field(() => String)
  messageSendUser: string;

  @Field(() => String)
  messageSendUserImage: string;

  @Field(() => Boolean)
  messageState: boolean;

  @Field(() => MessageInfo)
  messageInfo: MessageInfo;

  @Field(() => Date)
  sendAt: Date;
}

@ObjectType()
@Entity()
export class Message extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  messageId: string;

  @Column({ nullable: true })
  @Field(() => String)
  messageSendUser: string;

  @Column({ nullable: true })
  @Field(() => String)
  messageSendUserImage: string;

  @Column({ nullable: true })
  @Field(() => String)
  messageReceivedUser: string;

  @Column({ nullable: true })
  @Field(() => String)
  messageReceivedUserImage: string;

  @Column({ type: 'enum', enum: SEND_RECEIVED })
  @Field(() => String)
  sendReceived: string;

  @Column({ default: false })
  @Field(() => Boolean)
  messageState: boolean;

  @ManyToOne(() => MessageInfo)
  @JoinColumn({ name: 'messageInfoId', referencedColumnName: 'messageInfoId' })
  @Field(() => MessageInfo)
  messageInfo: MessageInfo;

  @Column()
  messageOwner: string;

  @CreateDateColumn()
  @Field(() => Date)
  sendAt: Date;

  @UpdateDateColumn()
  @Field(() => Date)
  readAt: Date;
}
