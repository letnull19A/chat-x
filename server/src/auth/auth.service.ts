import {
  LoggerService,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { UserService } from './../user/user.service'
import { JwtService } from '@nestjs/jwt'
import { TokenPairDto } from './dto/tokens.dto'
import { LoginDto } from './dto/login.dto'
import {
  createHash,
  randomInt,
} from 'node:crypto'

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly logger: LoggerService,
  ) {}

  async signIn(
    loginData: LoginDto,
  ): Promise<any> {
    const { login, password } = loginData

    const user =
      await this.userService.findByLogin(login)

    const passwordHash = createHash('sha-256')
      .update(password)
      .digest('base64')

    if (user?.password !== passwordHash) {
      throw new UnauthorizedException()
    }

    const { ...result } = user
    const payload = {
      sub: user.id,
      nickname: user.nickname,
    }

    const accessOptions = {
      secret: process.env.AUTH_SECRET,
      expiresIn: process.env.AUTH_ACCESS_LIFE,
    }

    const refreshOptions = {
      secret: process.env.AUTH_SECRET,
      expiresIn: process.env.AUTH_REFRESH_LIFE,
    }

    return {
      access_token:
        await this.jwtService.signAsync(
          payload,
          accessOptions,
        ),
      refresh_token:
        await this.jwtService.signAsync(
          payload,
          refreshOptions,
        ),
    }
  }

  async refreshAllTokens(tokens: TokenPairDto) {
    try {
      const user =
        await this.jwtService.verifyAsync(
          tokens.refreshToken,
        )

      const payload = {
        sub: null,
        nikname: null,
      }

      const accessOptions = {
        secret: process.env.AUTH_SECRET,
        expiresIn: process.env.AUTH_ACCESS_LIFE,
      }

      const refreshOptions = {
        secret: process.env.AUTH_SECRET,
        expiresIn: process.env.AUTH_REFRESH_LIFE,
      }

      return {
        access_token:
          await this.jwtService.signAsync(
            payload,
            accessOptions,
          ),
        refresh_token:
          await this.jwtService.signAsync(
            payload,
            refreshOptions,
          ),
      }
    } catch {
      this.logger.error('token are not verified!')
      return null
    }
  }
}
