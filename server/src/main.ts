import { config } from 'dotenv'
config()
import { NestFactory } from '@nestjs/core';
import { getConnection } from 'typeorm';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as express from 'express'
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser'
import { ValidationError } from 'class-validator';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: ['error', 'warn']
  })

  await getConnection().runMigrations()

  app.use(express.static('/public/images'))
  app.setGlobalPrefix('/api')
  app.useGlobalPipes(new ValidationPipe({
    stopAtFirstError: true,
    whitelist: true,
    forbidNonWhitelisted: true,
    exceptionFactory: (errors: ValidationError[]) => 
      new BadRequestException(errors)
  }))
  app.use(cookieParser())
  app.use(express.json())
  app.enableCors({
    credentials: true,
    origin: process.env.ORIGIN,
    optionsSuccessStatus: 200
  })
  await app.listen(Number(process.env.PORT));
}
bootstrap();
