import { TypeOrmConfigModule } from 'src/database/typeorm.module';
import { AuthModule } from '../structures/presentation/auth/auth.module';
import { Module } from '@nestjs/common';
import { CommonModule } from 'src/common/common.module';

@Module({
  imports: [CommonModule, AuthModule, TypeOrmConfigModule],
})
export class AppModule {}
