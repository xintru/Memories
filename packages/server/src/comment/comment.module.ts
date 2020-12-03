import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Comment } from './comment.model'

@Module({
  imports: [TypeOrmModule.forFeature([Comment])],
})
export class CommentModule {}
