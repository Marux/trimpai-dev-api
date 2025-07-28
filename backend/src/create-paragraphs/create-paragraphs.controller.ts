import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CreateParagraphsService } from './create-paragraphs.service';
import { CreateCreateParagraphDto } from './dto/create-create-paragraph.dto';
import { UpdateCreateParagraphDto } from './dto/update-create-paragraph.dto';
import { JwtAuthGuard } from '../authService/guards/jwt-auth.guard';
import { RolesGuard } from '../authService/guards/roles.guard';
import { Roles } from '../decorators/roles.decorator';
import { User } from '../decorators/user.decorator';
import { JwtPayload } from '../interfaces/jwt-payload.interface';

@Controller('create-paragraphs')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CreateParagraphsController {
  constructor(private readonly createParagraphsService: CreateParagraphsService) { }

  @Post(':id')
  @Roles('Administrador', 'Usuario', 'Editor')
  create(
    @Param('id') id: string,
    @Body() createCreateParagraphDto: CreateCreateParagraphDto,
    @User() user: JwtPayload,
  ) {
    return this.createParagraphsService.create(id, createCreateParagraphDto, user.sub);
  }

  @Get()
  @Roles('Administrador', 'Usuario', 'Editor')
  findAll() {
    return this.createParagraphsService.findAll();
  }

  @Get(':id')
  @Roles('Administrador', 'Usuario', 'Editor')
  findOne(@Param('id') id: string) {
    return this.createParagraphsService.findOne(id);
  }

  @Patch(':id')
  @Roles('Administrador', 'Usuario', 'Editor')
  update(@Param('id') id: string, @Body() updateCreateParagraphDto: UpdateCreateParagraphDto, @User() user: JwtPayload) {
    return this.createParagraphsService.update(id, updateCreateParagraphDto, user.sub);
  }

  @Patch(':id/desactivate')
  @Roles('Administrador')
  desactivate(@Param('id') id: string, @User() user: JwtPayload) {
    return this.createParagraphsService.desactivate(id, user.sub);
  }

  @Patch(':id/reactivate')
  @Roles('Administrador')
  reactivate(@Param('id') id: string, @User() user: JwtPayload) {
    return this.createParagraphsService.reactivate(id, user.sub);
  }

  @Delete(':id')
  @Roles('Administrador')
  remove(@Param('id') id: string, @User() user: JwtPayload) {
    return this.createParagraphsService.remove(id, user.sub);
  }
}
