export class PublicNoticiaDto {
    id: string;
    titulo: string;
    descripcion: string;
    visitas: number;
    fechaCreacion: Date;
    usuario: {
        nombre: string;
    };
    imagenes: any[];
    categorias: any[];
    parrafos: any[];
    videos: any[];
}
