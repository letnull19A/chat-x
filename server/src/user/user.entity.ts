import { Session } from 'src/auth/session.entity'
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToMany,
} from 'typeorm'

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  login: string

  @Column({ default: '' })
  password: string

  @Column({ default: '' })
  nickname: string

  @OneToMany(() => Session, (session) => session.user)
  sessions: Array<Session>
}
