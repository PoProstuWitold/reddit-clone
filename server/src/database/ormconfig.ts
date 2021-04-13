import { join } from 'path'
import { ConnectionOptions } from 'typeorm'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'
const PROD_ENV = 'production'

const config = {
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_DBNAME,
}

const connectionOptions: ConnectionOptions = {
    type: 'postgres',
    host: config.host,
    port: 5432,
    username: config.user || 'admin',
    password: config.password || 'admin',
    database: config.database || 'poprostuwitold',
    namingStrategy: new SnakeNamingStrategy(),
    entities: [
        __dirname + '/../**/*.entity{.ts,.js}'
    ],
    // We are using migrations, synchronize should be set to false.
    synchronize: false,
    dropSchema: false,
    // Run migrations automatically,
    // you can disable this if you prefer running migration manually.
    // migrationsRun: true,
    logging: ['warn', 'error'],
    logger: process.env.NODE_ENV === PROD_ENV ? 'file' : 'debug',
    migrations: [
        join(__dirname, 'migrations/*{.ts,.js}')
    ],
    cli: {
        migrationsDir: 'src/database/migrations'
    }
}

export = connectionOptions