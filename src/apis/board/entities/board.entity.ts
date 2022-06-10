import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { BoardLike } from 'src/apis/boardLike/entities/boardLike.entity';
import { BoardSide } from 'src/apis/boardSide/entities/boardSide.entity';
import { Image } from 'src/apis/image/entities/image.entity';
import { Place } from 'src/apis/place/entities/place.entity';

import { SubCategory } from 'src/apis/subCategory/entities/subCategory.entity';
import { User } from 'src/apis/user/entities/user.entity';

import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum BOARD_SUB_CATEGORY_NAME_ENUM {
  REQUEST = 'REQUEST',
  VISITED = 'VISITED',
  REVIEW = 'REVIEW',
  TASTER = 'TASTER',
}

export enum GENDER_ENUM {
  PRIVATE = 'PRIVATE',
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}

export enum AGE_GROUP_ENUM {
  NONE = 'NONE',
  TEN = 'TEN',
  TWENTY = 'TWENTY',
  THIRTY = 'THIRTY',
  FORTY = 'FORTY',
  FIFTY = 'FIFTY',
  SIXTY = 'SIXTY',
}

registerEnumType(BOARD_SUB_CATEGORY_NAME_ENUM, {
  name: 'BOARD_SUB_CATEGORY_NAME_ENUM',
});

registerEnumType(GENDER_ENUM, {
  name: 'GENDER_ENUM',
});

registerEnumType(AGE_GROUP_ENUM, {
  name: 'AGE_GROUP_ENUM',
});

export abstract class Content {}

@Entity()
@ObjectType()
export class Board extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  @Field(() => String)
  boardId: string;

  @Column()
  @Field(() => String)
  boardTitle: string;

  @Column({ default: '' })
  @Field(() => String)
  boardSugar: string;

  @Column({ default: '' })
  @Field(() => String)
  boardSalt: string;

  @Column({ type: 'text' })
  @Field(() => String)
  boardContents: string;

  @Column()
  @Field(() => String)
  boardWriter: string;

  @Column({ default: 0 })
  @Field(() => Int)
  boardLikeCount: number;

  @Column({ default: 0 })
  @Field(() => Int)
  boardHit: number;

  @Column({ default: '' })
  @Field(() => String)
  thumbnail: string;

  @Column({ type: 'enum', enum: AGE_GROUP_ENUM })
  @Field(() => String)
  ageGroup: string;

  @Column({ type: 'enum', enum: GENDER_ENUM })
  @Field(() => String)
  gender: string;

  @Column({ type: 'enum', enum: BOARD_SUB_CATEGORY_NAME_ENUM })
  @Field(() => String)
  boardSubject: string;

  @CreateDateColumn()
  @Field(() => Date)
  createAt: Date;

  @UpdateDateColumn()
  @Field(() => Date)
  updateAt: Date;

  @DeleteDateColumn()
  deleteAt: Date;

  @ManyToOne((type) => User, (User) => User.boards)
  @Field(() => User)
  @JoinColumn({ name: 'userId', referencedColumnName: 'userId' })
  user: User;

  @ManyToOne((type) => SubCategory, (SubCategory) => SubCategory.boards)
  @JoinColumn({ name: 'subCategoryId', referencedColumnName: 'subCategoryId' })
  @Field(() => SubCategory)
  subCategory: SubCategory;

  @ManyToOne((type) => Place, (Place) => Place.boards)
  @JoinColumn({ name: 'placeId', referencedColumnName: 'placeId' })
  @Field(() => Place)
  place: Place;

  @OneToMany((type) => BoardLike, (BoardLike) => BoardLike.board, {
    cascade: true,
  })
  @Field(() => [BoardLike])
  boardLikes: BoardLike;

  @OneToMany((type) => BoardSide, (BoardSide) => BoardSide.boards, {
    cascade: true,
  })
  @JoinColumn({ name: 'boardSideId', referencedColumnName: 'boardSideId' })
  @Field(() => [BoardSide])
  boardSides: BoardSide[];

  @OneToMany((type) => Image, (Image) => Image.board, { cascade: true })
  images: Image;
}
