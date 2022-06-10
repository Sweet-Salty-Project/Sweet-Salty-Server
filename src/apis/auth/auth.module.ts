import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtRefreshStrategy } from 'src/commons/auth/jwt-refresh.strategy';
import { User } from '../user/entities/user.entity';
import { JwtAccessStrategy } from 'src/commons/auth/jwt-access.strategy';
import { HttpModule } from '@nestjs/axios';
import { JwtGoogleStrategy } from 'src/commons/auth/jwt-social-google.strategy';
import { AuthController } from './auth.controller';
import { UserService } from '../user/user.service';
import { JwtKakaoStrategy } from 'src/commons/auth/jwt-social-kakao.strategy';
import { JwtNaverStrategy } from 'src/commons/auth/jwt-social-naver.strategy';

@Module({
  imports: [
    //
    JwtModule.register({}),
    TypeOrmModule.forFeature([User]),
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  controllers: [AuthController],
  providers: [
    //

    JwtRefreshStrategy,
    JwtAccessStrategy,
    AuthResolver,
    AuthService,
    JwtGoogleStrategy,
    JwtKakaoStrategy,
    JwtNaverStrategy,
    UserService,
  ],
})
export class AuthModule {}
