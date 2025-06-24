///src/authService/auth.service.ts
import { Injectable, UnauthorizedException, NotFoundException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from '../entities/Usuario.entity';
import { Login } from '../entities/Login.entity';
import * as bcrypt from 'bcryptjs';
import Utils from '../utils/error.utils';
import { CreateUsuarioDto } from '../dto/create-user.dto';
import { Rol } from 'src/entities/Rol.entity';

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
  ) { }

  async validateUser(email: string, pass: string): Promise<Usuario | null> {
    try {
      const user = await this.usuarioRepository.findOne({
        where: { email },
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
        rol: user.rol?.nombre || 'user'
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

  async createUser(dto: CreateUsuarioDto): Promise<{ message: string; data: { id: string; nombre: string; email: string; } }> {
    try {
      const existing = await this.usuarioRepository.findOne({ where: { email: dto.email } });
      if (existing) {
        throw new ConflictException('⚠️ Ya existe un usuario con ese correo electrónico.');
      }

      const rol = await this.rolRepository.findOne({ where: { nombre: 'Usuario' } });
      if (!rol) {
        throw new NotFoundException('❌ Rol "Usuario" no encontrado en la base de datos.');
      }

      const hashedPassword = await bcrypt.hash(dto.password, 10);
      const hashedRut = await bcrypt.hash(dto.run, 10);

      const usuario = this.usuarioRepository.create({
        run: hashedRut,
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
}