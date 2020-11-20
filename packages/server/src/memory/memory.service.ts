import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Memory } from './memory.model'
import { User } from '../auth/auth.model'
import { MemoryDto } from './dto/memory.dto'

@Injectable()
export class MemoryService {
  constructor(
    @InjectRepository(Memory)
    private readonly memoryRepository: Repository<Memory>,
  ) {}

  getUserMemories(userId: string) {
    return this.memoryRepository.find({
      where: (qb) => {
        qb.where('Memory__user.id = :id', { id: userId })
      },
      relations: ['user'],
    })
  }

  getMemoryById(memoryId: string) {
    return this.memoryRepository.findOne(memoryId, { relations: ['user'] })
  }

  createMemory(newMemoryData: MemoryDto, user: User) {
    return this.memoryRepository
      .create({
        ...newMemoryData,
        user: [user],
      })
      .save()
  }
}
