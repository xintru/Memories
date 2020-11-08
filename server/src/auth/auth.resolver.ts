import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { AuthService } from './auth.service'
import { AuthReturnData, User } from './auth.model'
import { HttpException, HttpStatus, UseGuards } from '@nestjs/common'
import { GqlAuthGuard } from './auth.guard'
import { CurrentUser } from '../shared/decorators/CurrentUser.decorator'
import { ConfigService } from '@nestjs/config'
import { LoginDto } from './dto/login.dto'
import { SignUpDto } from './dto/signup.dto'

@Resolver((of) => User)
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @Query((returns) => User)
  @UseGuards(GqlAuthGuard)
  getUser(@CurrentUser('user') user: User) {
    return this.authService.getUserByEmail(user.email)
  }

  @Mutation((returns) => AuthReturnData)
  async login(@Args() { email, password }: LoginDto) {
    const user = await this.authService.getUserByEmail(email)
    if (!user) {
      return new HttpException(
        'User with this email does not exist or password is incorrect',
        HttpStatus.UNPROCESSABLE_ENTITY,
      )
    }
    const token = this.authService.createToken(user)
    return {
      tokenData: {
        token,
        expiresAt: this.configService.get('JWT_EXPIRES_AT'),
      },
      user,
    }
  }

  @Mutation((returns) => String)
  async signup(@Args() { password, confirmPassword, email }: SignUpDto) {
    if (password !== confirmPassword) {
      return new HttpException(
        'Passwords do not match',
        HttpStatus.UNPROCESSABLE_ENTITY,
      )
    }
    const existingUser = await this.authService.getUserByEmail(email)
    if (existingUser) {
      return new HttpException(
        'User with this email already exists',
        HttpStatus.BAD_REQUEST,
      )
    }
    const user = await this.authService.createUser(email)
    return this.authService.createToken(user)
  }
}
