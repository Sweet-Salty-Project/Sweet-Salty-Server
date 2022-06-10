import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthAccessGuard } from 'src/commons/auth/gql-auth.guard';
import { CurrentUser, ICurrentUser } from 'src/commons/auth/gql-user-param';
import { SendMessageInput } from './dto/sendMessage.input';
import { ReceivedMessage, SendMessage } from './entitis/message.entity';
import { MessageService } from './message.service';

@Resolver()
export class MessageResolver {
  constructor(private readonly messageService: MessageService) {}

  @UseGuards(GqlAuthAccessGuard)
  @Query(() => [ReceivedMessage])
  fetchReceivedMessages(
    @Args({ name: 'page', nullable: true, type: () => Int }) page: number,
    @CurrentUser() currentUser: ICurrentUser,
  ) {
    return this.messageService.receivedList({ page, currentUser });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Query(() => ReceivedMessage)
  fetchReceivedMessage(
    @CurrentUser() currentUser: ICurrentUser,
    @Args('messageInfoId') messageInfoId: string,
  ) {
    return this.messageService.readReceived({ messageInfoId, currentUser });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Query(() => String)
  fetchReceivedMessagesCount(
    //
    @CurrentUser() currentUser: ICurrentUser,
  ) {
    return this.messageService.receivedListCount({ currentUser });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Query(() => [SendMessage])
  fetchSendMessages(
    //
    @Args({ name: 'page', nullable: true, type: () => Int }) page: number,
    @CurrentUser() currentUser: ICurrentUser,
  ) {
    return this.messageService.sendList({ page, currentUser });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Query(() => SendMessage)
  fetchSendMessage(
    @CurrentUser() currentUser: ICurrentUser,
    @Args('messageInfoId') messageInfoId: string,
  ) {
    return this.messageService.readSend({ currentUser, messageInfoId });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Query(() => String)
  fetchUnreadMessageCount(@CurrentUser() currentUser: ICurrentUser) {
    return this.messageService.unreadCount({ currentUser });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Query(() => String)
  fetchSendMessagesCount(
    //
    @CurrentUser() currentUser: ICurrentUser,
  ) {
    return this.messageService.sendListCount({ currentUser });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => String)
  sendMessage(
    @CurrentUser() currentUser: ICurrentUser,
    @Args('sendMessageInput') sendMessageInput: SendMessageInput,
  ) {
    return this.messageService.send({
      currentUser,
      sendMessageInput,
    });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => String)
  deleteSendMessage(
    @CurrentUser() currentUser: ICurrentUser,
    @Args('messageInfoId') messageInfoId: string,
  ) {
    return this.messageService.deleteSend({ currentUser, messageInfoId });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => String)
  deleteReceivedMessage(
    @CurrentUser() currentUser: ICurrentUser,
    @Args('messageInfoId') messageInfoId: string,
  ) {
    return this.messageService.deleteReceived({ currentUser, messageInfoId });
  }
}
