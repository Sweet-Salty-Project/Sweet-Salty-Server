import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Board } from 'src/apis/board/entities/board.entity';
import { PreferMenu } from 'src/apis/preferMenu/entities/preferMenu.entity';
import { Message } from 'src/apis/message/entitis/message.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { whiteList } from 'src/apis/auth/entities/auth.entity';

@ObjectType()
export class fewUser {
  @Field(() => String)
  userEmail: string;

  @Field(() => Date)
  userCreateAt: Date;
}

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  userId: string;

  @Column({ default: false })
  @Field(() => Boolean)
  userState: boolean;

  @Column({ unique: true })
  @Field(() => String)
  userEmail: string;

  @Column()
  userPassword: string;

  @Column({ nullable: true, unique: true })
  @Field(() => String)
  userNickname: string;

  @Column({ default: 'img_bucke/80560f88-0b79-4d64-bd2e-adb8e0999fed.webp' })
  @Field(() => String)
  userImage: string;

  @Column({ default: '자기소개를 작성해주세요' })
  @Field(() => String)
  userProfile: string;

  @Column({ default: '01012345678' })
  @Field(() => String)
  userPhone: string;

  @Column({ default: 0 })
  @Field(() => Int)
  userPoint: number;

  @Column({ default: 'NONE' })
  @Field(() => String)
  ageGroup: string;

  @Column({ default: 'PRIVATE' })
  @Field(() => String)
  gender: string;

  @OneToMany((type) => Board, (Board) => Board.user)
  boards: Board;

  @OneToMany((type) => PreferMenu, (PreferMenu) => PreferMenu.user)
  preferMenus: PreferMenu;

  @OneToMany((type) => Message, (Message) => Message.user)
  messages: Message;

  @OneToMany((type) => whiteList, (whiteList) => whiteList.user)
  whiteLists: whiteList;

  @Column({ default: '단짠맛집' })
  userSignUpSite: string;

  @CreateDateColumn()
  @Field(() => Date)
  createAt: Date;

  @UpdateDateColumn()
  @Field(() => Date)
  updateAt: Date;

  @DeleteDateColumn()
  deleteAt: Date;
}
