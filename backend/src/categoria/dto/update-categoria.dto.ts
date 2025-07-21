import { PartialType } from '@nestjs/swagger';
import { CreateCategoriaDto } from './create-categoria.dto';
import { IsOptional, IsUUID } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateCategoriaDto extends PartialType(CreateCategoriaDto) {
    @ApiPropertyOptional({
        description: 'ID del usuario que modifica el registro',
        example: '00000000-0000-0000-0000-000000000001',
    })
    @IsOptional()
    @IsUUID('4', { message: 'El campo modifiedBy debe ser un UUID válido.' })
    modifiedBy?: string;
}
