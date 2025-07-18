import { Test, TestingModule } from '@nestjs/testing'
import { ChatGateway } from './chat.gateway'
import { Logger, LoggerModule } from 'nestjs-pino'

describe('ChatGateway', () => {
  let gateway: ChatGateway

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [LoggerModule.forRoot()],
      providers: [Logger, ChatGateway],
    }).compile()

    gateway = module.get<ChatGateway>(ChatGateway)
  })

  it('should be defined', () => {
    expect(gateway).toBeDefined()
  })
})
