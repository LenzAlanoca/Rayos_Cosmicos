# 🚀 Guía de Desarrollador - Rayos Cósmicos

## Primeros Pasos

### 1. Clonar el Repositorio
```bash
git clone <repo-url>
cd Rayos_Cosmicos
```

### 2. Estructura Mental del Proyecto

```
Usuarios/Público
       ↓
[Frontend - Vue.js]  ← Renderiza en navegador
       ↓
[HTTP/REST API] ← Comunica con servidor
       ↓
[Backend - PHP] ← Procesa datos
       ↓
[MySQL] ← Almacena datos
```

### 3. Instalar y Ejecutar

**Terminal 1 - Frontend:**
```bash
cd frontend
npm install
npm run dev
# Visita http://localhost:5173
```

**Terminal 2 - Backend:**
```bash
cd backend
composer install
php -S localhost:8000 -t public
# Visita http://localhost:8000/api/health
```

## Flujo de Desarrollo Típico

### Agregar Nueva Funcionalidad en Frontend

**Ejemplo: Crear componente de "Estado de Sensor"**

1. Crear archivo componente:
```bash
touch src/components/public/SensorStatus.vue
```

2. Implementar en Vue 3:
```vue
<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  sensorId: Number,
  name: String,
  active: Boolean
})

const emit = defineEmits(['click'])
</script>

<template>
  <div class="glass-effect rounded-lg p-4">
    <div class="flex justify-between">
      <h3>{{ name }}</h3>
      <div :class="active ? 'bg-green-500' : 'bg-red-500'" class="w-3 h-3 rounded-full animate-pulse" />
    </div>
  </div>
</template>

<style scoped>
/* estilos aquí */
</style>
```

3. Usar en una vista:
```vue
<template>
  <SensorStatus 
    :sensor-id="1" 
    name="Sensor α" 
    :active="true"
    @click="handleClick"
  />
</template>

<script setup>
import SensorStatus from '@/components/public/SensorStatus.vue'
</script>
```

4. Actualizar rutas si es una página nuevo (en `src/router/index.js`)

### Agregar Nuevo Endpoint en Backend

**Ejemplo: Endpoint para obtener temperatura promedio**

1. Crear método en módulo correspondiente:
```php
// src/Modules/Processing/DataProcessingService.php
public function getAverageTemperature(int $sensorId, string $start, string $end): float
{
    // Lógica aquí
    return $average;
}
```

2. Agregar ruta en `backend/public/index.php`:
```php
$app->get('/api/sensors/{id}/temperature/average', function ($request, $response, $args) {
    $sensorId = $args['id'];
    $start = $request->getQueryParams()['start'] ?? date('Y-m-d', strtotime('-7 days'));
    $end = $request->getQueryParams()['end'] ?? date('Y-m-d');
    
    $service = new DataProcessingService();
    $average = $service->getAverageTemperature($sensorId, $start, $end);
    
    return $response->write(json_encode(['data' => $average]));
});
```

3. Consumir desde frontend:
```javascript
// src/api/sensorApi.js
export const getAverageTemperature = async (sensorId, start, end) => {
  const { data } = await api.get(`/sensors/${sensorId}/temperature/average`, {
    params: { start, end }
  })
  return data
}
```

4. Usar en componente:
```vue
<script setup>
import { ref, onMounted } from 'vue'
import { getAverageTemperature } from '@/api/sensorApi'

const avgTemp = ref(null)

onMounted(async () => {
  avgTemp.value = await getAverageTemperature(1, '2026-03-15', '2026-03-22')
})
</script>
```

## Estructura de Directorios - Agregar Archivos

### Frontend - Nueva Vista Pública
```bash
# Archivo
frontend/src/views/public/MyNewPage.vue

# Actualizar router en: frontend/src/router/index.js
# Agregar en array de rutas:
{
  path: '/portal/my-page',
  name: 'my-page',
  component: () => import('@views/public/MyNewPage.vue')
}
```

### Frontend - Nuevo Componente
```bash
# Archivo
frontend/src/components/public/MyComponent.vue

# Importar donde necesites
import MyComponent from '@components/public/MyComponent.vue'
```

### Frontend - Nuevo Módulo
```bash
# Carpeta
frontend/src/modules/my-feature/

# Archivos
frontend/src/modules/my-feature/
├── index.js         # Exporta funciones
├── utils.js         # Funciones utilitarias
└── types.js         # Tipos (venturas con TypeScript)
```

### Frontend - Nueva Tienda (Pinia)
```bash
# Archivo
frontend/src/stores/myStore.js

# Contenido:
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useMyStore = defineStore('my', () => {
  const count = ref(0)
  const doubled = computed(() => count.value * 2)
  
  const increment = () => count.value++
  
  return { count, doubled, increment }
})

# Usar en componente:
import { useMyStore } from '@/stores/myStore'
const myStore = useMyStore()
```

### Backend - Nuevo Módulo
```bash
# Carpeta
backend/src/Modules/MyModule/

# Archivo servicio:
backend/src/Modules/MyModule/MyModuleService.php

# Contenido:
<?php
namespace App\Modules\MyModule;

class MyModuleService {
    public function getData() {
        return ['data' => 'ejemplo'];
    }
}

# Usar en index.php:
use App\Modules\MyModule\MyModuleService;

$myModule = new MyModuleService();
$app->get('/api/my-endpoint', function ($request, $response) use ($myModule) {
    return $response->write(json_encode($myModule->getData()));
});
```

## Convenciones de Código

### Frontend - JavaScript/Vue

**Nombres:**
- Componentes: `PascalCase` → `MyComponent.vue`
- Variables: `camelCase` → `myVariable`
- Constantes: `UPPER_SNAKE_CASE` → `MAX_LENGTH = 100`
- CSS clases: `kebab-case` → `my-class-name`

**Importaciones:**
```javascript
// ✅ Correcto - usar aliases
import { MyComponent } from '@components/public/MyComponent.vue'
import apiService from '@/api/services'

// ❌ Evitar - rutas relativas profundas
import { MyComponent } from '../../../components/public/MyComponent.vue'
```

**Props y Emits:**
```vue
<script setup>
// Documentar siempre
defineProps({
  /** ID del sensor */
  sensorId: {
    type: Number,
    required: true
  },
  /** Nombre del sensor */
  name: {
    type: String,
    default: 'Sin nombre'
  }
})

defineEmits({
  /** Emitido cuando se hace click */
  'sensor-click': (id) => typeof id === 'number',
  'update:active': (value) => typeof value === 'boolean'
})
</script>
```

### Backend - PHP

**Namespaces:**
```php
<?php
// ✅ Correcto - namespace según carpeta
namespace App\Modules\MyModule;

class MyService {
    // ...
}
```

**Documentación:**
```php
<?php
/**
 * Servicio para gestionar sensores
 * 
 * @author Tu Nombre
 * @version 1.0.0
 */
class SensorManagementService {
    /**
     * Obtener sensor por ID
     * 
     * @param int $sensorId ID del sensor
     * @return array|null Datos del sensor o null
     * @throws InvalidArgumentException Si el ID no es válido
     */
    public function getSensorById(int $sensorId): ?array {
        // ...
    }
}
```

**Validación:**
```php
<?php
// Whitelist de parámetros
$allowedParams = ['sensor_id', 'value', 'timestamp'];
$params = $request->getParsedBody();

// Validar presencia
if (!isset($params['sensor_id'])) {
    return $response->withStatus(400)->write(
        json_encode(['error' => 'sensor_id requerido'])
    );
}

// Validar tipo
if (!is_int($params['sensor_id'])) {
    return $response->withStatus(422)->write(
        json_encode(['error' => 'sensor_id debe ser entero'])
    );
}
```

## Testing

### Frontend - Unit Tests (próximo)
```bash
npm run test:unit

# Archivo de test: src/components/__tests__/MyComponent.spec.js
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MyComponent from '@/components/public/MyComponent.vue'

describe('MyComponent', () => {
  it('renderiza correctamente', () => {
    const wrapper = mount(MyComponent, {
      props: { title: 'Test' }
    })
    expect(wrapper.find('.component').exists()).toBe(true)
  })
})
```

### Backend - Unit Tests (próximo)
```bash
composer test

# Archivo: tests/MyTest.php
use PHPUnit\Framework\TestCase;

class MyTest extends TestCase {
    public function testSomething() {
        $service = new MyService();
        $result = $service->doSomething();
        $this->assertEquals('expected', $result);
    }
}
```

## Performance y Optimization

### Frontend

1. **Code Splitting automático** con dynamic imports:
```javascript
// Lazy load de módulos
const MyComponent = defineAsyncComponent(() => 
  import('@/components/public/MyComponent.vue')
)
```

2. **Devtools Chrome Extension:**
   - Vue DevTools para inspeccionar componentes
   - Network tab para revisar llamadas API
   - Performance tab para profiling

### Backend

1. **Índices en Base de Datos:**
```sql
-- Agregar en migraciones
ALTER TABLE sensor_readings 
ADD INDEX idx_sensor_time (sensor_id, recorded_at DESC);

ALTER TABLE alerts 
ADD INDEX idx_unread (is_read, created_at DESC);
```

2. **Prepared Statements** (siempre):
```php
// ✅ Seguro
$stmt = $pdo->prepare('SELECT * FROM sensors WHERE id = ?');
$stmt->execute([$id]);

// ❌ SQL Injection
$query = "SELECT * FROM sensors WHERE id = $id";
```

## Troubleshooting Común

### Frontend

| Problema | Solución |
|----------|----------|
| Las rutas no funcionan | Revisar imports en router/index.js, reconstruir npm run dev |
| Estilos Tailwind no aplican | Verificar content en tailwind.config.js |
| Componente no renderiza | Verificar propietarios type/default, console.log() en <script> |
| CORS error | Verificar vite.config.js proxy, backend /api debe tener CORS |

### Backend

| Problema | Solución |
|----------|----------|
| Class not found | `composer dump-autoload` |
| DB connection error | Verificar .env (host, user, password, nombre BD) |
| 404 en rutas | Revisar public/index.php, rutas deben estar en $app |
| Token inválido | Revisar headers Authorization en requests |

## Recursos Útiles

- [Vue.js 3 Docs](https://vuejs.org/)
- [Tailwind CSS Docs](https://tailwindcss.com/)
- [Slim Framework Docs](https://www.slimframework.com/)
- [MySQL 5.7+ Docs](https://dev.mysql.com/doc/)
- [RESTful API Design](https://restfulapi.net/)

## Crear Pull Request

1. Crear rama: `git checkout -b feat/my-feature`
2. Hacer cambios y commits
3. Versionar con mensaje claro: `git commit -m "feat: agregar componente MyComponent"`
4. Push a rama: `git push origin feat/my-feature`
5. Abrir PR en GitHub/GitLab

## Convención de Commits

```
feat: agregar nueva funcionalidad
fix: corregir bug
docs: cambios en documentación
style: cambios de formato/estilo
refactor: restructurar código
perf: mejoras de performance
test: agregar/actualizar tests
chore: tareas mantenim iento
```

Ejemplo: `feat: agregar dashboard de sensores con gráficos en vivo`

---

**¿Preguntas o necesitas ayuda?**  
Consulta la documentación en `docs/` o abre un issue en el repositorio.
