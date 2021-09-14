import { PrimaryGeneratedColumn, Column, Entity, OneToMany } from 'typeorm';
import { Entries } from 'src/database/models/entries.model';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn({ name: 'id', type: 'bigint' })
  id!: string;

  @Column({ name: 'name', type: 'varchar' })
  name!: string;

  @Column({ name: 'email', type: 'varchar', unique: true })
  email!: string;

  @Column({ name: 'password', type: 'varchar', select: false })
  password!: string;

  @OneToMany(() => Entries, (entries) => entries.entry)
  entries: Entry[];
}