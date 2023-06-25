/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { EnvironmentModule } from './environment/environment.module';
import { JwtModule } from './jwt/jwt.module';
import { BcryptModule } from './bcrypt/bcrypt.module';
import { ExceptionModule } from './exception/exception.module';
import { LoggerModule } from './logger/logger.module';
import { JwtStrategy } from './guard/jwt.strategy';
import { UserRepository } from 'src/structures/domain/user/user.repository';
import { DatabaseUserRepository } from 'src/structures/data/user/user.repository';
import { UserEntity } from 'src/structures/data/user/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    EnvironmentModule,
    JwtModule,
    BcryptModule,
    ExceptionModule,
    LoggerModule,
    TypeOrmModule.forFeature([UserEntity]),
  ],
  providers: [
    {
      provide: UserRepository,
      useClass: DatabaseUserRepository,
    },

    JwtStrategy,
  ],
  exports: [
    EnvironmentModule,
    JwtModule,
    BcryptModule,
    ExceptionModule,
    LoggerModule,
    {
      provide: UserRepository,
      useClass: DatabaseUserRepository,
    },
    JwtStrategy,
  ],
})
export class CommonModule {}
