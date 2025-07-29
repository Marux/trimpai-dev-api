import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from "@nestjs/typeorm";
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerModule } from '@nestjs/throttler';
import { CustomThrottlerGuard } from './authService/guards/custom-throttler.guard'; 
import { RoleServiceModule } from './roles/role.module';
import { AuthModule } from './authService/auth.module';
import { NoticiasModule } from './noticias/noticias.module';
import { RevisionesModule } from './revisiones/revisiones.module';
import { EstadosModule } from './estados/estados.module';
import { CategoriaModule } from './categoria/categoria.module';
import { CategoriaNoticiaModule } from './categoria-noticia/categoria-noticia.module';
import { CreateParagraphsModule } from './create-paragraphs/create-paragraphs.module';
import { CreateImageModule } from './create-image/create-image.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: "mysql",
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT ?? '3306', 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      autoLoadEntities: true,
      synchronize: true,
    }),
    ThrottlerModule.forRoot([{
      ttl: 60000,
      limit: 10,
    }]),
    RoleServiceModule,
    AuthModule,
    NoticiasModule,
    RevisionesModule,
    EstadosModule,
    CategoriaModule,
    CategoriaNoticiaModule,
    CreateParagraphsModule,
    CreateImageModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: CustomThrottlerGuard,
    },
  ],
})
export class AppModule { }