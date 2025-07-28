import { Expose } from 'class-transformer';

export class NoticiaPreviewDto {
    @Expose()
    id: string;

    @Expose()
    titulo: string;

    @Expose()
    descripcion: string;
}
