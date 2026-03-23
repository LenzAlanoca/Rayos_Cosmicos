<template>
  <div class="landing-page min-h-screen flex flex-col">
    <!-- Navbar -->
    <nav class="sticky top-0 z-50 glass-effect border-b border-sky-dark-700">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div class="flex justify-between items-center">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-sky-dark-400 to-sky-dark-600 flex items-center justify-center">
              <span class="text-white font-bold text-lg">🌌</span>
            </div>
            <div>
              <h1 class="text-xl font-bold text-sky-dark-50">RAYOS CÓSMICOS</h1>
              <p class="text-xs text-sky-dark-300">UMSA - Sistema de Monitoreo</p>
            </div>
          </div>
          
          <div class="hidden md:flex gap-8 items-center">
            <router-link to="#info" class="text-sky-dark-200 hover:text-sky-dark-50 transition">Información</router-link>
            <router-link to="#caracteristicas" class="text-sky-dark-200 hover:text-sky-dark-50 transition">Características</router-link>
            <router-link to="/portal" class="px-6 py-2 bg-gradient-to-r from-sky-dark-500 to-sky-dark-600 rounded-lg text-white font-medium hover:from-sky-dark-400 hover:to-sky-dark-500 transition shadow-lg">
              Acceder al Portal
            </router-link>
          </div>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <section class="flex-1 flex flex-col items-center justify-center px-4 py-20 relative">
      <div class="text-center max-w-4xl mx-auto">
        <!-- Título con efecto de brillo -->
        <div class="mb-8">
          <h2 class="text-5xl md:text-7xl font-bold mb-6 flex items-center justify-center flex-wrap gap-3">
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-sky-dark-200 via-sky-dark-100 to-sky-dark-300">
              Monitoreo de
            </span>
            <span class="relative inline-block">
              <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-300">
                Rayos Cósmicos
              </span>
              <div class="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-cyan-400/20 blur-xl -z-10"></div>
            </span>
          </h2>
          <p class="text-xl md:text-2xl text-sky-dark-300 mb-8">
            Sistema integral de visualización y análisis de datos de radiación cósmica
          </p>
        </div>

        <!-- Descripción -->
        <div class="bg-gradient-to-br from-sky-dark-900/50 to-sky-dark-950/50 backdrop-blur-sm border border-sky-dark-700/50 rounded-2xl p-8 mb-12">
          <p class="text-sky-dark-200 text-lg leading-relaxed">
            Desarrollado por la carrera de Física de la Universidad Mayor de San Andrés (UMSA), 
            nuestro sistema proporciona una plataforma moderna para la recolección, procesamiento 
            y visualización de datos obtenidos por sensores científicos especializados en la detección 
            de radiación cósmica.
          </p>
        </div>

        <!-- Botones principales -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <router-link 
            to="/portal" 
            class="px-8 py-3 bg-gradient-to-r from-sky-dark-500 to-sky-dark-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-sky-dark-500/50 transition transform hover:scale-105"
          >
            Ir al Portal Público
          </router-link>
          <a 
            href="#caracteristicas"
            class="px-8 py-3 border border-sky-dark-500 text-sky-dark-300 font-semibold rounded-lg hover:bg-sky-dark-900/50 transition"
          >
            Saber más
          </a>
        </div>
      </div>
    </section>

    <!-- Características (tarjetas) -->
    <section id="caracteristicas" class="py-20 px-4 border-t border-sky-dark-700">
      <div class="max-w-6xl mx-auto">
        <h3 class="text-4xl font-bold text-center mb-16 text-sky-dark-50">Características del Sistema</h3>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <!-- Card 1 -->
          <div class="glass-effect rounded-xl p-6 hover:border-sky-dark-400 transition group">
            <div class="text-4xl mb-4">📊</div>
            <h4 class="text-xl font-semibold text-sky-dark-50 mb-3">Visualización en Tiempo Real</h4>
            <p class="text-sky-dark-300">
              Gráficos interactivos que se actualizan automáticamente con datos recibidos de los sensores.
            </p>
          </div>

          <!-- Card 2 -->
          <div class="glass-effect rounded-xl p-6 hover:border-sky-dark-400 transition group">
            <div class="text-4xl mb-4">🔍</div>
            <h4 class="text-xl font-semibold text-sky-dark-50 mb-3">Análisis de Datos</h4>
            <p class="text-sky-dark-300">
              Herramientas avanzadas para filtrar, procesar y analizar información histórica.
            </p>
          </div>

          <!-- Card 3 -->
          <div class="glass-effect rounded-xl p-6 hover:border-sky-dark-400 transition group">
            <div class="text-4xl mb-4">📥</div>
            <h4 class="text-xl font-semibold text-sky-dark-50 mb-3">Exportación de Datos</h4>
            <p class="text-sky-dark-300">
              Descarga tus datos en múltiples formatos (CSV, JSON) para análisis independiente.
            </p>
          </div>

          <!-- Card 4 -->
          <div class="glass-effect rounded-xl p-6 hover:border-sky-dark-400 transition group">
            <div class="text-4xl mb-4">🛡️</div>
            <h4 class="text-xl font-semibold text-sky-dark-50 mb-3">Acceso Seguro</h4>
            <p class="text-sky-dark-300">
              Panel administrativo protegido para gestión avanzada y monitoreo interno.
            </p>
          </div>

          <!-- Card 5 -->
          <div class="glass-effect rounded-xl p-6 hover:border-sky-dark-400 transition group">
            <div class="text-4xl mb-4">📱</div>
            <h4 class="text-xl font-semibold text-sky-dark-50 mb-3">Responsivo</h4>
            <p class="text-sky-dark-300">
              Diseño adaptable que funciona perfectamente en desktop, tablet y dispositivos móviles.
            </p>
          </div>

          <!-- Card 6 -->
          <div class="glass-effect rounded-xl p-6 hover:border-sky-dark-400 transition group">
            <div class="text-4xl mb-4">⚡</div>
            <h4 class="text-xl font-semibold text-sky-dark-50 mb-3">Rendimiento</h4>
            <p class="text-sky-dark-300">
              Arquitectura optimizada para manejar grandes volúmenes de datos eficientemente.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Información técnica -->
    <section id="info" class="py-20 px-4 border-t border-sky-dark-700">
      <div class="max-w-4xl mx-auto">
        <h3 class="text-4xl font-bold text-center mb-12 text-sky-dark-50">Stack Tecnológico</h3>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div class="glass-effect rounded-xl p-6">
            <h4 class="text-2xl font-semibold text-cyan-300 mb-4">🎨 Frontend</h4>
            <ul class="space-y-2 text-sky-dark-200">
              <li class="flex gap-2">
                <span class="text-sky-dark-400">▸</span>
                <span><strong>Vue.js 3</strong> - Framework reactivo</span>
              </li>
              <li class="flex gap-2">
                <span class="text-sky-dark-400">▸</span>
                <span><strong>Chart.js / ECharts</strong> - Gráficos interactivos</span>
              </li>
              <li class="flex gap-2">
                <span class="text-sky-dark-400">▸</span>
                <span><strong>Tailwind CSS</strong> - Estilos avanzados</span>
              </li>
              <li class="flex gap-2">
                <span class="text-sky-dark-400">▸</span>
                <span><strong>Pinia</strong> - Gestión de estado</span>
              </li>
            </ul>
          </div>

          <div class="glass-effect rounded-xl p-6">
            <h4 class="text-2xl font-semibold text-cyan-300 mb-4">⚙️ Backend</h4>
            <ul class="space-y-2 text-sky-dark-200">
              <li class="flex gap-2">
                <span class="text-sky-dark-400">▸</span>
                <span><strong>PHP 8+</strong> - Servidor API REST</span>
              </li>
              <li class="flex gap-2">
                <span class="text-sky-dark-400">▸</span>
                <span><strong>Arquitectura Modular</strong> - Escalable y mantenible</span>
              </li>
              <li class="flex gap-2">
                <span class="text-sky-dark-400">▸</span>
                <span><strong>MySQL</strong> - Base de datos</span>
              </li>
              <li class="flex gap-2">
                <span class="text-sky-dark-400">▸</span>
                <span><strong>WebSockets</strong> - Datos en tiempo real</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="border-t border-sky-dark-700 py-8 px-4 mt-20">
      <div class="max-w-6xl mx-auto text-center text-sky-dark-400 text-sm">
        <p class="mb-2">
          🌌 Sistema de Monitoreo de Rayos Cósmicos - Universidad Mayor de San Andrés
        </p>
        <p class="text-sky-dark-500">
          © 2026 UMSA | Carrera de Física | Desarrollo Web Avanzado
        </p>
      </div>
    </footer>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Landing',
  meta: {
    title: 'Rayos Cósmicos - Sistema de Monitoreo UMSA'
  }
})
</script>

<style scoped>
.landing-page {
  background: linear-gradient(135deg, #0f1b4a 0%, #1b2d7f 50%, #2f3e8c 100%);
  background-attachment: fixed;
}
</style>
