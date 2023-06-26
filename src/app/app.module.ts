import { AuthModule } from '../structures/presentation/auth/auth.module';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmConfigModule } from '../database/typeorm.module';
import { AppLoggerMiddleware } from 'src/middleware/app.logger';

@Module({
  imports: [AuthModule, TypeOrmConfigModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AppLoggerMiddleware).forRoutes('*');
  }
}
