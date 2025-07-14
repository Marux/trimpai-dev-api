import { IsString, IsUUID, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRevisionDto {
  @ApiProperty({
    description: 'ID de la noticia a revisar',
    example: 'cb6b2a5e-3209-403f-80f0-48c3ffcae789',
  })
  @IsUUID('4', { message: 'El ID de la noticia debe ser un UUID versión 4 válido.' })
  noticiaId: string;

  @ApiProperty({
    description: 'ID del estado asignado en la revisión (ej: aprobado, rechazado)',
    example: '10e52fa4-821b-4f69-ae7e-f3dbe2b92dd6',
  })
  @IsUUID('4', { message: 'El ID del estado debe ser un UUID versión 4 válido.' })
  estadoId: string;

  @ApiProperty({
    description: 'Descripción o comentario de la revisión',
    example: 'La noticia cumple todos los requisitos para su publicación.',
  })
  @IsString({ message: 'La descripción debe ser una cadena de texto.' })
  @Length(5, 255, {
    message: 'La descripción debe tener entre 5 y 255 caracteres.',
  })
  descripcion: string;
}
