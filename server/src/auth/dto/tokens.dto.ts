import { ApiProperty } from '@nestjs/swagger'

export class TokenPairDto {
  @ApiProperty()
  access: string

  @ApiProperty()
  refresh: string
}
