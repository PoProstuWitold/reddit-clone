import { config } from 'dotenv'
config()
import { NestFactory } from '@nestjs/core';
import { getConnection } from 'typeorm';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as express from 'express'
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser'
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: ['error', 'warn']
  })

  await getConnection().runMigrations()

  app.useGlobalPipes(new ValidationPipe())
  app.use(cookieParser())
  app.use(express.json())
  await app.listen(Number(process.env.PORT));
}
bootstrap();
