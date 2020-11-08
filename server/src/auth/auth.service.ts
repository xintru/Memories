import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from './auth.model'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  createToken({ id, email }: User) {
    return this.jwtService.sign({ id, email })
  }

  createUser(email: string) {
    return this.userRepo.create({ email }).save()
  }

  getUserByEmail(email: string) {
    return this.userRepo.findOne({ email })
  }
}
