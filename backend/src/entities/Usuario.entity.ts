import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Rol } from './Rol.entity';
import { Login } from './Login.entity';
import { Noticia } from './Noticia.entity';
import { Revision } from './Revision.entity';

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 72 })
  run: string;

  @Column({ length: 50 })
  nombre: string;

  @Column({ length: 255 })
  email: string;

  @Column({ length: 255 })
  password: string;

  @Column({ default: true })
  status: boolean; // Activo (true) o Inactivo (false)

  @Column({ default: false })
  isDeleted: boolean; // Soft delete

  @Column({ type: 'varchar', length: 255, nullable: true })
  activationToken: string | null;

  @Column({ default: false })
  isActivated: boolean;

  @Column({ type: 'timestamp', nullable: true })
  activationTokenExpires: Date | null;

  @Column({ default: '00000000-0000-0000-0000-000000000001' })
  createdBy: string;

  @Column({ default: '00000000-0000-0000-0000-000000000001' })
  modifiedBy: string;

  @CreateDateColumn()
  dateCreated: Date;

  @UpdateDateColumn()
  dateModified: Date;

  @ManyToOne(() => Rol, rol => rol.usuarios)
  rol: Rol;

  @OneToMany(() => Login, login => login.usuario)
  logins: Login[];

  @OneToMany(() => Noticia, noticia => noticia.usuario)
  noticias: Noticia[];

  @OneToMany(() => Revision, revision => revision.usuario)
  revisiones: Revision[];
}