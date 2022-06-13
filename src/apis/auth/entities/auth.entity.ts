import { ObjectType, Field } from '@nestjs/graphql';
import { User } from 'src/apis/user/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
export class Token {
  @Field(() => String)
  accessToken: string;
}

@ObjectType()
@Entity()
export class whiteList {
  @PrimaryGeneratedColumn('uuid')
  whiteListId: string;

  @Column()
  ip: string;

  @ManyToOne((type) => User, (User) => User.whiteLists)
  user: User;
}
