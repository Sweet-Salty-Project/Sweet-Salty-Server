import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { commentLikeResolver } from './commentLike.resolver';
import { commentLikeService } from './commentLike.service';
import { CommentLike } from './entities/commentLike.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CommentLike])],
  providers: [commentLikeResolver, commentLikeService],
})
export class CommentLikeModule {}
