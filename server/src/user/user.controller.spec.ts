import { Test, TestingModule } from '@nestjs/testing'
import { UserController } from './user.controller'
import { DatabaseModule } from './../database/database.module'
import { userProviders } from './user.providers'
import { UserService } from './user.service'

describe('UsersController', () => {
  let controller: UserController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
      providers: [...userProviders, UserService],
      controllers: [UserController],
    }).compile()

    controller = module.get<UserController>(UserController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
