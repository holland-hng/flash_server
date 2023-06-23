import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { DatabaseUserRepository } from 'src/structures/data/user/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/structures/data/user/user.entity';
import { UserRepository } from 'src/structures/domain/user/user.repository';
import { CommonModule } from 'src/common/common.module';

@Module({
  imports: [CommonModule, TypeOrmModule.forFeature([UserEntity])],
  controllers: [AuthController],
  providers: [
    {
      provide: UserRepository,
      useClass: DatabaseUserRepository,
    },
  ],
})
export class AuthModule {}
