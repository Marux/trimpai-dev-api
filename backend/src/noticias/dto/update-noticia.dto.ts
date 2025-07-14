import { PartialType } from '@nestjs/swagger';
import { CreateNoticiaDto } from './create-noticia.dto';
import { IsBoolean, IsOptional, IsUUID } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateNoticiaDto extends PartialType(CreateNoticiaDto) {
    @ApiPropertyOptional({
        description: 'Estado activo/inactivo',
        example: true,
        default: true,
    })
    @IsOptional()
    @IsBoolean({ message: 'El campo status debe ser booleano.' })
    status?: boolean;

    @ApiPropertyOptional({
        description: 'Soft delete - indica si está eliminado lógicamente',
        example: false,
    })
    @IsOptional()
    @IsBoolean({ message: 'El campo isDeleted debe ser booleano.' })
    isDeleted?: boolean;

    @ApiPropertyOptional({
        description: 'ID del usuario que modificó la noticia (UUID)',
        example: '00000000-0000-0000-0000-000000000001',
    })
    @IsOptional()
    @IsUUID('4', { message: 'El campo modifiedBy debe ser un UUID válido.' })
    modifiedBy?: string;

    @ApiPropertyOptional({ 
        description: 'Indica si la noticia está publicada - inicialmente esta en false',
        example: true,
        default: true,
    })
    @IsOptional()
    @IsBoolean({ message: 'El campo vigente debe ser booleano.' })
    publicado?: boolean;
}