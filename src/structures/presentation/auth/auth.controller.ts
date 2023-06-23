import { Controller, Post, Body } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation } from '@nestjs/swagger';
import { AuthLoginDto } from '../../data/auth/auth_dto';
import { JwtTokenService } from 'src/common/jwt/jwt.service';
import { BcryptService } from 'src/common/bcrypt/bcrypt.service';
import { UserRepository } from 'src/structures/domain/user/user.repository';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtTokenService,
    private readonly bcryptService: BcryptService,
  ) {}
  @Post('login')
  @ApiBearerAuth()
  @ApiBody({ type: AuthLoginDto })
  @ApiOperation({ description: 'login' })
  async login(@Body() auth: AuthLoginDto) {
    auth.username;
    // const accessTokenCookie = await this.loginUsecaseProxy
    //   .getInstance()
    //   .getCookieWithJwtToken(auth.username);
    // const refreshTokenCookie = await this.loginUsecaseProxy
    //   .getInstance()
    //   .getCookieWithJwtRefreshToken(auth.username);
    // request.res.setHeader('Set-Cookie', [
    //   accessTokenCookie,
    //   refreshTokenCookie,
    // ]);
    const currentHashedRefreshToken = await this.bcryptService.hash(
      '1skldnklasd',
    );
    return currentHashedRefreshToken;
  }
}
