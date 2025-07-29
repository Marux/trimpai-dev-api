import { BadRequestException, ConflictException, Injectable, NotFoundException, OnModuleInit, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Rol } from '../entities/Rol.entity';
import { Usuario } from '../entities/Usuario.entity';
import Utils from '../utils/error.utils'
import { CreateRolDto } from '../dto/create-rol.dto';
import * as bcrypt from 'bcryptjs';
import { UpdateRolDto } from '../dto/update-rol-dto.dto';


@Injectable()
export class RolService implements OnModuleInit {
    private readonly SYSTEM_USER_ID = '00000000-0000-0000-0000-000000000001';
    private readonly ADMIN_USER_ID = '00000000-0000-0000-0000-000000000002';
    private readonly ADMIN_ROL_NAME = 'Administrador';
    private readonly EDIT_ROL_NAME = 'Editor';
    private readonly USER_ROL_NAME = 'Usuario';
    private readonly GUEST_ROL_NAME = 'Invitado';
    private readonly logger = new Logger(RolService.name);

    constructor(
        @InjectRepository(Usuario)
        private readonly usuarioRepository: Repository<Usuario>,
        @InjectRepository(Rol)
        private rolRepository: Repository<Rol>,
    ) { }

    async onModuleInit() {
        await this.initializeSystemRolesAndAdmin();
    }

    private async initializeSystemRolesAndAdmin() {
        const requiredRoles = [
            this.ADMIN_ROL_NAME,
            this.EDIT_ROL_NAME,
            this.USER_ROL_NAME,
            this.GUEST_ROL_NAME
        ];

        const existingRoles = await this.rolRepository.findBy({
            name: In(requiredRoles)
        });

        const existingRoleNames = existingRoles.map(r => r.name);
        const missingRoles = requiredRoles.filter(name => !existingRoleNames.includes(name));

        for (const roleName of missingRoles) {
            await this.createRoleIfNotExists(roleName);
        }

        const adminRol = await this.rolRepository.findOneBy({ name: this.ADMIN_ROL_NAME });
        if (!adminRol) {
            throw new Error('No se pudo crear ni encontrar el rol de administrador.');
        }

        await this.createAdminUser(adminRol);
        await this.verifyAdminUser();
    }

    private async createRoleIfNotExists(roleName: string): Promise<void> {
        const existing = await this.rolRepository.findOneBy({ name: roleName });
        if (existing) {
            this.logger.log(`🔎 [RolService] Rol "${roleName}" ya existe, no se creará de nuevo.`);
            return;
        }

        const dto = {
            name: roleName,
            createdBy: this.SYSTEM_USER_ID,
        };

        const result = await this.createRol(dto);
        this.logger.log(`🛠️  [RolService] Rol ${roleName} creado automáticamente ✅`);
    }

    private async createAdminUser(adminRol: Rol): Promise<void> {
        const adminExists = await this.usuarioRepository.findOneBy({ id: this.ADMIN_USER_ID });

        if (!adminExists) {
            const hashedPassword = await bcrypt.hash(this.getDefaultAdminPassword(), 10);

            const adminUser = this.usuarioRepository.create({
                id: this.ADMIN_USER_ID,
                run: this.getDefaultAdminRun(),
                nombre: 'Administrador del Sistema',
                email: this.getDefaultAdminEmail(),
                password: hashedPassword,
                status: true,
                rol: adminRol,
                createdBy: this.SYSTEM_USER_ID,
                modifiedBy: this.SYSTEM_USER_ID,
            });

            await this.usuarioRepository.save(adminUser);
            this.logger.log('🛠️  [RolService] Usuario Administrador creado automáticamente ✅');
            this.logger.log(`🔐  Usuario ID: ${this.ADMIN_USER_ID}`);
            this.logger.log('⚠️  Recuerda cambiar la contraseña después del primer login!');
        }
    }

    private async verifyAdminUser(): Promise<void> {
        const adminUser = await this.usuarioRepository.findOne({
            where: { rol: { name: this.ADMIN_ROL_NAME } },
            relations: ['rol']
        });

        if (!adminUser) {
            this.logger.log('⚠️ [RolService] No se encontró usuario administrador. Creando uno por defecto...');
            const adminRol = await this.rolRepository.findOneBy({ name: this.ADMIN_ROL_NAME });
            if (!adminRol) {
                throw new NotFoundException('⚠️ Rol "Administrador" no encontrado, no se puede crear el usuario admin.');
            }
            await this.createAdminUser(adminRol);
        }
    }

    // Métodos para obtener valores por defecto (deberías usar variables de entorno ".env")
    private getDefaultAdminEmail(): string {
        return process.env.DEFAULT_ADMIN_EMAIL || 'admin@dominio.com';
    }

    private getDefaultAdminPassword(): string {
        return process.env.DEFAULT_ADMIN_PASSWORD || 'Admin1234!';
    }

    private getDefaultAdminRun(): string {
        return process.env.DEFAULT_ADMIN_RUN || '12345678-9';
    }

    async createRol(dto: CreateRolDto, userId?: string): Promise<{ message: string; data: Rol }> {
        try {
            // Usar el userId proporcionado o el del DTO (para backward compatibility)
            const createdBy = userId || dto.createdBy;

            if (!createdBy) {
                throw new BadRequestException('🔒 No se pudo identificar al usuario que está intentando crear el rol.');
            }

            const rol = this.rolRepository.create({
                name: dto.name,
                createdBy: createdBy,
            });

            const savedRol = await this.rolRepository.save(rol);
            return {
                message: '✅ Rol creado con éxito.',
                data: savedRol,
            };
        } catch (error) {
            if (error.code === 'ER_DUP_ENTRY') {
                throw new ConflictException(
                    `⚠️ Ya existe un rol con el nombre "${dto.name}".`
                );
            }
            return Utils.errorResponse(error);
        }
    }

    async getAll(): Promise<{ message: string; data: Rol[] }> {
        try {
            const rol = await this.rolRepository.find({
                where: { status: true, isDeleted: false },
            });

            return {
                message: 'Roles encontrados con exito',
                data: rol,
            }
        } catch (error) {
            return Utils.errorResponse(error);
        }
    }

    async getById(id: string): Promise<{ message: string; data: Rol }> {
        try {
            const rol = await this.rolRepository.findOneBy({ id });

            if (!rol || rol.isDeleted) {
                throw new NotFoundException('Rol no encontrado');
            }

            return {
                message: 'Rol encontrado con éxito',
                data: rol,
            };
        } catch (error) {
            return Utils.errorResponse(error);
        }
    }

    async updateRol(id: string, dto: UpdateRolDto): Promise<{ message: string; data: Rol }> {
        try {
            if (!dto.name || dto.name.trim() === '') {
                throw new BadRequestException('⚠️ Debes proporcionar un nuevo nombre para actualizar el rol.');
            }

            const rolResponse = await this.getById(id);
            const rol = rolResponse.data;

            if (dto.name) rol.name = dto.name;
            if (dto.modifiedBy) rol.modifiedBy = dto.modifiedBy;

            const updatedRol = await this.rolRepository.save(rol);

            return {
                message: '✅ Rol actualizado con éxito',
                data: updatedRol,
            };
        } catch (error) {
            if (error.code === 'ER_DUP_ENTRY') {
                throw new ConflictException(
                    `⚠️ Ya existe un rol con el nombre "${dto.name}".`
                );
            }
            return Utils.errorResponse(error);
        }
    }

    async inactiveRol(id: string, modifiedBy: string): Promise<{ message: string }> {
        try {
            const rol = await this.rolRepository.findOneBy({ id });

            if (!rol || rol.isDeleted) {
                throw new NotFoundException('❌ Rol no encontrado o ya fue eliminado.');
            }

            if (!rol.status) {
                throw new ConflictException('⚠️ Este rol ya está inactivo.');
            }

            rol.status = false;
            rol.modifiedBy = modifiedBy;
            rol.dateModified = new Date();

            await this.rolRepository.save(rol);

            return {
                message: '✅ Rol desactivado con éxito.',
            };

        } catch (error) {
            return Utils.errorResponse(error);
        }
    }



    async deleteRol(id: string, modifiedBy: string): Promise<{ message: string; }> {
        try {
            const rolResponse = await this.getById(id);
            const rol = rolResponse.data;

            rol.name = `${rol.name}_Delete_${id}`;

            rol.isDeleted = true;
            rol.status = false;
            rol.modifiedBy = modifiedBy;

            await this.rolRepository.save(rol);

            return {
                message: 'Rol eliminado con éxito',
            };
        } catch (error) {
            return Utils.errorResponse(error);
        }
    }
}
