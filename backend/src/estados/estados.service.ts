import { BadRequestException, ConflictException, Injectable, NotFoundException, Logger } from '@nestjs/common';
import { CreateEstadoDto } from './dto/create-estado.dto';
import { UpdateEstadoDto } from './dto/update-estado.dto';
import { Estado } from '../entities/Estado.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Utils from '../utils/error.utils';

@Injectable()
export class EstadosService {
  private readonly logger = new Logger(EstadosService.name);
  constructor(
    @InjectRepository(Estado)
    private readonly estadoRepository: Repository<Estado>,
  ) { }

  async onModuleInit() {
    await this.seedEstados();
  }

  async seedEstados(usuarioId: string = 'system'): Promise<void> {
    const estadosBase = [
      { nombre: 'Pendiente de Revisión', publica: false },
      { nombre: 'Aprobado', publica: true },
      { nombre: 'Rechazado', publica: false },
      { nombre: 'Solicitud de Cambio', publica: false },
    ];

    for (const estadoData of estadosBase) {
      const existente = await this.estadoRepository.findOne({
        where: { nombre: estadoData.nombre, isDeleted: false },
      });

      if (!existente) {
        const nuevoEstado = this.estadoRepository.create({
          ...estadoData,
          createdBy: usuarioId,
        });
        await this.estadoRepository.save(nuevoEstado);
      }
    }
    this.logger.log('✅ Estados base verificados / creados automáticamente.');
  }

  async create(createEstadoDto: CreateEstadoDto, usuarioId: string): Promise<{ message: string; data: Estado }> {
    try {
      const newEstado = this.estadoRepository.create({
        ...createEstadoDto,
        createdBy: usuarioId,
      });

      const savedEstado = await this.estadoRepository.save(newEstado);

      return {
        message: '✅ Estado creado exitosamente',
        data: savedEstado,
      };
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException(
          `⚠️ Ya existe un estado: "${createEstadoDto.nombre}".`
        );
      }
      return Utils.errorResponse(error);
    }
  }

  async findAll(): Promise<{ message: string; data: Estado[] }> {
    try {
      const estados = await this.estadoRepository.find(
        { order: { nombre: 'ASC' }, where: { isDeleted: false } }
      );

      return {
        message: '✅ Listado de estados',
        data: estados,
      };
    } catch (error) {
      return Utils.errorResponse(error);
    }
  }

  async findOne(id: string): Promise<{ message: string; data: Estado }> {
    try {
      const estado = await this.estadoRepository.findOne({
        where: { id, isDeleted: false },
      });

      if (!estado || estado.isDeleted) {
        throw new NotFoundException('❌ Estado no encontrado');
      }

      return {
        message: '✅ Estado encontrado con éxito',
        data: estado,
      };
    } catch (error) {
      return Utils.errorResponse(error);
    }
  }

  async update(id: string, updateEstadoDto: UpdateEstadoDto, usuarioId: string): Promise<{ message: string; data: Estado }> {
    try {
      if (!updateEstadoDto.nombre || updateEstadoDto.nombre.trim() === '') {
        throw new BadRequestException('⚠️ Debes proporcionar un nuevo nombre para actualizar el estado.');
      }

      const estado = await this.estadoRepository.findOneBy({ id });

      if (!estado || estado.isDeleted) {
        throw new NotFoundException('❌ Estado no encontrado');
      }

      if (estado.status === false) {
        throw new BadRequestException(`⚠️ Este estado está desactivado, no se puede modificar.`);
      }

      estado.nombre = updateEstadoDto.nombre ?? estado.nombre;
      estado.publica = updateEstadoDto.publica ?? estado.publica;
      estado.modifiedBy = usuarioId;
      estado.dateModified = new Date();
      await this.estadoRepository.save(estado);

      return {
        message: '✅ Estado actualizado exitosamente',
        data: estado,
      };

    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException(
          `⚠️ Ya existe un estado: "${updateEstadoDto.nombre}".`
        );
      }
      return Utils.errorResponse(error);
    }
  }

  async desactivate(id: string, usuarioId: string): Promise<{ message: string }> {
    try {
      const estado = await this.estadoRepository.findOneBy({ id });

      if (!estado || estado.isDeleted) {
        throw new NotFoundException('❌ Estado no encontrado');
      }

      if (estado.status === false) {
        throw new BadRequestException(`⚠️ Este estado ya está desactivado`);
      }

      estado.status = false;
      estado.modifiedBy = usuarioId;
      estado.dateModified = new Date();

      await this.estadoRepository.save(estado);

      return {
        message: '✅ Estado desactivado exitosamente'
      }
    } catch (error) {
      return Utils.errorResponse(error);
    }
  }

  async reactivate(id: string, usuarioId: string): Promise<{ message: string }> {
    try {
      const estado = await this.estadoRepository.findOneBy({ id });

      if (!estado || estado.isDeleted) {
        throw new NotFoundException('❌ Estado no encontrado');
      }

      if (estado.status === true) {
        throw new BadRequestException(`⚠️ Este estado ya está activado`);
      }

      estado.status = true;
      estado.modifiedBy = usuarioId;
      estado.dateModified = new Date();

      await this.estadoRepository.save(estado);

      return {
        message: '✅ Estado re-activado exitosamente'
      }
    } catch (error) {
      return Utils.errorResponse(error);
    }
  }

  async remove(id: string, usuarioId: string): Promise<{ message: string }> {
    try {
      const estado = await this.estadoRepository.findOneBy({ id });

      if (!estado || estado.isDeleted) {
        throw new NotFoundException('❌ Estado no encontrado');
      }

      estado.nombre = `${estado.nombre}_DELETED_${estado.id}`;

      estado.status = false;
      estado.isDeleted = true;
      estado.modifiedBy = usuarioId;

      await this.estadoRepository.save(estado);

      return {
        message: '✅ Estado eliminado exitosamente',
      };
    } catch (error) {
      return Utils.errorResponse(error);
    }
  }
}
