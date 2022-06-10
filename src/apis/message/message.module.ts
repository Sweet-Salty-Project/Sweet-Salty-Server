import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageInfoSubscriber } from '../messageInfo/entities/messageInfo.subscriber';
import { User } from '../user/entities/user.entity';
import { Message } from './entitis/message.entity';
import { MessageResolver } from './message.resolver';
import { MessageService } from './message.service';

@Module({
  imports: [TypeOrmModule.forFeature([Message, User])],
  providers: [MessageService, MessageResolver, MessageInfoSubscriber],
})
export class MessageModule {}
