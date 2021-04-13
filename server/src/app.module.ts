import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
          DATABASE_HOST: Joi.string().required(),
          DATABASE_PORT: Joi.string().required(),
          DATABASE_USER: Joi.string().required(),
          DATABASE_PASSWORD: Joi.string().required(),
          DATABASE_DBNAME: Joi.string().required()
      }),
      isGlobal: true
    }),
    DatabaseModule,
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
