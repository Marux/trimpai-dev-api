import { Module } from '@nestjs/common';
import { EstadosService } from './estados.service';
import { EstadosController } from './estados.controller';
import { Estado } from '../entities/Estado.entity';
import { AuthModule } from '../authService/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [AuthModule,
      TypeOrmModule.forFeature([
        Estado
      ]),
    ],
  controllers: [EstadosController],
  providers: [EstadosService],
})
export class EstadosModule {}
