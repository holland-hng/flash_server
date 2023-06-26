import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AuthDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly email: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly password: string;
}
