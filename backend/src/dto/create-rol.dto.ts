import { IsNotEmpty, IsOptional, IsString, IsUUID, Length } from 'class-validator';

export class CreateRolDto {
  @IsString({ message: 'El nombre debe ser una cadena de texto.' })
  @IsNotEmpty({ message: 'El nombre no puede estar vacío.' })
  @Length(1, 30, { message: 'El nombre debe tener entre 1 y 30 caracteres.' })
  nombre: string;

  @IsUUID(undefined, { message: 'No hay usuario logueado en el sistema.' })
  @IsOptional()
  createdBy?: string;
}
