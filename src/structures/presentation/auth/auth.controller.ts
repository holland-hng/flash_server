import { Controller, Post, Body } from '@nestjs/common';
import { AuthLoginDto } from 'src/structures/data/auth/auth.dto';
import { LoginUseCase } from 'src/structures/domain/auth/login.use-case';
import { RegisterUseCase } from 'src/structures/domain/auth/register.use-case';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly loginUserCase: LoginUseCase,
    private readonly registerUseCase: RegisterUseCase,
  ) {}

  @Post('login')
  async login(@Body() auth: AuthLoginDto) {
    const result = await this.loginUserCase.execute(auth);
    return result;
  }

  @Post('register')
  async register(@Body() auth: AuthLoginDto) {
    return await this.registerUseCase.execute(auth);
  }
}
