import { Field, ObjectType } from '@nestjs/graphql';
import { Board } from 'src/apis/board/entities/board.entity';
import { User } from 'src/apis/user/entities/user.entity';
import { BaseEntity, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class BoardLike extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  boardLikeCountId: string;

  @ManyToOne((type) => Board, (Board) => Board.boardLikes)
  board: Board;

  @ManyToOne(() => User)
  user: User;
}
