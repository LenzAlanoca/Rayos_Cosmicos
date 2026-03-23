# 📋 Checklist de Primer Inicio

> Sigue este checklist para configurar el proyecto la primera vez

## ✅ Requisitos Previos

- [ ] Node.js 16+ instalado (`node --version`)
- [ ] npm/yarn instalado (`npm --version`)
- [ ] PHP 8.1+ instalado (`php --version`)
- [ ] Composer instalado (`composer --version`)
- [ ] MySQL 5.7+ corriendo localmente
- [ ] Git instalado (opcional para versionamiento)

## ✅ Configuración Frontend

```bash
# 1. Navegar a carpeta frontend
cd frontend

# 2. Instalar dependencias
npm install

# 3. Iniciar servidor de desarrollo
npm run dev

# 4. Verificar que abre en http://localhost:5173
# Deberías ver la Landing Page con tema cielo nocturno
```

**Evidencia:** Visualizar Landing Page ✓

## ✅ Configuración Backend

```bash
# 1. Navegar a carpeta backend (nueva terminal)
cd backend

# 2. Instalar dependencias PHP
composer install

# 3. Crear archivo .env
cp .env.example .env

# 4. Editar .env con valores correctos:
nano .env
# DB_HOST=localhost
# DB_NAME=rayos_cosmicos (creas si no existe)
# DB_USER=root
# DB_PASS= (vacío si no tiene contraseña)

# 5. Iniciar servidor
php -S localhost:8000 -t public

# 6. Verificar que funciona
curl http://localhost:8000/api/health
# Deberías ver: {"status":"ok","version":"0.1.0-beta",...}
```

**Evidencia:** Health check responde ✓

## ✅ Integración Frontend-Backend

En frontend, verificar que API se conecta:

```javascript
// Abrir DevTools (F12) → Console
fetch('http://localhost:8000/api/sensors')
  .then(r => r.json())
  .then(d => console.log(d))
// Deberías ver array de sensores
```

**Evidencia:** Console muestra datos de API ✓

## ✅ Explorar Portal Público

1. **Landing Page**
   - Navega a `http://localhost:5173`
   - Verifica que cargue con tema azul
   - Haz click en "Ir al Portal Público"

2. **Dashboard Público**
   - Navega a `http://localhost:5173/portal/dashboard`
   - Verifica gráficos se cargan
   - Prueba filtros
   - Intenta descargar CSV

3. **Histórico**
   - Navega a `http://localhost:5173/portal/historico`
   - Verifica tabla de datos
   - Prueba descargas CSV y JSON

4. **Información**
   - Navega a `http://localhost:5173/portal/info`
   - Lee información del proyecto

**Evidencia:** Todas las páginas públicas funcionan ✓

## ✅ Base de Datos (Próximo paso)

```bash
# 1. Crear base de datos
mysql -u root -p
> CREATE DATABASE rayos_cosmicos CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
> EXIT;

# 2. Crear tablas (cuando esté el archivo schema.sql)
mysql -u root -p rayos_cosmicos < database/schema.sql

# 3. Verificar conexión
php -r "require 'vendor/autoload.php'; echo 'OK';"
```

## 📝 Notas Importantes

- El frontend se recompila automáticamente al cambiar archivos
- El backend NO se recompila automáticamente (reinicia servidor)
- Los datos mostrados ahora son de prueba (mock data)
- La BD no está aún integrada (próxima fase)
- La autenticación no está implementada

## 🛑 Problemas Comunes

### Puerto 5173 en uso
```bash
npm run dev -- --port 5174  # usar otro puerto
```

### Port 8000 en uso
```bash
php -S localhost:8001 -t public  # usar otro puerto
```

### node_modules corrupto
```bash
rm -rf node_modules
npm install
```

### Composer error
```bash
composer clear-cache
composer install
```

### DB connection refused
- Asegúrate que MySQL está corriendo
- Verifica credenciales en .env
- Crea la base de datos si no existe

## ✅ Siguiente: Desarrollar características

Una vez completado este checklist, consulta:
- [DEVELOPER.md](DEVELOPER.md) - Guía para agregar nuevas funcionalidades
- [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) - Entender la arquitectura
- [docs/API.md](docs/API.md) - Endpoints disponibles
- [frontend/README.md](frontend/README.md) - Detalles frontend
- [backend/README.md](backend/README.md) - Detalles backend

---

**Completado en:** ___________  
**Por:** ___________  
**Notas:** ___________
