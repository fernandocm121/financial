import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from 'src/database/models/category.model';
import { User } from 'src/database/models/user.model';

@Entity('entries')
export class Entries {
  @PrimaryGeneratedColumn({ name: 'id', type: 'bigint' })
  id!: string;

  @CreateDateColumn({ name: 'created_at', precision: 3 })
  createdAt!: Date;

  @Column({ name: 'description', type: 'varchar' })
  description!: string;

  @Column({
    name: 'value',
    type: 'decimal',
    default: '0.00',
    precision: 11,
    scale: 2,
  })
  totalPrice!: string;
  
  @OneToOne(type => Category)
  @JoinColumn()
  category_id: Category;

  @OneToOne(type => User)
  @JoinColumn()
  user_id: User;

  // @Column({ name: 'user_id', type: 'bigint' })
  // userId!: string;

  // @ManyToOne(() => User, (user) => user.products)
  // @JoinColumn({ name: 'user_id' })
  // user: User;
}