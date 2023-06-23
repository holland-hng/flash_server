import { UserRole } from 'src/structures/data/user/user.entity';

export class User {
  id: number;

  email: string;

  userName: string;

  phoneNumber: string;

  role: UserRole;
}
