import { Module } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule } from '@nestjs/config'
import { UserModule } from './../user/user.module'
import { AuthController } from './auth.controller'
import { AuthGuard } from './auth.guard'
import { AuthService } from './auth.service'
import { sessionProviders } from './auth.providers'
import { DatabaseModule } from './../database/database.module'

@Module({
  imports: [
    DatabaseModule,
    ConfigModule,
    UserModule,
    JwtModule.register({
      global: true,
      secret: process.env.AUTH_SECRET,
      signOptions: {
        expiresIn: process.env.AUTH_ACCESS_LIFE,
      },
    }),
  ],
  providers: [
    ...sessionProviders,
    AuthService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
