import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm'
import { Injectable } from '@nestjs/common'

// import { JwtModuleOptions } from '@nestjs/jwt'

@Injectable()
class TypeOrmConfig implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      port: +process.env.POSTGRES_PORT,
      host: 'localhost',
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      synchronize: false,
      dropSchema: false,
      migrationsRun: false,
      entities: ['dist/**/*.model.js'],
      migrations: ['src/migrations/*{.ts,.js}'],
      cli: {
        migrationsDir: 'src/migrations',
      },
    }
  }
}

export default TypeOrmConfig
