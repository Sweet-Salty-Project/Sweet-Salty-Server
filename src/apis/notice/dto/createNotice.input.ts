import { Field, InputType } from '@nestjs/graphql';
import { NOTICE_SUB_CATEGORY_NAME_ENUM } from '../entities/notice.entity';

@InputType()
export class CreateNoticeInput {
  @Field(() => String)
  noticeTitle: string;

  @Field(() => String)
  noticeContents: string;

  @Field(() => NOTICE_SUB_CATEGORY_NAME_ENUM)
  noticeCategory: string;

  @Field(() => [String], { nullable: true })
  url: string[];
}
