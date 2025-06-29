import { MiddlewareConsumer, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from '../entities/Usuario.entity';
import { Login } from '../entities/Login.entity';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import * as cookieParser from 'cookie-parser';
import { Rol } from '../entities/Rol.entity';
import { EncryptionService } from '../common/encryption.service';


@Module({
  imports: [
    TypeOrmModule.forFeature([Usuario, Login, Rol]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'fallback_secret',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [
    AuthService,
    EncryptionService,
  ],
  controllers: [AuthController],
  exports: [
    PassportModule,
    JwtModule,
    AuthService,
    EncryptionService,
  ],
})
export class AuthModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(cookieParser()).forRoutes('*');
  }
}