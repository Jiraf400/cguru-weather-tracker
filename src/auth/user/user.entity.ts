import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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

  @Column({ nullable: false })
  apiToken: string;
}
