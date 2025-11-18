import { User } from './../user/user.entity'
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
  JoinColumn,
} from 'typeorm'

@Entity()
export class Session extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ name: 'access_token' })
  accessToken: string

  @Column({ name: 'refresh_token' })
  refreshToken: string

  @Column({ name: 'user_id' })
  userId: string

  @ManyToOne(() => User, (user) => user.sessions)
  @JoinColumn({ name: 'user_id' })
  user: User
}
