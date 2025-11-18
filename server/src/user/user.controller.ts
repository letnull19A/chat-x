import {
  HttpStatus,
  HttpException,
  Body,
  Post,
  Controller,
  Get,
  Delete,
  Param,
} from '@nestjs/common'
import { UserService } from './user.service'
import { RegistrationDto } from './dto/registration.dto'
import { User } from './user.entity'
import { Public } from './../auth/decorators/public.decorator'
import { ApiBody, ApiResponse } from '@nestjs/swagger'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  @Public()
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id)
  }

  @Get()
  @Public()
  async getAll() {
    const result = this.userService.findAll()

    if (!result)
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          message: 'user not found',
        },
        HttpStatus.NOT_FOUND,
      )

    return result
  }

  @Post('regist')
  @Public()
  @ApiBody({ type: RegistrationDto })
  @ApiResponse({
    status: 400,
  })
  async regist(@Body() body: RegistrationDto): Promise<User> {
    return await this.userService.create(body)
  }

  @Delete(':id')
  @Public()
  async deleteById(@Param('id') id: string): Promise<string> {
    this.userService.deleteById(id)

    return 'success!'
  }
}
