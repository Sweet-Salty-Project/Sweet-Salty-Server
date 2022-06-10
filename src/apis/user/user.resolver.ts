import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthAccessGuard } from 'src/commons/auth/gql-auth.guard';
import { CurrentUser, ICurrentUser } from 'src/commons/auth/gql-user-param';

import { CreateUserInput } from './dto/createUser.input';
import { UpdateUserInput } from './dto/updateUser.input';
import { fewUser, User } from './entities/user.entity';

import { UserService } from './user.service';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}
  @Mutation(() => User)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.userService.create({ createUserInput });
  }

  @Query(() => User)
  fetchUser(
    //
    @Args({ name: 'userEmail', nullable: true }) userEmail: string,
    @Args({ name: 'userId', nullable: true }) userId: string,
    @Args({ name: 'userNickname', nullable: true }) userNickname: string,
  ) {
    return this.userService.find({ userEmail, userId, userNickname });
  }

  @Query(() => fewUser)
  findUserId(
    //
    @Args('phone') phone: string,
  ) {
    return this.userService.fewFind({ phone });
  }

  @Query(() => User)
  fetchUserNickname(@Args('userNickname') userNickname: string) {
    return this.userService.findNickname({ userNickname });
  }

  @Query(() => User)
  fetchUserId(@Args('userId') userId: string) {
    return this.userService.findId({ userId });
  }
  //
  //
  @UseGuards(GqlAuthAccessGuard)
  @Query(() => User)
  fetchUserLoggedIn(@CurrentUser() currentUser: ICurrentUser) {
    return this.userService.findLoggedIn({ currentUser });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => User)
  async updateImage(
    @Args('image') image: string,
    @CurrentUser() currentUser: ICurrentUser,
  ) {
    return this.userService.updateImage({ image, currentUser });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => User)
  async updateProfile(
    @Args('profile') profile: string,
    @CurrentUser() currentUser: ICurrentUser,
  ) {
    return this.userService.updateProfile({ profile, currentUser });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => User)
  async updateUser(
    @CurrentUser() currentUser: ICurrentUser,
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ) {
    return await this.userService.update({
      userEmail: currentUser.userEmail,
      updateUserInput,
    });
  }

  @Mutation(() => User)
  async updatePassword(
    @Args('userEmail') userEmail: string,
    @Args('password') password: string,
  ) {
    return await this.userService.ChangePW({ userEmail, password });
  }

  @Mutation(() => Boolean)
  deleteUser(
    @Args('userEmail') userEmail: string, //
  ) {
    return this.userService.delete({ userEmail });
  }
  //
  //
  @Mutation(() => Boolean)
  restoreUser(
    @Args('userEmail') userEmail: string, //
  ) {
    return this.userService.restore({ userEmail });
  }
}
