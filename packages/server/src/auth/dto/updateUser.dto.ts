import { ArgsType, Field } from '@nestjs/graphql'
import { IsEmail, MaxLength, MinLength } from 'class-validator'

@ArgsType()
export class UpdateUserDto {
  @Field()
  @IsEmail()
  email: string

  @Field()
  @MinLength(2)
  @MaxLength(16)
  name: string
}
