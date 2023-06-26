import { v4 as uuid } from 'uuid';
import { UserEntity, UserRole } from 'src/structures/data/user/user.entity';
import { UserDto } from 'src/structures/data/user/user.dto';

export class User {
  id: string;

  email: string;

  firstName: string;

  lastName: string;

  address: string;

  phoneNumber: string;

  role: UserRole;

  static fromEntity(entity: UserEntity): User {
    const user = new User();
    user.id = entity.id;
    user.email = entity.email;
    user.lastName = entity.lastName;
    user.firstName = entity.firstName;
    user.address = entity.address;
    user.phoneNumber = entity.phoneNumber;
    user.role = entity.role;
    return user;
  }

  static fromDto(dto: UserDto): User {
    const user = new User();

    user.email = dto.email;
    user.lastName = dto.lastName;
    user.firstName = dto.firstName;
    user.address = dto.address;
    user.phoneNumber = dto.phoneNumber;

    return user;
  }

  toEntity(password: string, role: UserRole): UserEntity {
    const now = new Date();
    const id = uuid();
    const entity: UserEntity = {
      id: this.id ?? id,
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      address: this.address,
      password: password,
      phoneNumber: this.phoneNumber ?? 'NONE' + id,
      createDate: now,
      updatedDate: now,
      lastLogin: now,
      refreshToken: null,
      role: role ?? UserRole.customer,
    };
    return entity;
  }
}
