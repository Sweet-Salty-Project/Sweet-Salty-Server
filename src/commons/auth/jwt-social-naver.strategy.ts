import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-naver-v2';

@Injectable()
export class JwtNaverStrategy extends PassportStrategy(Strategy, 'naver') {
  constructor() {
    super({
      clientID: process.env.NAVER_CLIENTID,
      clientSecret: process.env.NAVER_CLIENTSECRET,
      callbackURL: 'https://project08.site/login/naver',
      scope: ['email', 'profile', 'name'],
    });
  }
  async validate(
    accessToken: string, //
    refreshToken: string,
    profile: Profile,
  ) {
    return {
      userEmail: profile.email,
      userNickname: profile.name,
      userPhone: profile.mobile.replace(/-/gi, ''),
      userSignUpSite: profile.provider,
    };
  }
}
