import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImageResolver } from './image.resolver';
import { ImageService } from './image.service';
import { Image } from './entities/image.entity';
import { ImageSubscriber } from './entities/image.subscriber';

@Module({
  //
  imports: [
    TypeOrmModule.forFeature([Image]),
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  providers: [ImageResolver, ImageService],
})
export class ImageModule {}
