export class PublicNoticiaDto {
    id: string;
    titulo: string;
    descripcion: string;
    visitas: number;
    usuario: {
        nombre: string;
    };
    imagenes: any[];
    categorias: any[];
    parrafos: any[];
    videos: any[];
}
