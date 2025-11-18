import { Test, TestingModule } from '@nestjs/testing'
import { AuthController } from './auth.controller'
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule } from '@nestjs/config'
import { UserModule } from './../user/user.module'
import { AuthService } from './auth.service'
import { APP_GUARD } from '@nestjs/core'
import { AuthGuard } from './auth.guard'
import { Logger, LoggerModule } from 'nestjs-pino'

describe('AuthController', () => {
  let controller: AuthController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule, UserModule, JwtModule, LoggerModule.forRoot()],
      providers: [
        Logger,
        AuthService,
        {
          provide: APP_GUARD,
          useClass: AuthGuard,
        },
      ],
      controllers: [AuthController],
    }).compile()

    controller = module.get<AuthController>(AuthController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
