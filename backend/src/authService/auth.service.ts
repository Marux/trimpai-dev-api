///src/authService/auth.service.ts
import { Injectable, UnauthorizedException, NotFoundException, ConflictException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from '../entities/Usuario.entity';
import { Login } from '../entities/Login.entity';
import * as bcrypt from 'bcryptjs';
import Utils from '../utils/error.utils';
import { CreateUsuarioDto } from '../dto/create-user.dto';
import { UpdateUsuarioDto } from '../dto/update-user.dto';
import { Rol } from '../entities/Rol.entity';
import { EncryptionService } from '../common/encryption.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
    @InjectRepository(Login)
    private loginRepository: Repository<Login>,
    @InjectRepository(Rol)
    private rolRepository: Repository<Rol>,
    private jwtService: JwtService,
    private encryptionService: EncryptionService,

  ) { }

  async validateUser(email: string, pass: string): Promise<Usuario | null> {
    try {
      const user = await this.usuarioRepository.findOne({
        where: { email, status: true, isDeleted: false },
        relations: ['rol'],
      });

      if (!user) {
        throw new NotFoundException(`Usuario con email ${email} no encontrado`);
      }

      const isPasswordValid = await bcrypt.compare(pass, user.password);
      if (!isPasswordValid) {
        throw new UnauthorizedException(`Contraseña inválida para usuario ${email}`);
      }

      return user;
    } catch (error) {
      // Si es un error conocido, lo lanzamos
      if (error instanceof NotFoundException || error instanceof UnauthorizedException) {
        throw error;
      }

      // Si es otro tipo de error, lo gestionamos con Utils
      return Utils.errorResponse(error);

    }
  }

  async login(user: Usuario, ip: string): Promise<{ accessToken: string }> {
    try {
      const payload = {
        sub: user.id,
        email: user.email,
        rol: user.rol?.name || 'user'
      };

      // Registrar el intento de login
      await this.loginRepository.save({
        usuario: user,
        ip_address: ip,
        createdBy: user.id,
        modifiedBy: user.id,
      });

      const accessToken = this.jwtService.sign(payload);
      return { accessToken };
    } catch (error) {
      return Utils.errorResponse(error);
    }
  }

  async createUser(dto: CreateUsuarioDto): Promise<{ message: string; data: { id: string; nombre: string; email: string } }> {
    try {
      const existing = await this.usuarioRepository.findOne({ where: { email: dto.email } });
      if (existing) {
        throw new ConflictException('⚠️ Ya existe un usuario con ese correo electrónico.');
      }

      const rol = await this.rolRepository.findOne({ where: { name: 'Invitado' } });
      if (!rol) {
        throw new NotFoundException('❌ Rol "Usuario" no encontrado en la base de datos.');
      }

      const hashedPassword = await bcrypt.hash(dto.password, 10);
      const encryptedRut = this.encryptionService.encrypt(dto.run);

      const usuario = this.usuarioRepository.create({
        run: encryptedRut,
        nombre: dto.nombre,
        email: dto.email,
        password: hashedPassword,
        rol: rol,
      });

      const saved = await this.usuarioRepository.save(usuario);

      return {
        message: '✅ Usuario creado con éxito.',
        data: {
          id: saved.id,
          nombre: saved.nombre,
          email: saved.email,
        },
      };
    } catch (error) {
      return Utils.errorResponse(error);
    }
  }

  async getAlluser() {
    try {
      const users = await this.usuarioRepository.find({
        where: { isDeleted: false },
        relations: ['rol'],
      });

      const sanitizedUsers = users.map((user) => {
        let runVisible = '****';

        try {
          const decryptedRun = this.encryptionService.decrypt(user.run);
          runVisible += decryptedRun.slice(-4);
        } catch (err) {
          runVisible += 'XXXX';
        }

        return {
          id: user.id,
          nombre: user.nombre,
          email: user.email,
          run: runVisible,
          rol: user.rol?.name || null,
          dateCreated: user.dateCreated,
          dateModified: user.dateModified,
          status: user.status,
          isDeleted: user.isDeleted,
          createdBy: user.createdBy,
          modifiedBy: user.modifiedBy,
        };
      });

      return {
        message: '✅ Usuarios encontrados con éxito',
        data: sanitizedUsers,
      };

    } catch (error) {
      return Utils.errorResponse(error);
    }
  }

  async getUserById(id: string): Promise<{ message: string; data?: any }> {
    try {
      const user = await this.usuarioRepository.findOne({
        where: { id, isDeleted: false },
        relations: ['rol'],
      });

      if (!user) {
        throw new NotFoundException(`❌ Usuario con ID ${id} no encontrado.`);
      }

      let runVisible = '****';

      try {
        const decryptedRun = this.encryptionService.decrypt(user.run);
        runVisible += decryptedRun.slice(-4);
      } catch (err) {
        runVisible += 'XXXX';
      }

      return {
        message: '✅ Usuario encontrado con éxito',
        data: {
          id: user.id,
          nombre: user.nombre,
          email: user.email,
          run: runVisible,
          rol: user.rol?.name || null,
          dateCreated: user.dateCreated,
          dateModified: user.dateModified,
          status: user.status,
          isDeleted: user.isDeleted,
          createdBy: user.createdBy,
          modifiedBy: user.modifiedBy,
        },
      };
    } catch (error) {
      return Utils.errorResponse(error);
    }
  }


  async editUser(dto: UpdateUsuarioDto, id: string): Promise<{ message: string }> {
    try {
      const user = await this.usuarioRepository.findOne({ where: { id, status: true, isDeleted: false }, });
      if (!user) {
        throw new NotFoundException(`❌ Usuario con ID ${id} no encontrado.`);
      }

      // Validar que el nuevo email no esté en uso por otro usuario
      if (dto.email && dto.email !== user.email) {
        const existing = await this.usuarioRepository.findOne({ where: { email: dto.email } });
        if (existing) {
          throw new ConflictException('⚠️ Ya existe un usuario con ese correo electrónico.');
        }
      }

      // Actualizar solo campos proporcionados
      if (dto.run) {
        user.run = this.encryptionService.encrypt(dto.run);
      }

      if (dto.nombre) {
        user.nombre = dto.nombre;
      }

      if (dto.email) {
        user.email = dto.email;
      }

      if (dto.password) {
        user.password = await bcrypt.hash(dto.password, 10);
      }

      if (dto.modifiedBy) {
        user.modifiedBy = dto.modifiedBy;
      }

      await this.usuarioRepository.save(user);

      return {
        message: '✅ Usuario actualizado con éxito.',
      };
    } catch (error) {
      return Utils.errorResponse(error);
    }
  }

  async desactivateUser(id: string, modifiedBy: string): Promise<{ message: string }> {
    try {
      const user = await this.usuarioRepository.findOne({ where: { id, isDeleted: false } });
      if (!user) {
        throw new NotFoundException(`❌ Usuario con ID ${id} no encontrado.`);
      }

      if (user.status === false) {
        throw new BadRequestException('⚠️ El usuario ya se encuentra desactivado.');
      }

      user.status = false;
      user.modifiedBy = modifiedBy;

      await this.usuarioRepository.save(user);

      return {
        message: '✅ Usuario desactivado con éxito.',
      };
    } catch (error) {
      return Utils.errorResponse(error);
    }
  }

  async deletedUser(id: string, modifiedBy: string): Promise<{ message: string }> {
    try {
      const user = await this.usuarioRepository.findOne({
        where: { id, isDeleted: false },
      });

      if (!user) {
        throw new NotFoundException(`❌ Usuario con ID ${id} no encontrado.`);
      }

      user.status = false;
      user.isDeleted = true;
      user.modifiedBy = modifiedBy;

      const emailParts = user.email.split('@');
      user.email = `${emailParts[0]}_DELETED_${user.id}@${emailParts[1]}`;

      await this.usuarioRepository.save(user);

      return {
        message: '✅ Usuario eliminado con éxito.',
      };
    } catch (error) {
      return Utils.errorResponse(error);
    }
  }

  async getUserProfile(userId: string) {
    try {
      const user = await this.usuarioRepository.findOne({
        where: { id: userId, status: true, isDeleted: false },
        relations: ['rol'],
      });

      if (!user) {
        throw new NotFoundException('❌ Usuario no encontrado.');
      }

      return {
        id: user.id,
        nombre: user.nombre,
        email: user.email,
        rol: user.rol?.name ?? 'Sin rol',
      };
    } catch (error) {
      return Utils.errorResponse(error);
    }
  }


}