import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/structures/data/user/user.entity';
import { User } from 'src/structures/domain/user/user';
import { UserRepository } from 'src/structures/domain/user/user.repository';
import { Repository } from 'typeorm';

@Injectable()
export class DatabaseUserRepository implements UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userEntityRepository: Repository<UserEntity>,
  ) {}

  async getUserById(userId: number): Promise<User> {
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

  async updateLastLogin(userId: number): Promise<void> {
    await this.userEntityRepository.update(
      {
        id: userId,
      },
      { lastLogin: () => 'CURRENT_TIMESTAMP' },
    );
  }

  private toUser(entity: UserEntity): User {
    const user: User = new User();

    user.id = entity.id;
    user.userName = entity.userName;
    user.phoneNumber = entity.phoneNumber;
    user.email = entity.email;
    user.role = entity.role;

    return user;
  }
}
