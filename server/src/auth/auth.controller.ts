import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Request,
} from '@nestjs/common'
import { AuthResponse, AuthService } from './auth.service'
import { Public } from './decorators/public.decorator'
import { LoginDto } from './dto/login.dto'
import { ApiBody, ApiParam, ApiResponse } from '@nestjs/swagger'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @Public()
  @ApiBody({ type: LoginDto })
  @ApiResponse({
    status: 400,
  })
  @HttpCode(200)
  async signIn(@Body() loginDto: LoginDto): Promise<AuthResponse> {
    return await this.authService.signIn(loginDto)
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
}
