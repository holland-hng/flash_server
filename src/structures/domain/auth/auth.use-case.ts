import { BcryptService } from 'src/common/bcrypt/bcrypt.service';
import { EnvironmentService } from 'src/common/environment/environment.service';
import { IJwtServicePayload } from 'src/common/jwt/jwt.interface';
import { JwtTokenService } from 'src/common/jwt/jwt.service';
import { UserRepository } from '../user/user.repository';
import { Inject } from '@nestjs/common';
import { UseCase } from 'src/common/use_case/use_case.interface';
import { Author } from './auth';
import { AuthDto } from 'src/structures/data/auth/auth.dto';

export class JWTToken {
  token: string;
  refreshToken: string;
}

export class AuthUseCase implements UseCase<AuthDto, Author> {
  constructor(
    private readonly envService: EnvironmentService,
    protected readonly jwtService: JwtTokenService,
    protected readonly bcryptService: BcryptService,
    @Inject(UserRepository)
    protected readonly userRepository: UserRepository,
  ) {}
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  execute(data: AuthDto): Promise<Author | null> {
    return null;
  }

  protected async genJWTToken(userId: string): Promise<JWTToken> {
    const payload: IJwtServicePayload = { userId: userId };
    const secret = this.envService.getJwtSecret();
    const expiresIn = this.envService.getJwtExpirationTime() + 's';
    const token = await this.jwtService.createToken(payload, secret, expiresIn);
    const refreshToken = await this.bcryptService.hash(token);
    const jwtToken: JWTToken = { token: token, refreshToken: refreshToken };
    return jwtToken;
  }
}
