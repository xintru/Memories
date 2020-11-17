import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { join } from 'path'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule } from '@nestjs/config'
import { AuthModule } from './auth/auth.module'

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      context: ({ req }) => ({
        req,
      }),
      cors: {
        origin: `http://${process.env.CLIENT_HOST}:${process.env.CLIENT_PORT}`,
        credentials: true,
      },
    }),
    TypeOrmModule.forRoot({}),
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '../../.env' }),
    AuthModule,
  ],
})
export class AppModule {}
