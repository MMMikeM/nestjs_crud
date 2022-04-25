import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { TaskStatus } from 'src/tasks/task.model'
import { Prisma } from '@prisma/client'

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async createTask(data: Prisma.taskCreateInput) {
    return await this.prisma.task.create({ data })
  }

  async getTaskById(where: Prisma.taskWhereUniqueInput) {
    const task = await this.prisma.task.findUnique({ where })
    if (!task) {
      throw new NotFoundException(`Task with id ${where.id} not found`)
    }
    return task
  }

  async updateTaskById(
    where: Prisma.taskWhereUniqueInput,
    data: Prisma.taskUpdateInput,
  ) {
    data.updatedAt = new Date()
    if (Object.values(TaskStatus).includes(data.status as TaskStatus)) {
      await this.prisma.task.update({ where, data })
      return 'Task status updated'
    }
    throw new BadRequestException('Invalid status')
  }

  deleteTaskById(where: Prisma.taskWhereUniqueInput) {
    return this.prisma.task.delete({ where })
  }

  deleteAllTasks() {
    return this.prisma.task.deleteMany({})
  }

  getTasks(filter: Prisma.taskWhereInput) {
    const tasks = this.prisma.task.findMany({})
    return tasks
  }
}
