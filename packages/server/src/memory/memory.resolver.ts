import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { Memory } from './memory.model'
import { MemoryService } from './memory.service'
import { GqlAuthGuard } from '../auth/auth.guard'
import { UseGuards } from '@nestjs/common'
import { CurrentUser } from '../shared/decorators/CurrentUser.decorator'
import { User } from '../auth/auth.model'
import { MemoryDto } from './dto/memory.dto'

@Resolver(() => Memory)
export class MemoryResolver {
  constructor(private readonly memoryService: MemoryService) {}

  @Query(() => [Memory])
  @UseGuards(GqlAuthGuard)
  async userMemories(@CurrentUser('user') user: User) {
    return await this.memoryService.getUserMemories(user.id)
  }

  @Query(() => Memory)
  @UseGuards(GqlAuthGuard)
  async getMemoryById(@Args('id') id: string) {
    return await this.memoryService.getMemoryById(id)
  }

  @Mutation(() => Memory)
  @UseGuards(GqlAuthGuard)
  async createMemory(
    @Args() newMemoryData: MemoryDto,
    @CurrentUser('user') user: User,
  ) {
    return await this.memoryService.createMemory(newMemoryData, user)
  }
}
