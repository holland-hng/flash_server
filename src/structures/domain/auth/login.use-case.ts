import { AuthDto } from 'src/structures/data/auth/auth.dto';
import { UserEntity } from 'src/structures/data/user/user.entity';
import {
  AccountDoseNotExist,
  WrongPasswordException,
} from '../user/user.exception';
import { AuthUseCase } from './auth.use-case';

import { Injectable } from '@nestjs/common';
import { Author } from './auth';
import { User } from '../user/user';
export const UserRepository = Symbol('UserRepository');

@Injectable()
export class LoginUseCase extends AuthUseCase {
  async execute(data: AuthDto): Promise<Author> {
    const auth = data;
    let userEntity: UserEntity;
    try {
      userEntity = await this.userRepository.getUserByEmail(auth.email);
    } catch (error) {
      throw new AccountDoseNotExist();
    }

    const isValidPassword: boolean = await this.bcryptService.compare(
      auth.password,
      userEntity.password,
    );

    if (isValidPassword == false) {
      throw new WrongPasswordException();
    }

    const jwtToken = await this.genJWTToken(userEntity.id);

    await this.userRepository.updateRefreshToken(
      userEntity.id,
      jwtToken.refreshToken,
    );

    const author: Author = {
      token: jwtToken.token,
      refreshToken: jwtToken.refreshToken,
      user: User.fromEntity(userEntity),
    };
    return author;
  }
}
