import { Inject } from '@nestjs/common';
import { UserRepository } from '../user/user.repository';
import { UseCase } from 'src/common/use_case/use_case.interface';
import { User } from '../user/user';
import { UserDto } from 'src/structures/data/user/user.dto';
import { UserRole } from 'src/structures/data/user/user.entity';

export class CreateOwnerUseCase implements UseCase<UserDto, User> {
  constructor(
    @Inject(UserRepository) private readonly userRepository: UserRepository,
  ) {}

  async execute(data: UserDto): Promise<User> {
    const inputUser = User.fromDto(data);

    const entity = await this.userRepository.createUser(
      inputUser,
      data.password,
      UserRole.owner,
    );

    const user = User.fromEntity(entity);
    return user;
  }
}
