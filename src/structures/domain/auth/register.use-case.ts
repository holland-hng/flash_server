import { AuthDto } from 'src/structures/data/auth/auth.dto';
import { AuthUseCase } from './auth.use-case';
import { User } from '../user/user';
import { QueryFailedError } from 'typeorm';
import { AccountAlreadyExistsException } from '../user/user.exception';
import { Injectable } from '@nestjs/common';
import { Author } from './auth';
import { UserRole } from 'src/structures/data/user/user.entity';

@Injectable()
export class RegisterUseCase extends AuthUseCase {
  async execute(data: AuthDto): Promise<Author> {
    const auth = data;
    const hashPassword = await this.bcryptService.hash(auth.password);
    const user = new User();
    user.email = auth.email;

    try {
      const newUser = await this.userRepository.createUser(
        user,
        hashPassword,
        UserRole.owner,
      );
      const jwtToken = await this.genJWTToken(newUser.id);
      await this.userRepository.updateRefreshToken(
        newUser.id,
        jwtToken.refreshToken,
      );
      const author: Author = {
        token: jwtToken.token,
        refreshToken: jwtToken.refreshToken,
        user: User.fromEntity(newUser),
      };
      return author;
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
