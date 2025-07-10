import { extendApi } from '@anatine/zod-openapi'
import { createZodDto } from 'nestjs-zod'
import z from 'zod'

export const LoginSchema = extendApi(
  z.object({
    login: z.string().nonempty({ message: 'login field is empty' }),
    password: z.string().nonempty({ message: 'password field is empty' }),
  }),
)

export class LoginDto extends createZodDto(LoginSchema) {}
