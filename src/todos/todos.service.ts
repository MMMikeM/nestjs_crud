import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import {
  taskWhereUniqueInput,
  taskUpdateInput,
} from '@prisma/client/generator-build'
import { CreateTodoDto, WhichTodoDto } from './dto'

@Injectable()
export class TodosService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateTodoDto) {
    return await this.prisma.task.create({ data })
  }

  async findAll() {
    return await this.prisma.task.findMany({})
  }

  async findOne(where: taskWhereUniqueInput) {
    return await this.prisma.task.findUnique({ where })
  }

  async update(where: WhichTodoDto, data: taskUpdateInput) {
    data.updatedAt = new Date()
    return await this.prisma.task.update({ where, data })
  }

  async remove(where: WhichTodoDto) {
    return await this.prisma.task.delete({ where })
  }
}
