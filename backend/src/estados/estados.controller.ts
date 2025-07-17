import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { EstadosService } from './estados.service';
import { CreateEstadoDto } from './dto/create-estado.dto';
import { UpdateEstadoDto } from './dto/update-estado.dto';
import { JwtAuthGuard } from '../authService/guards/jwt-auth.guard';
import { RolesGuard } from '../authService/guards/roles.guard';
import { Roles } from '../decorators/roles.decorator';
import { User } from '../decorators/user.decorator';
import { JwtPayload } from '../interfaces/jwt-payload.interface';

@Controller('estados')
@UseGuards(JwtAuthGuard, RolesGuard)
export class EstadosController {
  constructor(private readonly estadosService: EstadosService) { }

  @Post()
  @Roles('Administrador')
  create(@Body() createEstadoDto: CreateEstadoDto,
    @User() user: JwtPayload,) {
    return this.estadosService.create(createEstadoDto, user.sub);
  }

  @Get()
  @Roles('Administrador', 'Editor')
  findAll() {
    return this.estadosService.findAll();
  }

  @Get(':id')
  @Roles('Administrador','Editor')
  findOne(@Param('id') id: string) {
    return this.estadosService.findOne(id);
  }

  @Patch(':id')
  @Roles('Administrador')
  update(@Param('id') id: string, @Body() updateEstadoDto: UpdateEstadoDto, @User() user: JwtPayload,) {
    return this.estadosService.update(id, updateEstadoDto, user.sub);
  }

  @Patch(':id/desactivate')
  @Roles('Administrador')
  desactivate(@Param('id') id: string, @User() user: JwtPayload) {
    return this.estadosService.desactivate(id, user.sub);
  }

  @Patch(':id/reactivate')
  @Roles('Administrador')
  reactivate(@Param('id') id: string, @User() user: JwtPayload) {
    return this.estadosService.reactivate(id, user.sub);
  }

  @Delete(':id')
  @Roles('Administrador')
  remove(@Param('id') id: string, @User() user: JwtPayload) {
    return this.estadosService.remove(id, user.sub);
  }
}
