export interface IJwtServicePayload {
  username: string;
}

export interface IJwtService {
  checkToken(token: string): Promise<any>;
  createToken(
    payload: IJwtServicePayload,
    secret: string,
    expiresIn: string,
  ): string;
}

export interface JWTConfig {
  getJwtSecret(): string;
  getJwtExpirationTime(): string;
  getJwtRefreshSecret(): string;
  getJwtRefreshExpirationTime(): string;
}
