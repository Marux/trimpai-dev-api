import { Module } from '@nestjs/common';
import { CreateParagraphsService } from './create-paragraphs.service';
import { CreateParagraphsController } from './create-paragraphs.controller';
import { Parrafo } from '../entities/Parrafo.entity';
import { AuthModule } from '../authService/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Noticia } from '../entities/Noticia.entity';


@Module({
  imports: [AuthModule,
      TypeOrmModule.forFeature([
        Parrafo,
        Noticia,
      ]),
    ],
  controllers: [CreateParagraphsController],
  providers: [CreateParagraphsService],
})
export class CreateParagraphsModule {}
