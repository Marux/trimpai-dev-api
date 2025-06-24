import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from "@nestjs/typeorm";
import { RoleServiceModule } from './roles/role.module';
import { AuthModule } from './authService/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),  // Habilita las variables de entorno
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
    RoleServiceModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
