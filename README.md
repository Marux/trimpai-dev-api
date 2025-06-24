## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

> **Nota**: Proyecto en desarrollo - La licencia puede actualizarse según evolucione el proyecto.# 🚀 Portfolio Backend API

<p align="center">
  <a href="http://nestjs.com/" target="blank">
    <img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" />
  </a>
</p>

<p align="center">
  <strong>API backend profesional para portafolio y blog personal</strong><br>
  Construida con NestJS, TypeScript, JWT Authentication y MySQL
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Estado-🚧%20En%20Construcción-yellow" alt="En Construcción" />
  <img src="https://img.shields.io/badge/Versión-1.0.0--dev-orange" alt="Versión" />
  <img src="https://img.shields.io/badge/NestJS-E0234E?style=flat&logo=nestjs&logoColor=white" alt="NestJS" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white" alt="TypeScript" />
</p>

<p align="center">
  <a href="#-características">Características</a> •
  <a href="#-tecnologías">Tecnologías</a> •
  <a href="#-instalación">Instalación</a> •
  <a href="#-api-documentation">API Docs</a> •
  <a href="#-contacto">Contacto</a>
</p>

---

> **⚠️ PROYECTO EN DESARROLLO**  
> Esta API está actualmente en construcción como parte del desarrollo del portafolio personal. Algunas funcionalidades pueden estar incompletas o sujetas a cambios.

## 📋 Descripción

Esta es la API central del portafolio y blog profesional de **Víctor Trimpai**. Una aplicación backend robusta y escalable que proporciona todos los servicios necesarios para gestionar proyectos, publicaciones de blog y la interacción con usuarios de manera segura y eficiente.

### 🎯 Propósito

- **Portafolio Digital**: Gestión de proyectos destacados y información profesional
- **Blog Técnico**: Plataforma para compartir experiencias y conocimientos en desarrollo
- **Sistema de Usuarios**: Autenticación segura con roles y permisos
- **API RESTful**: Endpoints bien documentados para integración con frontend

## ✨ Características

### 🔐 **Autenticación y Seguridad**
- Autenticación JWT con cookies seguras
- Sistema de roles (Administrador, Editor, Usuario, Invitado)
- Encriptación de contraseñas con bcrypt
- Validación de datos con class-validator
- CORS habilitado para frontend

### 👥 **Gestión de Usuarios**
- Registro y login de usuarios
- Perfiles de usuario con información profesional
- Sistema de permisos basado en roles
- Seguimiento de actividad de login

### 🏗️ **Arquitectura Sólida**
- Patrón Repository con TypeORM
- Inyección de dependencias
- Manejo centralizado de errores
- Validación automática de DTOs
- Documentación automática con Swagger

### 🛠️ **Administración**
- Panel administrativo automático
- Usuario administrador por defecto
- Gestión completa de roles y permisos
- Logs detallados del sistema

## 🔧 Tecnologías

| Categoría | Tecnologías |
|-----------|-------------|
| **Framework** | NestJS, Node.js, TypeScript |
| **Base de Datos** | MySQL, TypeORM |
| **Autenticación** | JWT, bcrypt, Passport |
| **Validación** | class-validator, class-transformer |
| **Documentación** | Swagger/OpenAPI |
| **Contenedores** | Docker, Docker Compose |
| **Herramientas** | pnpm, ESLint, Prettier |

## 🚀 Instalación

### Prerequisitos

- Node.js (v18 o superior)
- pnpm
- MySQL 8.0
- Docker (opcional)

### Opción 1: Instalación Local

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/tuusuario/portfolio-backend.git
   cd portfolio-backend
   ```

2. **Instalar dependencias**
   ```bash
   pnpm install
   ```

3. **Configurar variables de entorno**
   ```bash
   cp .env.example .env
   ```
   
   Edita el archivo `.env` con tus configuraciones:
   ```env
   # Base de datos
   DB_HOST=localhost
   DB_PORT=3306
   DB_USERNAME=tu_usuario
   DB_PASSWORD=tu_password
   DB_DATABASE=portfolio_db
   
   # JWT
   JWT_SECRET=tu_jwt_secret_muy_seguro
   
   # Usuario Admin por defecto
   DEFAULT_ADMIN_EMAIL=admin@tudominio.com
   DEFAULT_ADMIN_PASSWORD=TuPasswordSeguro123!
   DEFAULT_ADMIN_RUN=12345678-9
   ```

4. **Ejecutar la aplicación**
   ```bash
   # Desarrollo
   pnpm run start:dev
   
   # Producción
   pnpm run start:prod
   ```

### Opción 2: Docker Compose

1. **Preparar el entorno**
   ```bash
   cd backend
   pnpm install
   ```

2. **Configurar variables de entorno para Docker**
   ```bash
   cp .env.example .env
   ```
   
   Ejemplo de configuración `.env` para Docker:
   ```env
   # Base de datos (para Docker)
   DB_HOST=mysql_db
   DB_PORT=3306
   DB_USERNAME=user_crud
   DB_PASSWORD=root
   DB_DATABASE=db_crud
   
   # JWT
   JWT_SECRET=s3cr3t_cl4ve_supersegura
   JWT_EXPIRES_IN=1h
   
   # Usuario Admin por defecto
   DEFAULT_ADMIN_EMAIL=admin@blog.com
   DEFAULT_ADMIN_PASSWORD=UnaContraseñaMuySegura123!
   DEFAULT_ADMIN_RUN=12345678-9
   ```

3. **Levantar los servicios**
   ```bash
   docker-compose up -d
   ```

La aplicación estará disponible en `http://localhost:3000`

## 📖 API Documentation

### Swagger UI
Una vez que la aplicación esté ejecutándose, visita:
- **Documentación interactiva**: `http://localhost:3000/docs`
- **Redirección automática**: `http://localhost:3000/` → `/docs`

### Endpoints Principales

#### 🔐 Autenticación (`/auth`)
| Método | Endpoint | Descripción | Requiere Auth | Rol Requerido |
|--------|----------|-------------|---------------|---------------|
| `POST` | `/auth/login` | Iniciar sesión | ❌ | - |
| `POST` | `/auth/logout` | Cerrar sesión | ❌ | - |
| `POST` | `/auth/createUser` | Registrar nuevo usuario | ❌ | - |

#### 👥 Gestión de Roles (`/rol`)
| Método | Endpoint | Descripción | Requiere Auth | Rol Requerido |
|--------|----------|-------------|---------------|---------------|
| `GET` | `/rol` | Listar todos los roles | ✅ | Administrador |
| `POST` | `/rol` | Crear nuevo rol | ✅ | Administrador |
| `GET` | `/rol/:id` | Obtener rol por ID | ✅ | Administrador |
| `PATCH` | `/rol/:id` | Actualizar rol | ✅ | Administrador |
| `PATCH` | `/rol/desactivate/:id` | Desactivar rol | ✅ | Administrador |
| `DELETE` | `/rol/:id` | Eliminar rol | ✅ | Administrador |

### Autenticación

La API utiliza **JWT con cookies HTTP-only** para la autenticación. El flujo es el siguiente:

#### 🔑 **Proceso de Login**
```javascript
// Request al login
POST /auth/login
{
  "email": "usuario@email.com",
  "password": "tu_password"
}

// Respuesta exitosa
{
  "message": "Login exitoso"
}

// El JWT se almacena automáticamente en una cookie HTTP-only
// Cookie: access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

#### 🚪 **Logout**
```javascript
POST /auth/logout
// Respuesta
{
  "message": "Logout exitoso"
}
// La cookie se elimina automáticamente
```

#### 🛡️ **Endpoints Protegidos**
Los endpoints protegidos requieren:
- **JWT válido** (enviado automáticamente via cookie)
- **Rol apropiado** (verificado por guards)

#### 👤 **Registro de Usuarios**
```javascript
POST /auth/createUser
{
  "run": "12345678-9",
  "nombre": "Juan Pérez",
  "email": "juan@email.com",
  "password": "password123"
}
```

> **Nota**: Los nuevos usuarios se crean automáticamente con rol "Usuario"

## 🧪 Testing

```bash
# Tests unitarios
pnpm run test

# Tests e2e
pnpm run test:e2e

# Cobertura de tests
pnpm run test:cov
```

## 📁 Estructura del Proyecto

```
src/
├── authService/           # Módulo de autenticación
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   └── auth.module.ts
├── roles/                 # Módulo de roles
│   ├── role.controller.ts
│   ├── role.service.ts
│   └── role.module.ts
├── entities/              # Entidades de base de datos
│   ├── Usuario.entity.ts
│   ├── Rol.entity.ts
│   └── Login.entity.ts
├── dto/                   # Data Transfer Objects
│   ├── create-user.dto.ts
│   └── create-rol.dto.ts
├── utils/                 # Utilidades
│   └── error.utils.ts
├── app.module.ts          # Módulo principal
└── main.ts               # Punto de entrada
```

## 🔒 Seguridad

### Características de Seguridad Implementadas

- ✅ **Encriptación de contraseñas** con bcrypt
- ✅ **JWT tokens** para autenticación stateless
- ✅ **Validación de entrada** con class-validator
- ✅ **CORS configurado** para frontends específicos
- ✅ **Cookies seguras** con httpOnly
- ✅ **Rate limiting** (recomendado para producción)
- ✅ **Sanitización de datos** automática

### Usuario Administrador por Defecto

Al iniciar la aplicación por primera vez, se crea automáticamente:

- **Email**: El configurado en `DEFAULT_ADMIN_EMAIL`
- **Contraseña**: La configurada en `DEFAULT_ADMIN_PASSWORD`
- **Rol**: Administrador con todos los permisos

> ⚠️ **Importante**: Cambia las credenciales por defecto después del primer login

## 🚢 Deployment

### Preparación para Producción

1. **Variables de entorno de producción**
   ```bash
   NODE_ENV=production
   JWT_SECRET=tu_jwt_secret_muy_seguro_para_produccion
   ```

2. **Build del proyecto**
   ```bash
   pnpm run build
   pnpm run start:prod
   ```

### Plataformas Recomendadas

- **NestJS Mau**: Plataforma oficial para deployment en AWS
  ```bash
  pnpm install -g @nestjs/mau
  mau deploy
  ```

- **Heroku**, **Railway**, **DigitalOcean App Platform**
- **VPS** con PM2 para gestión de procesos

## 🤝 Contribución

¡Las contribuciones son bienvenidas! Este proyecto está en desarrollo activo, por lo que hay muchas oportunidades para colaborar.

### 🛠️ **Cómo contribuir:**

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

### 🎯 **Áreas donde puedes ayudar:**
- 📝 Mejorar documentación
- 🧪 Agregar tests unitarios y e2e
- 🔒 Mejorar medidas de seguridad
- 🚀 Optimización de performance
- 🐛 Reportar y corregir bugs

> **Nota**: Como el proyecto está en construcción, algunas funcionalidades pueden cambiar. ¡Mantente al día con los issues y discussions!

## 📞 Contacto

**Víctor Trimpai** - Desarrollador Full Stack

- 📧 **Email**: victor.trimpai1987@gmail.com
- 💼 **LinkedIn**: [linkedin.com/in/victor-trimpai-dev](https://www.linkedin.com/in/victor-trimpai-dev/)
- 🐙 **GitHub**: [github.com/Marux](https://github.com/Marux)
- 🌐 **Portfolio**: [🚧 En construcción - Powered by this API! 🚧]

---

<p align="center">
  <strong>🚧 Proyecto en desarrollo activo 🚧</strong><br>
  <sub>Si encuentras algún bug o tienes sugerencias, ¡no dudes en abrir un issue!</sub>
</p>

<p align="center">
  <strong>¿Te gusta este proyecto? ¡Dale una ⭐ en GitHub!</strong><br>
  <sub>Desarrollado con ❤️ para la comunidad de desarrolladores</sub>
</p>