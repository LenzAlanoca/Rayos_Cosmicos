# Backend Rayos Cósmicos — UMSA

Backend en **Node.js + Express + PostgreSQL** para el sistema de monitoreo del detector de muones (Chacaltaya → UMSA Cota Cota).

Streaming en tiempo real con **LISTEN/NOTIFY de Postgres** + **Socket.IO** + **Server-Sent Events**.

---

## 1. Requisitos

- Node.js 18 o superior
- PostgreSQL 13 o superior
- npm

---

## 2. Instalación

```bash
cd backend
npm install
cp .env.example .env
# Edita .env con los datos de tu PostgreSQL
```

---

## 3. Crear la base de datos

**Paso 1** — crear la BD desde la shell de PostgreSQL:

```bash
psql -U postgres -f sql/01_crear_database.sql
```

**Paso 2** — instalar tablas, índices, vistas, triggers y datos iniciales:

```bash
npm run db:install
```

Esto ejecuta automáticamente, en orden:

| # | Archivo | Qué hace |
|---|---|---|
| 02 | `02_crear_tablas.sql` | Las 10 tablas del modelo |
| 03 | `03_crear_indices.sql` | Índices para rendimiento |
| 04 | `04_datos_iniciales.sql` | Usuarios, estaciones, dispositivo, variables |
| 05 | `05_crear_vistas.sql` | Vistas pivote y de estadísticas |
| 06 | `06_funciones_triggers.sql` | `LISTEN/NOTIFY`, login, log de cambios |
| 07 | `07_sesiones.sql` | Tabla de sesiones (login básico) |

**Usuarios creados por defecto:**

| Correo | Contraseña | Rol |
|---|---|---|
| `admin@umsa.bo` | `Admin1234` | ADMIN |
| `investigador@umsa.bo` | `Invest1234` | INVESTIGADOR |

---

## 4. Levantar el servidor

```bash
npm run dev      # con nodemon (recarga automática)
npm start        # produccion
```

El servidor queda en `http://localhost:3000`.

Verificar:
```bash
curl http://localhost:3000/api/health
```

---

## 5. Endpoints REST

### Autenticación (login básico, sin JWT por ahora)

| Método | Ruta | Descripción |
|---|---|---|
| POST | `/api/auth/login` | `{ correo, password }` → devuelve `{ token, user }` |
| POST | `/api/auth/logout` | cierra la sesión actual |
| GET  | `/api/auth/me` | datos del usuario autenticado |

> Para rutas protegidas, enviar el header `Authorization: Bearer <token>`.

### Dispositivos / Sensores

| Método | Ruta | Auth |
|---|---|---|
| GET | `/api/sensors` | público |
| GET | `/api/sensors/:id` | público |
| GET | `/api/sensors/:id/variables` | público |
| GET | `/api/sensors/:id/historial` | público |
| POST | `/api/sensors` | ADMIN |
| PUT | `/api/sensors/:id` | ADMIN |
| DELETE | `/api/sensors/:id` | ADMIN |

### Datos científicos

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/api/data/latest` | últimos N eventos (`?limit=100`) |
| GET | `/api/data/historical` | paginado (`?page=1&pageSize=50`) |
| GET | `/api/data/stats` | estadísticas globales |
| GET | `/api/data/hourly` | series por hora |
| GET | `/api/data/distribution` | distribución por dispositivo |
| GET | `/api/data/event/:id` | detalle de un evento |
| GET | `/api/data/export/csv` | descarga CSV |

Filtros aceptados (query string):
`?id_dispositivo=1&fecha_inicio=2026-04-15&fecha_fin=2026-04-20`

### Ingestión de archivos `.log`

| Método | Ruta | Auth |
|---|---|---|
| POST | `/api/ingest/upload` | ADMIN/OPERADOR — multipart con campo `archivo` y `id_dispositivo` |

También por CLI:
```bash
npm run ingest -- --file ./mis_datos.log --dispositivo 1
```

---

## 6. Streaming en tiempo real

Tienes **dos opciones** equivalentes para que el frontend reciba eventos en vivo. Ambas están alimentadas por `LISTEN/NOTIFY` desde Postgres, así que **no hay polling**.

### Opción A — Socket.IO (recomendada)

```js
// frontend
import { io } from 'socket.io-client';
const socket = io('http://localhost:3000');

socket.on('connect',  () => socket.emit('subscribe', 'muones'));
socket.on('buffer',   (eventos) => console.log('contexto inicial', eventos));
socket.on('evento',   (ev)      => console.log('evento nuevo', ev));
```

Para suscribirse a un dispositivo específico:
```js
socket.emit('subscribeDevice', 1);
```

### Opción B — Server-Sent Events (simple, nativo del navegador)

```js
const es = new EventSource('http://localhost:3000/api/stream/eventos');
es.onmessage = (e) => {
  const evento = JSON.parse(e.data);
  console.log('evento', evento);
};
```

### Cómo funciona internamente

```
.log nuevo  →  ingestionService.ingestFile()
            →  INSERT en valor_medido
            →  TRIGGER tr_notificar_evento  →  pg_notify('nuevo_evento', payload)
            →  Cliente LISTEN en Node       →  Socket.IO / SSE
            →  Frontend recibe el evento
```

---

## 7. Estructura del proyecto

```
backend/
├── package.json
├── .env.example
├── sql/                          ← scripts SQL (ejecutar en orden)
│   ├── 01_crear_database.sql
│   ├── 02_crear_tablas.sql
│   ├── 03_crear_indices.sql
│   ├── 04_datos_iniciales.sql
│   ├── 05_crear_vistas.sql
│   ├── 06_funciones_triggers.sql
│   └── 07_sesiones.sql
└── src/
    ├── server.js                 ← entry point
    ├── app.js                    ← config Express
    ├── config/
    │   ├── database.js           ← pool pg + LISTEN
    │   └── logger.js             ← winston
    ├── db/
    │   └── install.js            ← npm run db:install
    ├── services/
    │   ├── authService.js        ← login/logout/validate
    │   ├── sensorService.js
    │   ├── dataService.js
    │   └── ingestionService.js   ← parser .log + insert masivo
    ├── controllers/
    │   ├── authController.js
    │   ├── sensorController.js
    │   ├── dataController.js
    │   └── ingestionController.js
    ├── routes/
    │   ├── auth.js
    │   ├── sensors.js
    │   ├── data.js
    │   ├── ingestion.js
    │   └── stream.js             ← SSE
    ├── middleware/
    │   ├── authMiddleware.js
    │   └── errorHandler.js
    ├── sockets/
    │   └── realtime.js           ← Socket.IO + LISTEN
    └── jobs/
        └── ingestLog.js          ← CLI ingestion
```

---

## 8. Conexión con el frontend Vue

En el frontend (`vite.config.js`), añade el proxy hacia el backend:

```js
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      '/api':       'http://localhost:3000',
      '/socket.io': { target: 'http://localhost:3000', ws: true }
    }
  }
})
```

Y desde un componente:
```js
import axios from 'axios'
const api = axios.create({ baseURL: '/api' })

// login
const { data } = await api.post('/auth/login', {
  correo: 'admin@umsa.bo', password: 'Admin1234'
})
localStorage.setItem('token', data.token)

// luego, en cada request protegida:
api.defaults.headers.common.Authorization = `Bearer ${data.token}`
```

---

## 9. Próximo paso: migrar a JWT

El login actual usa una tabla `sesion_activa` con tokens aleatorios. Cuando se implemente JWT, solo hay que tocar **dos archivos**:

- `src/services/authService.js` — generar/firmar JWT en lugar de guardar en BD.
- `src/middleware/authMiddleware.js` — verificar el JWT en lugar de consultar la tabla.

El resto del código (controladores, rutas, frontend) **no cambia**.
