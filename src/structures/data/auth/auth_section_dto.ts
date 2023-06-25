import { UserPresenter } from 'src/structures/domain/user/user.presenter';

export class AuthSectionDto {
  readonly token: string;
  readonly refreshToken: string;
  readonly user: UserPresenter;
}
