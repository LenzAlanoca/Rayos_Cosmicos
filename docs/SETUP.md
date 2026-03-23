# 🚀 Guía de Instalación y Configuración

## Requisitos Previos

### Frontend
- Node.js 16+ (con npm o yarn)
- Visual Studio Code (recomendado)

### Backend
- PHP 8.1+
- MySQL 5.7+ o MariaDB 10.3+
- Composer (PHP package manager)
- Postman o Insomnia (para testing API)

## Instalación Rápida

### 1. Clonar/Descargar el Proyecto

```bash
cd Rayos_Cosmicos
```

### 2. Configurar Frontend

```bash
cd frontend

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env.local

# Iniciar servidor de desarrollo
npm run dev
```

El frontend estará disponible en `http://localhost:5173`

### 3. Configurar Backend

```bash
cd ../backend

# Instalar dependencias PHP
composer install

# Configurar variables de entorno
cp .env.example .env

# Editar .env con tu configuración de BD
nano .env

# Crear base de datos
mysql -u root -p < database/schema.sql

# Iniciar servidor
php -S localhost:8000 -t public
```

El backend estará disponible en `http://localhost:8000/api`

## Configuración Detallada

### Frontend (.env.local)

```env
VITE_API_URL=http://localhost:8000/api
VITE_APP_NAME=Rayos Cósmicos
VITE_APP_VERSION=0.1.0-beta
```

### Backend (.env)

```env
APP_NAME="Rayos Cósmicos Backend"
APP_ENV=development
APP_DEBUG=true

# Base de datos
DB_HOST=localhost
DB_PORT=3306
DB_NAME=rayos_cosmicos
DB_USER=root
DB_PASS=tu_contraseña

# API
API_PORT=8000
API_HOST=localhost

# Email (opcional para alertas)
MAIL_DRIVER=smtp
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=tu_email@gmail.com
MAIL_PASSWORD=tu_app_password
```

## Estructura Base de Datos

### Tablas Principales

```sql
-- Sensores
CREATE TABLE sensors (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  location VARCHAR(255),
  type ENUM('GM', 'Scintillation', 'Temperature', 'Humidity'),
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Lecturas sin procesar
CREATE TABLE sensor_readings (
  id INT PRIMARY KEY AUTO_INCREMENT,
  sensor_id INT NOT NULL,
  value FLOAT NOT NULL,
  unit VARCHAR(50),
  recorded_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (sensor_id) REFERENCES sensors(id)
);

-- Datos procesados (datos públicos)
CREATE TABLE processed_data (
  id INT PRIMARY KEY AUTO_INCREMENT,
  sensor_id INT NOT NULL,
  raw_id INT,
  value FLOAT NOT NULL,
  aggregated BOOLEAN DEFAULT false,
  processed_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (sensor_id) REFERENCES sensors(id),
  FOREIGN KEY (raw_id) REFERENCES sensor_readings(id)
);

-- Alertas
CREATE TABLE alerts (
  id INT PRIMARY KEY AUTO_INCREMENT,
  sensor_id INT NOT NULL,
  type VARCHAR(100),
  message TEXT,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (sensor_id) REFERENCES sensors(id)
);
```

## Rutas API Principales

### Datos (Públicas)

```
GET  /api/health                  - Estado del servidor
GET  /api/sensors                 - Listar sensores
GET  /api/data                    - Datos en tiempo real
GET  /api/data/historical         - Datos históricos
GET  /api/sensors/:id/status      - Estado sensor específico
```

### Análisis (Internas - requieren autenticación)

```
POST /api/admin/sensors           - Crear sensor
PUT  /api/admin/sensors/:id       - Actualizar sensor
DELETE /api/admin/sensors/:id     - Eliminar sensor
GET  /api/admin/data/raw          - Datos crudos
GET  /api/admin/alerts            - Alertas del sistema
POST /api/admin/alerts/:id/read   - Marcar alerta como leída
```

## Testing de la API

### Con cURL

```bash
# Health check
curl http://localhost:8000/api/health

# Obtener sensores
curl http://localhost:8000/api/sensors

# Datos en tiempo real
curl http://localhost:8000/api/data

# Datos históricos (rango de fechas)
curl "http://localhost:8000/api/data/historical?start=2026-03-20&end=2026-03-22"
```

### Con Postman

1. Importar colección: `docs/postman_collection.json`
2. Configurar environment: `API_URL = http://localhost:8000/api`
3. Ejecutar requests

## Troubleshooting

### Frontend

**Error: "Cannot find module"**
```bash
rm -rf node_modules
npm install
```

**Puerto 5173 ya está en uso**
```bash
npm run dev -- --port 5174
```

### Backend

**Error: PDOException - Connection refused**
- Verificar que MySQL está corriendo
- Revisar credenciales en `.env`
- Verificar que la base de datos existe

**Error: Class not found**
```bash
composer dump-autoload
```

**Permisos en logs**
```bash
mkdir -p storage/logs
chmod 755 storage/logs
```

## Desarrollo

### Agregar nueva vista (Frontend)

```bash
# En src/views/public/ o src/views/internal/
touch src/views/public/MyPage.vue

# Actualizar router en src/router/index.js
```

### Agregar nuevo módulo (Backend)

```bash
# Crear carpeta en src/Modules/
mkdir src/Modules/MyModule

# Crear clase servicio
touch src/Modules/MyModule/MyModuleService.php

# Usar en index.php
```

### Estándares de código

**Frontend**
- Usar componentes funcionales con `<script setup>`
- Nombrar componentes en PascalCase
- Props y emits documentados con JSDoc

**Backend**
- PSR-12 coding standard
- Documentar con PHPDoc
- Usar type hints
- Throw exceptions apropiadas

```bash
# Verificar estándares
npm run lint          # Frontend
phpcs --standard=PSR12 src/  # Backend
```

## Próximos Pasos

1. ✅ Frontend y Backend configurados
2. ⏳ Integración con base de datos real
3. ⏳ Sistema de autenticación
4. ⏳ WebSockets para actualizaciones en vivo
5. ⏳ Validación robusta de datos
