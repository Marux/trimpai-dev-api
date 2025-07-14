import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { RevisionesService } from './revisiones.service';
import { CreateRevisionDto } from './dto/create-revisione.dto';
import { JwtAuthGuard } from '../authService/guards/jwt-auth.guard';
import { RolesGuard } from '../authService/guards/roles.guard';
import { User } from '../decorators/user.decorator';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { Roles } from '../decorators/roles.decorator';

@Controller('revisiones')
@UseGuards(JwtAuthGuard, RolesGuard)
export class RevisionesController {
  constructor(private readonly revisionesService: RevisionesService) { }

  @Post()
  @Roles('Administrador', 'Editor')
  async revisarNoticia(@Body() dto: CreateRevisionDto, @User() user: JwtPayload) {
    return this.revisionesService.revisarNoticia(dto, user.sub);
  }
}
