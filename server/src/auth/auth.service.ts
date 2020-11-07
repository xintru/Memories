import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { UserEntity } from './auth.entity'
import { Repository } from 'typeorm'
import * as jwt from 'jsonwebtoken'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
    private configService: ConfigService,
  ) {}

  createToken({ id, email }: UserEntity) {
    const secret = this.configService.get<string>('JWT_SECRET')
    return jwt.sign({ id, email }, secret)
  }

  createUser(email: string) {
    return this.userRepo.create({ email }).save()
  }

  getUserByEmail(email: string) {
    return this.userRepo.findOne({ email })
  }
}
