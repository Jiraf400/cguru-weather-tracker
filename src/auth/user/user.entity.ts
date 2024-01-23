import { Action } from '../../weather/actions/action.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: false })
  login: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false })
  fio: string;

  @Column({ unique: true, nullable: false })
  apiToken: string;

  @OneToMany(() => Action, (action) => action.user)
  actions: Action[];
}
