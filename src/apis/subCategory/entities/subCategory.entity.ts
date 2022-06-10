import { Field, ObjectType } from '@nestjs/graphql';
import {
  Board,
  BOARD_SUB_CATEGORY_NAME_ENUM,
} from 'src/apis/board/entities/board.entity';
import { Notice } from 'src/apis/notice/entities/notice.entity';
import { TopCategory } from 'src/apis/topCategory/entities/topCategory.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class SubCategory extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  subCategoryId: string;

  @Column({ unique: true })
  @Field(() => String)
  subCategoryName: string;

  @ManyToOne((type) => TopCategory, (TopCategory) => TopCategory.subCategories)
  @Field(() => TopCategory)
  @JoinColumn({
    name: 'TopCategoryId',
    referencedColumnName: 'topCategoryId',
  })
  topCategory: TopCategory;

  @OneToMany((type) => Notice, (Notice) => Notice.subCategory)
  notices: Notice[];

  @OneToMany((type) => Board, (Board) => Board.subCategory)
  boards: Board[];
}
