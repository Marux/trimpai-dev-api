import { IsNotEmpty, IsOptional, IsString, MaxLength, IsBoolean, IsUUID } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCreateImageDto {
    @ApiProperty({
        description: 'Título de la imagen',
        maxLength: 100,
        example: 'Imagen de ejemplo',
    })
    @IsNotEmpty({ message: 'El título es obligatorio.' })
    @IsString({ message: 'El título debe ser una cadena de texto.' })
    @MaxLength(50, { message: 'El título no puede tener más de 50 caracteres.' })
    titulo: string;

    @ApiProperty({
        description: 'Descripción de la imagen',
        maxLength: 255,
        example: 'Esta es una imagen de ejemplo para ilustrar el uso del DTO.',
    })
    @IsNotEmpty({ message: 'La descripción es obligatoria.' })
    @IsString({ message: 'La descripción debe ser una cadena de texto.' })
    descripcion: string;

    @ApiProperty({
        description: 'URL de la imagen',
        example: 'https://example.com/imagen.jpg',
    })
    @IsNotEmpty({ message: 'La URL de la imagen es obligatoria.' })
    @IsString({ message: 'La URL de la imagen debe ser una cadena de texto.' })
    imagen: string;

    @ApiPropertyOptional({
        description: 'Indica si la imagen es portada',
        example: true,
        default: false,
    })
    @IsOptional()
    @IsBoolean({ message: 'El campo portada debe ser un valor booleano.' })
    portada?: boolean;
}