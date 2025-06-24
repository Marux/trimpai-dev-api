import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Usuario } from './Usuario.entity';
import { Noticia } from './Noticia.entity';
import { Estado } from './Estado.entity';

@Entity()
export class Revision {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50 })
  asunto: string;

  @Column({ length: 255 })
  descripcion: string;

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

  @ManyToOne(() => Usuario, usuario => usuario.revisiones)
  usuario: Usuario;

  @ManyToOne(() => Noticia, noticia => noticia.revisiones)
  noticia: Noticia;

  @ManyToOne(() => Estado, estado => estado.revisiones)
  estado: Estado;
}