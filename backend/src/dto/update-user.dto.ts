import { IsEmail, IsOptional, IsString, IsUUID, Length, Matches } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUsuarioDto {
  @ApiPropertyOptional({
    example: '12345678-9',
    description: 'RUN chileno (8 dígitos + guión + dígito verificador)',
    minLength: 9,
    maxLength: 10,
    pattern: '^\\d{7,8}-[0-9Kk]$'
  })
  @IsOptional()
  @IsString({ message: '⚠️ El RUN debe ser una cadena de texto.' })
  @Length(9, 10, { message: '⚠️ El RUN debe tener entre 9 y 10 caracteres (ej: 12345678-9).' })
  @Matches(/^\d{7,8}-[0-9Kk]$/, {
    message: '⚠️ El RUN debe tener el formato correcto (ej: 12345678-9).',
  })
  run?: string;

  @ApiPropertyOptional({
    example: 'Víctor',
    description: 'Nombre real del usuario',
    minLength: 1,
    maxLength: 50
  })
  @IsOptional()
  @IsString({ message: '⚠️ El nombre debe ser una cadena de texto.' })
  @Length(1, 50, { message: '⚠️ El nombre debe tener entre 1 y 50 caracteres.' })
  nombre?: string;

  @ApiPropertyOptional({
    example: 'victor@trimpai.dev',
    description: 'Correo electrónico válido',
    format: 'email',
    maxLength: 255
  })
  @IsOptional()
  @IsEmail({}, { message: '⚠️ Debes ingresar un correo electrónico válido.' })
  @Length(5, 255, { message: '⚠️ El correo debe tener entre 5 y 255 caracteres.' })
  email?: string;

  @ApiPropertyOptional({
    example: 'SecurePass123!',
    description: 'Contraseña (mínimo 6 caracteres)',
    minLength: 6,
    writeOnly: true, // Oculta el campo en las respuestas
    pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*]).{6,}$'
  })
  @IsOptional()
  @IsString({ message: '⚠️ La contraseña debe ser una cadena de texto.' })
  @Length(6, 255, { message: '⚠️ La contraseña debe tener al menos 6 caracteres.' })
  password?: string;
  
  @IsUUID(undefined, { message: 'El identificador del usuario que modifica no es válido.' })
  @IsOptional()
  modifiedBy?: string;
}
