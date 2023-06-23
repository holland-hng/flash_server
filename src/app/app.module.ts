import { AuthModule } from '../structures/presentation/auth/auth.module';
import { Module } from '@nestjs/common';
import { TypeOrmConfigModule } from '../database/typeorm.module';

@Module({
  imports: [AuthModule, TypeOrmConfigModule],
})
export class AppModule {}
