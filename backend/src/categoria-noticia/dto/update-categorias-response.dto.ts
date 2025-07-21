import { ApiProperty } from '@nestjs/swagger';
import { Categoria } from '../../entities/Categoria.entity';
import { Noticia } from '../../entities/Noticia.entity';

export class UpdateCategoriasResponseDto {
    @ApiProperty({ type: () => Noticia })
    noticia: Noticia;

    @ApiProperty({ type: () => [Categoria] })
    categorias: Categoria[];
}