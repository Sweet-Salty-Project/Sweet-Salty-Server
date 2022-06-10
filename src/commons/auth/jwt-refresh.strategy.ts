import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER, Inject } from '@nestjs/common';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
  constructor(
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {
    super({
      //
      jwtFromRequest: (req) => req.headers.cookie.replace('refreshToken=', ''),
      secretOrKey: process.env.REFRESH,
      passReqToCallback: true,
    });
  }
  async validate(req, payload) {
    const refresh = req.headers.cookie.replace('refreshToken=', '');

    const check = await this.cacheManager.get(refresh);

    if (check) throw new UnauthorizedException();

    return {
      userEmail: payload.userEmail,
    };
  }
}
