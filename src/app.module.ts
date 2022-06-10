import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import {
  CacheModule,
  MiddlewareConsumer,
  Module,
  NestModule,
} from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedisClientOptions } from 'redis';
import { Connection } from 'typeorm';
import { UserModule } from './apis/user/user.module';
import * as redisStore from 'cache-manager-redis-store';
import { AuthModule } from './apis/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { BoardModule } from './apis/board/board.module';
import { CommentModule } from './apis/comment/comment.module';
import { CommentLikeModule } from './apis/commentLike/commentLike.module';
import { BoardLikeModule } from './apis/boardLike/boardLike.module';
import { PointTransactionModule } from './apis/pointTransaction/pointTransaction.module';
import { MessageModule } from './apis/message/message.module';
import { ShopModule } from './apis/shop/shop.module';
import { AdminModule } from './apis/admin/admin.module';
import { NoticeModule } from './apis/notice/notice.module';
import { graphqlUploadExpress } from 'graphql-upload';
import { ImageModule } from './apis/image/image.module';
import { ChatBackEndModule } from './chatBackEnd/chatBackEnd.module';
import { ChatFrontEndModule } from './chatFrontEnd/chatFrontEnd.module';
import { AppController } from './app.controller';
import { FollowModule } from './apis/follow/follow.module';

@Module({
  imports: [
    AdminModule,
    AuthModule,
    BoardModule,
    BoardLikeModule,
    ImageModule,
    ChatBackEndModule,
    ChatFrontEndModule,
    FollowModule,
    UserModule,
    NoticeModule,
    MessageModule,
    CommentModule,
    CommentLikeModule,
    ShopModule,
    PointTransactionModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/commons/graphql/schema.gql',
      context: ({ req, res }) => ({ req, res }),
      cors: {
        Credential: true,
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
        allowedHeaders: [
          'Access-Control-Allow-Headers',
          'Authorization',
          'X-Requested-With',
          'Content-Type',
          'Accept',
        ],
        origin: [
          process.env.CORS_ORIGIN_DEV,
          process.env.CORS_ORIGIN_TEST,
          process.env.CORS_ORIGIN_PROD,
        ],
        // origin: [
        //   'http://localhost:3000',
        //   'https://nextjs-m3jgp6bewq-an.a.run.app',
        //   'http://34.64.45.98:3000',
        //   'https://sweetsalty.shop',
        // ],
      },
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.HOST,
      port: 3306,
      username: process.env.USERNAME,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
      entities: [__dirname + '/apis/**/*.entity.*'],
      synchronize: true,
      logging: true,
      retryAttempts: 30,
      retryDelay: 5000,
    }),
    CacheModule.register<RedisClientOptions>({
      store: redisStore,
      url: process.env.REDIS_URL,
      isGlobal: true,
    }),
  ],
  providers: [AppService],
  controllers: [AppController],
})
export class AppModule implements NestModule {
  constructor(private readonly connection: Connection) {}
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(graphqlUploadExpress()).forRoutes('graphql');
  }
}

// 이거 배포할때 설정하는것
// TypeOrmModule.forRoot({
//   type: 'mysql',
//   host: '10.16.96.3',
//   port: 3306,
//   username: 'root',
//   password: 'root',
//   database: 'team_data',
//   entities: [__dirname + '/apis/**/*.entity.*'],
//   synchronize: true,
//   logging: true,
//   retryAttempts: 30,
//   retryDelay: 5000,
// }),
// CacheModule.register<RedisClientOptions>({
//   store: redisStore,
//   url: 'redis://XkjocNA3@10.140.0.4:6379',
//   isGlobal: true,
// }),

// 이건 로컬 테스트용
// TypeOrmModule.forRoot({
//   type: 'mysql',
//   host: 'my-database',
//   port: 3306,
//   username: 'root',
//   password: 'root',
//   database: 'team_project',
//   entities: [__dirname + '/apis/**/*.entity.*'],
//   synchronize: true,
//   logging: true,
//   retryAttempts: 30,
//   retryDelay: 5000,
// }),
// CacheModule.register<RedisClientOptions>({
//   store: redisStore,
//   url: 'redis://my-redis:6379',
//   isGlobal: true,
// }),
