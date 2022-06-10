import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import {
  GqlAuthAccessGuard,
  GqlAuthRefreshGuard,
} from 'src/commons/auth/gql-auth.guard';
import { CurrentUser, ICurrentUser } from 'src/commons/auth/gql-user-param';
import { Token } from './entities/auth.entity';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => Token)
  async login(
    @Args('userEmail') userEmail: string, //
    @Args('userPassword') userPassword: string,
    @Context() context: any,
  ) {
    const user = await this.authService.isUser({ userEmail, userPassword });

    await this.authService.setRefreshToken({ user, res: context.res });

    return await this.authService.getAccessToken({ user });
  }

  @UseGuards(GqlAuthRefreshGuard)
  @Mutation(() => Token)
  async restoreAccessToken(
    //
    @CurrentUser() currentUser: ICurrentUser,
  ) {
    return this.authService.getAccessToken({ user: currentUser });
  }

  @Mutation(() => String)
  async logout(
    //
    @Context() context: any,
  ) {
    return await this.authService.blackList({ context });
  }

  @Mutation(() => Boolean)
  async overlapEmail(@Args('email') email: string) {
    return this.authService.isEmail({ email });
  }

  @Mutation(() => Boolean)
  async overlapNickname(@Args('nickname') nickname: string) {
    return this.authService.isNickname({ nickname });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Boolean)
  async overlapPassword(
    @CurrentUser() currentUser: ICurrentUser,
    @Args('password') password: string,
  ) {
    return this.authService.isPassword({ currentUser, password });
  }

  @Mutation(() => String)
  async signUpGetToken(
    //
    @Args('phone') phone: string,
  ) {
    return this.authService.sendTokenToPhone({ phone });
  }

  @Mutation(() => Boolean)
  async signUpCheckToken(
    @Args('phone') phone: string,
    @Args('token') token: string,
  ) {
    return this.authService.checkToken({ phone, token });
  }
}
