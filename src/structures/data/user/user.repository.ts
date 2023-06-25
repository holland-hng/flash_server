import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity, UserRole } from 'src/structures/data/user/user.entity';
import { UserPresenter } from 'src/structures/domain/user/user.presenter';
import { UserRepository } from 'src/structures/domain/user/user.repository';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Injectable()
export class DatabaseUserRepository implements UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userEntityRepository: Repository<UserEntity>,
  ) {}

  async createUser(user: UserPresenter, password: string): Promise<UserEntity> {
    const entity = this.toUserEntity(user, password);
    const result = await this.userEntityRepository.save(entity, {});
    return result;
  }

  async getUserById(userId: string): Promise<UserPresenter> {
    const entity = await this.userEntityRepository.findOne({
      where: {
        id: userId,
      },
    });
    if (!entity) {
      return null;
    }
    return this.toUser(entity);
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

  private toUser(entity: UserEntity): UserPresenter {
    const user: UserPresenter = new UserPresenter();

    user.id = entity.id;
    user.userName = entity.userName;
    user.phoneNumber = entity.phoneNumber;
    user.email = entity.email;
    user.role = entity.role;

    return user;
  }

  private toUserEntity(user: UserPresenter, password: string): UserEntity {
    const now = new Date();
    const id = uuid();
    const entity: UserEntity = {
      id: user.id ?? id,
      email: user.email,
      userName: null,
      password: password,
      phoneNumber: 'NONE' + id,
      createDate: now,
      updatedDate: now,
      lastLogin: now,
      refreshToken: null,
      role: UserRole.admin,
    };
    return entity;
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
