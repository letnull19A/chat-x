import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AppService } from './app.service'
import { UserController } from './../user/user.controller'
import { GroupsController } from './../groups/groups.controller'
import { UserModule } from './../user/user.module'
import { DatabaseModule } from './../database/database.module'
import { AuthController } from './../auth/auth.controller'
import { AuthModule } from './../auth/auth.module'
import { ChatGateway } from './../chat/chat.gateway'
import { LoggerModule } from 'nestjs-pino'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    DatabaseModule,
    UserModule,
    AuthModule,
    LoggerModule.forRoot(),
  ],
  controllers: [UserController, GroupsController, AuthController],
  providers: [AppService, ChatGateway],
})
export class AppModule {}
