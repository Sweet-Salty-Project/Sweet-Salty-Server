import { Field, ObjectType } from '@nestjs/graphql';
import { Board } from 'src/apis/board/entities/board.entity';
import { User } from 'src/apis/user/entities/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType()
@Entity()
@Index(['fk_post_id', 'fk_user_id'], { unique: true })
export class BoardLike extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  boardLikeCountId: string;

  @Column('uuid')
  fk_user_id!: string;

  @Column('uuid')
  fk_post_id!: string;

  @ManyToOne((type) => Board, (Board) => Board.boardLikes)
  @JoinColumn({ name: 'fk_post_id' })
  board: Board;

  @ManyToOne((type) => User, (User) => User.boardLikes)
  @JoinColumn({ name: 'fk_user_id' })
  user: User;
}
