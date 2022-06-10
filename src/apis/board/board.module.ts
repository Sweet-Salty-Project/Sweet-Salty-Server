import { Module } from '@nestjs/common';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardSide } from '../boardSide/entities/boardSide.entity';
import { BoardTag } from '../boardTag/entities/boardTag.entity';
import { Image } from '../image/entities/image.entity';
import { Place } from '../place/entities/place.entity';
import { BoardResolver } from './board.resolver';
import { BoardService } from './board.service';
import { Board } from './entities/board.entity';
import { BoardSubscriber } from './entities/board.subscriber';

@Module({
  imports: [
    TypeOrmModule.forFeature([Board, BoardTag, BoardSide, Image, Place]),
    ElasticsearchModule.register({
      node: `http://${process.env.ELK_URL}`,
    }),
  ],
  providers: [
    //
    BoardResolver,
    BoardService,
    BoardSubscriber,
  ],
})
export class BoardModule {}
