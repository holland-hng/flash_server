import { Controller, Post, Body } from '@nestjs/common';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { AuthLoginDto } from 'src/structures/data/auth/auth_dto';
import { LoginUseCase } from 'src/structures/domain/auth/login.use_case';
import { RegisterUseCase } from 'src/structures/domain/auth/register.use_case';

@Controller('auth')
@ApiResponse({ status: 500, description: 'Internal error' })
export class AuthController {
  constructor(
    private readonly loginUserCase: LoginUseCase,
    private readonly registerUseCase: RegisterUseCase,
  ) {}

  @Post('login')
  @ApiBody({ type: AuthLoginDto })
  async login(@Body() auth: AuthLoginDto) {
    const result = await this.loginUserCase.execute(auth);
    return result;
  }

  @Post('register')
  async register(@Body() auth: AuthLoginDto) {
    return await this.registerUseCase.execute(auth);
  }
}
