import { Controller, Post, Body, Inject } from '@nestjs/common';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { JwtTokenService } from 'src/common/jwt/jwt.service';
import { BcryptService } from 'src/common/bcrypt/bcrypt.service';
import { UserRepository } from 'src/structures/domain/user/user.repository';
import { AuthLoginDto } from 'src/structures/data/auth/auth_dto';
import { AuthSectionDto } from 'src/structures/data/auth/auth_section_dto';
import { User } from 'src/structures/domain/user/user';
import { QueryFailedError } from 'typeorm/error/QueryFailedError';
import {
  AccountDoseNotExist,
  AccountAlreadyExistsException,
  WrongPasswordException,
} from 'src/structures/domain/user/user.exception';
import { UserEntity } from 'src/structures/data/user/user.entity';
import { EnvironmentService } from 'src/common/environment/environment.service';
import { IJwtServicePayload } from 'src/common/jwt/jwt.interface';

@Controller('auth')
@ApiResponse({ status: 500, description: 'Internal error' })
export class AuthController {
  constructor(
    @Inject(UserRepository)
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtTokenService,
    private readonly bcryptService: BcryptService,
    private readonly envService: EnvironmentService,
  ) {}

  @Post('login')
  @ApiBody({ type: AuthLoginDto })
  async login(@Body() auth: AuthLoginDto) {
    let userEntity: UserEntity;
    try {
      userEntity = await this.userRepository.getUserByEmail(auth.email);
    } catch (error) {
      throw new AccountDoseNotExist();
    }

    const isValidPassword: boolean = await this.bcryptService.compare(
      auth.password,
      userEntity.password,
    );

    if (isValidPassword == false) {
      throw new WrongPasswordException();
    }

    const jwtToken = await this.genJWTToken(userEntity.id);
    const authSection: AuthSectionDto = {
      token: jwtToken.token,
      refreshToken: jwtToken.refreshToken,
      user: userEntity,
    };
    return authSection;
  }

  @Post('register')
  async register(@Body() auth: AuthLoginDto) {
    const hashPassword = await this.bcryptService.hash(auth.password);
    const user = new User();
    user.email = auth.email;

    try {
      const newUser = await this.userRepository.createUser(user, hashPassword);
      const jwtToken = await this.genJWTToken(newUser.id);
      await this.userRepository.updateRefreshToken(
        newUser.id,
        jwtToken.refreshToken,
      );
      const authSection: AuthSectionDto = {
        token: jwtToken.token,
        refreshToken: jwtToken.refreshToken,
        user: newUser,
      };
      return authSection;
    } catch (error) {
      switch (true) {
        case error instanceof QueryFailedError:
          throw new AccountAlreadyExistsException();
        default:
          throw error;
      }
    }
  }

  private async genJWTToken(userId: string): Promise<JWTToken> {
    const payload: IJwtServicePayload = { userId: userId };
    const secret = this.envService.getJwtSecret();
    const expiresIn = this.envService.getJwtExpirationTime() + 's';
    const token = await this.jwtService.createToken(payload, secret, expiresIn);
    const refreshToken = await this.bcryptService.hash(token);
    const jwtToken: JWTToken = { token: token, refreshToken: refreshToken };
    return jwtToken;
  }
}
class JWTToken {
  token: string;
  refreshToken: string;
}
