import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
} from '@nestjs/common'
import { TodosService } from './todos.service'
import { CreateTodoDto, FindTodoDTO, UpdateTodoDto, WhichTodoDto } from './dto'

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  create(@Body() data: CreateTodoDto) {
    return this.todosService.create(data)
  }

  @Get()
  findAll() {
    return this.todosService.findAll()
  }

  @Get(':id')
  findOne(@Param() where: FindTodoDTO) {
    return this.todosService.findOne(where)
  }

  @Patch(':id')
  update(@Param() where: WhichTodoDto, @Body() data: UpdateTodoDto) {
    return this.todosService.update(where, data)
  }

  @Delete(':id')
  remove(@Param() where: WhichTodoDto) {
    return this.todosService.remove(where)
  }
}
