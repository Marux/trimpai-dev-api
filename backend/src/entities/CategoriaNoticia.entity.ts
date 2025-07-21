import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Categoria } from './Categoria.entity';
import { Noticia } from './Noticia.entity';

@Entity()
export class CategoriaNoticia {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  orden: number;

  @Column({ default: '00000000-0000-0000-0000-000000000001' })
  createdBy: string;

  @CreateDateColumn()
  dateCreated: Date;

  @ManyToOne(() => Categoria, categoria => categoria.noticias)
  categoria: Categoria;

  @ManyToOne(() => Noticia, noticia => noticia.categorias)
  noticia: Noticia;
}