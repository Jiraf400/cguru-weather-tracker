import { User } from '../../auth/user/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Decimal128, ManyToOne, JoinColumn } from 'typeorm';

@Entity({ name: 'actions' })
export class Action {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'float', nullable: true })
  temp_c: string | null;

  @CreateDateColumn()
  actionTime: Date;

  @Column({ nullable: false })
  request_result: number;

  @ManyToOne(() => User, (user) => user.actions, {
    cascade: true,
  })
  @JoinColumn({ referencedColumnName: 'id' })
  user: User;
}
