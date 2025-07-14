import { IsNotEmpty, IsOptional, IsString, IsBoolean, IsUUID, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateNoticiaDto {
    @ApiProperty({
        description: 'Título de la noticia',
        maxLength: 50,
        example: 'Lanzamiento de nueva plataforma',
    })
    @IsNotEmpty({ message: 'El título es obligatorio.' })
    @IsString({ message: 'El título debe ser una cadena de texto.' })
    @MaxLength(50, { message: 'El título no puede tener más de 50 caracteres.' })
    titulo: string;

    @ApiProperty({
        description: 'Descripción breve de la noticia',
        maxLength: 255,
        example: 'La nueva plataforma ofrece mejoras en ...',
    })
    @IsNotEmpty({ message: 'La descripción es obligatoria.' })
    @IsString({ message: 'La descripción debe ser una cadena de texto.' })
    @MaxLength(255, { message: 'La descripción no puede tener más de 255 caracteres.' })
    descripcion: string;

    @ApiPropertyOptional({
        description: 'Indica si la noticia está vigente',
        example: true,
        default: true,
    })
    @IsOptional()
    @IsBoolean({ message: 'El campo vigente debe ser booleano.' })
    vigente?: boolean;

    @ApiPropertyOptional({ 
        description: 'Indica si la noticia está publicada - inicialmente esta en false',
        example: false,
        default: false,
    })
    @IsOptional()
    @IsBoolean({ message: 'El campo vigente debe ser booleano.' })
    publicado?: boolean;

    @IsOptional()
    @IsUUID('4', { message: 'El campo usuarioId debe ser un UUID válido.' })
    usuarioId?: string;

    @IsOptional()
    @IsUUID('4', { message: 'El campo createdBy debe ser un UUID válido.' })
    createdBy?: string;
}
