import { ArgsType, Field } from '@nestjs/graphql'
import { MinLength } from 'class-validator'

@ArgsType()
export class MemoryDto {
  @Field()
  @MinLength(2)
  name: string

  @Field()
  description: string
}
