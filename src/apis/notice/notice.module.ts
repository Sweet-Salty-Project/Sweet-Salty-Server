import { Module } from '@nestjs/common';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notice } from './entities/notice.entity';
import { NoticeResolver } from './notice.resolver';
import { NoticeService } from './notice.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Notice]),
    ElasticsearchModule.register({
      node: `http://${process.env.ELK_URL}`,
    }),
  ],
  providers: [NoticeResolver, NoticeService],
})
export class NoticeModule {}
