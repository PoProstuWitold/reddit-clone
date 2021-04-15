import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RedisModule } from '@nestjs-modules/ioredis';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PostModule } from './post/post.module';
import { SubModule } from './sub/sub.module';
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
    RedisModule.forRootAsync({
      useFactory: () => ({
        config: { 
          url: 'redis://localhost:6379',
        },
      }),
    }),
    DatabaseModule,
    UserModule,
    AuthModule,
    PostModule,
    SubModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
