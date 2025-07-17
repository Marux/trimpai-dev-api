import { IsNotEmpty, IsOptional, IsString, IsBoolean, IsUUID, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateEstadoDto {
    @ApiProperty({
        description: 'Nombre del estado',
        maxLength: 255,
        example: 'Publicado',
    })
    @IsNotEmpty({ message: 'El nombre es obligatorio.' })
    @IsString({ message: 'El nombre debe ser una cadena de texto.' })
    @MaxLength(255, { message: 'El nombre no puede tener más de 255 caracteres.' })
    nombre: string;

    @ApiPropertyOptional({
        description: 'Define si este estado publica la noticia',
        example: false,
        default: false,
    })
    @IsOptional()
    @IsBoolean({ message: 'El campo publica debe ser booleano.' })
    publica?: boolean;

    @ApiPropertyOptional({
        description: 'ID del usuario que crea el registro',
        example: '00000000-0000-0000-0000-000000000001',
    })
    @IsOptional()
    @IsUUID('4', { message: 'El campo createdBy debe ser un UUID válido.' })
    createdBy?: string;

    @ApiPropertyOptional({
        description: 'ID del usuario que modifica el registro',
        example: '00000000-0000-0000-0000-000000000001',
    })
    @IsOptional()
    @IsUUID('4', { message: 'El campo modifiedBy debe ser un UUID válido.' })
    modifiedBy?: string;
}
