import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCreateParagraphDto } from './dto/create-create-paragraph.dto';
import { UpdateCreateParagraphDto } from './dto/update-create-paragraph.dto';
import { Parrafo } from '../entities/Parrafo.entity';
import { Noticia } from '../entities/Noticia.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Utils from '../utils/error.utils';
import { plainToInstance } from 'class-transformer';
import { ParrafoResponseDto } from './dto/parrafo-response.dto';

@Injectable()
export class CreateParagraphsService {
  constructor(
    @InjectRepository(Parrafo)
    private readonly parrafoRepository: Repository<Parrafo>,
    @InjectRepository(Noticia)
    private readonly noticiaRepository: Repository<Noticia>,
  ) { }

  async create(id: string, createCreateParagraphDto: CreateCreateParagraphDto, usuarioId: string): Promise<{ message: string }> {
    try {
      const noticia = await this.noticiaRepository.findOne({ where: { id } });

      if (!noticia) {
        throw new NotFoundException('❌ La noticia no existe.');
      }

      const maxOrdenObj = await this.parrafoRepository
        .createQueryBuilder('parrafo')
        .select('MAX(parrafo.orden)', 'max')
        .where('parrafo.noticiaId = :noticiaId', { noticiaId: id })
        .getRawOne();

      const maxOrden = maxOrdenObj?.max ?? 0;
      const nuevoOrden = maxOrden + 1;

      const newParagraph = this.parrafoRepository.create({
        ...createCreateParagraphDto,
        orden: nuevoOrden,
        noticia,
        createdBy: usuarioId,
      });

      await this.parrafoRepository.save(newParagraph);

      return {
        message: '✅ Párrafo creado exitosamente',
      };
    } catch (error) {
      return Utils.errorResponse(error);
    }
  }


  async findAll(): Promise<{ message: string; data: ParrafoResponseDto[] }> {
    try {
      const paragraphs = await this.parrafoRepository.find({
        where: { isDeleted: false },
        relations: ['noticia'],
      });

      const transformed = plainToInstance(ParrafoResponseDto, paragraphs, {
        excludeExtraneousValues: true,
      });

      return {
        message: '✅ Párrafos encontrados exitosamente',
        data: transformed,
      };
    } catch (error) {
      return Utils.errorResponse(error);
    }
  }

  async findOne(id: string): Promise<{ message: string; data: ParrafoResponseDto }> {
    try {
      const paragraph = await this.parrafoRepository.findOne({
        where: { id, isDeleted: false },
        relations: ['noticia'],
      });

      if (!paragraph) {
        throw new NotFoundException('❌ El párrafo no existe.');
      }

      // Transforma y retorna solo los campos expuestos
      const data = plainToInstance(ParrafoResponseDto, paragraph, {
        excludeExtraneousValues: true,
      });

      return {
        message: '✅ Párrafo encontrado exitosamente',
        data,
      };
    } catch (error) {
      return Utils.errorResponse(error);
    }
  }

  async update(id: string, updateCreateParagraphDto: UpdateCreateParagraphDto, usuarioId: string) {
    try {
      const paragraph = await this.parrafoRepository.findOne({ where: { id, isDeleted: false } });

      if (!paragraph) {
        throw new NotFoundException('❌ El párrafo no existe.');
      }

      Object.assign(paragraph, updateCreateParagraphDto);
      paragraph.modifiedBy = usuarioId;
      paragraph.dateModified = new Date();

      await this.parrafoRepository.save(paragraph);

      return {
        message: '✅ Párrafo actualizado exitosamente',
      };
    } catch (error) {
      return Utils.errorResponse(error);
    }
  }

  async desactivate(id: string, usuarioId: string): Promise<{ message: string }> {
    try {
      const paragraph = await this.parrafoRepository.findOne({ where: { id, isDeleted: false } });

      if (!paragraph || paragraph.isDeleted) {
        throw new NotFoundException('❌ El párrafo no existe.');
      }

      if (paragraph.status === false) {
        throw new NotFoundException('⚠️ No puedes desactivar un párrafo que ya está inactivo.');
      }

      paragraph.status = false;
      paragraph.modifiedBy = usuarioId;
      paragraph.dateModified = new Date();

      await this.parrafoRepository.save(paragraph);

      return {
        message: '✅ Párrafo desactivado exitosamente',
      };
    } catch (error) {
      return Utils.errorResponse(error);
    }
  }

  async reactivate(id: string, usuarioId: string): Promise<{ message: string }> {
    try {
      const paragraph = await this.parrafoRepository.findOne({ where: { id, isDeleted: false } });

      if (!paragraph || paragraph.isDeleted) {
        throw new NotFoundException('❌ El párrafo no existe.');
      }

      if (paragraph.status === true) {
        throw new NotFoundException('⚠️ Este párrafo ya está activo.');
      }

      paragraph.status = true;
      paragraph.modifiedBy = usuarioId;
      paragraph.dateModified = new Date();

      await this.parrafoRepository.save(paragraph);

      return {
        message: '✅ Párrafo reactivado exitosamente',
      };

    } catch (error) {
      return Utils.errorResponse(error);
    }
  }

  async remove(id: string, usuarioId: string) {
    try {
      const paragraph = await this.parrafoRepository.findOneBy({ id, isDeleted: false });

      if (!paragraph || paragraph.isDeleted) {
        throw new NotFoundException('❌ El párrafo no existe.');
      }

      paragraph.status = false;
      paragraph.isDeleted = true;
      paragraph.modifiedBy = usuarioId;
      paragraph.dateModified = new Date();

      await this.parrafoRepository.save(paragraph);

      return {
        message: '✅ Párrafo eliminado exitosamente',
      };

    } catch (error) {
      return Utils.errorResponse(error);
    }
  }
}
