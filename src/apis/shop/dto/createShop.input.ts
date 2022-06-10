import { Field, Float, InputType, Int } from '@nestjs/graphql';
import { PlaceInput } from 'src/apis/board/dto/createBoard.input';

@InputType()
export class CreateShopInput {
  @Field(() => String)
  shopProductName: string;

  @Field(() => String)
  shopSeller: string;

  @Field(() => Float)
  shopDisCount: number;

  @Field(() => Float)
  shopDisCountPrice: number;

  @Field(() => Int)
  shopOriginalPrice: number;

  @Field(() => String)
  shopDescription: string;

  @Field(() => Int)
  shopStock: number;

  @Field(() => String, { nullable: true })
  thumbnail: string;

  @Field(() => String)
  shopUrl: string;

  @Field(() => PlaceInput)
  place: { PlaceInput: string };
}
