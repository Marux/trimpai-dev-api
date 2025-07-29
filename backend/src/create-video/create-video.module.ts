import { Module } from '@nestjs/common';
import { CreateVideoService } from './create-video.service';
import { CreateVideoController } from './create-video.controller';
import { Video } from '../entities/Video.entity';
import { Noticia } from '../entities/Noticia.entity';
import { AuthModule } from '../authService/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([
      Video,
      Noticia,
    ]),
  ],
  controllers: [CreateVideoController],
  providers: [CreateVideoService],
})
export class CreateVideoModule {}
