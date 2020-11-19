import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from './auth.model'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  createToken({ id, email }: User) {
    return this.jwtService.sign({ id, email })
  }

  createUser(email: string, password: string) {
    return this.userRepo.create({ email, password, memories: [] }).save()
  }

  async hashPassword(password: string) {
    const saltSize = this.configService.get('PASSWORD_SALT')
    try {
      return await bcrypt.hash(password, +saltSize)
    } catch (e) {
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
  }

  async comparePasswords(password: string, hashedPassword: string) {
    try {
      return await bcrypt.compare(password, hashedPassword)
    } catch (e) {
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
  }

  getUserByEmail(email: string) {
    return this.userRepo.findOne({ email })
  }
}
