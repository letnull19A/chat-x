import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { Public } from './decorators/public.decorator'
import { LoginDto } from './dto/login.dto'
import { TokenPairDto } from './../auth/dto/tokens.dto'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() loginDto: LoginDto) {
    return this.authService.signIn({
      login: loginDto.login,
      password: loginDto.password,
    })
  }

  @Get('profile')
  async getProfile(@Request() req) {
    return req.user
  }

  @Post('refresh')
  async refresh(@Request() tokens: TokenPairDto) {
    return null
  }
}
