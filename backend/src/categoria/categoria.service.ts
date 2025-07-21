import { BadRequestException, ConflictException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { Categoria } from '../entities/Categoria.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Utils from '../utils/error.utils';

@Injectable()
export class CategoriaService {
  private readonly logger = new Logger(CategoriaService.name);
  constructor(
    @InjectRepository(Categoria)
    private readonly categoriaRepository: Repository<Categoria>,
  ) { }

  async onModuleInit() {
    await this.seedCategorias();
  }

  async seedCategorias(usuarioId: string = 'system'): Promise<void> {
    const categoriaBase = [
      { nombre: 'Tecnología' },
      { nombre: 'IA' },
      { nombre: 'Noticias' },
      { nombre: 'Cultura' },
    ];

    for (const categoriaData of categoriaBase) {
      const existente = await this.categoriaRepository.findOne({
        where: { nombre: categoriaData.nombre, isDeleted: false },
      });

      if (!existente) {
        const nuevaCategoria = this.categoriaRepository.create({
          ...categoriaData,
          createdBy: usuarioId,
        });
        await this.categoriaRepository.save(nuevaCategoria);
      }
    }
    this.logger.log('✅ Categorias base verificados / creados automáticamente.');
  }

  async create(createCategoriaDto: CreateCategoriaDto, usuarioId: string): Promise<{ message: string; data: Categoria }> {
    try {
      const newCategoria = this.categoriaRepository.create({
        ...createCategoriaDto,
        createdBy: usuarioId,
      });
      await this.categoriaRepository.save(newCategoria);

      return {
        message: '✅ Categoria creada exitosamente',
        data: newCategoria
      };
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException(
          `⚠️ Ya existe una categoria con el nombre: "${createCategoriaDto.nombre}".`
        );
      }
      return Utils.errorResponse(error)
    }
  }

  async findAll(): Promise<{ message: string; data: Categoria[] }> {
    try {
      const categorias = await this.categoriaRepository.find({
        where: {
          isDeleted: false,
        },
        order: {
          nombre: 'ASC',
        },
      });

      return {
        message: '✅ Categorías obtenidas exitosamente',
        data: categorias
      };

    } catch (error) {
      return Utils.errorResponse(error)

    }
  }

  async findOne(id: string): Promise<{ message: string; data: Categoria }> {
    try {
      const categoria = await this.categoriaRepository.findOne({
        where: {
          id,
          isDeleted: false,
        },
      });

      if (!categoria || categoria.isDeleted) {
        throw new NotFoundException('❌ La categoría no existe');
      };

      return {
        message: '✅ Categoría obtenida exitosamente',
        data: categoria
      };
    } catch (error) {
      return Utils.errorResponse(error)
    }
  }

  async update(id: string, updateCategoriaDto: UpdateCategoriaDto, usuarioId: string) {
    try {
      if (!updateCategoriaDto.nombre || updateCategoriaDto.nombre.trim() === '') {
        throw new BadRequestException('⚠️ El nombre de la categoría es obligatorio.');
      };
      const categoria = await this.categoriaRepository.findOneBy({ id });

      if (!categoria || categoria.isDeleted) {
        throw new NotFoundException('❌ La categoría no existe');
      };

      if (categoria.status === false) {
        throw new ConflictException('⚠️ No puedes actualizar una categoría que está inactiva.');
      };

      categoria.nombre = updateCategoriaDto.nombre;
      categoria.modifiedBy = usuarioId;

      await this.categoriaRepository.save(categoria);
      return {
        message: '✅ Categoría actualizada exitosamente',
        data: categoria
      };
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException(
          `⚠️ Ya existe una categoria con el nombre: "${updateCategoriaDto.nombre}".`
        );
      }
      return Utils.errorResponse(error)
    }
  }

  async desactivate(id: string, usuarioId: string): Promise<{ message: string }> {
    try {
      const categoria = await this.categoriaRepository.findOneBy({ id });

      if (!categoria || categoria.isDeleted) {
        throw new NotFoundException('❌ Estado no encontrado');
      }

      if (categoria.status === false) {
        throw new BadRequestException(`⚠️ Este estado ya está desactivado`);
      }

      categoria.status = false;
      categoria.modifiedBy = usuarioId;

      await this.categoriaRepository.save(categoria);

      return {
        message: '✅ Categoria desactivada exitosamente'
      }
    } catch (error) {
      return Utils.errorResponse(error)
    }
  }

  async reactivate(id: string, usuarioId: string): Promise<{ message: string }> {
    try {
      const categoria = await this.categoriaRepository.findOneBy({ id });

      if (!categoria || categoria.isDeleted) {
        throw new NotFoundException('❌ Categoría no encontrada');
      }

      if (categoria.status === true) {
        throw new BadRequestException(`⚠️ Este estado ya está activado`);
      }

      categoria.status = true;
      categoria.modifiedBy = usuarioId;

      await this.categoriaRepository.save(categoria);

      return {
        message: '✅ Categoria re-activada exitosamente'
      }
    } catch (error) {
      return Utils.errorResponse(error);
    }
  }

  async remove(id: string, usuarioId: string): Promise<{ message: string }> {
    try {
      const categoria = await this.categoriaRepository.findOneBy({ id });

      if (!categoria || categoria.isDeleted) {
        throw new NotFoundException('❌ Categoria no encontrada');
      }

      categoria.nombre = `${categoria.nombre}_DELETED_${categoria.id}`;

      categoria.status = false;
      categoria.isDeleted = true;
      categoria.modifiedBy = usuarioId;

      await this.categoriaRepository.save(categoria);

      return {
        message: '✅ Categoría eliminada exitosamente',
      };

    } catch (error) {
      return Utils.errorResponse(error);
    }
  }
}