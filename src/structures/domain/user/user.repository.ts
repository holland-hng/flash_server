import { UserEntity } from 'src/structures/data/user/user.entity';
import { UserPresenter } from './user.presenter';

export interface UserRepository {
  createUser(user: UserPresenter, password: string): Promise<UserEntity>;
  getUserByEmail(email: string): Promise<UserEntity>;
  getUserById(userId: string): Promise<UserPresenter>;
  updateLastLogin(userId: string): Promise<void>;
  updateRefreshToken(userId: string, refreshToken: string): Promise<void>;
}

export const UserRepository = Symbol('UserRepository');
