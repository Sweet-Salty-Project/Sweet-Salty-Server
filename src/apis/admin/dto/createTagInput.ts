import { Field, InputType } from '@nestjs/graphql';
import { REF_Name_ENUM } from 'src/apis/boardTag/entities/boardTag.entity';

@InputType()
export class CreateTagInput {
  @Field(() => [String])
  boardTagName: string[];

  @Field(() => REF_Name_ENUM)
  boardTagRefName: string;
}
