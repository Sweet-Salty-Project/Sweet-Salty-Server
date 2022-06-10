import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateTagInput } from './dto/createTagInput';

import { AdminService } from './admin.service';
import { BoardTag } from '../boardTag/entities/boardTag.entity';

@Resolver()
export class AdminResolver {
  constructor(private readonly adminService: AdminService) {}

  @Mutation(() => String)
  createTags(@Args('createTagInput') createTagInput: CreateTagInput) {
    return this.adminService.createTag({ createTagInput });
  }

  @Query(() => [BoardTag])
  fetchTags(@Args('refName') refName: string) {
    return this.adminService.findTags({ refName });
  }

  @Mutation(() => String)
  createTopCategory() {
    return this.adminService.createTopCategory();
  }

  @Mutation(() => String)
  createSubCategory() {
    return this.adminService.createSubCategory();
  }
}
