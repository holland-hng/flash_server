import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserRepository } from 'src/structures/domain/user/user.repository';
import { LoggerService } from '../logger/logger.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(UserRepository) private readonly userRepository: UserRepository,
    private readonly loggerService: LoggerService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any) {
    try {
      const user = await this.userRepository.getUserById(payload.userId);
      this.loggerService.log('LOG', user.id);
      return user;
    } catch {
      throw new UnauthorizedException();
    }
  }
}
