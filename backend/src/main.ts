import { ValidationPipe, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { Request, Response, NextFunction } from 'express';
import { JwtAuthGuard } from './authService/guards/jwt-auth.guard';
import { RolesGuard } from './authService/guards/roles.guard';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import helmet from 'helmet';


class Application {
  private readonly logger = new Logger(Application.name);

  async bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.use(helmet());

    const reflector = app.get(Reflector);
    const jwtService = app.get(JwtService);

    app.useGlobalGuards(
      new JwtAuthGuard(jwtService, reflector),
      new RolesGuard(reflector),
    );

    // Configuración importante:
    app.use(cookieParser());

    const allowedOrigins =
      process.env.FRONTEND_ORIGINS?.split(',') ?? [];

    if (process.env.NODE_ENV === 'production' && allowedOrigins.length === 0) {
      this.logger.warn('⚠️ No hay orígenes permitidos definidos para producción.');
    }

    app.enableCors({
      origin: process.env.NODE_ENV !== 'production' ? true : allowedOrigins,
      credentials: true,
    });

    // Middleware para redirigir la raíz a /docs
    if (process.env.NODE_ENV !== 'production') {
      app.use((req: Request, res: Response, next: NextFunction) => {
        if (req.url === '/') {
          return res.redirect('/docs');
        }
        next();
      });
    }

    app.useGlobalPipes(new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }));

    // Swagger setup
    if (process.env.NODE_ENV !== 'production') {
      const config = new DocumentBuilder()
        .setTitle('Trimpai Dev API')
        .setDescription(`
          API central del portafolio y blog profesional de Víctor Trimpai.
          Tecnologías: Node.js/NestJS con autenticación JWT y MySQL.
          
          Funcionalidades principales:
          - Gestión de proyectos destacados
          - Publicaciones técnicas del blog
          - Sistema de autenticación seguro
          - Interacción con usuarios
          
          · Contacto: victor.trimpai1987@gmail.com 
          · GitHub: https://github.com/Marux
          · LinkedIn: https://www.linkedin.com/in/victor-trimpai-dev/
        `)
        .setVersion('1.0')
        .build();

      const document = SwaggerModule.createDocument(app, config);
      SwaggerModule.setup('docs', app, document);
    }

    const PORT = process.env.PORT || 3000;
    await app.listen(PORT, '0.0.0.0');

    console.clear();
    this.logger.log('✅ Aplicación iniciada correctamente');
    this.logger.log(`📡 Servidor escuchando en: http://localhost:${PORT}`);
    this.logger.log(`🌍 Entorno: ${process.env.NODE_ENV}`);
    if (process.env.NODE_ENV !== 'production') {
      this.logger.log(`📘 Swagger disponible en: http://localhost:${PORT}/docs`);
    }
  }
}

new Application().bootstrap();
