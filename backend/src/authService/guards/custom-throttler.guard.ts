import {
    Injectable,
    ExecutionContext,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';
import type { ThrottlerLimitDetail } from '@nestjs/throttler';

@Injectable()
export class CustomThrottlerGuard extends ThrottlerGuard {
    /**
     * Lanza una excepción personalizada cuando se supera el límite de solicitudes.
     * @param context - El contexto de ejecución actual.
     * @param limit - Detalles del límite de solicitudes.
     */
    protected async throwThrottlingException(
        context: ExecutionContext,
        limit: ThrottlerLimitDetail,
    ): Promise<void> {
        throw new HttpException(
            {
                statusCode: HttpStatus.TOO_MANY_REQUESTS,
                message: 'Has superado el límite de solicitudes. Por favor, intenta más tarde.',
                error: 'Demasiadas solicitudes',
            },
            HttpStatus.TOO_MANY_REQUESTS,
        );
    }
}