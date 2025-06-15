import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { GroupsController } from './groups/groups.controller';
import { User } from './user/user.entity'
import { UserModule } from './user/user.module'
import { DatabaseModule } from './database/database.module'
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { ChatGateway } from './chat/chat.gateway'
import { LoggerModule, Logger } from 'nestjs-pino'

@Module({
  imports: [DatabaseModule, UserModule, AuthModule, LoggerModule.forRoot()],
  controllers: [UserController, GroupsController, AuthController],
  providers: [AppService, ChatGateway],
})
export class AppModule {}
