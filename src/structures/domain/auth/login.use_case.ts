import { AuthLoginDto } from 'src/structures/data/auth/auth_dto';
import { UserEntity } from 'src/structures/data/user/user.entity';
import {
  AccountDoseNotExist,
  WrongPasswordException,
} from '../user/user.exception';
import { AuthUseCase } from './auth.use_case';
import { AuthSectionDto } from 'src/structures/data/auth/auth_section_dto';
import { Injectable } from '@nestjs/common';

export const UserRepository = Symbol('UserRepository');

@Injectable()
export class LoginUseCase extends AuthUseCase {
  async execute(data: AuthLoginDto): Promise<AuthSectionDto> {
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

    const authSection: AuthSectionDto = {
      token: jwtToken.token,
      refreshToken: jwtToken.refreshToken,
      user: userEntity,
    };
    return authSection;
  }
}
