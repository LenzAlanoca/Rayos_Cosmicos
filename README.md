# 🌌 Sistema Web de Monitoreo de Rayos Cósmicos – UMSA

##  Descripción General

Sistema integral web para la **visualización, procesamiento y monitoreo de datos** de radiación cósmica detectados por sensores científicos ubicados en la Universidad Mayor de San Andrés (UMSA).

**Versión:** 0.1.0-beta | **Estado:** En Desarrollo | **Última Actualización:** Marzo 22, 2026

### 📊 Stack Tecnológico Moderno
- **Frontend:** Vue.js 3 + Tailwind CSS + Chart.js (estética cielo nocturno)
- **Backend:** PHP 8.1+ + Slim Framework + MySQL
- **Arquitectura:** Modular y escalable con separación clara de responsabilidades

El sistema recolecta automáticamente datos de dispositivos experimentales (detectores de partículas, magnetómetros, censores de radiación), los centraliza en servidor, los procesa y presenta a través de interfaz moderna con dos propósitos:

*  **Portal Público:** Visualización accesible de datos procesados (sin autenticación)
*  **Panel Interno:** Análisis técnico, monitoreo en tiempo real y gestión de sensores (autenticado)

## 🛠️ Instalación Rápida

### Paso 1: Clonar y Navegar
```bash
cd Rayos_Cosmicos
```

### Paso 2: Frontend
```bash
cd frontend
npm install
npm run dev
# Abre http://localhost:5173 en navegador
```

### Paso 3: Backend (nueva terminal)
```bash
cd backend
composer install
cp .env.example .env
# Edita .env (DB_HOST, DB_NAME, DB_USER, DB_PASS)
php -S localhost:8000 -t public
# Accede a http://localhost:8000/api/health
```

Ver [docs/SETUP.md](docs/SETUP.md) para instrucciones detalladas.

---

## 👥 Stakeholders

| Stakeholder    | Rol                    | Prioridad | Expectativa                              |
| -------------- | ---------------------- | --------- | ---------------------------------------- |
| Product Owner  | Dirección del proyecto | Crítica   | Escalabilidad, documentación completa    |
| Investigadores | Usuario experto        | Alta      | Precisión en procesamiento y análisis    |
| Equipo IT      | Infraestructura        | Alta      | Seguridad, estabilidad, modularidad      |
| Público UMSA   | Usuario final          | Media     | Interfaz intuitiva y atractiva           |
| Estudiantes    | Mantenimiento futuro   | Media     | Código bien documentado y estructurado   |

---

## 🎯 Objetivos del Sistema

✅ **Visualización en tiempo (casi) real** de datos cósmicos  
✅ **Análisis mediante dashboards interactivos** con gráficos avanzados  
✅ **Procesamiento automático** de datos crudos (limpieza, normalización)  
✅ **Acceso público seguro** sin datos sensibles  
✅ **Gestión interna completa** para investigadores y administradores  
✅ **Exportación flexible** (CSV, JSON) para análisis independiente  
✅ **Sistema de alertas** ante anomalías

## 🏗️ Estructura del Proyecto (v0.1.0-beta)

```
Rayos_Cosmicos/
├── frontend/                # Vue.js 3 + Tailwind CSS
│   ├── src/
│   │   ├── views/
│   │   │   ├── public/      # Landing, Dashboard, Histórico, Info
│   │   │   └── internal/    # Admin (futuro)
│   │   ├── components/      # Componentes reutilizables
│   │   ├── modules/         # Módulos funcionales
│   │   ├── stores/          # Pinia (estado global)
│   │   ├── api/             # Clientes HTTP
│   │   └── assets/          # Estilos, imágenes
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── README.md            # Documentación frontend
│
├── backend/                 # PHP 8.1+ Slim Framework
│   ├── src/
│   │   ├── Modules/         # Módulos core
│   │   │   ├── Ingestion/   # Recepción datos
│   │   │   ├── Processing/  # Procesamiento
│   │   │   ├── Storage/     # Persistencia BD
│   │   │   ├── Sensors/     # Gestión CRUD
│   │   │   └── Alerts/      # Sistema alertas
│   │   ├── Config/          # Configuración BD, Logger
│   │   └── Api/             # Rutas y handlers
│   ├── public/index.php     # Punto entrada
│   ├── composer.json
│   ├── .env.example
│   └── README.md            # Documentación backend
│
├── docs/                    # Documentación técnica
│   ├── ARCHITECTURE.md      # Diagrama y diseño
│   ├── SETUP.md             # Instalación paso a paso
│   └── API.md               # Endpoints y ejemplos
│
└── README.md                # Este archivo
```

## 🚀 Inicio Rápido

### Frontend
```bash
cd frontend
npm install
npm run dev
# Acceder: http://localhost:5173
```

### Backend
```bash
cd backend
composer install
cp .env.example .env
# Editar .env con tu BD
php -S localhost:8000 -t public
# API: http://localhost:8000/api
```

## 🎨 Características Implementadas (Beta)

### ✅ Portal Público
- **Landing Page** con presentación y stack tecnológico
- **Dashboard en Vivo** con:
  - Estado de sensores (activo/inactivo con indicadores)
  - Gráficos interactivos (línea, área, dona)
  - Estadísticas en tiempo real
  - Filtros por sensor y rango de fechas
  - Botón de exportación CSV
- **Datos Históricos** con:
  - Tabla de registros con paginación
  - Filtros avanzados
  - Descargas en CSV y JSON
- **Información del Proyecto** con:
  - Descripción de equipamiento
  - Ubicación de sensores
  - Metodología de recolección

### ✅ Infraestructura Backend
- API REST funcional (Slim Framework)
- Endpoints públicos básicos
- Estructura modular de 5 módulos principalesmodular
- Logging con Monolog
- Configuración con variables de entorno
- CORS habilitado

### 🔄 Próximas Fases
- [ ] Integración real con MySQL
- [ ] Panel Administrativo completo
- [ ] Sistema de autenticación JWT
- [ ] WebSockets para datos en vivo
- [ ] Alertas por email/SMS
- [ ] Dashboard de estadísticas avanzadas
- [ ] Validación robusta
- [ ] Tests automatizados

## 📖 Documentación Completa

| Documento | Contenido |
|-----------|----------|
| [ARCHITECTURE.md](docs/ARCHITECTURE.md) | Diagrama, patrones, flujo de datos |
| [SETUP.md](docs/SETUP.md) | Instalación, configuración, BD |
| [API.md](docs/API.md) | Endpoints, ejemplos cURL, Postman |
| [frontend/README.md](frontend/README.md) | Componentes, convenciones, routing |
| [backend/README.md](backend/README.md) | Módulos, servicios, migraciones |

## 🎨 Estética y Diseño

**Temática:** Cielo Nocturno y Cosmos  
**Colores:** Azules profundos (#0f1b4a) a brillantes (#3d5aff)  
**Fuentes:** System fonts + sans-serif  
**Animaciones:** Parpadeo de estrellas, efectos de brillo

El frontend está completamente estilizado con Tailwind CSS usando una paleta de colores personalizada que evoca la sensación de observar el cielo nocturno repleto de radiación cósmica.

## 📞 Endpoints Principales

**Públicos (sin auth):**
```
GET  /api/health               - Estado del servidor
GET  /api/sensors              - Listar sensores
GET  /api/data                 - Datos en vivo
GET  /api/data/historical      - Histórico de datos
POST /api/ingest               - Recibir datos de sensor
```

**Administrativos (auth requerida):**
```
POST   /api/admin/sensors      - Crear sensor
PUT    /api/admin/sensors/:id  - Actualizar sensor
DELETE /api/admin/sensors/:id  - Eliminar sensor
GET    /api/admin/data/raw     - Datos crudos
GET    /api/admin/alerts       - Listado alertas
```

Ver [API.md](docs/API.md) para documentación completa.

##  Stack Tecnológico

**Frontend (v3):**
- Vue.js 3 (framework reactivo progresivo)
- Vue Router 4 (enrutamiento)
- Pinia 2 (gestión estado)
- Tailwind CSS 3 (utilidadellos CSS)
- Chart.js 4 (gráficos interactivos)
- Vite 5 (build tool moderno)
- Axios (cliente HTTP)

**Backend (PHP):**
- PHP 8.1+ (lenguaje servidor)
- Slim Framework 4 (micro-framework)
- MySQL 5.7+ (base de datos)
- PDO (abstracción BD)
- Monolog 3 (logging)
- Composer (gestor dependencias)
* WebSockets o polling para datos en tiempo real

**Base de Datos:**

* Sistema relacional (por definir, ej. PostgreSQL)

---

##  Enfoque de Desarrollo

El desarrollo del sistema sigue una estrategia **frontend-first**, permitiendo:

* Diseñar y validar la experiencia de usuario desde etapas tempranas.
* Simular datos mientras se construye la infraestructura real.
* Reducir tiempos de integración con dispositivos físicos.

---

##  Seguridad y Acceso

* El portal público no incluye opciones visibles de autenticación.
* El panel interno se encuentra desacoplado y protegido mediante autenticación.
* Se garantiza la separación entre datos públicos y datos sensibles.

---

##  Alcance

Este sistema busca no solo cubrir necesidades actuales de monitoreo, sino también servir como base escalable para futuros proyectos científicos dentro de la universidad.

---

##  Contribución

Proyecto en desarrollo académico. La colaboración está sujeta a lineamientos del equipo y la institución.

---
