import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CategoriaService } from './categoria.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { JwtAuthGuard } from '../authService/guards/jwt-auth.guard';
import { RolesGuard } from '../authService/guards/roles.guard';
import { Roles } from '../decorators/roles.decorator';
import { User } from '../decorators/user.decorator';
import { JwtPayload } from '../interfaces/jwt-payload.interface';

@Controller('categoria')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CategoriaController {
  constructor(private readonly categoriaService: CategoriaService) { }

  @Post()
  @Roles('Administrador')
  create(@Body() createCategoriaDto: CreateCategoriaDto, @User() user: JwtPayload) {
    return this.categoriaService.create(createCategoriaDto, user.sub);
  }

  @Get()
  @Roles('Administrador', 'Usuario', 'Editor')
  findAll() {
    return this.categoriaService.findAll();
  }

  @Get(':id')
  @Roles('Administrador', 'Usuario', 'Editor')
  findOne(@Param('id') id: string) {
    return this.categoriaService.findOne(id);
  }

  @Patch(':id')
  @Roles('Administrador')
  update(@Param('id') id: string, @Body() updateCategoriaDto: UpdateCategoriaDto, @User() user: JwtPayload) {
    return this.categoriaService.update(id, updateCategoriaDto, user.sub);
  }

  @Patch(':id/desactivate')
  @Roles('Administrador')
  desactivate(@Param('id') id: string, @User() user: JwtPayload) {
    return this.categoriaService.desactivate(id, user.sub);
  }

  @Patch(':id/reactivate')
  @Roles('Administrador')
  reactivate(@Param('id') id: string, @User() user: JwtPayload) {
    return this.categoriaService.reactivate(id, user.sub);
  }

  @Delete(':id')
  @Roles('Administrador')
  remove(@Param('id') id: string, @User() user: JwtPayload) {
    return this.categoriaService.remove(id, user.sub);
  }
}
