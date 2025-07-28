import { Controller, Post, Body, UseGuards, Put } from '@nestjs/common';
import { CategoriaNoticiaService } from './categoria-noticia.service';
import { CreateCategoriaNoticiaDto } from './dto/create-categoria-noticia.dto';
import { UpdateCategoriaNoticiaDto } from './dto/update-categoria-noticia.dto';
import { JwtAuthGuard } from '../authService/guards/jwt-auth.guard';
import { RolesGuard } from '../authService/guards/roles.guard';
import { Roles } from '../decorators/roles.decorator';
import { User } from '../decorators/user.decorator';
import { JwtPayload } from '../interfaces/jwt-payload.interface';

@Controller('categoria-noticia')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CategoriaNoticiaController {
  constructor(private readonly categoriaNoticiaService: CategoriaNoticiaService) { }

  @Post()
  @Roles('Administrador')
  create(@Body() createCategoriaNoticiaDto: CreateCategoriaNoticiaDto, @User() user: JwtPayload) {
    return this.categoriaNoticiaService.create(createCategoriaNoticiaDto, user.sub);
  }

  @Put('/actualizar-categorias')
  @Roles('Administrador', 'Usuario', 'Editor')
  updateCategorias(
    @Body() dto: UpdateCategoriaNoticiaDto,
    @User() user: JwtPayload,
  ) {
    return this.categoriaNoticiaService.updateCategorias(dto, user.sub);
  }
}