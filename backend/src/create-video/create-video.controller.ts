import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CreateVideoService } from './create-video.service';
import { CreateCreateVideoDto } from './dto/create-create-video.dto';
import { UpdateCreateVideoDto } from './dto/update-create-video.dto';
import { JwtAuthGuard } from '../authService/guards/jwt-auth.guard';
import { RolesGuard } from '../authService/guards/roles.guard';
import { Roles } from '../decorators/roles.decorator';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { User } from '../decorators/user.decorator';

@Controller('create-video')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CreateVideoController {
  constructor(private readonly createVideoService: CreateVideoService) { }

  @Post()
  @Roles('Administrador', 'Usuario', 'Editor')
  create(@Param('id') id: string, @Body() createCreateVideoDto: CreateCreateVideoDto, @User() user: JwtPayload) {
    return this.createVideoService.create(id, createCreateVideoDto, user.sub);
  }

  @Get()
  @Roles('Administrador', 'Usuario', 'Editor')
  findAll() {
    return this.createVideoService.findAll();
  }

  @Get(':id')
  @Roles('Administrador', 'Usuario', 'Editor')
  findOne(@Param('id') id: string) {
    return this.createVideoService.findOne(id);
  }

  @Patch(':id')
  @Roles('Administrador', 'Usuario', 'Editor')
  update(@Param('id') id: string, @Body() updateCreateVideoDto: UpdateCreateVideoDto, @User() user: JwtPayload) {
    return this.createVideoService.update(id, updateCreateVideoDto, user.sub);
  }

  @Patch(':id/desactivate')
  @Roles('Administrador')
  desactivate(@Param('id') id: string, @User() user: JwtPayload) {
    return this.createVideoService.desactivate(id, user.sub);
  }

  @Patch(':id/reactivate')
  @Roles('Administrador')
  reactivate(@Param('id') id: string, @User() user: JwtPayload) {
    return this.createVideoService.reactivate(id, user.sub);
  }

  @Delete(':id')
  @Roles('Administrador')
  remove(@Param('id') id: string, @User() user: JwtPayload) {
    return this.createVideoService.remove(id, user.sub);
  }
}
