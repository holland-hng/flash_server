import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity, UserRole } from 'src/structures/data/user/user.entity';
import { User } from 'src/structures/domain/user/user';
import { UserRepository } from 'src/structures/domain/user/user.repository';
import { Repository } from 'typeorm';

@Injectable()
export class DatabaseUserRepository implements UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userEntityRepository: Repository<UserEntity>,
  ) {}

  async createUser(
    user: User,
    password: string,
    role: UserRole,
  ): Promise<UserEntity> {
    const entity = user.toEntity(password, role);
    const result = await this.userEntityRepository.save(entity, {});
    return result;
  }

  async getUserById(userId: string): Promise<User> {
    const entity = await this.userEntityRepository.findOne({
      where: {
        id: userId,
      },
    });
    if (!entity) {
      return null;
    }
    return User.fromEntity(entity);
  }

  async getUserByEmail(email: string): Promise<UserEntity> {
    const entity = await this.userEntityRepository.findOne({
      where: {
        email: email,
      },
    });
    if (!entity) {
      return null;
    }
    return entity;
  }

  async updateLastLogin(userId: string): Promise<void> {
    await this.userEntityRepository.update(
      {
        id: userId,
      },
      { lastLogin: () => 'CURRENT_TIMESTAMP' },
    );
  }

  async updateRefreshToken(
    userId: string,
    refreshToken: string,
  ): Promise<void> {
    await this.userEntityRepository.update(
      {
        id: userId,
      },
      { refreshToken: refreshToken },
    );
  }
}
