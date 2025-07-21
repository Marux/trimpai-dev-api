import { IsNotEmpty, IsOptional, IsString, MaxLength, IsBoolean, IsUUID } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCategoriaDto {
    @ApiProperty({
        description: 'Nombre de la categoría',
        maxLength: 50,
        example: 'Tecnología',
    })
    @IsNotEmpty({ message: 'El nombre es obligatorio.' })
    @IsString({ message: 'El nombre debe ser una cadena de texto.' })
    @MaxLength(50, { message: 'El nombre no puede tener más de 50 caracteres.' })
    nombre: string;

    @ApiPropertyOptional({
        description: 'Estado de la categoría (activa o inactiva)',
        example: true,
        default: true,
    })
    @IsOptional()
    @IsBoolean({ message: 'El campo status debe ser booleano.' })
    status?: boolean;

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
