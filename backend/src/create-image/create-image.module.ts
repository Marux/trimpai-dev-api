import { Module } from '@nestjs/common';
import { CreateImageService } from './create-image.service';
import { CreateImageController } from './create-image.controller';
import { Imagen } from '../entities/Imagen.entity';
import { Noticia } from '../entities/Noticia.entity';
import { Video } from '../entities/Video.entity';
import { AuthModule } from '../authService/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([
      Imagen,
      Noticia,
      Video,
    ]),
  ],
  controllers: [CreateImageController],
  providers: [CreateImageService],
})
export class CreateImageModule {}
