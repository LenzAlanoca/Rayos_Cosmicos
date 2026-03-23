# 🏗️ Guía de Arquitectura - Rayos Cósmicos

## Visión General

El sistema está diseñado con una arquitectura **modular y escalable**, separando claramente las responsabilidades entre frontend, backend y capas de procesamiento de datos.

## Arquitectura General

```
┌─────────────────────────────────────────────────────────────────┐
│                        USUARIOS FINALES                         │
└─────────────────┬───────────────────────────────┬───────────────┘
                  │                               │
         ┌────────▼──────────┐          ┌────────▼──────────┐
         │   PORTAL PÚBLICO  │          │   PANEL INTERNO   │
         │   (sin autent.)   │          │   (autenticado)   │
         └────────┬──────────┘          └────────┬──────────┘
                  │                               │
                  └───────────────┬───────────────┘
                                  │
                  ┌───────────────▼───────────────┐
                  │       API REST (PHP)         │
                  │    Slim Framework v4         │
                  └───────────────┬───────────────┘
                                  │
        ┌─────────────────────────┼─────────────────────────┐
        │                         │                         │
   ┌────▼────────┐      ┌────────▼─────────┐      ┌────────▼─────────┐
   │  Ingestión  │      │  Procesamiento   │      │  Almacenamiento  │
   │    Datos    │      │      Datos       │      │      (MySQL)     │
   └─────────────┘      └──────────────────┘      └──────────────────┘
        │                         │                         │
   ┌────▼────────┐      ┌────────▼─────────┐      ┌────────▼─────────┐
   │  Sensores   │      │      Alertas     │      │   Estadísticas   │
   │ (Físicos)   │      │     Sistema      │      │       Datos      │
   └─────────────┘      └──────────────────┘      └──────────────────┘
```

## Stack Tecnológico

### Frontend
- **Vue.js 3** - Framework reactivo progresivo
- **Tailwind CSS** - Framework CSS utility-first
- **Pinia** - Gestión de estado
- **Chart.js / ECharts** - Visualización de datos
- **Vite** - Build tool moderno
- **Vue Router** - Enrutamiento

### Backend
- **PHP 8.1+** - Lenguaje backend
- **Slim Framework 4** - Micro-framework ligero
- **MySQL** - Base de datos relacional
- **PDO** - Abstracción de base de datos
- **Monolog** - Logging
- **RESTful API** - Comunicación frontend-backend

## Estructura de Directorios

### Frontend

```
frontend/
├── src/
│   ├── components/          # Componentes reutilizables
│   │   ├── common/          # Componentes globales
│   │   ├── public/          # Componentes portal público
│   │   └── internal/        # Componentes panel interno
│   ├── views/               # Vistas (páginas)
│   │   ├── public/          # Landing, Dashboard, Histórico, Info
│   │   └── internal/        # Admin, Sensores, Análisis, Monitoreo
│   ├── modules/             # Módulos funcionales
│   │   ├── visualization/   # Visualización datos
│   │   ├── charts/          # Gráficos interactivos
│   │   ├── sensor-status/   # Estado sensores
│   │   └── monitoring/      # Monitoreo tiempo real
│   ├── stores/              # Pinia stores (estado global)
│   ├── api/                 # Clientes API
│   ├── utils/               # Funciones utilitarias
│   ├── assets/
│   │   └── styles/          # Estilos globales
│   ├── router/              # Configuración router
│   ├── App.vue              # Componente raíz
│   └── main.js              # Punto de entrada
├── package.json
├── vite.config.js
└── tailwind.config.js
```

### Backend

```
backend/
├── public/
│   └── index.php            # Punto de entrada
├── src/
│   ├── Modules/             # Módulos principales
│   │   ├── Ingestion/       # Recepción datos
│   │   ├── Processing/      # Procesamiento datos
│   │   ├── Storage/         # Persistencia datos
│   │   ├── Sensors/         # Gestión sensores
│   │   └── Alerts/          # Sistema de alertas
│   ├── Api/                 # Rutas y controladores
│   ├── Config/              # Configuración
│   │   ├── Database.php
│   │   └── Logger.php
│   └── Database/            # Modelos/Entidades
├── tests/                   # Tests unitarios
├── composer.json
├── .env.example             # Variables de entorno
└── README.md
```

## Flujo de Datos

### 1. **Ingestión** (Sensors → Backend)
```
Sensor físico
    ↓
    HTTP POST /api/ingest
    ↓
DataIngestionService (Validación)
    ↓
    ✓ Válido → Almacenamiento temporal
    ✗ Inválido → Error log
```

### 2. **Procesamiento** (Backend interno)
```
Datos crudos
    ↓
DataProcessingService
    ├─ Limpieza (descartar anómalos)
    ├─ Normalización (estandarizar unidades)
    ├─ Agregación (promedios, máximos)
    └─ Cálculo de estadísticas
    ↓
Datos procesados
```

### 3. **Almacenamiento** (MySQL)
```
Datos procesados
    ↓
StorageService
    ├─ Tabla: sensor_readings (datos crudos)
    ├─ Tabla: processed_data (datos públicos)
    ├─ Tabla: alerts (alertas)
    └─ Tabla: sensors (configuración)
```

### 4. **Presentación** (Backend → Frontend)
```
GET /api/sensors              → Lista de sensores
GET /api/data?sensor=1        → Datos en tiempo real
GET /api/historical?...       → Datos históricos
GET /api/alerts               → Alertas activas
```

### 5. **Visualización** (Frontend)
```
Datos desde API
    ↓
Pinia Store (estado global)
    ↓
Componentes Vue.js (reactivos)
    ├─ Charts.js → Gráficos línea/área
    ├─ Vue-ECharts → Gráficos avanzados
    └─ HTML/Tailwind → Tablas e indicadores
    ↓
Interfaz de usuario
```

## Patrones de Diseño

### 1. **Modularidad**
- Cada módulo tiene una responsabilidad única
- Bajo acoplamiento, alta cohesión
- Fácil de testear y mantener

### 2. **Separación de Capas**
- **Presentation**: Frontend Vue.js
- **Business Logic**: Módulos PHP
- **Data Access**: StorageService + Database
- **Infrastructure**: Config, Logger, Database

### 3. **API RESTful**
- Endpoints claros y predecibles
- Métodos HTTP estándar (GET, POST, PUT, DELETE)
- Respuestas en JSON
- Versionado de API (v1, v2...)

### 4. **State Management** (Frontend)
```javascript
stores/
├── sensorStore.js     // Estado de sensores
├── dataStore.js       // Estado de datos
├── uiStore.js         // Estado de UI
└── authStore.js       // Estado de autenticación
```

## Escalabilidad

### Horizontal
- **Frontend**: Servir desde CDN + caché
- **Backend**: Load balancer + múltiples instancias PHP
- **Base de datos**: Replicación master-slave, sharding

### Vertical
- Optimización de queries
- Índices en BD
- Caching estratégico
- Compresión de datos

## Seguridad

### Frontend
- HTTPS obligatorio en producción
- CORS configurado restrictivamente
- XSS prevention
- CSRF tokens

### Backend
- Validación de entrada (whitelist)
- Prepared statements (PDO)
- Hash de contraseñas (bcrypt)
- Rate limiting en API
- Logging de accesos/errores

### Base de datos
- Credenciales en variables de entorno
- Backups automáticos
- Encriptación de datos sensibles
- Acceso restringido por IP

## Despliegue

### Desarrollo
```bash
# Frontend
npm install
npm run dev

# Backend
composer install
php -S localhost:8000 -t public
```

### Producción
```bash
# Frontend
npm run build
# Servir dist/ con nginx/apache

# Backend
composer install --no-dev
# Configurar PHP-FPM
# Nginx/Apache como reverse proxy
```

## Monitoreo y Logging

- **Frontend**: DevTools console
- **Backend**: Monolog (archivo + stdout)
- **Base de datos**: Query logs, slow queries
- **Alertas**: Correo, Slack, Dashboard

## Próximas Fases

1. **Beta v0.2**: Integración base de datos real
2. **Beta v0.3**: WebSockets para datos en tiempo real
3. **v1.0**: Autenticación completa, más módulos
4. **v1.1**: Mobile app (React Native/Flutter)
5. **v2.0**: ML para predicciones de radiación
