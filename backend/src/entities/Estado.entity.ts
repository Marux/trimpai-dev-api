import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Revision } from './Revision.entity';

@Entity()
export class Estado {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 255 })
  nombre: string;

  @Column({ default: false })
  publica: boolean; // ← NUEVO: define si este estado publica la noticia

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

  @OneToMany(() => Revision, revision => revision.estado)
  revisiones: Revision[];
}