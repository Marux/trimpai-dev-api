import { Expose, Type } from 'class-transformer';
import { NoticiaPreviewDto } from '../../create-paragraphs/dto/noticia-preview.dto';

export class ImageResponseDto {
    @Expose()
    id: string;

    @Expose()
    titulo: string;

    @Expose()
    descripcion: string;

    @Expose()
    imagen: string;

    @Expose()
    portada: boolean;

    @Expose()
    status: boolean;

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
