// src/authService/authService.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rol } from '../entities/Rol.entity';
import { Usuario } from '../entities/Usuario.entity';
import { RolService } from './rol.service';
import { RolController } from './rol.controller'
import { AuthModule } from '../authService/auth.module'; 


@Module({
  imports: [TypeOrmModule.forFeature([Rol, Usuario]),
  AuthModule],
  providers: [RolService],
  controllers: [RolController],
  exports: [RolService],
})
export class RoleServiceModule {}
