import { ApiProperty } from '@nestjs/swagger'

export class CreateUserDto {

 @ApiProperty()
 login: string

 @ApiProperty()
 password: string

 @ApiProperty()
 nickname?: string

 @ApiProperty()
 passwordConfirm?: string
}
