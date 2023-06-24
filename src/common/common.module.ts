/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { EnvironmentModule } from './environment/environment.module';
import { JwtModule } from './jwt/jwt.module';
import { BcryptModule } from './bcrypt/bcrypt.module';
import { ExceptionModule } from './exception/exception.module';
import { LoggerModule } from './logger/logger.module';

@Module({
  imports: [
    EnvironmentModule,
    JwtModule,
    BcryptModule,
    ExceptionModule,
    LoggerModule,
  ],
  exports: [
    EnvironmentModule,
    JwtModule,
    BcryptModule,
    ExceptionModule,
    LoggerModule,
  ],
})
export class CommonModule {}
