import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule } from '@nestjs/config'
import { AuthModule } from './auth/auth.module'
import { MemoryModule } from './memory/memory.module'
import { MailModule } from './mail/mail.module'
import { join } from 'path'
import { CommentModule } from './comment/comment.module'
import TypeOrmConfig from './config/TypeOrmConfig'

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: '../../schema.graphql',
      sortSchema: true,
      context: ({ req }) => ({
        req,
      }),
      cors: {
        origin: true,
        credentials: true,
      },
      typePaths: ['../../schema.graphql'],
      definitions: {
        path: join(process.cwd(), '../client/src/graphql/graphql.types.ts'),
        outputAs: 'interface',
      },
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfig,
    }),
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '../../.env' }),
    AuthModule,
    MemoryModule,
    MailModule,
    CommentModule,
  ],
})
export class AppModule {}
