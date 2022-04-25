import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Delete,
  Patch,
  Query,
} from '@nestjs/common'
import { Prisma, Status } from '@prisma/client'
import { IsEnum } from 'class-validator'
import { TasksService } from './tasks.service'

class statusDto {
  @IsEnum(Status)
  status: Status
}

@Controller('tasksp')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(@Query() filter: Prisma.taskWhereInput) {
    return this.tasksService.getTasks(filter)
  }

  @Get('/:id')
  getTaskById(@Param() where: Prisma.taskWhereUniqueInput) {
    return this.tasksService.getTaskById(where)
  }

  @Delete('/:id')
  deleteTaskById(@Param() where: Prisma.taskWhereUniqueInput) {
    return this.tasksService.deleteTaskById(where)
  }

  @Delete()
  deleteAllTasks() {
    return this.tasksService.deleteAllTasks()
  }

  @Patch('/:id/status')
  async updateTaskById(
    @Param() where: Prisma.taskWhereUniqueInput,
    @Body() body: Prisma.taskUpdateInput,
  ) {
    console.log(body)
    return await this.tasksService.updateTaskById(where, body)
  }

  @Post()
  createTask(@Body() task: Prisma.taskCreateInput) {
    return this.tasksService.createTask(task)
  }
}
