import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthService } from './auth.service'
import { AuthResolver } from './auth.resolver'
import { UserEntity } from './auth.entity'

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [AuthService, AuthResolver],
})
export class AuthModule {}
