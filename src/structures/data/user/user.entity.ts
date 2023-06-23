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
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { nullable: true, unique: true })
  email: string;

  @Column('varchar', { nullable: true })
  userName: string;

  @Column('varchar', { nullable: true })
  password: string;

  @Column('varchar', { nullable: true })
  phoneNumber: string;

  @CreateDateColumn()
  createDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @Column({ nullable: true })
  lastLogin?: Date;

  @Column({ type: 'enum', enum: UserRole })
  role: UserRole;
}
