import { Field, InputType, Int } from '@nestjs/graphql';
import { PlaceInput } from 'src/apis/board/dto/createBoard.input';

@InputType()
export class updateShopInput {
  @Field(() => String, { nullable: true })
  shopProductName: string;

  @Field(() => String, { nullable: true })
  shopSeller: string;

  @Field(() => Int, { nullable: true })
  shopDisCount: number;

  @Field(() => Int, { nullable: true })
  shopDisCountPrice: number;

  @Field(() => Int, { nullable: true })
  shopOriginalPrice: number;

  @Field(() => String, { nullable: true })
  shopDescription: string;

  @Field(() => Int, { nullable: true })
  shopStock: number;

  @Field(() => String, { nullable: true })
  shopUrl: string;

  @Field(() => PlaceInput, {nullable: true} )
  place: { PlaceInput: string };
}
