import { AuthLoginDto } from 'src/structures/data/auth/auth_dto';
import { AuthUseCase } from './auth.use_case';
import { UserPresenter } from '../user/user.presenter';
import { QueryFailedError } from 'typeorm';
import { AccountAlreadyExistsException } from '../user/user.exception';
import { AuthSectionDto } from 'src/structures/data/auth/auth_section_dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RegisterUseCase extends AuthUseCase {
  async execute(data: AuthLoginDto): Promise<AuthSectionDto> {
    const auth = data;
    const hashPassword = await this.bcryptService.hash(auth.password);
    const user = new UserPresenter();
    user.email = auth.email;

    try {
      const newUser = await this.userRepository.createUser(user, hashPassword);
      const jwtToken = await this.genJWTToken(newUser.id);
      await this.userRepository.updateRefreshToken(
        newUser.id,
        jwtToken.refreshToken,
      );
      const authSection: AuthSectionDto = {
        token: jwtToken.token,
        refreshToken: jwtToken.refreshToken,
        user: newUser,
      };
      return authSection;
    } catch (error) {
      switch (true) {
        case error instanceof QueryFailedError:
          throw new AccountAlreadyExistsException();
        default:
          throw error;
      }
    }
  }
}
