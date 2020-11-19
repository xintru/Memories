import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Memory } from './memory.model'
import { User } from '../auth/auth.model'

@Injectable()
export class MemoryService {
  constructor(
    @InjectRepository(Memory)
    private readonly memoryRepository: Repository<Memory>,
  ) {}

  // getMemories(userId: string) {
  //   this.userRepo.find()
  // }

  createMemory(user: User) {
    return this.memoryRepository
      .create({
        name: 'some shit',
        description: 'also some shit',
        user: [user],
      })
      .save()
  }
}
