import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRevisionDto } from './dto/create-revisione.dto';
import Utils from '../utils/error.utils';
import { Noticia } from '../entities/Noticia.entity';
import { Revision } from '../entities/Revision.entity';
import { Estado } from '../entities/Estado.entity';
import { Usuario } from '../entities/Usuario.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RevisionesService {
  constructor(
    @InjectRepository(Noticia)
    private readonly noticiasRepository: Repository<Noticia>,
    @InjectRepository(Revision)
    private readonly revisionRepository: Repository<Revision>,
    @InjectRepository(Estado)
    private readonly estadoRepository: Repository<Estado>,
  ) { }

  async revisarNoticia(dto: CreateRevisionDto, usuarioId: string) {
    const { noticiaId, estadoId, descripcion } = dto;

    try {
      const noticia = await this.noticiasRepository.findOne({ where: { id: noticiaId } });
      if (!noticia) throw new NotFoundException('Noticia no encontrada');

      const estado = await this.estadoRepository.findOne({ where: { id: estadoId } });
      if (!estado) throw new NotFoundException('Estado no encontrado');

      const revision = this.revisionRepository.create({
        noticia: { id: noticiaId } as Noticia,
        usuario: { id: usuarioId } as Usuario,
        estado: { id: estadoId } as Estado,
        descripcion,
        asunto: 'Revisión de noticia',
        createdBy: usuarioId,
        modifiedBy: usuarioId,
      });

      await this.revisionRepository.save(revision);

      // ✅ Ahora basado en el campo `publica` en vez del nombre
      await this.noticiasRepository.update(noticiaId, {
        publicado: estado.publica,
      });

      return {
        message: `✅ Revisión guardada. Estado aplicado: ${estado.nombre}`,
      };
    } catch (error) {
      return Utils.errorResponse(error);
    }
  }

}
