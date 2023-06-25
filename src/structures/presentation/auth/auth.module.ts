import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { CommonModule } from 'src/common/common.module';
import { RegisterUseCase } from 'src/structures/domain/auth/register.use-case';
import { LoginUseCase } from 'src/structures/domain/auth/login.use-case';

@Module({
  imports: [CommonModule],
  controllers: [AuthController],
  providers: [RegisterUseCase, LoginUseCase],
})
export class AuthModule {}
