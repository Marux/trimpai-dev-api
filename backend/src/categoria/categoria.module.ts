import { Module } from '@nestjs/common';
import { CategoriaService } from './categoria.service';
import { CategoriaController } from './categoria.controller';
import { AuthModule } from '../authService/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categoria } from '../entities/Categoria.entity';


@Module({
  imports: [AuthModule,
    TypeOrmModule.forFeature([
      Categoria,
    ]),
  ],
  controllers: [CategoriaController],
  providers: [CategoriaService],
})
export class CategoriaModule { }
