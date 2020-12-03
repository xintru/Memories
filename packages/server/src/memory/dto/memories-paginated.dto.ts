import { ArgsType, Field } from '@nestjs/graphql'
import { IsNumber, IsOptional } from 'class-validator'

@ArgsType()
export class MemoriesPaginatedDto {
  @Field({ nullable: true })
  @IsNumber()
  @IsOptional()
  page: number

  @Field({ nullable: true })
  @IsNumber()
  @IsOptional()
  limit: number
}
