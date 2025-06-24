import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Noticia } from './Noticia.entity';

@Entity()
export class Imagen {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50 })
  titulo: string;

  @Column({ length: 255 })
  descripcion: string;

  @Column('text')
  imagen: string;

  @Column({ name: 'portada', default: false })
  portada: boolean;

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

  @ManyToOne(() => Noticia, noticia => noticia.imagenes)
  noticia: Noticia;
}