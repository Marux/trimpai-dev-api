import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsArray, ArrayNotEmpty } from 'class-validator';

export class UpdateCategoriaNoticiaDto {
    @ApiProperty({
        description: 'UUID de la noticia que se va a actualizar',
        example: '550e8400-e29b-41d4-a716-446655440000',
    })
    @IsUUID('4')
    noticiaId: string;

    @ApiProperty({
        description: 'Nuevas categorías que se asignarán a la noticia (reemplaza todas las actuales)',
        example: [
            '550e8400-e29b-41d4-a716-446655440001',
            '550e8400-e29b-41d4-a716-446655440002',
        ],
    })
    @IsArray()
    @ArrayNotEmpty({ message: 'El arreglo categoriaIds no puede estar vacío.' })
    @IsUUID('4', { each: true, message: 'Cada categoriaId debe ser un UUID válido.' })
    categoriaIds: string[];
}