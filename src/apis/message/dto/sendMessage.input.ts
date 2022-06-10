import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class SendMessageInput {
  @Field(() => String)
  contents: string;

  @Field(() => String)
  receiveUser: string;
}
