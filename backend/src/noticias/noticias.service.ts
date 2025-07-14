import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateNoticiaDto } from './dto/create-noticia.dto';
import { UpdateNoticiaDto } from './dto/update-noticia.dto';
import Utils from '../utils/error.utils';
import { Noticia } from '../entities/Noticia.entity';
import { Revision } from '../entities/Revision.entity';
import { Estado } from '../entities/Estado.entity';
import { Repository } from 'typeorm';
import { Usuario } from '../entities/Usuario.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PublicNoticiaDto } from './dto/public-noticia.dto';


@Injectable()
export class NoticiasService {
  constructor(
    @InjectRepository(Noticia)
    private readonly noticiasRepository: Repository<Noticia>,
    @InjectRepository(Revision)
    private readonly revisionRepository: Repository<Revision>,
    @InjectRepository(Estado)
    private readonly estadoRepository: Repository<Estado>,
  ) { }

  async create(createNoticiaDto: CreateNoticiaDto, usuarioId: string): Promise<{ message: string; id?: string }> {
    try {
      // 1. Crear la noticia
      const newNoticia = this.noticiasRepository.create({
        ...createNoticiaDto,
        createdBy: usuarioId,
        modifiedBy: usuarioId,
        usuario: { id: usuarioId } as Usuario,
      });

      const savedNoticia = await this.noticiasRepository.save(newNoticia);

      // 2. Buscar el estado "pendiente de revisión"
      const estadoPendiente = await this.estadoRepository.findOne({
        where: { nombre: 'pendiente de revisión' },
      });

      if (!estadoPendiente) {
        throw new NotFoundException('Estado "pendiente de revisión" no está registrado en la base de datos');
      }

      // 3. Crear revisión automática con ese estado
      const revisionInicial = this.revisionRepository.create({
        noticia: { id: savedNoticia.id } as Noticia,
        usuario: { id: usuarioId } as Usuario,
        estado: { id: estadoPendiente.id } as Estado,
        descripcion: 'Noticia creada y pendiente de revisión',
        asunto: 'Revisión inicial',
        createdBy: usuarioId,
        modifiedBy: usuarioId,
      });

      await this.revisionRepository.save(revisionInicial);

      return {
        message: '✅ Noticia creada exitosamente y marcada como pendiente de revisión',
        id: savedNoticia.id,
      };
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException(
          `⚠️ Ya existe una noticia con el titulo "${createNoticiaDto.titulo}".`
        );
      }
      return Utils.errorResponse(error);
    }
  }

  async findAllPublic(): Promise<{ message: string; noticias: PublicNoticiaDto[] }> {
  try {
    const noticias = await this.noticiasRepository
      .createQueryBuilder('noticia')
      .leftJoinAndSelect('noticia.usuario', 'usuario')
      .leftJoinAndSelect('noticia.imagenes', 'imagenes')
      .leftJoinAndSelect('noticia.categorias', 'categorias')
      .leftJoinAndSelect('categorias.categoria', 'categoria')
      .leftJoinAndSelect('noticia.parrafos', 'parrafos')
      .leftJoinAndSelect('noticia.videos', 'videos')
      .leftJoinAndSelect('noticia.revisiones', 'revisiones')
      .leftJoinAndSelect('revisiones.estado', 'estado')
      .where('noticia.isDeleted = false')
      .andWhere('noticia.status = true')
      .andWhere('noticia.publicado = true')
      .andWhere('noticia.vigente = true')
      .getMany();

    const publicNoticias: PublicNoticiaDto[] = noticias.map((n) => ({
      id: n.id,
      titulo: n.titulo,
      descripcion: n.descripcion,
      visitas: n.visitas,
      usuario: {
        nombre: n.usuario?.nombre ?? 'Desconocido',
      },
      imagenes: n.imagenes,
      categorias: n.categorias,
      parrafos: n.parrafos,
      videos: n.videos,
    }));

    return {
      message: `✅ Se encontraron ${publicNoticias.length} noticias publicadas`,
      noticias: publicNoticias,
    };
  } catch (error) {
    return Utils.errorResponse(error);
  }
}

  async findAll(): Promise<{ message: string; noticias: Noticia[] }> {
    try {
      const noticias = await this.noticiasRepository
        .createQueryBuilder('noticia')
        .leftJoinAndSelect('noticia.usuario', 'usuario')
        .leftJoinAndSelect('noticia.imagenes', 'imagenes')
        .leftJoinAndSelect('noticia.categorias', 'categorias')
        .leftJoinAndSelect('categorias.categoria', 'categoria')
        .leftJoinAndSelect('noticia.parrafos', 'parrafos')
        .leftJoinAndSelect('noticia.videos', 'videos')
        .leftJoinAndSelect('noticia.revisiones', 'revisiones')
        .leftJoinAndSelect('revisiones.estado', 'estado')
        .where('noticia.isDeleted = false')
        .getMany();
      return {
        message: `✅ Se encontraron ${noticias.length} noticias publicadas`,
        noticias,
      };
    } catch (error) {
      return Utils.errorResponse(error);
    }
  }

  async findOne(id: string): Promise<{ message: string; noticia: Noticia }> {
    try {
      const noticia = await this.noticiasRepository
        .createQueryBuilder('noticia')
        .leftJoinAndSelect('noticia.usuario', 'usuario')
        .leftJoinAndSelect('noticia.imagenes', 'imagenes')
        .leftJoinAndSelect('noticia.categorias', 'categorias')
        .leftJoinAndSelect('categorias.categoria', 'categoria')
        .leftJoinAndSelect('noticia.parrafos', 'parrafos')
        .leftJoinAndSelect('noticia.videos', 'videos')
        .leftJoinAndSelect('noticia.revisiones', 'revisiones')
        .leftJoinAndSelect('revisiones.estado', 'estado')
        .where('noticia.id = :id', { id })
        .andWhere('noticia.isDeleted = false')
        .getOne();

      if (!noticia) {
        throw new NotFoundException('❌ Noticia no encontrada');
      }

      noticia.visitas += 1;
      await this.noticiasRepository.save(noticia);

      return {
        message: '✅ Noticia encontrada exitosamente',
        noticia,
      }
    } catch (error) {
      return Utils.errorResponse(error);
    }
  }

  async findAllPendientesParaRevision(): Promise<{ message: string; noticias: Noticia[] }> {
    try {
      const noticias = await this.noticiasRepository
        .createQueryBuilder('noticia')
        .leftJoinAndSelect('noticia.revisiones', 'revision')
        .leftJoinAndSelect('revision.estado', 'estado')
        .where('noticia.isDeleted = false')
        .andWhere('noticia.status = true')
        .andWhere('noticia.publicado = false')
        .getMany();

      return {
        message: `✅ Se encontraron ${noticias.length} noticias pendientes de revisión`,
        noticias,
      };
    } catch (error) {
      return Utils.errorResponse(error);
    }
  }

  async update(id: string, updateNoticiaDto: UpdateNoticiaDto, usuarioId: string): Promise<{ message: string }> {
    try {
      const noticia = await this.noticiasRepository.findOne({ where: { id } });

      if (!noticia) {
        throw new NotFoundException('❌ Noticia no encontrada');
      }

      if (noticia.isDeleted) {
        throw new ConflictException('⚠️ La noticia ha sido eliminada y no puede ser modificada.');
      }

      if (!noticia.status) {
        throw new ConflictException('⚠️ La noticia está desactivada y no puede ser modificada.');
      }

      if (noticia.publicado) {
        throw new ConflictException('⚠️ La noticia está publicada y no puede ser modificada.');
      }

      if (!noticia.vigente) {
        throw new ConflictException('⚠️ La noticia no está vigente y no puede ser modificada.');
      }

      await this.noticiasRepository.update(id, {
        ...updateNoticiaDto,
        modifiedBy: usuarioId,
      });

      return {
        message: '✅ Noticia actualizada exitosamente',
      };
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException(
          `⚠️ Ya existe una noticia con el titulo "${updateNoticiaDto.titulo}".`
        );
      }
      return Utils.errorResponse(error);
    }
  }

  async setVigencia(id: string, vigente: boolean, usuarioId: string): Promise<{ message: string }> {
    try {
      const noticia = await this.noticiasRepository.findOne({ where: { id } });

      if (!noticia) {
        throw new NotFoundException('❌ Noticia no encontrada');
      }

      if (noticia.isDeleted) {
        throw new ConflictException('⚠️ No se puede cambiar la vigencia de una noticia eliminada');
      }

      noticia.vigente = vigente;
      noticia.modifiedBy = usuarioId;
      noticia.dateModified = new Date();

      await this.noticiasRepository.save(noticia);

      return {
        message: `✅ Noticia marcada como ${vigente ? 'vigente' : 'no vigente'}`,
      };
    } catch (error) {
      return Utils.errorResponse(error);
    }
  }

  async desactivate(id: string, usuarioId: string): Promise<{ message: string }> {
    try {
      const noticia = await this.noticiasRepository.findOne({ where: { id } });

      if (!noticia) {
        throw new NotFoundException('❌ Noticia no encontrada');
      }

      noticia.status = false;
      noticia.publicado = false;
      noticia.modifiedBy = usuarioId;
      noticia.dateModified = new Date();

      await this.noticiasRepository.save(noticia);

      return {
        message: '✅ Noticia desactivada correctamente'
      };
    } catch (error) {
      return Utils.errorResponse(error);
    }
  }

  async reactivate(id: string, usuarioId: string): Promise<{ message: string }> {
    try {
      const noticia = await this.noticiasRepository.findOne({ where: { id } });

      if (!noticia) {
        throw new NotFoundException('❌ Noticia no encontrada');
      }

      if (noticia.status) {
        throw new ConflictException('⚠️ La noticia ya está activa.');
      }

      noticia.status = true;
      noticia.publicado = false;
      noticia.modifiedBy = usuarioId;
      noticia.dateModified = new Date();

      await this.noticiasRepository.save(noticia);

      return {
        message: '✅ Noticia reactivada correctamente (aún no publicada)',
      };
    } catch (error) {
      return Utils.errorResponse(error);
    }
  }

  async remove(id: string, usuarioId: string): Promise<{ message: string }> {
    try {
      const noticia = await this.noticiasRepository.findOne({ where: { id } });

      if (!noticia) {
        throw new NotFoundException('❌ Noticia no encontrada');
      }

      if (noticia.isDeleted) {
        throw new ConflictException('⚠️ La noticia ya está eliminada');
      }

      noticia.titulo = `${noticia.titulo}_DELETED_${noticia.id}`;

      noticia.isDeleted = true;
      noticia.status = false;
      noticia.publicado = false;
      noticia.modifiedBy = usuarioId;
      noticia.dateModified = new Date();

      await this.noticiasRepository.save(noticia);

      return {
        message: '✅ Noticia eliminada (soft delete) correctamente',
      };
    } catch (error) {
      return Utils.errorResponse(error);
    }
  }

}
