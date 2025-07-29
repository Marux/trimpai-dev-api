import { IsOptional, IsString, IsUUID, Length } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateRolDto {
  @ApiPropertyOptional({
    description: 'Nombre del rol',
    example: 'Supervisor',
    minLength: 1,
    maxLength: 30,
  })
  @IsOptional()
  @IsString({ message: 'El nombre debe ser una cadena de texto.' })
  @Length(1, 30, { message: 'El nombre debe tener entre 1 y 30 caracteres.' })
  name?: string;
  @IsUUID(undefined, { message: 'El identificador del usuario que modifica no es válido.' })
  @IsOptional()
  modifiedBy?: string;
}
