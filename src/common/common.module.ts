/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { EnvironmentModule } from './environment/environment.module';
import { JwtModule } from './jwt/jwt.module';
import { BcryptModule } from './bcrypt/bcrypt.module';
import { ExceptionModule } from './exception/exception.module';

@Module({
  imports: [EnvironmentModule, JwtModule, BcryptModule, ExceptionModule],
  exports: [EnvironmentModule, JwtModule, BcryptModule, ExceptionModule],
})
export class CommonModule {}
