import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCreateVideoDto } from './dto/create-create-video.dto';
import { UpdateCreateVideoDto } from './dto/update-create-video.dto';
import { VideoResponseDto } from './dto/video-response.dto';
import { Video } from '../entities/Video.entity';
import { Imagen } from '../entities/Imagen.entity';
import { Noticia } from '../entities/Noticia.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Utils from '../utils/error.utils';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class CreateVideoService {
  constructor(
    @InjectRepository(Video)
    private readonly videoRepository: Repository<Video>,
    @InjectRepository(Noticia)
    private readonly noticiaRepository: Repository<Noticia>,
    @InjectRepository(Imagen)
    private readonly imagenRepository: Repository<Imagen>,
  ) { }

  async create(id: string, createCreateVideoDto: CreateCreateVideoDto, usuarioId: string): Promise<{ message: string }> {
    try {
      const noticia = await this.noticiaRepository.findOneBy({ id, isDeleted: false });
      if (!noticia) {
        throw new NotFoundException('❌ La noticia no existe.');
      }

      // Si el nuevo video será portada, desactivar portada en otras imágenes y videos
      if (createCreateVideoDto.portada === true) {
        // Quitar portada a otras imágenes
        await this.imagenRepository
          .createQueryBuilder()
          .update(Imagen)
          .set({ portada: false })
          .where("noticiaId = :noticiaId", { noticiaId: noticia.id })
          .andWhere("portada = true")
          .execute();

        // Quitar portada a otros videos
        await this.videoRepository
          .createQueryBuilder()
          .update(Video)
          .set({ portada: false })
          .where("noticiaId = :noticiaId", { noticiaId: noticia.id })
          .andWhere("portada = true")
          .execute();
      }

      const newVideo = this.videoRepository.create({
        ...createCreateVideoDto,
        noticia,
        createdBy: usuarioId,
      });
      await this.videoRepository.save(newVideo);

      return {
        message: '✅ Video creado exitosamente',
      };
    } catch (error) {
      return Utils.errorResponse(error);
    }
  }


  async findAll() {
    try {
      const videos = await this.videoRepository.find({
        where: { isDeleted: false },
        relations: ['noticia'],
      });

      const transformed = plainToInstance(VideoResponseDto, videos, {
        excludeExtraneousValues: true,
      });

      return {
        message: '✅ Videos obtenidos exitosamente',
        data: transformed,
      };

    } catch (error) {
      return Utils.errorResponse(error);
    }
  }

  async findOne(id: string): Promise<{ message: string; data: VideoResponseDto }> {
    try {
      const video = await this.videoRepository.findOne({
        where: { id, isDeleted: false },
        relations: ['noticia'],
      });

      if (!video) {
        throw new NotFoundException('❌ Video no encontrado.');
      }

      return {
        message: '✅ Video obtenido exitosamente',
        data: plainToInstance(VideoResponseDto, video, {
          excludeExtraneousValues: true,
        }),
      };

    } catch (error) {
      return Utils.errorResponse(error);
    }
  }

  async update(
    id: string,
    updateCreateVideoDto: UpdateCreateVideoDto,
    usuarioId: string,
  ): Promise<{ message: string; data: VideoResponseDto }> {
    try {
      const video = await this.videoRepository.findOne({
        where: { id, isDeleted: false },
        relations: ['noticia'],
      });

      if (!video) {
        throw new NotFoundException('❌ Video no encontrado.');
      }

      if (video.status === false) {
        throw new NotFoundException('❌ No se puede actualizar un video inactivo.');
      }

      // Si se actualiza la portada a true, limpiar otras portadas
      if (updateCreateVideoDto.portada === true) {
        // Desactivar portada en otros videos de la misma noticia
        // En video update, limpiar imágenes:
        await this.imagenRepository
          .createQueryBuilder()
          .update()
          .set({ portada: false })
          .where('noticiaId = :noticiaId', { noticiaId: video.noticia.id })
          .andWhere('portada = true')
          .execute();

        // En video update, limpiar videos menos el actual:
        await this.videoRepository
          .createQueryBuilder()
          .update()
          .set({ portada: false })
          .where('noticiaId = :noticiaId', { noticiaId: video.noticia.id })
          .andWhere('portada = true')
          .andWhere('id != :id', { id: video.id })
          .execute();
      }

      // Actualizar propiedades
      video.descripcion = updateCreateVideoDto.descripcion || video.descripcion;
      video.link = updateCreateVideoDto.link || video.link;
      video.portada = updateCreateVideoDto.portada !== undefined ? updateCreateVideoDto.portada : video.portada;
      video.modifiedBy = usuarioId;
      video.dateModified = new Date();

      await this.videoRepository.save(video);

      return {
        message: '✅ Video actualizado exitosamente',
        data: plainToInstance(VideoResponseDto, video, {
          excludeExtraneousValues: true,
        }),
      };
    } catch (error) {
      return Utils.errorResponse(error);
    }
  }


  async desactivate(id: string, usuarioId: string): Promise<{ message: string }> {
    try {
      const video = await this.videoRepository.findOneBy({ id, isDeleted: false });
      if (!video) {
        throw new NotFoundException('❌ Video no encontrada.');
      }

      if (video.status === false) {
        throw new BadRequestException('⚠️ Este estado ya está desactivado');
      }

      video.status = false;
      video.modifiedBy = usuarioId;
      video.dateModified = new Date();
      await this.videoRepository.save(video);

      return {
        message: '✅ Video desactivado exitosamente',
      };
    } catch (error) {
      return Utils.errorResponse(error);
    }
  }

  async reactivate(id: string, usuarioId: string): Promise<{ message: string }> {
    try {
      const video = await this.videoRepository.findOneBy({ id, isDeleted: false });
      if (!video) {
        throw new NotFoundException('❌ Video no encontrado.');
      }
      if (video.status === true) {
        throw new BadRequestException('⚠️ Este estado ya está activado');
      }

      video.status = true;
      video.modifiedBy = usuarioId;
      video.dateModified = new Date();
      await this.videoRepository.save(video);

      return {
        message: '✅ Video reactivado exitosamente',
      };

    } catch (error) {
      return Utils.errorResponse(error);
    }
  }

  async remove(id: string, usuarioId: string): Promise<{ message: string }> {
    try {
      const video = await this.videoRepository.findOneBy({ id, isDeleted: false });
      if (!video) {
        throw new NotFoundException('❌ Video no encontrado.');
      }

      video.status = false;
      video.isDeleted = true;
      video.modifiedBy = usuarioId;
      video.dateModified = new Date();

      await this.videoRepository.save(video);
      return {
        message: '✅ Video eliminado exitosamente',
      };
    } catch (error) {
      return Utils.errorResponse(error);
    }
  }
}
