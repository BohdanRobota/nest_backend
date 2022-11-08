import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length, IsEmail } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'email@gmail.com', description: 'User Email' })
  @IsString({ message: "Must be a string" })
  @IsEmail({}, { message: "Not valid email" })
  readonly email: string;

  @ApiProperty({ example: 'root123', description: 'User Password' })
  @IsString({ message: "Must be a string" })
  @Length(4, 16, { message: "Must be at least 4 and no more than 16 characters" })
  readonly password: string;
}