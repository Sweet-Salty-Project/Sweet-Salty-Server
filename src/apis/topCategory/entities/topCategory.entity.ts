import { Field, ObjectType } from '@nestjs/graphql';
import { SubCategory } from 'src/apis/subCategory/entities/subCategory.entity';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class TopCategory extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  topCategoryId: string;

  @Column({ unique: true })
  @Field(() => String)
  topCategoryName: string;

  @OneToMany((type) => SubCategory, (SubCategory) => SubCategory.topCategory)
  subCategories: SubCategory;
}
