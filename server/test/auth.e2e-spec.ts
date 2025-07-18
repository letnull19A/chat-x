import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { AppModule } from './../src/app/app.module'
import { ZodValidationPipe } from '@anatine/zod-nestjs'

describe('AuthController (e2e)', () => {
  let app: INestApplication
  let userId: string

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
      .post('/auth/login')
      .send(data)

    const messages: Array<string> = response.body.message

    expect(response.status).toBe(400)
    expect(messages).toContain('login: login field is empty')
  })

  it('[validation] login is not exist', async () => {
    const data = {
      password: '',
    }

    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send(data)

    const messages: Array<string> = response.body.message

    expect(response.status).toBe(400)
    expect(messages).toContain('login: Required')
  })

  it('[validation] password is empty', async () => {
    const data = {
      login: '',
      password: '',
    }

    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send(data)

    const messages: Array<string> = response.body.message

    expect(response.status).toBe(400)
    expect(messages).toContain('password: password field is empty')
  })

  it('[validation] password is not exist', async () => {
    const data = {
      login: '',
    }

    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send(data)

    const messages: Array<string> = response.body.message

    expect(response.status).toBe(400)
    expect(messages).toContain('password: Required')
  })

  it('[validation] success validation, but user not exist', async () => {
    const data = {
      login: 'пукпукпку',
      password: 'ук34екуеук',
    }

    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send(data)

    const messages: Array<string> = response.body.message

    expect(response.status).toBe(404)
    expect(messages).toContain('user not found')
  })

  it('[validation] success authentication', async () => {
    const registrationData = {
      login: 'lolz11',
      password: '123456789',
      confirmPassword: '123456789',
      nickname: 'letnull19a',
    }

    await request(app.getHttpServer())
      .post('/user/regist')
      .send(registrationData)

    const authenticationData = {
      login: registrationData.login,
      password: registrationData.password,
    }

    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send(authenticationData)

    const body = response.body

    userId = body.user_id

    expect(response.status).toBe(200)
    expect(body).not.toBeUndefined()
    expect(body.session_id).not.toBeUndefined()
    expect(body.access_token).not.toBeUndefined()
    expect(body.refresh_token).not.toBeUndefined()
  })

  it('[function] try create less than 5 sessions', async () => {
    const registrationData = {
      login: 'lolz11',
      password: '123456789',
      confirmPassword: '123456789',
      nickname: 'letnull19a',
    }

    const authenticationData = {
      login: registrationData.login,
      password: registrationData.password,
    }

    const statusCodes = new Array<number>()

    for (let i = 0; i < 5; i++) {
      const response = await request(app.getHttpServer())
        .post('/auth/login')
        .send(authenticationData)

      statusCodes.push(response.status)
    }
    expect(statusCodes).not.toContain(400)
    expect(statusCodes).not.toContain(404)
    expect(statusCodes).not.toContain(500)
    expect(statusCodes).not.toContain(401)
  })

  it('[function] reset all sessions', async () => {
    const response = await request(app.getHttpServer()).delete(
      `/auth/sessions/${userId}`,
    )

    expect(response.status).toBe(200)
  })
})
