import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum UserRole {
  admin = 'admin',
  owner = 'owner',
  staff = 'staff',
  customer = 'customer',
}

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn({ type: 'integer' })
  id: number;

  @Column('varchar', { nullable: true })
  email: string;

  @Column('varchar', { name: 'user_name' })
  userName: string;

  @Column('varchar', { nullable: true })
  password: string;

  @Column('varchar', { name: 'phone_number' })
  phoneNumber: string;

  @CreateDateColumn({ name: 'create_date' })
  createDate: Date;

  @UpdateDateColumn({ name: 'updated_date' })
  updatedDate: Date;

  @Column({ nullable: true, name: 'last_login' })
  lastLogin?: Date;

  @Column({ type: 'enum', enum: UserRole })
  role: UserRole;
}
