import { ConnectionOptions } from 'typeorm'

require('dotenv').config({ path: `../../.env` })

const config = {
  host: 'localhost',
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
}

const connectionOptions: ConnectionOptions = {
  type: 'postgres',
  host: config.host,
  port: 5432,
  username: config.user || 'admin',
  password: config.password || '12345',
  database: config.database || 'placeholder_db',
  synchronize: false,
  dropSchema: false,
  migrationsRun: true,
  entities: ['dist/**/*.model.js'],
  migrations: ['src/migrations/*{.ts,.js}'],
  cli: {
    migrationsDir: 'src/migrations',
  },
}

export = connectionOptions
