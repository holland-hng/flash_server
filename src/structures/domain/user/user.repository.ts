import { UserEntity } from 'src/structures/data/user/user.entity';
import { User } from './user';

export interface UserRepository {
  createUser(user: User, password: string): Promise<UserEntity>;
  getUserByEmail(email: string): Promise<UserEntity>;
  getUserById(userId: string): Promise<User>;
  updateLastLogin(userId: string): Promise<void>;
  updateRefreshToken(userId: string, refreshToken: string): Promise<void>;
}

export const UserRepository = Symbol('UserRepository');
