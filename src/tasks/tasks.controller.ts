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
import { CreateTaskDto } from './dto/create-task.dto'
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto'
import { UpdateTaskDto } from './dto/update-task.dto'
import { Task } from './task.model'
import { TasksService } from './tasks.service'

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(@Query() getTasksFilterDto: GetTasksFilterDto): Task[] {
    return this.tasksService.getTasks(getTasksFilterDto)
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Task {
    return this.tasksService.getTaskById(id)
  }

  @Delete('/:id')
  deleteTaskById(@Param('id') id: string): void {
    this.tasksService.deleteTaskById(id)
  }

  @Delete('')
  deleteAllTasks(): void {
    this.tasksService.deleteAllTasks()
  }

  @Patch('/:id/status')
  updateTaskById(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ): string {
    const res = this.tasksService.updateTaskById(id, updateTaskDto)
    return res
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Task {
    return this.tasksService.createTask(createTaskDto)
  }
}
