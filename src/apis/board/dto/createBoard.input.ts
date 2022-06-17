import { Field, InputType } from '@nestjs/graphql';
import { BOARD_SUB_CATEGORY_NAME_ENUM } from '../entities/board.entity';

@InputType()
export class CreateBoardInput {
  @Field(() => String)
  boardTitle: string;

  @Field(() => String)
  boardSugar: string;

  @Field(() => String)
  boardSalt: string;

  @Field(() => String)
  boardContents: string;

  @Field(() => BOARD_SUB_CATEGORY_NAME_ENUM)
  subCategoryName: string;

  @Field(() => [String])
  tags: string[];

  @Field(() => PlaceInput)
  place: { PlaceInput: string };
}

@InputType()
export class CreateBoardReqInput {
  @Field(() => String)
  boardTitle: string;

  @Field(() => String)
  boardContents: string;

  @Field(() => BOARD_SUB_CATEGORY_NAME_ENUM)
  subCategoryName: string;

  @Field(() => PlaceInput, { nullable: true })
  place: { PlaceInput: string };
}

@InputType()
export class PlaceInput {
  @Field(() => String, {nullable: true})
  placeName: string;

  @Field(() => String, {nullable: true})
  placeAddress: string;

  @Field(() => String, {nullable: true})
  placeUrl: string;

  @Field(() => String, {nullable: true})
  lat: string;

  @Field(() => String, {nullable: true})
  lng: string;
}
