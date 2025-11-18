import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common'
import { UserService } from './../user/user.service'
import { JwtService } from '@nestjs/jwt'
import { LoginDto } from './dto/login.dto'
import { Logger } from 'nestjs-pino'
import { createHash } from 'node:crypto'
import { Session } from './session.entity'
import { User } from './../user/user.entity'
import { Repository } from 'typeorm'

export interface AuthResponse {
  session_id: string
  user_id: string
  access_token: string
  refresh_token: string
}

export interface TokenPayload {
  sub: string
  nickname: string
}

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    @Inject('SESSION_REPOSITORY')
    private readonly sessionRepository: Repository<Session>,
    private readonly logger: Logger,
  ) {}

  async signIn(loginData: LoginDto): Promise<AuthResponse> {
    const { login, password } = loginData

    await this.validateUserCredentials(login, password)
    const user = await this.userService.findByLogin(login)

    await this.checkSessionsLimit(user)

    const tokens = await this.generateTokens(user)
    const session = await this.createSession(user, tokens)

    return this.buildAuthResponse(session, tokens)
  }

  private async validateUserCredentials(
    login: string,
    password: string,
  ): Promise<void> {
    const user = await this.userService.findByLogin(login)
    const passwordHash = this.hashPassword(password)

    if (user === null || user === undefined)
      throw new NotFoundException('user not found')

    if (!user || user.password !== passwordHash)
      throw new UnauthorizedException('Invalid credentials')
  }

  private hashPassword(password: string): string {
    return createHash('sha256').update(password).digest('base64')
  }

  private async checkSessionsLimit(user: User): Promise<void> {
    const sessionsLimit = Number.parseInt(process.env.AUTH_SESSIONS_LIMIT)

    if (user.sessions?.length > sessionsLimit) {
      throw new BadRequestException('Maximum number of sessions exceeded')
    }
  }

  private async generateTokens(
    user: User,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const payload = this.buildTokenPayload(user)

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.AUTH_SECRET,
        expiresIn: process.env.AUTH_ACCESS_LIFE,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.AUTH_SECRET,
        expiresIn: process.env.AUTH_REFRESH_LIFE,
      }),
    ])

    return { accessToken, refreshToken }
  }

  private buildTokenPayload(user: User): TokenPayload {
    return {
      sub: user.id,
      nickname: user.nickname,
    }
  }

  private async createSession(
    user: User,
    tokens: { accessToken: string; refreshToken: string },
  ): Promise<Session> {
    const session = new Session()
    session.accessToken = tokens.accessToken
    session.refreshToken = tokens.refreshToken
    session.userId = user.id

    return await session.save()
  }

  private buildAuthResponse(
    session: Session,
    tokens: { accessToken: string; refreshToken: string },
  ): AuthResponse {
    return {
      session_id: session.id,
      user_id: session.userId,
      access_token: tokens.accessToken,
      refresh_token: tokens.refreshToken,
    }
  }

  async getSessionsByUserId(userId: string): Promise<Array<Session>> {
    return await this.sessionRepository.findBy({ userId: userId })
  }

  async closeAllSessions(userId: string) {
    return (await this.sessionRepository.delete({ userId: userId })).raw
  }

  async closeSession(userId: string, sessionId: string) {
    return await this.sessionRepository.delete({
      userId: userId,
      id: sessionId,
    })
  }
}
