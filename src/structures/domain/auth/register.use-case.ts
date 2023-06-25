import { AuthLoginDto } from 'src/structures/data/auth/auth.dto';
import { AuthUseCase } from './auth.use-case';
import { User } from '../user/user';
import { QueryFailedError } from 'typeorm';
import { AccountAlreadyExistsException } from '../user/user.exception';
import { Injectable } from '@nestjs/common';
import { Author } from './auth';

@Injectable()
export class RegisterUseCase extends AuthUseCase {
  async execute(data: AuthLoginDto): Promise<Author> {
    const auth = data;
    const hashPassword = await this.bcryptService.hash(auth.password);
    const user = new User();
    user.email = auth.email;

    try {
      const newUser = await this.userRepository.createUser(user, hashPassword);
      const jwtToken = await this.genJWTToken(newUser.id);
      await this.userRepository.updateRefreshToken(
        newUser.id,
        jwtToken.refreshToken,
      );
      const authSection: Author = {
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
