import { User } from '../user/user';

export class Author {
  readonly token: string;
  readonly refreshToken: string;
  readonly user: User;
}
