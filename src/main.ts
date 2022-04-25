import { NestFactory } from '@nestjs/core'
import {
  NestFastifyApplication,
  FastifyAdapter,
} from '@nestjs/platform-fastify'
import fastifyCsrf from 'fastify-csrf'
import fastifyHelmet from 'fastify-helmet'
import compression from 'fastify-compress'

import { AppModule } from './app.module'
import fastifyCookie from 'fastify-cookie'
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: true }),
  )
  app.useGlobalPipes(new ValidationPipe())
  app.enableCors()
  await app.register(fastifyCookie, { secret: 'something-safe' })
  await app.register(fastifyCsrf)
  await app.register(fastifyHelmet)
  await app.register(compression)
  await app.listen(3000, '127.0.0.1')
}
bootstrap()
