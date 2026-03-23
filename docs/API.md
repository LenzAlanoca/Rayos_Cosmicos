# 📡 Documentación de API REST

## Base URL

```
http://localhost:8000/api
```

## Autenticación

Actualmente en beta sin autenticación. En producción se usará:
- Bearer token en header `Authorization`
- Refresh tokens JWT

## Formatos de Respuesta

### Éxito (200, 201)

```json
{
  "success": true,
  "data": { ... },
  "message": "Operación exitosa"
}
```

### Error (4xx, 5xx)

```json
{
  "success": false,
  "error": "ERROR_CODE",
  "message": "Descripción del error",
  "details": { ... }
}
```

## Endpoints Públicos

### 1. Health Check

```http
GET /health
```

**Respuesta:**
```json
{
  "status": "ok",
  "version": "0.1.0-beta",
  "timestamp": "2026-03-22 10:15:00"
}
```

### 2. Listar Sensores

```http
GET /sensors
```

**Parámetros Query:**
- `active` (bool): Filtrar por estado
- `limit` (int): Límite de resultados

**Respuesta:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Sensor α",
      "location": "Lab Principal",
      "type": "GM",
      "active": true,
      "last_reading": "2026-03-22T10:14:30Z",
      "battery_level": 85
    }
  ]
}
```

### 3. Obtener Datos en Tiempo Real

```http
GET /data
```

**Parámetros Query:**
- `sensor_id` (int): ID del sensor
- `limit` (int): Últimos N registros

**Respuesta:**
```json
{
  "success": true,
  "data": [
    {
      "id": 12847,
      "sensor_id": 1,
      "value": 245,
      "unit": "CPM",
      "temperature": 21.3,
      "humidity": 45,
      "timestamp": "2026-03-22T10:15:00Z"
    }
  ]
}
```

### 4. Obtener Datos Históricos

```http
GET /data/historical
```

**Parámetros Query:**
- `sensor_id` (int): ID del sensor (requerido)
- `start_date` (string): Inicio (YYYY-MM-DD)
- `end_date` (string): Fin (YYYY-MM-DD)
- `limit` (int): Límite de registros

**Ejemplo:**
```
GET /data/historical?sensor_id=1&start_date=2026-03-20&end_date=2026-03-22&limit=1000
```

**Respuesta:**
```json
{
  "success": true,
  "data": [
    {
      "timestamp": "2026-03-20T08:00:00Z",
      "sensor_id": 1,
      "value": 238,
      "unit": "CPM",
      "temperature": 20.8
    }
  ],
  "count": 100,
  "total": 2847
}
```

### 5. Estado de un Sensor

```http
GET /sensors/:id/status
GET /sensors/1/status
```

**Respuesta:**
```json
{
  "success": true,
  "data": {
    "sensor_id": 1,
    "name": "Sensor α",
    "active": true,
    "last_reading": "2026-03-22T10:15:00Z",
    "battery_level": 85,
    "temperature": 21.3,
    "uptime_percent": 99.8,
    "total_readings": 12847
  }
}
```

### 6. Ingestar Datos (para sensores)

```http
POST /ingest
Content-Type: application/json

{
  "sensor_id": 1,
  "value": 245,
  "unit": "CPM",
  "temperature": 21.3,
  "humidity": 45,
  "timestamp": "2026-03-22T10:15:00Z"
}
```

**Respuesta:**
```json
{
  "success": true,
  "message": "Datos ingestionados correctamente",
  "data_id": "6476a5c8e9f"
}
```

### 7. Exportar Datos

```http
GET /data/export?format=csv&sensor_id=1&start_date=2026-03-20&end_date=2026-03-22
```

**Parámetros Query:**
- `format` (string): "csv" o "json"
- `sensor_id` (int): ID del sensor
- `start_date`, `end_date` (string): Rango de fechas

**Respuesta:**
```csv
timestamp,sensor_id,value,unit,temperature
2026-03-22T10:15:00Z,1,245,CPM,21.3
2026-03-22T10:14:00Z,1,238,CPM,21.2
```

## Endpoints Internos (Administración)

### 1. Crear Sensor

```http
POST /admin/sensors
Content-Type: application/json
Authorization: Bearer {token}

{
  "name": "Sensor ε",
  "location": "Nueva ubicación",
  "type": "GM",
  "calibration_factor": 1.0
}
```

**Respuesta:**
```json
{
  "success": true,
  "data": {
    "id": 5,
    "name": "Sensor ε",
    "location": "Nueva ubicación",
    "created_at": "2026-03-22T10:20:00Z"
  }
}
```

### 2. Actualizar Sensor

```http
PUT /admin/sensors/:id
Content-Type: application/json
Authorization: Bearer {token}

{
  "name": "Sensor ε - Modificado",
  "active": false
}
```

**Respuesta:**
```json
{
  "success": true,
  "message": "Sensor actualizado"
}
```

### 3. Eliminar Sensor

```http
DELETE /admin/sensors/:id
Authorization: Bearer {token}
```

**Respuesta:**
```json
{
  "success": true,
  "message": "Sensor eliminado"
}
```

### 4. Obtener Datos Crudos

```http
GET /admin/data/raw
Authorization: Bearer {token}
```

**Parámetros Query:**
- `sensor_id` (int)
- `limit` (int)
- `offset` (int)

**Respuesta:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "sensor_id": 1,
      "raw_value": 245.5,
      "temperature": 21.3,
      "humidity": 45.2,
      "created_at": "2026-03-22T10:15:00Z"
    }
  ]
}
```

### 5. Listar Alertas

```http
GET /admin/alerts
Authorization: Bearer {token}
```

**Parámetros Query:**
- `unread` (bool): Solo no leídas
- `limit` (int)

**Respuesta:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "sensor_id": 1,
      "type": "anomaly",
      "message": "Lectura anormalmente alta",
      "severity": "warning",
      "is_read": false,
      "created_at": "2026-03-22T10:15:00Z"
    }
  ]
}
```

### 6. Marcar Alerta como Leída

```http
POST /admin/alerts/:id/read
Authorization: Bearer {token}
```

**Respuesta:**
```json
{
  "success": true,
  "message": "Alerta marcada como leída"
}
```

### 7. Estadísticas

```http
GET /admin/statistics
Authorization: Bearer {token}
```

**Parámetros Query:**
- `period` (string): "day", "week", "month"
- `sensor_id` (int)

**Respuesta:**
```json
{
  "success": true,
  "data": {
    "total_readings": 12847,
    "average": 256.3,
    "max": 512,
    "min": 45,
    "sensors_active": 3,
    "sensors_total": 4,
    "alerts_today": 2,
    "period": "2026-03-22"
  }
}
```

## Códigos de Error

| Código | Mensaje | Descripción |
|--------|---------|-------------|
| 400 | Bad Request | Parámetros inválidos |
| 401 | Unauthorized | No autenticado |
| 403 | Forbidden | No autorizado |
| 404 | Not Found | Recurso no encontrado |
| 409 | Conflict | Conflicto (ej: sensor duplicado) |
| 422 | Unprocessable Entity | Validación fallida |
| 500 | Internal Server Error | Error del servidor |
| 503 | Service Unavailable | Base de datos o servicio no disponible |

## Rate Limiting

Próximamente se implementará:
- 100 requests/minuto para usuarios públicos
- 1000 requests/minuto para usuarios autenticados
- Headers de respuesta: `X-RateLimit-Limit`, `X-RateLimit-Remaining`

## Versionado

La API puede accederse como:
- `/api/v1/...` (versión actual)
- `/api/v2/...` (próximas versiones)

## Webhooks

Próximamente se implementarán webhooks para:
```
POST {callback_url}
{
  "event": "sensor.reading",
  "sensor_id": 1,
  "value": 245,
  "timestamp": "2026-03-22T10:15:00Z"
}
```

## Ejemplos con cURL

```bash
# Health check
curl http://localhost:8000/api/health

# Listar sensores
curl http://localhost:8000/api/sensors

# Datos históricos
curl "http://localhost:8000/api/data/historical?sensor_id=1&start_date=2026-03-20&end_date=2026-03-22"

# Exportar CSV
curl "http://localhost:8000/api/data/export?format=csv&sensor_id=1" > datos.csv

# Enviar datos de sensor
curl -X POST http://localhost:8000/api/ingest \
  -H "Content-Type: application/json" \
  -d '{
    "sensor_id": 1,
    "value": 245,
    "unit": "CPM",
    "temperature": 21.3
  }'
```

## Próximos Enhancements

1. Paginación automática
2. GraphQL alternativo a REST
3. WebSockets para datos en vivo
4. Compresión de respuestas (gzip)
5. Caché HTTP (ETag)
6. Openapi/Swagger documentación interactiva
