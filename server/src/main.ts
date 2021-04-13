import { config } from 'dotenv'
config()
import { NestFactory } from '@nestjs/core';
import { getConnection } from 'typeorm';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await getConnection().runMigrations()

  await app.listen(3000);
}
bootstrap();
