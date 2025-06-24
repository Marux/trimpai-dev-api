//src/authService/auth.controller.ts
import { Controller, Post, Body, Res, Req, UnauthorizedException } from '@nestjs/common';
import { Response, Request } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from '../dto/login.dto';
import { CreateUsuarioDto } from '../dto/create-user.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('login')
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

    @Post('logout')
    async logout(@Res({ passthrough: true }) response: Response) {
        response.clearCookie('access_token');
        return { message: 'Logout exitoso' };
    }

    @Post('createUser')
    async createUser(@Body() dto: CreateUsuarioDto){
        return this.authService.createUser(dto);
    }
}