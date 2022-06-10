import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Token {
  @Field(() => String)
  accessToken: string;
}
