import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Usuario } from './Usuario.entity';
import { Imagen } from './Imagen.entity';
import { CategoriaNoticia } from './CategoriaNoticia.entity';
import { Parrafo } from './Parrafo.entity';
import { Video } from './Video.entity';
import { Revision } from './Revision.entity';

@Entity()
export class Noticia {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50, unique: true })
  titulo: string;

  @Column({ length: 255 })
  descripcion: string;

  @Column({ default: true })
  vigente: boolean;

  @Column({ default: 0 })
  visitas: number;

  @Column({ default: false })
  publicado: boolean; // false = borrador, true = publicado

  @Column({ default: true })
  status: boolean; // Activo (true) o Inactivo (false)

  @Column({ default: false })
  isDeleted: boolean; // Soft delete

  @Column({ default: '00000000-0000-0000-0000-000000000001' })
  createdBy: string;

  @Column({ default: '00000000-0000-0000-0000-000000000001' })
  modifiedBy: string;

  @CreateDateColumn()
  dateCreated: Date;

  @UpdateDateColumn()
  dateModified: Date;

  @ManyToOne(() => Usuario, usuario => usuario.noticias)
  usuario: Usuario;

  @OneToMany(() => Imagen, imagen => imagen.noticia)
  imagenes: Imagen[];

  @OneToMany(() => CategoriaNoticia, categoriaNoticia => categoriaNoticia.noticia)
  categorias: CategoriaNoticia[];

  @OneToMany(() => Parrafo, parrafo => parrafo.noticia)
  parrafos: Parrafo[];

  @OneToMany(() => Video, video => video.noticia)
  videos: Video[];

  @OneToMany(() => Revision, revision => revision.noticia)
  revisiones: Revision[];
}