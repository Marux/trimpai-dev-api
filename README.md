# 🚀 Portfolio Backend API

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
- **Sistema de Noticias**: Gestión completa de noticias con sistema de revisiones y estados
- **Sistema de Usuarios**: Autenticación segura con roles y permisos
- **Gestión de Estados**: Control centralizado de estados de workflow para noticias
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

### 📰 **Sistema de Noticias**
- Creación y gestión de noticias con contenido rich media
- Sistema de revisiones y aprobaciones
- Estados de publicación (pendiente, revisión, publicado)
- Gestión de vigencia de noticias
- Contador de visitas automático
- Soft delete para preservar datos
- Soporte para imágenes, videos y párrafos estructurados
- Categorización de noticias

### 🔄 **Gestión de Estados**
- Estados predefinidos para workflow de noticias
- Estados personalizables por administradores
- Sistema de activación/desactivación de estados
- Control de visibilidad pública de estados
- Seed automático de estados base al iniciar la aplicación
- Soft delete para preservar integridad de datos

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
- Sistema de workflow para noticias
- Gestión centralizada de estados
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
   cd backend
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

#### 🔄 Gestión de Estados (`/estados`)
| Método | Endpoint | Descripción | Requiere Auth | Rol Requerido |
|--------|----------|-------------|---------------|---------------|
| `GET` | `/estados` | Listar todos los estados | ✅ | Admin/Editor |
| `POST` | `/estados` | Crear nuevo estado | ✅ | Administrador |
| `GET` | `/estados/:id` | Obtener estado por ID | ✅ | Admin/Editor |
| `PATCH` | `/estados/:id` | Actualizar estado | ✅ | Administrador |
| `PATCH` | `/estados/:id/desactivate` | Desactivar estado | ✅ | Administrador |
| `PATCH` | `/estados/:id/reactivate` | Reactivar estado | ✅ | Administrador |
| `DELETE` | `/estados/:id` | Eliminar estado (soft delete) | ✅ | Administrador |

#### 📰 Gestión de Noticias (`/noticias`)
| Método | Endpoint | Descripción | Requiere Auth | Rol Requerido |
|--------|----------|-------------|---------------|---------------|
| `GET` | `/noticias` | Listar noticias públicas | ❌ | - |
| `GET` | `/noticias/findAll` | Listar todas las noticias | ✅ | Admin/Editor/Usuario |
| `GET` | `/noticias/getPendingRev` | Noticias pendientes de revisión | ✅ | Admin/Editor/Usuario |
| `GET` | `/noticias/:id` | Obtener noticia por ID | ❌ | - |
| `POST` | `/noticias` | Crear nueva noticia | ✅ | Admin/Editor/Usuario |
| `PATCH` | `/noticias/:id` | Actualizar noticia | ✅ | Admin/Editor/Usuario |
| `PATCH` | `/noticias/:id/desactivate` | Desactivar noticia | ✅ | Admin/Editor |
| `PATCH` | `/noticias/:id/reactivate` | Reactivar noticia | ✅ | Admin/Editor |
| `PATCH` | `/noticias/:id/vigencia` | Cambiar vigencia | ✅ | Admin/Editor |
| `DELETE` | `/noticias/:id` | Eliminar noticia (soft delete) | ✅ | Administrador |

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

### Sistema de Estados

#### 📊 **Estados Predefinidos**
El sistema crea automáticamente los siguientes estados base:
- **Pendiente de Revisión** (No público)
- **Aprobado** (Público)
- **Rechazado** (No público)
- **Solicitud de Cambio** (No público)

#### 🔄 **Crear Estado**
```javascript
POST /estados
{
  "nombre": "En Revisión Técnica",
  "publica": false
}

// Respuesta
{
  "message": "✅ Estado creado exitosamente",
  "data": {
    "id": "uuid-del-estado",
    "nombre": "En Revisión Técnica",
    "publica": false,
    "status": true,
    "createdBy": "uuid-del-usuario"
  }
}
```

#### 🔍 **Obtener Estados**
```javascript
GET /estados
// Respuesta
{
  "message": "✅ Listado de estados",
  "data": [
    {
      "id": "uuid",
      "nombre": "Pendiente de Revisión",
      "publica": false,
      "status": true,
      "createdBy": "system"
    },
    {
      "id": "uuid",
      "nombre": "Aprobado",
      "publica": true,
      "status": true,
      "createdBy": "system"
    }
  ]
}
```

#### ⚙️ **Gestión de Estados**
```javascript
// Desactivar estado
PATCH /estados/{id}/desactivate
// Respuesta: "✅ Estado desactivado exitosamente"

// Reactivar estado
PATCH /estados/{id}/reactivate
// Respuesta: "✅ Estado re-activado exitosamente"

// Actualizar estado
PATCH /estados/{id}
{
  "nombre": "Nuevo nombre",
  "publica": true
}
// Respuesta: "✅ Estado actualizado exitosamente"
```

### Sistema de Noticias

#### 📝 **Crear Noticia**
```javascript
POST /noticias
{
  "titulo": "Mi primera noticia",
  "descripcion": "Descripción de la noticia",
  "contenido": "Contenido completo de la noticia..."
}

// Respuesta
{
  "message": "✅ Noticia creada exitosamente y marcada como pendiente de revisión",
  "id": "uuid-de-la-noticia"
}
```

#### 🔍 **Obtener Noticias Públicas**
```javascript
GET /noticias
// Respuesta
{
  "message": "✅ Se encontraron 5 noticias publicadas",
  "noticias": [
    {
      "id": "uuid",
      "titulo": "Título de la noticia",
      "descripcion": "Descripción",
      "visitas": 42,
      "usuario": {
        "nombre": "Víctor Trimpai"
      },
      "imagenes": [...],
      "categorias": [...],
      "parrafos": [...],
      "videos": [...]
    }
  ]
}
```

#### 📊 **Estados de Noticias**
Las noticias utilizan el sistema de estados para su workflow:
- **Pendiente de Revisión**: Estado inicial al crear una noticia
- **En Revisión**: Cuando está siendo revisada por un editor
- **Aprobada**: Lista para publicación
- **Publicada**: Visible públicamente
- **Rechazada**: Necesita correcciones

#### 🔄 **Workflow de Noticias**
1. **Creación**: Usuario crea noticia → Estado "Pendiente de Revisión"
2. **Revisión**: Editor/Admin revisa → Cambia a estado apropiado
3. **Publicación**: Si está aprobada → Se puede publicar
4. **Gestión**: Cambiar vigencia, desactivar o reactivar

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
│   ├── guards/
│   │   ├── jwt-auth.guard.ts
│   │   └── roles.guard.ts
│   └── auth.module.ts
├── roles/                 # Módulo de roles
│   ├── role.controller.ts
│   ├── role.service.ts
│   └── role.module.ts
├── estados/               # Módulo de estados
│   ├── estados.controller.ts
│   ├── estados.service.ts
│   ├── dto/
│   │   ├── create-estado.dto.ts
│   │   └── update-estado.dto.ts
│   └── estados.module.ts
├── noticias/              # Módulo de noticias
│   ├── noticias.controller.ts
│   ├── noticias.service.ts
│   ├── dto/
│   │   ├── create-noticia.dto.ts
│   │   ├── update-noticia.dto.ts
│   │   └── public-noticia.dto.ts
│   └── noticias.module.ts
├── entities/              # Entidades de base de datos
│   ├── Usuario.entity.ts
│   ├── Rol.entity.ts
│   ├── Login.entity.ts
│   ├── Noticia.entity.ts
│   ├── Revision.entity.ts
│   └── Estado.entity.ts
├── decorators/            # Decoradores personalizados
│   ├── user.decorator.ts
│   ├── roles.decorator.ts
│   └── public.decorator.ts
├── interfaces/            # Interfaces TypeScript
│   └── jwt-payload.interface.ts
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
- ✅ **Guards de roles** para control de acceso
- ✅ **Endpoints públicos** claramente marcados
- ✅ **Soft delete** para preservar integridad de datos
- ✅ **Rate limiting** (recomendado para producción)
- ✅ **Sanitización de datos** automática

### Usuario Administrador por Defecto

Al iniciar la aplicación por primera vez, se crea automáticamente:

- **Email**: El configurado en `DEFAULT_ADMIN_EMAIL`
- **Contraseña**: La configurada en `DEFAULT_ADMIN_PASSWORD`
- **Rol**: Administrador con todos los permisos

### Estados Base

Al iniciar la aplicación, se crean automáticamente los estados base necesarios para el workflow de noticias:
- **Pendiente de Revisión** (No público)
- **Aprobado** (Público)
- **Rechazado** (No público)
- **Solicitud de Cambio** (No público)

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

- **Railway**, **Render**, **DigitalOcean App Platform**
- **AWS EC2** con PM2 para gestión de procesos
- **Google Cloud Run** para contenedores
- **VPS** con Docker Compose

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
- 📰 Mejoras en el sistema de noticias
- 🔄 Mejoras en el sistema de estados
- 📊 Implementar sistema de notificaciones
- 🐛 Reportar y corregir bugs

> **Nota**: Como el proyecto está en construcción, algunas funcionalidades pueden cambiar. ¡Mantente al día con los issues y discussions!

## 📞 Contacto

**Víctor Trimpai** - Desarrollador Full Stack

- 📧 **Email**: victor.trimpai1987@gmail.com
- 💼 **LinkedIn**: [linkedin.com/in/victor-trimpai-dev](https://www.linkedin.com/in/victor-trimpai-dev/)
- 🐙 **GitHub**: [github.com/Marux](https://github.com/Marux)
- 🌐 **Portfolio**: [🚧 En construcción - Powered by this API! 🚧]

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

> **Nota**: Proyecto en desarrollo - La licencia puede actualizarse según evolucione el proyecto.

---

<p align="center">
  <strong>🚧 Proyecto en desarrollo activo 🚧</strong><br>
  <sub>Si encuentras algún bug o tienes sugerencias, ¡no dudes en abrir un issue!</sub>
</p>

<p align="center">
  <strong>¿Te gusta este proyecto? ¡Dale una ⭐ en GitHub!</strong><br>
  <sub>Desarrollado con ❤️ para la comunidad de desarrolladores</sub>
</p>