import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthService } from './auth.service'
import { AuthResolver } from './auth.resolver'
import { User } from './auth.model'
import { JwtStrategy } from './auth.strategy'
import { PassportModule } from '@nestjs/passport'
import { MailModule } from '../mail/mail.module'
import { JwtModule } from '@nestjs/jwt'

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule,
    MailModule,
    JwtModule.registerAsync({
      useFactory: async () => ({
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: +process.env.JWT_EXPIRES_AT },
      }),
    }),
  ],
  providers: [AuthService, AuthResolver, JwtStrategy],
})
export class AuthModule {}
