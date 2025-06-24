// src/authService/guards/roles.guard.ts
import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (!requiredRoles) return true;

        const { user } = context.switchToHttp().getRequest();

        if (!requiredRoles.includes(user.rol)) {
            throw new ForbiddenException({
                statusCode: 403,
                error: '🚷 Acceso restringido',
                message: `⚠️ No tienes los permisos necesarios para acceder aquí.`,
            });
        }

        return true;
    }
}
