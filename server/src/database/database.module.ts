import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as connectionOptions from './ormconfig';

@Module({
    imports: [
        TypeOrmModule.forRoot(connectionOptions)
    ]
})
export class DatabaseModule {}