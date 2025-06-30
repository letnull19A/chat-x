import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { UserService } from './../user/user.service'
import { JwtService } from '@nestjs/jwt'
import {
  createHash,
  randomInt,
} from 'node:crypto'

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    username: string,
    pass: string,
  ): Promise<any> {
    const user =
      await this.userService.findByLogin(username)

    const passwordHash = createHash('sha-256')
      .update(pass)
      .digest('base64')

    if (user?.password !== passwordHash) {
      throw new UnauthorizedException()
    }

    const { password, ...result } = user
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
}
