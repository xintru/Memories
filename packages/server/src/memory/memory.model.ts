import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Field, ObjectType } from '@nestjs/graphql'
import { User } from '../auth/auth.model'
import { Comment } from '../comment/comment.model'

@ObjectType()
@Entity('Memory')
export class Memory extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Field()
  @Column()
  name: string

  @Field()
  @Column()
  description: string

  @Field(() => [User])
  @ManyToMany(() => User, (user: User) => user.memories)
  user: User[]

  @Field(() => [Comment])
  @OneToMany(() => Comment, (comment: Comment) => comment.memory)
  comments: Comment[]

  @Field()
  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  created: Date
}
