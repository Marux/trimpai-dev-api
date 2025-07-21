import { BadRequestException, ConflictException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateCategoriaNoticiaDto } from './dto/create-categoria-noticia.dto';
import { UpdateCategoriaNoticiaDto } from './dto/update-categoria-noticia.dto';
import { UpdateCategoriasResponseDto } from './dto/update-categorias-response.dto';
import { CategoriaNoticia } from '../entities/CategoriaNoticia.entity';
import { Noticia } from '../entities/Noticia.entity';
import { Categoria } from '../entities/Categoria.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Utils from '../utils/error.utils';

@Injectable()
export class CategoriaNoticiaService {
  private readonly logger = new Logger(CategoriaNoticiaService.name);
  constructor(
    @InjectRepository(CategoriaNoticia)
    private readonly categoriaNoticiaRepository: Repository<CategoriaNoticia>,
    @InjectRepository(Noticia)
    private readonly noticiaRepository: Repository<Noticia>,
    @InjectRepository(Categoria)
    private readonly categoriaRepository: Repository<Categoria>,
  ) { }

  async create(createCategoriaNoticiaDto: CreateCategoriaNoticiaDto, usuarioId: string): Promise<{ message: string; data: CategoriaNoticia[] }> {
    try {
      const { noticiaId, categoriaIds, orden } = createCategoriaNoticiaDto;

      // Validar que exista la noticia solo una vez
      const noticiaExistente = await this.noticiaRepository.findOneBy({ id: noticiaId });
      if (!noticiaExistente) {
        throw new NotFoundException(`La noticia con ID ${noticiaId} no existe.`);
      }

      const relacionesCreadas: CategoriaNoticia[] = [];

      for (const categoriaId of categoriaIds) {
        // Validar existencia de la categoría (reutilizando método)
        const categoriaExistente = await this.validarExistenciaCategoria(categoriaId);

        // Verificar que la relación no exista (reutilizando método)
        await this.verificarDuplicado(noticiaId, categoriaId);

        // Calcular orden si no viene explícito
        let ordenFinal = orden;
        if (ordenFinal === undefined) {
          const max = await this.categoriaNoticiaRepository
            .createQueryBuilder('cn')
            .where('cn.noticiaId = :noticiaId', { noticiaId })
            .select('MAX(cn.orden)', 'max')
            .getRawOne();

          ordenFinal = (max?.max ?? 0) + 1;
        }

        // Crear y guardar la relación
        const nuevaRelacion = this.categoriaNoticiaRepository.create({
          noticia: noticiaExistente,
          categoria: categoriaExistente,
          orden: ordenFinal,
          createdBy: usuarioId,
        });

        await this.categoriaNoticiaRepository.save(nuevaRelacion);
        relacionesCreadas.push(nuevaRelacion);
      }

      return {
        message: `✅ Se asignaron ${relacionesCreadas.length} categorías a la noticia correctamente.`,
        data: relacionesCreadas,
      };
    } catch (error) {
      return Utils.errorResponse(error);
    }
  }

  private async validarExistenciaCategoria(categoriaId: string) {
    const categoria = await this.categoriaRepository.findOneBy({ id: categoriaId });
    if (!categoria) {
      throw new NotFoundException(`⚠️ La categoría con ID ${categoriaId} no existe.`);
    }
    return categoria;
  }

  private async verificarDuplicado(noticiaId: string, categoriaId: string) {
    const existente = await this.categoriaNoticiaRepository.findOneBy({
      noticia: { id: noticiaId },
      categoria: { id: categoriaId },
    });

    if (existente) {
      throw new ConflictException(`⚠️ La relación entre la noticia y la categoría ya existe.`);
    }
  }

  async updateCategorias(
    dto: UpdateCategoriaNoticiaDto,
    usuarioId: string
  ): Promise<{ message: string; data: UpdateCategoriasResponseDto }> {
    try {
      const { noticiaId, categoriaIds } = dto;

      const categoriaIdSet = new Set(categoriaIds);
      if (categoriaIdSet.size !== categoriaIds.length) {
        throw new BadRequestException('⚠️ No se permiten categorías duplicadas.');
      }

      const noticia = await this.noticiaRepository.findOneBy({ id: noticiaId });
      if (!noticia) {
        throw new NotFoundException(`⚠️ La noticia con ID ${noticiaId} no existe.`);
      }

      const categorias = await this.categoriaRepository.findByIds(categoriaIds);
      if (categorias.length !== categoriaIds.length) {
        throw new NotFoundException(`⚠️ Alguna de las categorías no existe.`);
      }

      await this.categoriaNoticiaRepository.delete({ noticia: { id: noticiaId } });

      let orden = 1;
      for (const categoria of categorias) {
        const nuevaRelacion = this.categoriaNoticiaRepository.create({
          noticia,
          categoria,
          orden: orden++,
          createdBy: usuarioId,
        });
        await this.categoriaNoticiaRepository.save(nuevaRelacion);
      }

      return {
        message: `✅ Categorías actualizadas y reemplazadas para la noticia ${noticiaId}.`,
        data: {
          noticia,
          categorias,
        },
      };
    } catch (error) {
      return Utils.errorResponse(error);
    }
  }
}
