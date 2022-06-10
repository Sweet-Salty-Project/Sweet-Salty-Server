import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from '../board/entities/board.entity';
import { User } from '../user/entities/user.entity';
import { commentResolver } from './comment.resolver';
import { commentService } from './comment.service';
import { Comment } from './entities/comment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Comment, User])],
  providers: [commentResolver, commentService],
})
export class CommentModule {}
