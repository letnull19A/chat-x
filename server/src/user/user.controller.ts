import { HttpStatus, HttpException, Body, Post, Controller, Get, Put, Delete, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto'
import { User } from './user.entity'
import { createHash, randomInt } from 'node:crypto'
import { Public } from './../auth/decorators/public.decorator'

@Controller('user')
export class UserController {
 constructor(private readonly userService: UserService) {}

  @Get(':id')
  @Public()
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Get()
  @Public()
  async getAll() {
    const result = this.userService.findAll()

    if (!result) 
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        message: 'user not found'
      }, HttpStatus.NOT_FOUND)

   return result
  
  }

  @Post()
  @Public()
  async create(@Body() body: CreateUserDto): 
   Promise<User> {
   const user = new User()

   const {password, passwordConfirm, login, nickname} = body

   if (password !== passwordConfirm) throw new HttpException({
    status: HttpStatus.BAD_REQUEST,
    message: 'passwords not equals'
   }, HttpStatus.BAD_REQUEST)

   const passwordHash = createHash('sha-256')
    .update(password)
    .digest('base64')

   user.login = login
   user.password = passwordHash
   user.nickname = nickname

   await user.save()

   return user
  }

  @Delete(':id')
  @Public()
  async deleteById(@Param('id') id: string): Promise<string> {
   this.userService.deleteById(id)

   return 'success!'
  }
}
