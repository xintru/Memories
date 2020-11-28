import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule } from '@nestjs/config'
import { AuthModule } from './auth/auth.module'
import { MemoryModule } from './memory/memory.module'
import { MailModule } from './mail/mail.module'

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
    }),
    TypeOrmModule.forRoot({}),
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '../../.env' }),
    AuthModule,
    MemoryModule,
    MailModule,
  ],
})
export class AppModule {}
