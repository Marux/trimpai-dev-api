import { Module } from '@nestjs/common';
import { NoticiasService } from './noticias.service';
import { NoticiasController } from './noticias.controller';
import { Noticia } from '../entities/Noticia.entity';
import { Usuario } from '../entities/Usuario.entity';
import { Revision } from '../entities/Revision.entity';
import { Estado } from '../entities/Estado.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../authService/auth.module';


@Module({
  imports: [AuthModule,
    TypeOrmModule.forFeature([
      Noticia, 
      Usuario, 
      Revision, 
      Estado
    ]),
  ],
  controllers: [NoticiasController],
  providers: [NoticiasService],
  exports: [NoticiasService],
})


//await this.estadoRepository.save([
//   { nombre: 'pendiente de revisión' },
//   { nombre: 'aprobado' },
//   { nombre: 'rechazado' },
//   { nombre: 'solicitar cambios' },
// ]);

export class NoticiasModule { }
