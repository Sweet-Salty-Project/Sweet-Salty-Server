import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Image } from 'src/apis/image/entities/image.entity';

import { SubCategory } from 'src/apis/subCategory/entities/subCategory.entity';
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

export enum NOTICE_SUB_CATEGORY_NAME_ENUM {
  ALL = 'ALL',
  NOTICE = 'NOTICE',
  EVENT = 'EVENT',
  PROMOTION = 'PROMOTION',
  TASTING = 'TASTING',
}

registerEnumType(NOTICE_SUB_CATEGORY_NAME_ENUM, {
  name: 'NOTICE_SUB_CATEGORY_NAME_ENUM',
});

@ObjectType()
@Entity()
export class Notice extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  @Field(() => String)
  noticeId: string;

  @Column()
  @Field(() => String)
  noticeTitle: string;

  @Column({ type: 'text' })
  @Field(() => String)
  noticeContents: string;

  @Column({ default: '운영자' })
  noticeWriter: string;

  @Column({ default: 0 })
  @Field(() => Int)
  noticeHit: number;

  @Column()
  @Field(() => String)
  noticeSubject: string;

  @CreateDateColumn()
  @Field(() => Date)
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deleteAt: Date;

  @ManyToOne((type) => SubCategory, (SubCategory) => SubCategory.notices)
  @JoinColumn({ name: 'subCategoryId', referencedColumnName: 'subCategoryId' })
  @Field(() => SubCategory)
  subCategory: SubCategory;

  @OneToMany((type) => Image, (Image) => Image.notice)
  @Field(() => [Image], { nullable: true })
  images: Image;
}
