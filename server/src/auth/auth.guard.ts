import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { ConfigService } from '@nestjs/config'
import * as jwt from 'jsonwebtoken'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private configService: ConfigService) {}

  async canActivate(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context).getContext()
    if (!ctx.headers.authorization) {
      return false
    }
    ctx.user = await this.validateToken(ctx.headers.authorization)
    return true
  }

  async validateToken(auth: string) {
    if (auth.split(' ')[0] !== 'Bearer') {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED)
    }
    const token = auth.split(' ')[1]
    try {
      return await jwt.verify(token, this.configService.get('JWT_SECRET'))
    } catch (e) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED)
    }
  }
}
