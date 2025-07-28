import { Expose, Type } from 'class-transformer';
import { NoticiaPreviewDto } from './noticia-preview.dto';

export class ParrafoResponseDto {
    @Expose()
    id: string;

    @Expose()
    orden: number;

    @Expose()
    texto: string;

    @Expose()
    status: boolean;

    @Expose()
    isDeleted: boolean;

    @Expose()
    createdBy: string;

    @Expose()
    modifiedBy: string;

    @Expose()
    dateCreated: Date;

    @Expose()
    dateModified: Date;

    @Expose()
    @Type(() => NoticiaPreviewDto)
    noticia: NoticiaPreviewDto;
}
