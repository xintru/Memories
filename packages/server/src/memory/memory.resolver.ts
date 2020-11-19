import { Mutation, Resolver } from '@nestjs/graphql'
import { Memory } from './memory.model'
import { MemoryService } from './memory.service'
import { GqlAuthGuard } from '../auth/auth.guard'
import { UseGuards } from '@nestjs/common'
import { CurrentUser } from '../shared/decorators/CurrentUser.decorator'
import { User } from '../auth/auth.model'

@Resolver((of) => Memory)
export class MemoryResolver {
  constructor(private readonly memoryService: MemoryService) {}
  //
  // @UseGuards(GqlAuthGuard)
  // @Query((type) => Memory)
  // userMemories(@CurrentUser('user') user: User) {
  //   return this.memoryService.getMemories(user.id)
  // }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Memory)
  async createMemory(@CurrentUser('user') user: User) {
    return await this.memoryService.createMemory(user)
  }
}
