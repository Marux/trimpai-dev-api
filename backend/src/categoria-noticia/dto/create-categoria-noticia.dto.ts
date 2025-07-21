import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsUUID, IsInt, Min, IsArray, ArrayNotEmpty } from 'class-validator';

export class CreateCategoriaNoticiaDto {
    @ApiProperty({
        description: 'UUID de la noticia a la que se le asignan categorías',
        example: '550e8400-e29b-41d4-a716-446655440000',
    })
    @IsUUID('4', { message: 'El campo noticiaId debe ser un UUID válido.' })
    noticiaId: string;

    @ApiProperty({
        description: 'Arreglo de UUIDs de las categorías que se asignan a la noticia',
        example: [
            '550e8400-e29b-41d4-a716-446655440001',
            '550e8400-e29b-41d4-a716-446655440002',
        ],
        type: [String],
    })
    @IsArray({ message: 'El campo categoriaIds debe ser un arreglo.' })
    @ArrayNotEmpty({ message: 'El arreglo categoriaIds no puede estar vacío.' })
    @IsUUID('4', { each: true, message: 'Cada categoriaId debe ser un UUID válido.' })
    categoriaIds: string[];

    @IsOptional()
    @IsInt({ message: 'El campo orden debe ser un número entero.' })
    @Min(1, { message: 'El campo orden debe ser mayor o igual a 1.' })
    orden?: number;
}
