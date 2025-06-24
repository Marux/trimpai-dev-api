//src/authService/rol.controller.ts
import { Body, Controller, Get, Param, Post, Put, Delete, UseGuards, Patch } from '@nestjs/common';
import { CreateRolDto } from '../dto/create-rol.dto';
import { RolService } from './rol.service';
import { JwtAuthGuard } from '../authService/guards/jwt-auth.guard';
import { RolesGuard } from '../authService/guards/roles.guard';
import { Roles } from '../authService/decorators/roles.decorator';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { User } from '../authService/decorators/user.decorator';
import { UpdateRolDto } from '../dto/update-rol-dto.dto';

@Controller('rol')
@UseGuards(JwtAuthGuard, RolesGuard) // 🔐 aplica a todos los endpoints de este controlador
export class RolController {
  constructor(private readonly rolService: RolService) { }

  @Post()
  @Roles('Administrador') // solo 'admin' puede acceder
  create(@Body() createRolDto: CreateRolDto, @User() user: JwtPayload) {
    return this.rolService.createRol(createRolDto, user.sub);
  }

  @Get()
  @Roles('Administrador') // solo 'admin' puede acceder
  getAll() {
    return this.rolService.getAll();
  }

  @Get(':id')
  @Roles('Administrador') // solo 'admin' puede acceder
  getById(@Param('id') id: string) {
    return this.rolService.getById(id);
  }

  @Patch(':id')
  @Roles('Administrador') // solo 'admin' puede acceder
  update( @Param('id') id: string, @Body() dto: UpdateRolDto, @User() user: JwtPayload
  ) {
    dto.modifiedBy = user.sub;

    return this.rolService.updateRol(id, dto);
  }
  @Patch('desactivate/:id')
  @Roles('Administrador') // solo 'admin' puede acceder
  desactivate(@Param('id') id: string, @User() user: JwtPayload) {
    return this.rolService.inactiveRol(id, user.sub);
  }

  @Delete(':id')
  @Roles('Administrador') // solo 'admin' puede acceder
  delete(@Param('id') id: string, @User() user: JwtPayload) {
    return this.rolService.deleteRol(id, user.sub);
  }
}
