import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { CategoriaNoticia } from './CategoriaNoticia.entity';

@Entity()
export class Categoria {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 255, unique: true })
  nombre: string;

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

  @OneToMany(() => CategoriaNoticia, categoriaNoticia => categoriaNoticia.categoria)
  noticias: CategoriaNoticia[];
}