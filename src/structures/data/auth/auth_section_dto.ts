import { User } from 'src/structures/domain/user/user';

export class AuthSectionDto {
  readonly token: string;
  readonly refreshToken: string;
  readonly user: User;
}
