import { UserEntity, UserRole } from 'src/structures/data/user/user.entity';

export class User {
  id: string;

  email: string;

  userName: string;

  phoneNumber: string;

  role: UserRole;

  static fromEntity(entity: UserEntity): User {
    const user: User = {
      id: entity.id,
      email: entity.email,
      userName: entity.userName,
      phoneNumber: entity.phoneNumber,
      role: entity.role,
    };
    return user;
  }
}
