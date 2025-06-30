import { ApiProperty } from '@nestjs/swagger'

class TokenPairDto {
  @ApiProperty()
  accessToken: string

  @ApiProperty()
  refreshToken: string
}
