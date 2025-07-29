import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CreateImageService } from './create-image.service';
import { CreateCreateImageDto } from './dto/create-create-image.dto';
import { UpdateCreateImageDto } from './dto/update-create-image.dto';
import { Roles } from '../decorators/roles.decorator';
import { JwtAuthGuard } from '../authService/guards/jwt-auth.guard';
import { RolesGuard } from '../authService/guards/roles.guard';
import { User } from '../decorators/user.decorator';
import { JwtPayload } from '../interfaces/jwt-payload.interface';

@Controller('create-image')
@UseGuards(JwtAuthGuard, RolesGuard)

export class CreateImageController {
  constructor(private readonly createImageService: CreateImageService) { }

  @Post(':id')
  @Roles('Administrador', 'Usuario', 'Editor')
  create(@Param('id') id: string, @Body() createCreateImageDto: CreateCreateImageDto, @User() user: JwtPayload) {
    return this.createImageService.create(id, createCreateImageDto, user.sub);
  }

  @Get()
  @Roles('Administrador', 'Usuario', 'Editor')
  findAll() {
    return this.createImageService.findAll();
  }

  @Get(':id')
  @Roles('Administrador', 'Usuario', 'Editor')
  findOne(@Param('id') id: string) {
    return this.createImageService.findOne(id);
  }

  @Patch(':id')
  @Roles('Administrador', 'Usuario', 'Editor')
  update(@Param('id') id: string, @Body() updateCreateImageDto: UpdateCreateImageDto, @User() user: JwtPayload) {
    return this.createImageService.update(id, updateCreateImageDto, user.sub);
  }

  @Patch(':id/desactivate')
  @Roles('Administrador')
  desactivate(@Param('id') id: string, @User() user: JwtPayload) {
    return this.createImageService.desactivate(id, user.sub);
  }

  @Patch(':id/reactivate')
  @Roles('Administrador')
  reactivate(@Param('id') id: string, @User() user: JwtPayload) {
    return this.createImageService.reactivate(id, user.sub);
  }

  @Delete(':id')
  @Roles('Administrador')
  remove(@Param('id') id: string, @User() user: JwtPayload) {
    return this.createImageService.remove(id, user.sub);
  }
}
