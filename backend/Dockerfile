FROM node:18-alpine

WORKDIR /usr/src/app

# Instala pnpm y dependencias necesarias para compilación
RUN npm install -g pnpm && \
    apk add --no-cache python3 make g++  # Necesario para algunos drivers de DB

# Copia archivos de dependencias
COPY package.json pnpm-lock.yaml ./

# Instala dependencias (incluyendo mysql2)
RUN pnpm install --frozen-lockfile

# Copia el resto del código
COPY . .

EXPOSE 3000
CMD ["pnpm", "run", "start:dev"]