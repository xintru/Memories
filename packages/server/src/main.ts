import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

require('dotenv').config({ path: `../../.env` })

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  })

  await app.listen(+process.env.SERVER_PORT || 3001)
}
bootstrap()
