import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Field, ObjectType } from '@nestjs/graphql'
import { Memory } from '../memory/memory.model'

@ObjectType()
@Entity('User')
export class User extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Field()
  @Column({ unique: true })
  email: string

  @Column()
  password: string

  @ManyToMany((type) => Memory, (memory: Memory) => memory.user, {
    cascade: true,
  })
  @JoinTable({
    name: 'user_has_memory',
    joinColumn: { name: 'user_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'memory_id', referencedColumnName: 'id' },
  })
  @Field((type) => [Memory])
  memories: Memory[]
}

@ObjectType()
export class TokenData {
  @Field()
  token: string

  @Field()
  expiresAt: number
}

@ObjectType()
export class AuthReturnData {
  @Field((type) => TokenData)
  tokenData: TokenData

  @Field((type) => User)
  user: User
}
