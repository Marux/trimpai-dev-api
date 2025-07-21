import { Module } from '@nestjs/common';
import { CategoriaNoticiaService } from './categoria-noticia.service';
import { CategoriaNoticiaController } from './categoria-noticia.controller';
import { AuthModule } from '../authService/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriaNoticia } from '../entities/CategoriaNoticia.entity';
import { Noticia } from '../entities/Noticia.entity';
import { Categoria } from '../entities/Categoria.entity';

@Module({
  imports: [AuthModule,
      TypeOrmModule.forFeature([
        CategoriaNoticia,
        Noticia,
        Categoria,
      ]),
    ],
  controllers: [CategoriaNoticiaController],
  providers: [CategoriaNoticiaService],
})
export class CategoriaNoticiaModule {}
