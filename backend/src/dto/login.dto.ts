import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    example: 'admin@dominio.com',
    description: 'Email del usuario',
    required: true
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'Admin1234',
    description: 'Contraseña del usuario',
    required: true,
    minLength: 8
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}