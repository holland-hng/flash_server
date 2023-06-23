import { UserRole } from 'src/structures/data/user/user.entity';

export class User {
  id: string;

  email: string;

  userName: string;

  phoneNumber: string;

  role: UserRole;
}
