import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import {
  SwaggerModule,
  DocumentBuilder,
} from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.enableCors()

  const config = new DocumentBuilder()
    .setTitle('Chat-X Docs')
    .setDescription('chat-x documentation')
    .setVersion('1.0')
    .addTag('chat-x')
    .build()

  const documentFactory =
    SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, documentFactory)

  await app.listen(process.env.PORT ?? 3000)
}
bootstrap()
