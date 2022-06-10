import { ObjectType, Field } from '@nestjs/graphql';
import { User } from 'src/apis/user/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Follow {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  followId: string;

  @ManyToOne(() => User)
  @Field(() => User)
  followerId: string;

  @ManyToOne(() => User)
  @Field(() => User)
  followingId: string;
}
