import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from './auth.model'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
import { ConfigService } from '@nestjs/config'
import * as generator from 'generate-password'
import { MailerService } from '@nestjs-modules/mailer'
import { assemblePasswordEmail } from '../shared/helpers/assemblePasswordEmail'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    private readonly mailerService: MailerService,
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
    return this.userRepo.findOne({ email }, { relations: ['memories'] })
  }

  async sendNewPassword(email: string) {
    const newPw = generator.generate({ length: 10, numbers: true })
    const html = assemblePasswordEmail(newPw)
    await this.mailerService.sendMail({
      to: email,
      from: this.configService.get('MAILER_FROM'),
      subject: `Your new password`,
      html,
    })
  }
}
