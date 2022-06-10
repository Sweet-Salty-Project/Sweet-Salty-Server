import { ObjectType } from '@nestjs/graphql';
import { BoardTag } from 'src/apis/boardTag/entities/boardTag.entity';
import { User } from 'src/apis/user/entities/user.entity';
import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class PreferMenu {
  @PrimaryGeneratedColumn('uuid')
  preferMenuId: string;

  @ManyToOne((type) => User, (User) => User.preferMenus)
  @JoinColumn({ name: 'userId', referencedColumnName: 'userId' })
  user: User;

  @ManyToOne((type) => BoardTag, (BoardTag) => BoardTag.preferMenus)
  @JoinColumn({ name: 'boardTagId', referencedColumnName: 'boardTagId' })
  boardTag: BoardTag;
}
