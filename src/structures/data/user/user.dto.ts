import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UserDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly email: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly password: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly address: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly firstName: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly lastName: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly phoneNumber: string;
}
