import { Field, ObjectType } from '@nestjs/graphql';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class MessageInfo extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  messageInfoId: string;

  @Column()
  @Field(() => String)
  messageInfoContents: string;

  @Column({ default: 0 })
  deleteCheckData: number;

  @CreateDateColumn()
  createAt: Date;

  @DeleteDateColumn()
  deleteAt: Date;
}
