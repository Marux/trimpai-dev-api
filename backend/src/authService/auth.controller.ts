//src/authService/auth.controller.ts
import { Controller, Post, Body, Res, Req, UnauthorizedException, Patch, Param, Get, UseGuards, ParseUUIDPipe, BadRequestException } from '@nestjs/common';
import { Response, Request } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from '../dto/login.dto';
import { CreateUsuarioDto } from '../dto/create-user.dto';
import { UpdateUsuarioDto } from '../dto/update-user.dto';
import { Roles } from '../decorators/roles.decorator';
import { User } from '../decorators/user.decorator';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { JwtAuthGuard } from '../authService/guards/jwt-auth.guard';
import { RolesGuard } from '../authService/guards/roles.guard';
import { Public } from '../decorators/public.decorator';


@Controller('auth')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AuthController {
    constructor(private authService: AuthService) { }

    //login
    @Post('login')
    @Public()
    async login(
        @Body() loginDto: LoginDto,
        @Res({ passthrough: true }) response: Response,
        @Req() request: Request,
    ) {
        const user = await this.authService.validateUser(loginDto.email, loginDto.password);

        if (!user) {
            throw new UnauthorizedException('Credenciales inválidas');
        }

        // Asegurar que tenemos una IP válida
        const ipAddress = request.ip || 'unknown';

        const { accessToken } = await this.authService.login(user, ipAddress);

        response.cookie('access_token', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 3600000, // 1 hora
        });

        return { message: 'Login exitoso' };
    }

    //deslogin
    @Post('logout')
    @Public()
    async logout(@Res({ passthrough: true }) response: Response) {
        response.clearCookie('access_token');
        return { message: 'Logout exitoso' };
    }

    //creacion de usuario nuevo
    @Post('createUser')
    @Public()
    async createUser(@Body() dto: CreateUsuarioDto) {
        return this.authService.createUser(dto);
    }

    //editar usuario
    @Patch(':id')
    @Roles('Administrador', 'Usuario')
    async editUser(
        @Body() dto: UpdateUsuarioDto,
        @Param(
            'id',
            new ParseUUIDPipe({
                version: '4',
                exceptionFactory: (_errors) => {
                    return new BadRequestException(
                        `❌ El parámetro 'id' debe ser uno válido.`,
                    );
                },
            }),
        )
        id: string,
        @User() user: JwtPayload,
    ) {
        dto.modifiedBy = user.sub;
        return this.authService.editUser(dto, id);
    }

    //endpoint para obtener todos los usuarios
    @Get()
    @Roles('Administrador') // solo 'admin'puede acceder
    async getAllUsers() {
        return this.authService.getAlluser();
    }

}