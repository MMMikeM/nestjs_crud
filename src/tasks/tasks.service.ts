import { Injectable, NotFoundException } from '@nestjs/common'
import { Task, TaskStatus } from './task.model'
import cuid from 'cuid'
import { CreateTaskDto } from './dto/create-task.dto'
import { UpdateTaskDto } from './dto/update-task.dto'
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto'

@Injectable()
export class TasksService {
  private tasks: Task[] = []

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto
    const task: Task = {
      id: cuid.slug(),
      title,
      description,
      status: TaskStatus.OPEN,
    }
    this.tasks.push(task)
    return task
  }

  getTaskById(id: string): Task {
    const task = this.tasks.find((task) => task.id === id)
    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found`)
    }
    return task
  }

  updateTaskById(id: string, updateTaskDto: UpdateTaskDto): string {
    const { status } = updateTaskDto
    if (Object.values(TaskStatus).includes(status as TaskStatus)) {
      this.getTaskById(id).status = status
      return 'Task status updated'
    }
    return 'Invalid status'
  }

  deleteTaskById(id: string): void {
    if (this.getTaskById(id)) {
      this.tasks = this.tasks.filter((task) => task.id !== id)
    }
  }

  deleteAllTasks(): void {
    this.tasks = []
  }

  getTasks(getTasksFilterDto: GetTasksFilterDto): Task[] {
    const { status, search } = getTasksFilterDto
    const filterStatus = (input, status) => {
      if (status) {
        return input.filter((task) => task.status === status)
      }
      return input
    }
    const searchTasks = (input, search) => {
      if (search) {
        return input.filter((task) => {
          return (
            task.title.includes(search) || task.description.includes(search)
          )
        })
      }
      return input
    }
    return searchTasks(filterStatus(this.tasks, status), search)
  }
}
