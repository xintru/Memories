import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { Field, ObjectType } from '@nestjs/graphql'

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
