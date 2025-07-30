import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCreateImageDto } from './dto/create-create-image.dto';
import { UpdateCreateImageDto } from './dto/update-create-image.dto';
import { ImageResponseDto } from './dto/image-response.dto';
import { Imagen } from '../entities/Imagen.entity';
import { Noticia } from '../entities/Noticia.entity';
import { Video } from '../entities/Video.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Utils from '../utils/error.utils';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class CreateImageService {

  constructor(
    @InjectRepository(Imagen)
    private readonly imagenRepository: Repository<Imagen>,
    @InjectRepository(Noticia)
    private readonly noticiaRepository: Repository<Noticia>,
    @InjectRepository(Video)
    private readonly videoRepository: Repository<Video>,
  ) { }

  async create(id: string, createCreateImageDto: CreateCreateImageDto, usuarioId: string): Promise<{ message: string }> {
    try {
      const noticia = await this.noticiaRepository.findOneBy({ id, isDeleted: false });
      if (!noticia) {
        throw new NotFoundException('❌ La noticia no existe.');
      }

      // Si la nueva imagen será portada, desactivar portada en otras imágenes y videos
      if (createCreateImageDto.portada === true) {
        // Quitar portada a otras imágenes
        await this.imagenRepository
          .createQueryBuilder()
          .update(Imagen)
          .set({ portada: false })
          .where("noticiaId = :noticiaId", { noticiaId: noticia.id })
          .andWhere("portada = true")
          .execute();

        // Quitar portada a los videos
        await this.videoRepository
          .createQueryBuilder()
          .update(Video)
          .set({ portada: false })
          .where("noticiaId = :noticiaId", { noticiaId: noticia.id })
          .andWhere("portada = true")
          .execute();
      }

      const newImage = this.imagenRepository.create({
        ...createCreateImageDto,
        noticia,
        createdBy: usuarioId,
      });
      await this.imagenRepository.save(newImage);

      return {
        message: '✅ Imagen creada exitosamente',
      };
    } catch (error) {
      return Utils.errorResponse(error);
    }
  }

  async findAll(): Promise<{ message: string; data: ImageResponseDto[] }> {
    try {
      const images = await this.imagenRepository.find({
        where: { isDeleted: false },
        relations: ['noticia'],
      });

      const transformed = plainToInstance(ImageResponseDto, images, {
        excludeExtraneousValues: true,
      });

      return {
        message: '✅ Imágenes obtenidas exitosamente',
        data: transformed,
      };
    } catch (error) {
      return Utils.errorResponse(error);
    }
  }

  async findOne(id: string): Promise<{ message: string; data: ImageResponseDto }> {
    try {
      const image = await this.imagenRepository.findOne({
        where: { id, isDeleted: false },
        relations: ['noticia'],
      });

      if (!image) {
        throw new NotFoundException('❌ Imagen no encontrada.');
      }

      return {
        message: '✅ Imagen encontrada exitosamente',
        data: plainToInstance(ImageResponseDto, image, {
          excludeExtraneousValues: true,
        }),
      }

    } catch (error) {
      return Utils.errorResponse(error);
    }
  }

  async update(id: string, updateCreateImageDto: UpdateCreateImageDto, usuarioId: string) {
    try {
      const image = await this.imagenRepository.findOne({
        where: { id, isDeleted: false },
        relations: ['noticia'],
      });

      if (!image) {
        throw new NotFoundException('❌ Imagen no encontrada.');
      }

      if (!image.status) {
        throw new NotFoundException('❌ Imagen inactiva.');
      }

      // Si se marca esta imagen como portada, desactivar las demás
      if (updateCreateImageDto.portada === true) {
        // Desactivar portada en otras imágenes de la misma noticia
        // En imagen update, limpiar imágenes menos la actual:
        await this.imagenRepository
          .createQueryBuilder()
          .update()
          .set({ portada: false })
          .where('noticiaId = :noticiaId', { noticiaId: image.noticia.id })
          .andWhere('portada = true')
          .andWhere('id != :id', { id: image.id })
          .execute();

        // En imagen update, limpiar todos los videos (no excluye ninguno):
        await this.videoRepository
          .createQueryBuilder()
          .update()
          .set({ portada: false })
          .where('noticiaId = :noticiaId', { noticiaId: image.noticia.id })
          .andWhere('portada = true')
          .execute();
      }

      // Actualizar campos
      image.titulo = updateCreateImageDto.titulo ?? image.titulo;
      image.descripcion = updateCreateImageDto.descripcion ?? image.descripcion;
      image.imagen = updateCreateImageDto.imagen ?? image.imagen;
      image.portada = updateCreateImageDto.portada !== undefined ? updateCreateImageDto.portada : image.portada;
      image.modifiedBy = usuarioId;
      image.dateModified = new Date();

      await this.imagenRepository.save(image);

      return {
        message: '✅ Imagen actualizada exitosamente',
        data: plainToInstance(ImageResponseDto, image, {
          excludeExtraneousValues: true,
        }),
      };
    } catch (error) {
      return Utils.errorResponse(error);
    }
  }

  async desactivate(id: string, usuarioId: string): Promise<{ message: string }> {
    try {
      const image = await this.imagenRepository.findOneBy({ id, isDeleted: false });
      if (!image) {
        throw new NotFoundException('❌ Imagen no encontrada.');
      }

      if (image.status === false) {
        throw new BadRequestException('⚠️ Este estado ya está desactivado');
      }

      image.status = false;
      image.modifiedBy = usuarioId;
      image.dateModified = new Date();
      await this.imagenRepository.save(image);

      return {
        message: '✅ Imagen desactivada exitosamente',
      };
    } catch (error) {
      return Utils.errorResponse(error);
    }
  }

  async reactivate(id: string, usuarioId: string): Promise<{ message: string }> {
    try {
      const image = await this.imagenRepository.findOneBy({ id, isDeleted: false });
      if (!image) {
        throw new NotFoundException('❌ Imagen no encontrada.');
      }
      if (image.status === true) {
        throw new BadRequestException('⚠️ Este estado ya está activado');
      }

      image.status = true;
      image.modifiedBy = usuarioId;
      image.dateModified = new Date();
      await this.imagenRepository.save(image);

      return {
        message: '✅ Imagen reactivada exitosamente',
      };

    } catch (error) {
      return Utils.errorResponse(error);
    }
  }

  async remove(id: string, usuarioId: string): Promise<{ message: string }> {
    try {
      const image = await this.imagenRepository.findOneBy({ id, isDeleted: false });
      if (!image) {
        throw new NotFoundException('❌ Imagen no encontrada.');
      }

      image.status = false;
      image.isDeleted = true;
      image.modifiedBy = usuarioId;
      image.dateModified = new Date();

      await this.imagenRepository.save(image);
      return {
        message: '✅ Imagen eliminada exitosamente',
      };
    } catch (error) {
      return Utils.errorResponse(error);
    }
  }
}
