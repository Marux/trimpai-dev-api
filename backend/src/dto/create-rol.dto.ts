import { IsNotEmpty, IsOptional, IsString, IsUUID, Length } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateRolDto {
  @ApiProperty({
    description: 'Nombre del rol',
    example: 'Administrador',
    minLength: 1,
    maxLength: 30,
  })
  @IsString({ message: 'El nombre debe ser una cadena de texto.' })
  @IsNotEmpty({ message: 'El nombre no puede estar vacío.' })
  @Length(1, 30, { message: 'El nombre debe tener entre 1 y 30 caracteres.' })
  name: string;

  @IsUUID(undefined, { message: 'No hay usuario logueado en el sistema.' })
  @IsOptional()
  createdBy?: string;
}
