import { User } from './user';

export interface UserRepository {
  getUserById(userId: number): Promise<User>;
  updateLastLogin(userId: number): Promise<void>;
}

export const UserRepository = Symbol('UserRepository');
