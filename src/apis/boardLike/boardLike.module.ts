import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardLikeResolver } from './boardLike.resolver';
import { BoardLikeService } from './boardLike.service';
import { BoardLike } from './entities/boardLike.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BoardLike])],
  providers: [BoardLikeResolver, BoardLikeService],
})
export class BoardLikeModule {}
