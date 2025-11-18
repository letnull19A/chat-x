import { Injectable, Inject, HttpStatus, HttpException } from '@nestjs/common'
import { Repository } from 'typeorm'
import { User } from './user.entity'
import { RegistrationDto } from './dto/registration.dto'
import { createHash } from 'node:crypto'

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.find()
  }

  async findOne(id): Promise<User> {
    return await this.userRepository.findOneBy({
      id: id,
    })
  }

  async create(dto: RegistrationDto): Promise<User> {
    const user = new User()

    const { password, confirmPassword, login, nickname } = dto

    if (password !== confirmPassword)
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message: 'passwords not equals',
        },
        HttpStatus.BAD_REQUEST,
      )

    const passwordHash = createHash('sha-256').update(password).digest('base64')

    user.login = login
    user.password = passwordHash
    user.nickname = nickname

    await user.save()

    return user
  }

  async findByLogin(login: string): Promise<User> {
    return await this.userRepository.findOneBy({
      login: login,
    })
  }

  async deleteById(id: string): Promise<void> {
    const currentUser = await this.findOne(id)

    if (!currentUser) throw new Error('user not found')

    await currentUser.remove()
  }
}
