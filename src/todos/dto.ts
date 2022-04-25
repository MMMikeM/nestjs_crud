import { Status } from '@prisma/client'
import { IsEnum, isEnum, IsNotEmpty } from 'class-validator'

export class FindTodoDTO {
  @IsNotEmpty()
  id: string
}

export class CreateTodoDto {
  @IsNotEmpty()
  title: string

  @IsNotEmpty()
  description: string
}

export class WhichTodoDto {
  @IsNotEmpty()
  id: string
}

export class UpdateTodoDto {
  @IsEnum(Status)
  status: Status
}
