import { z } from 'zod'
import { createZodDto } from '@anatine/zod-nestjs'
import { extendApi } from '@anatine/zod-openapi'

export const RegistrationSchema = extendApi(
  z
    .object({
      login: z
        .string()
        .nonempty({ message: 'login field is empty' })
        .min(5, { message: 'login field should be longest 5 characters' })
        .describe('Логин пользователя'),
      password: z
        .string()
        .nonempty({ message: 'password field is empty' })
        .min(8, { message: 'password should not be smallest 8 chars' })
        .describe('Пароль (минимум 8 символов)'),
      confirmPassword: z
        .string()
        .nonempty({ message: 'confirm password field is empty' })
        .min(8)
        .describe('Пароль (минимум 8 символов)'),
      nickname: z
        .string()
        .nonempty({ message: 'nickname field is empty' })
        .min(5, { message: 'nickname is shoud be longest than 5 chars' })
        .describe('nickname пользователя'),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: 'password and confirmPassword are not equals',
      path: ['confirmPassword'],
    }),
  {
    title: 'RegistrationDTO',
    description: 'Данные для регистрации',
  },
)

export class RegistrationDto extends createZodDto(RegistrationSchema) {}
