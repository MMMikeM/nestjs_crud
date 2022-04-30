import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import {
  taskWhereUniqueInput,
  taskUpdateInput,
} from '@prisma/client/generator-build'
import { CreateTodoDto, WhichTodoDto } from './dto'
import { Prisma } from '@prisma/client'

@Injectable()
export class TodosService {
  constructor(private prisma: PrismaService) {}

  async create(args: Prisma.taskCreateArgs) {
    return await this.prisma.task.create(args)
  }

  async findAll(args: Prisma.taskFindManyArgs) {
    args.take ??= 10
    args.skip ??= 0
    return await this.prisma.task.findMany({})
  }

  async findOne(args: Prisma.taskFindUniqueArgs) {
    return await this.prisma.task.findUnique(args)
  }

  async update(args: Prisma.taskUpdateArgs) {
    args.data.updatedAt = new Date()
    return await this.prisma.task.update(args)
  }

  async remove(args: Prisma.taskDeleteArgs) {
    return await this.prisma.task.delete(args)
  }
}
