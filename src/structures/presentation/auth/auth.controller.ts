import { Controller, Post, Body, Inject } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { JwtTokenService } from 'src/common/jwt/jwt.service';
import { BcryptService } from 'src/common/bcrypt/bcrypt.service';
import { UserRepository } from 'src/structures/domain/user/user.repository';
import { AuthLoginDto } from 'src/structures/data/auth/auth_dto';
import { AuthSectionDto } from 'src/structures/data/auth/auth_section_dto';
import { User } from 'src/structures/domain/user/user';

@Controller('auth')
@ApiTags('auth')
@ApiResponse({
  status: 401,
  description: 'No authorization token was found',
})
@ApiResponse({ status: 500, description: 'Internal error' })
export class AuthController {
  constructor(
    @Inject(UserRepository)
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtTokenService,
    private readonly bcryptService: BcryptService,
  ) {}
  @Post('login')
  @ApiBearerAuth()
  @ApiBody({ type: AuthLoginDto })
  @ApiOperation({ description: 'login' })
  async login(@Body() auth: AuthLoginDto) {
    auth.email;
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
    const response: AuthSectionDto = {
      token: 'token',
      refreshToken: 'refreshToken',
      user: new User(),
    };
    return response;
  }

  @Post('register')
  @ApiBearerAuth()
  @ApiBody({ type: AuthLoginDto })
  @ApiOperation({ description: 'register' })
  async register(@Body() auth: AuthLoginDto) {
    const hashPassword = await this.bcryptService.hash(auth.password);
    const user = new User();
    user.email = auth.email;
    const result = this.userRepository.createUser(user, hashPassword);

    return result;
  }
}
