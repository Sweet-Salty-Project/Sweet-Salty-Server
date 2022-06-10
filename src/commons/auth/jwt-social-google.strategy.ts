//jwt-social-google.strategy.ts

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-google-oauth20';

@Injectable()
export class JwtGoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'https://project08.site/login/google',
      scope: ['email', 'profile', 'phone'],
    });
  }

  async validate(
    //

    accessToken: string,
    refreshToken: string,
    profile: Profile,
  ) {
    profile;
    return {
      userEmail: profile.emails[0].value,
      userNickname: profile.name.familyName + profile.name.givenName,
      userSignUpSite: profile.provider,
    };
  }
}
