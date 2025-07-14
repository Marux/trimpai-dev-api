import { Module } from '@nestjs/common';
import { RevisionesService } from './revisiones.service';
import { RevisionesController } from './revisiones.controller';
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
  controllers: [RevisionesController],
  providers: [RevisionesService],
  
})
export class RevisionesModule {}