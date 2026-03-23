# 🌌 Sistema Web de Monitoreo de Rayos Cósmicos – UMSA

##  Descripción General

Este proyecto consiste en el desarrollo de un sistema web para la **visualización, procesamiento y monitoreo de datos provenientes de sensores científicos** utilizados en la carrera de Física de la Universidad Mayor de San Andrés (UMSA).

El sistema está diseñado para recolectar automáticamente datos generados por distintos dispositivos experimentales —como magnetómetros, detectores de partículas y sensores de neutrinos—, centralizarlos en un servidor y presentarlos a través de una interfaz web moderna, accesible y eficiente.

El enfoque del sistema se basa en una arquitectura de doble propósito:

*  **Portal público:** orientado a la visualización accesible de datos procesados.
*  **Panel interno:** orientado al análisis técnico, monitoreo en tiempo real y gestión de dispositivos.

---

##  Objetivo del Sistema

Proporcionar una plataforma centralizada que permita:

* Visualizar datos científicos en tiempo (casi) real.
* Facilitar la interpretación mediante gráficos y dashboards interactivos.
* Procesar y transformar datos crudos en información útil.
* Garantizar acceso público controlado sin comprometer la integridad de los datos.
* Ofrecer herramientas internas para investigadores y administradores.

---

##  Arquitectura Funcional

###  Portal Público

El sistema ofrece una interfaz abierta al público sin necesidad de autenticación, donde se prioriza la accesibilidad y claridad de la información.

**Características:**

* Visualización de datos procesados mediante gráficos interactivos.
* Indicadores del estado de sensores (activo/inactivo).
* Consulta de datos históricos filtrados.
* Exportación limitada de datos (CSV, JSON).
* Contenido informativo sobre los experimentos y dispositivos.

>  No se exponen datos crudos ni funcionalidades administrativas en esta capa.

---

###  Panel Interno (Administración y Análisis)

El sistema cuenta con un módulo interno no visible desde la interfaz pública, accesible únicamente mediante autenticación.

**Características:**

* Dashboard avanzado con datos en tiempo real.
* Acceso a datos crudos y completos.
* Gestión de sensores (registro, configuración, activación/desactivación).
* Procesamiento y limpieza de datos.
* Sistema de alertas ante fallos o anomalías.
* Exportación completa de datasets.

---

##  Flujo de Datos

1. Los dispositivos físicos recolectan datos experimentales.
2. Los datos son enviados automáticamente al servidor central.
3. El sistema valida y almacena la información.
4. Se realiza un proceso de transformación:

   * Limpieza
   * Normalización
   * Agregación
5. Se generan dos capas de datos:

   * Datos procesados (para visualización pública)
   * Datos crudos (para análisis interno)

---

##  Stakeholders

| Stakeholder    | Rol                    | Prioridad | Expectativa                              |
| -------------- | ---------------------- | --------- | ---------------------------------------- |
| Product Owner  | Dirección del proyecto | Crítica   | Cumplimiento de visión y requerimientos  |
| Investigadores | Usuario experto        | Alta      | Precisión en procesamiento y análisis    |
| Equipo IT      | Infraestructura        | Alta      | Seguridad, estabilidad, mantenibilidad   |
| Estudiantes    | Usuario final          | Media     | Usabilidad y acceso rápido a información |

---

##  Stack Tecnológico

**Frontend:**

* Vue.js
* Librerías de gráficos (Chart.js / ECharts)
* Diseño responsivo

**Backend (planificado):**

* Servidor central (PHP inicialmente)
* API REST
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

## 🔐 Seguridad y Acceso

* El portal público no incluye opciones visibles de autenticación.
* El panel interno se encuentra desacoplado y protegido mediante autenticación.
* Se garantiza la separación entre datos públicos y datos sensibles.

---

## 📈 Alcance

Este sistema busca no solo cubrir necesidades actuales de monitoreo, sino también servir como base escalable para futuros proyectos científicos dentro de la universidad.

---

## 🤝 Contribución

Proyecto en desarrollo académico. La colaboración está sujeta a lineamientos del equipo y la institución.

---
