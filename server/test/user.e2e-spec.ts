import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { AppModule } from './../src/app/app.module'
import { ZodValidationPipe } from '@anatine/zod-nestjs'

describe('UserController (e2e)', () => {
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
      confirmPassword: '',
      nickname: '',
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

  it('[validation] login is correct, but others no', async () => {
    const data = {
      login: 'lolz11',
      password: '',
      confirmPassword: '',
      nickname: '',
    }

    const response = await request(app.getHttpServer())
      .post('/user/regist')
      .send(data)

    const messages: Array<string> = response.body.message

    expect(response.status).toBe(400)
    expect(messages).not.toContain('login: login field is empty')
    expect(messages).not.toContain(
      'login: login field should be longest 5 characters',
    )
    expect(messages).not.toBe([])
  })

  it('[validation] login is small than 5 chars', async () => {
    const data = {
      login: 'lolz',
      password: '',
      confirmPassword: '',
      nickname: '',
    }

    const response = await request(app.getHttpServer())
      .post('/user/regist')
      .send(data)

    expect(response.status).toBe(400)
    expect(response.body.message).toContain(
      'login: login field should be longest 5 characters',
    )
  })

  it('[validation] login not exist', async () => {
    const data = {
      password: '',
      confirmPassword: '',
      nickname: '',
    }

    const response = await request(app.getHttpServer())
      .post('/user/regist')
      .send(data)

    expect(response.status).toBe(400)
    expect(response.body.message).toContain('login: Required')
  })

  it('[validation] password not exist', async () => {
    const data = {
      login: 'lolz1',
      confirmPassword: '',
      nickname: '',
    }

    const response = await request(app.getHttpServer())
      .post('/user/regist')
      .send(data)

    const messages: Array<string> = response.body.message

    expect(response.status).toBe(400)
    expect(messages).toContain('password: Required')
  })

  it('[validation] password smallest than 8 chars', async () => {
    const data = {
      login: 'lolz11',
      password: '1234567',
      confirmPassword: '',
      nickname: '',
    }

    const response = await request(app.getHttpServer())
      .post('/user/regist')
      .send(data)

    expect(response.status).toBe(400)
    expect(response.body.message).toContain(
      'password: password should not be smallest 8 chars',
    )
  })

  it('[validation] password is correct', async () => {
    const data = {
      login: 'lolz11',
      password: '123456789',
      confirmPassword: '',
      nickname: '',
    }

    const response = await request(app.getHttpServer())
      .post('/user/regist')
      .send(data)

    const messages: Array<string> = response.body.message

    expect(response.status).toBe(400)
    expect(messages).not.toContain('password: Required')
    expect(messages).not.toContain(
      'password: password should not be smallest 8 chars',
    )
  })

  it('[validation] confirmPassword is not exist', async () => {
    const data = {
      login: 'lolz11',
      password: '123456789',
      nickname: '',
    }

    const response = await request(app.getHttpServer())
      .post('/user/regist')
      .send(data)

    const messages: Array<string> = response.body.message

    expect(response.status).toBe(400)
    expect(messages).toContain('confirmPassword: Required')
  })

  it('[validation] confirmPassword exist, but empty value', async () => {
    const data = {
      login: 'lolz11',
      password: '123456789',
      confirmPassword: '',
      nickname: '',
    }

    const response = await request(app.getHttpServer())
      .post('/user/regist')
      .send(data)

    const messages: Array<string> = response.body.message

    expect(response.status).toBe(400)
    expect(messages).toContain(
      'confirmPassword: password and confirmPassword are not equals',
    )
  })

  it('[validation] confirmPassword exist, but not equals', async () => {
    const data = {
      login: 'lolz11',
      password: '123456789',
      confirmPassword: '12345678',
      nickname: '',
    }

    const response = await request(app.getHttpServer())
      .post('/user/regist')
      .send(data)

    const messages: Array<string> = response.body.message

    expect(response.status).toBe(400)
    expect(messages).toContain(
      'confirmPassword: password and confirmPassword are not equals',
    )
  })

  it('[validation] confirmPassword and password equals, but anothers no correct', async () => {
    const data = {
      login: 'lolz11',
      password: '123456789',
      confirmPassword: '123456789',
      nickname: '',
    }

    const response = await request(app.getHttpServer())
      .post('/user/regist')
      .send(data)

    const messages: Array<string> = response.body.message

    expect(response.status).toBe(400)
    expect(messages).not.toContain('password: Required')
    expect(messages).not.toContain(
      'password: password should not be smallest 8 chars',
    )
    expect(messages).not.toContain(
      'confirmPassword: password and confirmPassword are not equals',
    )
    expect(messages).not.toContain('confirmPassword: Required')
    expect(messages).not.toBe([])
  })

  it('[validation] nickname is not exist', async () => {
    const data = {
      login: 'lolz11',
      password: '123456789',
      confirmPassword: '123456789',
    }

    const response = await request(app.getHttpServer())
      .post('/user/regist')
      .send(data)

    const messages: Array<string> = response.body.message

    expect(response.status).toBe(400)
    expect(messages).toContain('nickname: Required')
  })

  it('[validation] nickname is empty', async () => {
    const data = {
      login: 'lolz11',
      password: '123456789',
      confirmPassword: '123456789',
      nickname: '',
    }

    const response = await request(app.getHttpServer())
      .post('/user/regist')
      .send(data)

    const messages: Array<string> = response.body.message

    expect(response.status).toBe(400)
    expect(messages).toContain('nickname: nickname field is empty')
  })

  it('[validation] nickname should be longest than 5 chars', async () => {
    const data = {
      login: 'lolz11',
      password: '123456789',
      confirmPassword: '123456789',
      nickname: 'nick',
    }

    const response = await request(app.getHttpServer())
      .post('/user/regist')
      .send(data)

    const messages: Array<string> = response.body.message

    expect(response.status).toBe(400)
    expect(messages).toContain(
      'nickname: nickname is shoud be longest than 5 chars',
    )
  })

  it('[validation] successfully registration', async () => {
    const data = {
      login: 'lolz11',
      password: '123456789',
      confirmPassword: '123456789',
      nickname: 'letnull19a',
    }

    const response = await request(app.getHttpServer())
      .post('/user/regist')
      .send(data)

    const messages: Array<string> = response.body.message

    expect(response.status).toBe(201)
    expect(response.status).not.toBe(400)
    expect(messages).toBeUndefined()
  })
})
