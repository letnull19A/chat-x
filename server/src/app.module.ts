import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatGateway } from './chat/chat.gateway';
import { LoggerModule } from 'nestjs-pino'

@Module({
  imports: [LoggerModule.forRoot()],
  controllers: [AppController],
  providers: [AppService, ChatGateway],
})
export class AppModule {}
