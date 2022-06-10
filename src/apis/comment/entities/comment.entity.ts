import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Board } from 'src/apis/board/entities/board.entity';
import { User } from 'src/apis/user/entities/user.entity';

import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class Comment extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  commentId: string;

  @Column()
  @Field(() => String)
  commentContents: string;

  @Column({ default: 0 })
  @Field(() => Int)
  commentLikeCount: number;

  @CreateDateColumn()
  @Field(() => Date)
  createAt: Date;

  @DeleteDateColumn()
  @Field(() => Date)
  deleteAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @ManyToOne(() => Board)
  board: Board;

  @Field(() => User)
  @ManyToOne(() => User)
  user: User;
}
