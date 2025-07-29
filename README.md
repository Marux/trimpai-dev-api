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
- **Sistema de Categorías**: Organización y clasificación de contenido
- **Gestión de Párrafos**: Sistema modular para contenido estructurado
- **API RESTful**: Endpoints bien documentados para integración con frontend

## ✨ Características

### 🔐 **Autenticación y Seguridad**
- Autenticación JWT con cookies seguras
- Sistema de roles (Administrador, Editor, Usuario, Invitado)
- Encriptación de contraseñas con bcrypt
- Validación de datos con class-validator
- CORS habilitado para frontend
- **🛡️ Rate Limiting Global**: Protección contra ataques de fuerza bruta y spam
  - Límite de 10 solicitudes por minuto por IP
  - Respuestas personalizadas en español
  - Guard personalizado con manejo de excepciones

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

### ✏️ **Sistema de Párrafos**
- Gestión modular de contenido por párrafos
- Orden automático de párrafos dentro de noticias
- Vinculación directa con noticias específicas
- Control de estados (activo/inactivo)
- Soft delete para preservar integridad referencial
- Transformación de datos con DTOs
- Control de acceso por roles

### 🏷️ **Sistema de Categorías**
- Gestión completa de categorías para organizar noticias y contenido
- Categorías predefinidas (Tecnología, IA, Noticias, Cultura)
- Creación, edición y eliminación de categorías personalizadas
- Activación/desactivación de categorías
- Soft delete para preservar integridad referencial
- Control de duplicados automático
- Seed automático de categorías base
- Restricciones de seguridad por roles

### 📝 **Sistema de Revisiones**
- Workflow completo de revisión de noticias
- Asignación de estados mediante revisiones
- Trazabilidad completa de cambios
- Sistema de comentarios por revisión
- Publicación automática según estado aplicado
- Control de acceso por roles (Admin/Editor)

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
- Gestión centralizada de estados y categorías
- Logs detallados del sistema

## 🔧 Tecnologías

| Categoría | Tecnologías |
|-----------|-------------|
| **Framework** | NestJS, Node.js, TypeScript |
| **Base de Datos** | MySQL, TypeORM |
| **Autenticación** | JWT, bcrypt, Passport |
| **Validación** | class-validator, class-transformer |
| **Seguridad** | ThrottlerModule (Rate Limiting) |
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

### 🛡️ Rate Limiting

La API implementa un sistema de rate limiting global para proteger contra ataques y abuso:

#### **⚡ Configuración Actual**
- **Límite**: 10 solicitudes por minuto por dirección IP
- **Ventana de tiempo**: 60 segundos (1 minuto)
- **Aplicación**: Global (todos los endpoints)

#### **📝 Respuesta de Rate Limiting**
Cuando se supera el límite, la API responde con:
```json
{
  "statusCode": 429,
  "message": "Has superado el límite de solicitudes. Por favor, intenta más tarde.",
  "error": "Demasiadas solicitudes"
}
```

#### **🔧 Headers de Rate Limiting**
La API incluye headers informativos:
- `X-RateLimit-Limit`: Límite máximo de solicitudes
- `X-RateLimit-Remaining`: Solicitudes restantes en la ventana actual
- `X-RateLimit-Reset`: Timestamp cuando se resetea la ventana

#### **💡 Recomendaciones para Desarrolladores**
- Implementa retry logic con backoff exponencial
- Cachea respuestas cuando sea posible
- Monitorea los headers de rate limiting
- Considera usar paginación para endpoints que retornan muchos datos

### Endpoints Principales

#### 🔐 Autenticación (`/auth`)
| Método | Endpoint | Descripción | Requiere Auth | Rol Requerido | Rate Limit |
|--------|----------|-------------|---------------|---------------|------------|
| `POST` | `/auth/login` | Iniciar sesión | ❌ | - | ✅ 10/min |
| `POST` | `/auth/logout` | Cerrar sesión | ❌ | - | ✅ 10/min |
| `POST` | `/auth/createUser` | Registrar nuevo usuario | ❌ | - | ✅ 10/min |

#### 👥 Gestión de Roles (`/rol`)
| Método | Endpoint | Descripción | Requiere Auth | Rol Requerido | Rate Limit |
|--------|----------|-------------|---------------|---------------|------------|
| `GET` | `/rol` | Listar todos los roles | ✅ | Administrador | ✅ 10/min |
| `POST` | `/rol` | Crear nuevo rol | ✅ | Administrador | ✅ 10/min |
| `GET` | `/rol/:id` | Obtener rol por ID | ✅ | Administrador | ✅ 10/min |
| `PATCH` | `/rol/:id` | Actualizar rol | ✅ | Administrador | ✅ 10/min |
| `PATCH` | `/rol/desactivate/:id` | Desactivar rol | ✅ | Administrador | ✅ 10/min |
| `DELETE` | `/rol/:id` | Eliminar rol | ✅ | Administrador | ✅ 10/min |

#### 🔄 Gestión de Estados (`/estados`)
| Método | Endpoint | Descripción | Requiere Auth | Rol Requerido | Rate Limit |
|--------|----------|-------------|---------------|---------------|------------|
| `GET` | `/estados` | Listar todos los estados | ✅ | Admin/Editor | ✅ 10/min |
| `POST` | `/estados` | Crear nuevo estado | ✅ | Administrador | ✅ 10/min |
| `GET` | `/estados/:id` | Obtener estado por ID | ✅ | Admin/Editor | ✅ 10/min |
| `PATCH` | `/estados/:id` | Actualizar estado | ✅ | Administrador | ✅ 10/min |
| `PATCH` | `/estados/:id/desactivate` | Desactivar estado | ✅ | Administrador | ✅ 10/min |
| `PATCH` | `/estados/:id/reactivate` | Reactivar estado | ✅ | Administrador | ✅ 10/min |
| `DELETE` | `/estados/:id` | Eliminar estado (soft delete) | ✅ | Administrador | ✅ 10/min |

#### 🏷️ Gestión de Categorías (`/categoria`)
| Método | Endpoint | Descripción | Requiere Auth | Rol Requerido | Rate Limit |
|--------|----------|-------------|---------------|---------------|------------|
| `GET` | `/categoria` | Listar todas las categorías activas | ✅ | Admin/Editor/Usuario | ✅ 10/min |
| `POST` | `/categoria` | Crear nueva categoría | ✅ | Administrador | ✅ 10/min |
| `GET` | `/categoria/:id` | Obtener categoría por ID | ✅ | Admin/Editor/Usuario | ✅ 10/min |
| `PATCH` | `/categoria/:id` | Actualizar categoría | ✅ | Administrador | ✅ 10/min |
| `PATCH` | `/categoria/:id/desactivate` | Desactivar categoría | ✅ | Administrador | ✅ 10/min |
| `PATCH` | `/categoria/:id/reactivate` | Reactivar categoría | ✅ | Administrador | ✅ 10/min |
| `DELETE` | `/categoria/:id` | Eliminar categoría (soft delete) | ✅ | Administrador | ✅ 10/min |

#### 📰 Gestión de Noticias (`/noticias`)
| Método | Endpoint | Descripción | Requiere Auth | Rol Requerido | Rate Limit |
|--------|----------|-------------|---------------|---------------|------------|
| `GET` | `/noticias` | Listar noticias públicas | ❌ | - | ✅ 10/min |
| `GET` | `/noticias/findAll` | Listar todas las noticias | ✅ | Admin/Editor/Usuario | ✅ 10/min |
| `GET` | `/noticias/getPendingRev` | Noticias pendientes de revisión | ✅ | Admin/Editor/Usuario | ✅ 10/min |
| `GET` | `/noticias/:id` | Obtener noticia por ID | ❌ | - | ✅ 10/min |
| `POST` | `/noticias` | Crear nueva noticia | ✅ | Admin/Editor/Usuario | ✅ 10/min |
| `PATCH` | `/noticias/:id` | Actualizar noticia | ✅ | Admin/Editor/Usuario | ✅ 10/min |
| `PATCH` | `/noticias/:id/desactivate` | Desactivar noticia | ✅ | Admin/Editor | ✅ 10/min |
| `PATCH` | `/noticias/:id/reactivate` | Reactivar noticia | ✅ | Admin/Editor | ✅ 10/min |
| `PATCH` | `/noticias/:id/vigencia` | Cambiar vigencia | ✅ | Admin/Editor | ✅ 10/min |
| `DELETE` | `/noticias/:id` | Eliminar noticia (soft delete) | ✅ | Administrador | ✅ 10/min |

#### ✏️ Gestión de Párrafos (`/create-paragraphs`)
| Método | Endpoint | Descripción | Requiere Auth | Rol Requerido | Rate Limit |
|--------|----------|-------------|---------------|---------------|------------|
| `GET` | `/create-paragraphs` | Listar todos los párrafos | ✅ | Admin/Editor/Usuario | ✅ 10/min |
| `POST` | `/create-paragraphs/:id` | Crear párrafo en noticia específica | ✅ | Admin/Editor/Usuario | ✅ 10/min |
| `GET` | `/create-paragraphs/:id` | Obtener párrafo por ID | ✅ | Admin/Editor/Usuario | ✅ 10/min |
| `PATCH` | `/create-paragraphs/:id` | Actualizar párrafo | ✅ | Admin/Editor/Usuario | ✅ 10/min |
| `PATCH` | `/create-paragraphs/:id/desactivate` | Desactivar párrafo | ✅ | Administrador | ✅ 10/min |
| `PATCH` | `/create-paragraphs/:id/reactivate` | Reactivar párrafo | ✅ | Administrador | ✅ 10/min |
| `DELETE` | `/create-paragraphs/:id` | Eliminar párrafo (soft delete) | ✅ | Administrador | ✅ 10/min |

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

### Sistema de Categorías

#### 🏷️ **Categorías Predefinidas**
El sistema crea automáticamente las siguientes categorías base:
- **Tecnología**
- **IA** (Inteligencia Artificial)
- **Noticias**
- **Cultura**

#### ➕ **Crear Categoría**
```javascript
POST /categoria
{
  "nombre": "Desarrollo Web"
}

// Respuesta
{
  "message": "✅ Categoria creada exitosamente",
  "data": {
    "id": "uuid-de-la-categoria",
    "nombre": "Desarrollo Web",
    "status": true,
    "isDeleted": false,
    "createdBy": "uuid-del-usuario",
    "createdAt": "2025-01-15T10:30:00.000Z",
    "updatedAt": "2025-01-15T10:30:00.000Z"
  }
}
```

#### 📋 **Obtener Categorías**
```javascript
GET /categoria
// Respuesta
{
  "message": "✅ Categorías obtenidas exitosamente",
  "data": [
    {
      "id": "uuid",
      "nombre": "Tecnología",
      "status": true,
      "isDeleted": false,
      "createdBy": "system"
    },
    {
      "id": "uuid",
      "nombre": "IA",
      "status": true,
      "isDeleted": false,
      "createdBy": "system"
    }
  ]
}
```

#### ✏️ **Actualizar Categoría**
```javascript
PATCH /categoria/{id}
{
  "nombre": "Inteligencia Artificial Avanzada"
}

// Respuesta
{
  "message": "✅ Categoría actualizada exitosamente",
  "data": {
    "id": "uuid",
    "nombre": "Inteligencia Artificial Avanzada",
    "status": true,
    "modifiedBy": "uuid-del-usuario"
  }
}
```

#### 🔄 **Gestión de Estados de Categorías**
```javascript
// Desactivar categoría
PATCH /categoria/{id}/desactivate
// Respuesta: "✅ Categoria desactivada exitosamente"

// Reactivar categoría
PATCH /categoria/{id}/reactivate
// Respuesta: "✅ Categoria re-activada exitosamente"

// Eliminar categoría (soft delete)
DELETE /categoria/{id}
// Respuesta: "✅ Categoría eliminada exitosamente"
```

#### ⚠️ **Validaciones y Restricciones**
- No se pueden crear categorías con nombres duplicados
- No se pueden actualizar categorías inactivas
- Solo los administradores pueden crear, actualizar y eliminar categorías
- Las categorías eliminadas utilizan soft delete para preservar integridad referencial
- El nombre de la categoría es obligatorio y no puede estar vacío

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
  "contenido": "Contenido completo de la noticia...",
  "categorias": ["uuid-categoria-1", "uuid-categoria-2"]
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
      "categorias": [
        {
          "id": "uuid",
          "nombre": "Tecnología"
        }
      ],
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
2. **Categorización**: Se asignan categorías apropiadas
3. **Revisión**: Editor/Admin revisa → Cambia a estado apropiado
4. **Publicación**: Si está aprobada → Se puede publicar
5. **Gestión**: Cambiar vigencia, desactivar o reactivar

### Sistema de Párrafos

#### ✏️ **Crear Párrafo en Noticia**
```javascript
POST /create-paragraphs/{noticia-id}
{
  "contenido": "Este es el contenido del párrafo...",
  "tipo": "texto" // opcional
}

// Respuesta
{
  "message": "✅ Párrafo creado exitosamente"
}
```

#### 📋 **Obtener Párrafos**
```javascript
GET /create-paragraphs
// Respuesta
{
  "message": "✅ Párrafos encontrados exitosamente",
  "data": [
    {
      "id": "uuid",
      "contenido": "Contenido del párrafo",
      "orden": 1,
      "status": true,
      "noticia": {
        "id": "uuid",
        "titulo": "Título de la noticia"
      }
    }
  ]
}
```

#### ✏️ **Actualizar Párrafo**
```javascript
PATCH /create-paragraphs/{id}
{
  "contenido": "Contenido actualizado del párrafo"
}

// Respuesta
{
  "message": "✅ Párrafo actualizado exitosamente"
}
```

#### 🔄 **Gestión de Estados de Párrafos**
```javascript
// Desactivar párrafo
PATCH /create-paragraphs/{id}/desactivate
// Respuesta: "✅ Párrafo desactivado exitosamente"

// Reactivar párrafo
PATCH /create-paragraphs/{id}/reactivate
// Respuesta: "✅ Párrafo reactivado exitosamente"

// Eliminar párrafo (soft delete)
DELETE /create-paragraphs/{id}
// Respuesta: "✅ Párrafo eliminado exitosamente"
```

#### ⚠️ **Características del Sistema de Párrafos**
- **Orden automático**: Los párrafos se ordenan automáticamente al crearlos
- **Vinculación a noticias**: Cada párrafo pertenece a una noticia específica
- **Soft delete**: Los párrafos eliminados se marcan como eliminados sin borrar la información
- **Control de estados**: Los párrafos pueden ser activados/desactivados
- **Gestión por roles**: Solo administradores pueden desactivar/reactivar/eliminar párrafos
- **Transformación de datos**: Las respuestas utilizan DTOs para controlar la información expuesta

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
│   │   ├── roles.guard.ts
│   │   └── custom-throttler.guard.ts  # 🆕 Guard personalizado de rate limiting
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
├── categoria/             # Módulo de categorías
│   ├── categoria.controller.ts
│   ├── categoria.service.ts
│   ├── dto/
│   │   ├── create-categoria.dto.ts
│   │   └── update-categoria.dto.ts
│   └── categoria.module.ts
├── noticias/              # Módulo de noticias
│   ├── noticias.controller.ts
│   ├── noticias.service.ts
│   ├── dto/
│   │   ├── create-noticia.dto.ts
│   │   ├── update-noticia.dto.ts
│   │   └── public-noticia.dto.ts
│   └── noticias.module.ts
├── create-paragraphs/     # Módulo de párrafos
│   ├── create-paragraphs.controller.ts
│   ├── create-paragraphs.service.ts
│   ├── dto/
│   │   ├── create-create-paragraph.dto.ts
│   │   ├── update-create-paragraph.dto.ts
│   │   └── parrafo-response.dto.ts
│   └── create-paragraphs.module.ts
├── entities/              # Entidades de base de datos
│   ├── Usuario.entity.ts
│   ├── Rol.entity.ts
│   ├── Login.entity.ts
│   ├── Noticia.entity.ts
│   ├── Parrafo.entity.ts
│   ├── Revision.entity.ts
│   ├── Estado.entity.ts
│   └── Categoria.entity.ts
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
├── app.module.ts          # Módulo principal con ThrottlerModule
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
- ✅ **🆕 Rate Limiting Global** con ThrottlerModule
- ✅ **🆕 Protección contra ataques de fuerza bruta**
- ✅ **🆕 Respuestas de error personalizadas en español**
- ✅ **Sanitización de datos** automática

### 🛡️ Sistema de Rate Limiting

#### **Configuración del ThrottlerModule**
```typescript
// Configuración en app.module.ts
ThrottlerModule.forRoot([{
  ttl: 60000,        // 60 segundos (1 minuto)
  limit: 10,         // 10 solicitudes máximo
}])

// Guard personalizado global
{
  provide: APP_GUARD,
  useClass: CustomThrottlerGuard,
}
```

#### **CustomThrottlerGuard**
El guard personalizado proporciona:
- **Mensajes en español**: Respuestas de error localizadas
- **Códigos de estado HTTP apropiados**: 429 Too Many Requests
- **Estructura de respuesta consistente**: Formato JSON estándar
- **Manejo de excepciones mejorado**: Control total sobre la respuesta

#### **Características del Rate Limiting**
- **Aplicación global**: Todos los endpoints están protegidos automáticamente
- **Basado en IP**: Cada dirección IP tiene su propio contador
- **Ventana deslizante**: El límite se resetea cada minuto
- **Headers informativos**: La respuesta incluye información del límite
- **Personalizable**: Fácil ajuste de límites y ventanas de tiempo
- **Prevención de ataques**: Protección contra DDoS y ataques de fuerza bruta

#### **Ejemplo de Implementación**
```typescript
// custom-throttler.guard.ts
@Injectable()
export class CustomThrottlerGuard extends ThrottlerGuard {
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
```

### Usuario Administrador por Defecto

Al iniciar la aplicación por primera vez, se crea automáticamente:

- **Email**: El configurado en `DEFAULT_ADMIN_EMAIL`
- **Contraseña**: La configurada en `DEFAULT_ADMIN_PASSWORD`
- **Rol**: Administrador con todos los permisos

### Estados y Categorías Base

Al iniciar la aplicación, se crean automáticamente:

#### **Estados Base**
- **Pendiente de Revisión** (No público)
- **Aprobado** (Público)
- **Rechazado** (No público)
- **Solicitud de Cambio** (No público)

#### **Categorías Base**
- **Tecnología**
- **IA** (Inteligencia Artificial)
- **Noticias**
- **Cultura**

## 🚢 Deployment

### Preparación para Producción

1. **Variables de entorno de producción**
   ```bash
   NODE_ENV=production
   JWT_SECRET=tu_jwt_secret_muy_seguro_para_produccion
   
   # Configuración de Rate Limiting para producción (opcional)
   THROTTLE_TTL=60000      # 1 minuto
   THROTTLE_LIMIT=10       # 10 solicitudes por minuto
   ```

2. **Configuración de Rate Limiting para Producción**
   ```typescript
   // Para mayor seguridad en producción, considera ajustar:
   ThrottlerModule.forRoot([{
     ttl: 60000,    // 1 minuto
     limit: 5,      // Límite más restrictivo para producción
   }])
   ```

3. **Build del proyecto**
   ```bash
   pnpm run build
   pnpm run start:prod
   ```

### Consideraciones de Seguridad para Producción

#### **🛡️ Rate Limiting en Producción**
- **Monitoreo**: Implementa logs para trackear intentos de rate limiting
- **Alertas**: Configura alertas para detectar patrones de ataques
- **Ajustes dinámicos**: Considera ajustar límites según el tráfico
- **Whitelist**: Implementa excepciones para IPs confiables si es necesario

#### **📊 Configuraciones Recomendadas**
```typescript
// Configuración conservadora para producción
ThrottlerModule.forRoot([
  {
    name: 'short',
    ttl: 60000,   // 1 minuto
    limit: 5,     // 5 solicitudes por minuto
  },
  {
    name: 'medium', 
    ttl: 600000,  // 10 minutos
    limit: 30,    // 30 solicitudes por 10 minutos
  },
  {
    name: 'long',
    ttl: 3600000, // 1 hora
    limit: 100,   // 100 solicitudes por hora
  },
])
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
- 🛡️ **🆕** Optimizar configuraciones de rate limiting
- 📊 **🆕** Implementar métricas y monitoreo de rate limiting
- 🚀 Optimización de performance
- 📰 Mejoras en el sistema de noticias
- 🔄 Mejoras en el sistema de estados
- 🏷️ Mejoras en el sistema de categorías
- ✏️ Mejoras en el sistema de párrafos
- 📊 Implementar sistema de notificaciones
- 🐛 Reportar y corregir bugs

> **Nota**: Como el proyecto está en construcción, algunas funcionalidades pueden cambiar. ¡Mantente al día con los issues y discussions!

## 📊 Changelog

### **🆕 v1.0.0-dev.2 (Actual)**
- ✅ **Implementado Rate Limiting Global** con ThrottlerModule
- ✅ **CustomThrottlerGuard** con mensajes personalizados en español
- ✅ **Protección contra ataques de fuerza bruta** y spam
- ✅ **Headers informativos** de rate limiting
- ✅ **Configuración flexible** para desarrollo y producción
- ✅ **Documentación actualizada** con información de rate limiting

### **v1.0.0-dev.1**
- ✅ Sistema base de autenticación JWT
- ✅ Gestión de usuarios y roles
- ✅ Sistema de noticias con workflow
- ✅ Sistema de categorías y estados
- ✅ Sistema de párrafos modulares
- ✅ Documentación Swagger automática

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
  <strong>🛡️ Ahora con protección avanzada contra ataques!</strong><br>
  <sub>Rate Limiting implementado para una API más segura y estable</sub>
</p>

<p align="center">
  <strong>¿Te gusta este proyecto? ¡Dale una ⭐ en GitHub!</strong><br>
  <sub>Desarrollado con ❤️ para la comunidad de desarrolladores</sub>
</p>