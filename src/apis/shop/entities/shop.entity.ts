import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { platform } from 'os';
import { Image } from 'src/apis/image/entities/image.entity';
import { Place } from 'src/apis/place/entities/place.entity';
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

@ObjectType()
@Entity()
export class Shop extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  shopId: string;

  @Column()
  @Field(() => String)
  shopProductName: string;

  @Column()
  @Field(() => String)
  shopSeller: string;

  @Column()
  @Field(() => Int)
  shopDisCount: number;

  @Column()
  @Field(() => Float)
  shopDisCountPrice: number;

  @Column()
  @Field(() => Float)
  shopOriginalPrice: number;

  @Column()
  @Field(() => String)
  shopDescription: string;

  @Column()
  @Field(() => Int)
  shopStock: number;

  @Column()
  @Field(() => String, { nullable: true })
  thumbnail: string;

  @ManyToOne((type) => Place, (Place) => Place.shops)
  @JoinColumn({ name: 'placeId', referencedColumnName: 'placeId' })
  @Field(() => Place)
  place: Place;

  @CreateDateColumn()
  @Field(() => Date)
  createAt: Date;

  @UpdateDateColumn()
  @Field(() => Date)
  updateAt: Date;

  @DeleteDateColumn()
  deleteAt: Date;

  @OneToMany((type) => Image, (Image) => Image.shop)
  @Field(() => Image)
  image: Image;
}
