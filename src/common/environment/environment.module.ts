import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { EnvironmentService } from './environment.service';
import { validate } from './environment.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: 'env/local.env',
      isGlobal: true,

      validate,
    }),
  ],
  providers: [EnvironmentService],
  exports: [EnvironmentService],
})
export class EnvironmentModule {}
