import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PrismaModule } from './prisma/prisma.module'
import { TasksModule } from './tasks/tasks.module'
import { TasksPModule } from './tasksP/tasks.module'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TasksModule,
    TasksPModule,
    PrismaModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'username',
      password: 'strongpassword',
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
})
export class AppModule {}
