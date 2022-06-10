import { Field, InputType } from '@nestjs/graphql';
import {
  AGE_GROUP_ENUM,
  GENDER_ENUM,
} from 'src/apis/board/entities/board.entity';

@InputType()
export class CreateUserInput {
  @Field(() => String)
  userEmail: string;

  @Field(() => String)
  userPassword: string;

  @Field(() => String)
  userPhone: string;

  @Field(() => String)
  userNickname: string;

  @Field(() => GENDER_ENUM)
  gender: string;

  @Field(() => AGE_GROUP_ENUM)
  ageGroup: string;

  @Field(() => [String])
  prefer: string;
}
