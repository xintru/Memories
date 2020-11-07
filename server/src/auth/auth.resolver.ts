import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql'
import { AuthService } from './auth.service'
import { User } from '../graphql'
import { UseGuards } from '@nestjs/common'
import { AuthGuard } from './auth.guard'

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Query()
  @UseGuards(AuthGuard)
  user(@Context('user') user: User) {
    return user
  }

  @Mutation()
  async login(@Args('email') email: string) {
    const user = await this.authService.getUserByEmail(email)
    if (!user) {
      return await this.authService.createUser(email)
    }
    return this.authService.createToken(user)
  }
}
