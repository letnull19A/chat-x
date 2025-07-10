import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { AppModule } from './../src/app/app.module'
import { ZodValidationPipe } from '@anatine/zod-nestjs'

describe('AuthController (e2e)', () => {
  let app: INestApplication

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication()
    app.useGlobalPipes(new ZodValidationPipe())
    await app.init()
  })

  it('[validation] login is empty', async () => {
    const data = {
      login: '',
      password: '',
    }

    const response = await request(app.getHttpServer())
      .post('/user/regist')
      .send(data)

    const messages: Array<string> = response.body.message

    expect(response.status).toBe(400)
    expect(messages).toContain('login: login field is empty')
    expect(messages).toContain(
      'login: login field should be longest 5 characters',
    )
  })

  it('[validation] login is not exist', async () => {
    const data = {
      password: '',
    }

    const response = await request(app.getHttpServer())
      .post('/user/regist')
      .send(data)

    const messages: Array<string> = response.body.message

    expect(response.status).toBe(400)
    expect(messages).toContain('login: login field is empty')
    expect(messages).toContain(
      'login: login field should be longest 5 characters',
    )
  })

  it('[validation] password is empty', async () => {
    const data = {
      login: '',
      password: '',
    }

    const response = await request(app.getHttpServer())
      .post('/user/regist')
      .send(data)

    const messages: Array<string> = response.body.message

    expect(response.status).toBe(400)
    expect(messages).toContain('login: login field is empty')
    expect(messages).toContain(
      'login: login field should be longest 5 characters',
    )
  })

  it('[validation] password is not exist', async () => {
    const data = {
      login: '',
    }

    const response = await request(app.getHttpServer())
      .post('/user/regist')
      .send(data)

    const messages: Array<string> = response.body.message

    expect(response.status).toBe(400)
    expect(messages).toContain('login: login field is empty')
    expect(messages).toContain(
      'login: login field should be longest 5 characters',
    )
  })
})
