import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { getConnection } from 'typeorm';
import { json } from 'express';
import { join } from 'path';
import * as cookieParser from 'cookie-parser';
import * as csurf from 'csurf';
import Helmet from 'helmet';
import { rateLimit } from 'express-rate-limit';
import * as requestIp from 'request-ip';

import { Database, Resource } from '@admin-bro/typeorm';

const AdminBroExpress = require('@admin-bro/express');
import AdminBro from 'admin-bro';

//const AdminBro = require('admin-bro');
//import AdminBroExpress from '@admin-bro/express';

import { HttpExceptionFilter } from './commons/filter/http-exception.filter';
import { User } from './apis/user/entities/user.entity';
import { Notice } from './apis/notice/entities/notice.entity';
import { Board } from './apis/board/entities/board.entity';
import { Comment } from './apis/comment/entities/comment.entity';
import { BoardSide } from './apis/boardSide/entities/boardSide.entity';
import { BoardTag } from './apis/boardTag/entities/boardTag.entity';
import { CommentLike } from './apis/commentLike/entities/commentLike.entity';
import { Message } from './apis/message/entitis/message.entity';
import { MessageInfo } from './apis/messageInfo/entities/messageInfo.entity';
import { PaymentHistory } from './apis/paymentHistory/entities/paymentHistory.entity';
import { Shop } from './apis/shop/entities/shop.entity';

import { SubCategory } from './apis/subCategory/entities/subCategory.entity';
import { TopCategory } from './apis/topCategory/entities/topCategory.entity';
import * as bcrypt from 'bcrypt';
import { Place } from './apis/place/entities/place.entity';
import { SocketIoAdapter } from './adapters/socket-io.adapters';
import { BoardLike } from './apis/boardLike/entities/boardLike.entity';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useGlobalFilters(new HttpExceptionFilter());
  app.useWebSocketAdapter(new SocketIoAdapter(app));
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('ejs');
  app.use(json());
  app.use(requestIp.mw());
  AdminBro.registerAdapter({ Database, Resource });

  const adminBro = new AdminBro({
    resources: [
      Board,
      BoardLike,
      BoardSide,
      BoardTag,
      Comment,
      CommentLike,
      Message,
      MessageInfo,
      Notice,
      PaymentHistory,
      Shop,
      Place,
      SubCategory,
      TopCategory,
      User,
    ],
    rootPath: '/admin',
  });

  const router = AdminBroExpress.buildAuthenticatedRouter(
    adminBro,
    {
      cookieName: 'adminBro',
      cookiePassword: 'session Key',
      authenticate: async (email, password) => {
        const user = await getConnection()
          .createQueryBuilder()
          .select('user')
          .from(User, 'user')
          .where({ userEmail: email })
          .getOne();

        if (!user || user.userState === false) {
          return false;
        } else {
          const isAuth = await bcrypt.compare(password, user.userPassword);
          if (isAuth) {
            return user;
          }
        }
      },
    },
    null,
    {
      resave: false,
      saveUninitialized: true,
    },
  );

  app.use(adminBro.options.rootPath, router);
  /// 사이트 간 위조 요청 방지 라이브러리
  app.use(cookieParser());
  //app.use(csurf({ cookie: true }));

  // http 통신 보안 라이브러리
  // contentSecurityPolicy : XSS 공격 방지 및 데이터 삽입 공격 방지 옵션
  //hidePoweredBy : 웹서버가 무엇으로 개발이 되었는지 숨기는 옵션
  // app.use(
  //   Helmet({
  //     contentSecurityPolicy: {
  //       reportOnly: true,
  //     },
  //     hidePoweredBy: true,
  //   }),
  // );

  // 과부화 방지 라이브러리
  app.use(rateLimit({ windowMs: 5 * 60 * 1000, max: 100 }));

  app.enableCors({
    origin: [
      process.env.CORS_ORIGIN_DEV,
      process.env.CORS_ORIGIN_TEST,
      process.env.CORS_ORIGIN_PROD,
    ],
    // origin: [
    //   'http://localhost:3000',
    //   'http://localhost:5501',
    //   'https://nextjs-m3jgp6bewq-an.a.run.app',
    //   'http://34.64.45.98:3000',
    //   'https://sweetsalty.shop',
    // ],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: [
      'Access-Control-Allow-Headers',
      'Authorization',
      'X-Requested-With',
      'Content-Type',
      'Accept',
    ],
    credentials: true,
  });

  await app.listen(3000);
}
bootstrap();
