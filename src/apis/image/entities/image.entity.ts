import { Field, ObjectType } from '@nestjs/graphql';
import { Board } from 'src/apis/board/entities/board.entity';
import { Notice } from 'src/apis/notice/entities/notice.entity';
import { Shop } from 'src/apis/shop/entities/shop.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class Image {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  imageId: string;

  @Column()
  @Field(() => String)
  url: string;

  @CreateDateColumn()
  @Field(() => Date)
  createAt: Date;

  @DeleteDateColumn()
  deleteAt: Date;

  @ManyToOne((type) => Board, (Board) => Board.images)
  @JoinColumn({ name: 'boardId', referencedColumnName: 'boardId' })
  board: Board;

  @ManyToOne((type) => Notice, (Notice) => Notice.images)
  @JoinColumn({ name: 'noticeId', referencedColumnName: 'noticeId' })
  notice: Notice;

  @ManyToOne((type) => Shop, (Shop) => Shop.image)
  @JoinColumn({ name: 'shopId', referencedColumnName: 'shopId' })
  shop: Shop;
}
