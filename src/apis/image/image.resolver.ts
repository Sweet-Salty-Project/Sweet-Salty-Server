import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { FileUpload, GraphQLUpload } from 'graphql-upload';
import { ImageService } from './image.service';

@Resolver()
export class ImageResolver {
  constructor(
    //
    private readonly imageService: ImageService,
  ) {}

  @Mutation(() => String)
  async uploadFile(
    @Args({ name: 'file', type: () => GraphQLUpload }) file: FileUpload,
  ) {
    return await this.imageService.upload({ file });
  }

  // @Mutation(() => String)
  // deleteFile(
  //   @Args('bucketName') bucketName: string,
  //   @Args('fileName') fileName: string,
  // ) {
  //   return this.boardImageService.delete({ bucketName, fileName });
  // }

  @Query(() => String)
  async test(
    @Args({ name: 'file', type: () => GraphQLUpload }) file: FileUpload,
  ) {
    return this.imageService.signed({ file });
  }

  @Query(() => String)
  async getBarcode() {
    return await this.imageService.getBarcode();
  }
}
