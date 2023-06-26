import { Controller, Post, Body } from '@nestjs/common';
import { AuthDto } from 'src/structures/data/auth/auth.dto';
import { LoginUseCase } from 'src/structures/domain/auth/login.use-case';
import { RegisterUseCase } from 'src/structures/domain/auth/register.use-case';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly loginUseCase: LoginUseCase,
    private readonly registerUseCase: RegisterUseCase,
  ) {}

  @Post('login')
  async login(@Body() auth: AuthDto) {
    const result = await this.loginUseCase.execute(auth);
    return result;
  }

  @Post('register')
  async register(@Body() auth: AuthDto) {
    return await this.registerUseCase.execute(auth);
  }
}
