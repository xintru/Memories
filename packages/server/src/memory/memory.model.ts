import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Field, ObjectType } from '@nestjs/graphql'
import { User } from '../auth/auth.model'

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

  @Field((type) => [User])
  @ManyToMany(() => User, (user: User) => user.memories)
  user: User[]
}
