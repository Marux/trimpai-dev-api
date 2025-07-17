import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, DefaultValuePipe, ParseIntPipe } from '@nestjs/common';
import { NoticiasService } from './noticias.service';
import { CreateNoticiaDto } from './dto/create-noticia.dto';
import { UpdateNoticiaDto } from './dto/update-noticia.dto';
import { JwtAuthGuard } from '../authService/guards/jwt-auth.guard';
import { RolesGuard } from '../authService/guards/roles.guard';
import { User } from '../decorators/user.decorator';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { Roles } from '../decorators/roles.decorator';
import { Public } from '../decorators/public.decorator';
import { PublicNoticiaDto } from './dto/public-noticia.dto';

@Controller('noticias')
@UseGuards(JwtAuthGuard, RolesGuard)
export class NoticiasController {
  constructor(private readonly noticiasService: NoticiasService) { }

  @Post()
  @Roles('Administrador', 'Usuario', 'Editor')
  async create(
    @Body() createNoticiaDto: CreateNoticiaDto,
    @User() user: JwtPayload,
  ) {
    return await this.noticiasService.create(createNoticiaDto, user.sub);
  }

  @Get()
  @Public()
  async findAllPublic(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ): Promise<{
    message: string;
    noticias: PublicNoticiaDto[];
    total: number;
    page: number;
    lastPage: number;
    hasNext: boolean;
    hasPrevious: boolean;
  }> {
    // Limita el mínimo a 1 para evitar errores
    const pageNum = Math.max(1, page);
    const limitNum = Math.max(1, limit);

    return await this.noticiasService.findAllPublic(pageNum, limitNum);
  }


  @Get('/findAll')
  @Roles('Administrador', 'Usuario', 'Editor')
  async findAll() {
    return await this.noticiasService.findAll();
  }

  @Get('/getPendingRev')
  @Roles('Administrador', 'Usuario', 'Editor')
  async findAllPendientesParaRevision() {
    return await this.noticiasService.findAllPendientesParaRevision();
  }

  @Get(':id')
  @Public()
  async findOne(@Param('id') id: string) {
    return this.noticiasService.findOne(id);
  }

  @Patch(':id')
  @Roles('Administrador', 'Usuario', 'Editor')
  async update(@Param('id') id: string, @Body() updateNoticiaDto: UpdateNoticiaDto, @User() user: JwtPayload,) {
    return this.noticiasService.update(id, updateNoticiaDto, user.sub);
  }

  @Patch(':id/desactivate')
  @Roles('Administrador', 'Editor')
  async desactivate(@Param('id') id: string, @User() user: JwtPayload,) {
    return this.noticiasService.desactivate(id, user.sub);
  }

  @Patch(':id/reactivate')
  @Roles('Administrador', 'Editor')
  async reactivate(@Param('id') id: string, @User() user: JwtPayload,) {
    return this.noticiasService.reactivate(id, user.sub);
  }

  @Patch(':id/vigencia')
  @Roles('Administrador', 'Editor')
  async cambiarVigencia(
    @Param('id') id: string,
    @Body('vigente') vigente: boolean,
    @User() user: JwtPayload,
  ) {
    return this.noticiasService.setVigencia(id, vigente, user.sub);
  }

  @Delete(':id')
  @Roles('Administrador')
  async remove(@Param('id') id: string, @User() user: JwtPayload,) {
    return this.noticiasService.remove(id, user.sub);
  }
}
