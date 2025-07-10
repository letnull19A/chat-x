import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Request,
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { Public } from './decorators/public.decorator'
import { LoginDto } from './dto/login.dto'
import { TokenPairDto } from './../auth/dto/tokens.dto'
import { ApiParam } from '@nestjs/swagger'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @Public()
  async signIn(@Body() loginDto: LoginDto) {
    return await this.authService.signIn({
      login: loginDto.login,
      password: loginDto.password,
    })
  }

  @Get('sessions/:userId')
  @Public()
  @ApiParam({
    name: 'userId',
  })
  async getAllUserSessions(
    @Param('userId')
    userId: string,
  ) {
    return await this.authService.getSessionsByUserId(userId)
  }

  @Delete('sessions/:userId')
  @Public()
  @ApiParam({
    name: 'userId',
  })
  async closeAllUserSessions(
    @Param('userId')
    userId: string,
  ) {
    return await this.authService.closeAllSessions(userId)
  }

  @Delete('sessions/:userId/:sessionId')
  @Public()
  @ApiParam({
    name: 'userId',
  })
  @ApiParam({
    name: 'sessionId',
  })
  async closeUserSessions(
    @Param('userId')
    userId: string,
    @Param('sessionId')
    sessionId: string,
  ) {
    return await this.authService.closeSession(userId, sessionId)
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
