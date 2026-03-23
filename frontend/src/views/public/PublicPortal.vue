<template>
  <div class="public-portal min-h-screen">
    <!-- Navbar con navegación del portal -->
    <nav class="sticky top-0 z-40 glass-effect border-b border-sky-dark-700">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div class="flex justify-between items-center">
          <router-link to="/" class="flex items-center gap-3 hover:opacity-80 transition">
            <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-sky-dark-400 to-sky-dark-600 flex items-center justify-center">
              <span class="text-white text-sm">🌌</span>
            </div>
            <span class="font-bold text-sky-dark-50">RAYOS CÓSMICOS</span>
          </router-link>

          <div class="flex gap-6 md:gap-8 items-center">
            <router-link 
              to="/portal/dashboard" 
              class="text-sky-dark-300 hover:text-sky-dark-50 transition font-medium"
              :class="{ 'text-sky-dark-50 border-b-2 border-sky-dark-500': isActive('public-dashboard') }"
            >
              Dashboard
            </router-link>
            <router-link 
              to="/portal/historico" 
              class="text-sky-dark-300 hover:text-sky-dark-50 transition font-medium"
              :class="{ 'text-sky-dark-50 border-b-2 border-sky-dark-500': isActive('public-historico') }"
            >
              Histórico
            </router-link>
            <router-link 
              to="/portal/info" 
              class="text-sky-dark-300 hover:text-sky-dark-50 transition font-medium"
              :class="{ 'text-sky-dark-50 border-b-2 border-sky-dark-500': isActive('public-info') }"
            >
              Información
            </router-link>
          </div>
        </div>
      </div>
    </nav>

    <!-- Contenido del portal -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Mensaje de bienvenida en la primera vista -->
      <div v-if="isFirstView" class="mb-8">
        <div class="glass-effect rounded-xl p-8 border-2 border-sky-dark-500/50">
          <h1 class="text-3xl md:text-4xl font-bold text-sky-dark-50 mb-4">
            Bienvenido al Portal Público
          </h1>
          <p class="text-sky-dark-300 text-lg mb-6">
            Accede a visualizaciones en tiempo real de datos de rayos cósmicos detectados por nuestros sensores.
            Puedes explorar gráficos interactivos, consultar datos históricos y descargar información en múltiples formatos.
          </p>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <router-link 
              to="/portal/dashboard"
              class="px-4 py-3 bg-gradient-to-r from-sky-dark-500 to-sky-dark-600 rounded-lg text-white font-medium text-center hover:shadow-lg hover:shadow-sky-dark-500/50 transition"
            >
              Ver Dashboard en Vivo
            </router-link>
            <router-link 
              to="/portal/historico"
              class="px-4 py-3 bg-sky-dark-800/50 border border-sky-dark-500 rounded-lg text-sky-dark-200 font-medium text-center hover:bg-sky-dark-700/50 transition"
            >
              Consultar Histórico
            </router-link>
            <router-link 
              to="/portal/info"
              class="px-4 py-3 bg-sky-dark-800/50 border border-sky-dark-500 rounded-lg text-sky-dark-200 font-medium text-center hover:bg-sky-dark-700/50 transition"
            >
              Más Información
            </router-link>
          </div>
        </div>
      </div>

      <!-- Router view para las diferentes páginas del portal -->
      <router-view />
    </main>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'PublicPortal',
  data() {
    return {
      isFirstView: false
    }
  },
  watch: {
    $route(to) {
      this.updateFirstView()
    }
  },
  mounted() {
    this.updateFirstView()
  },
  methods: {
    updateFirstView() {
      this.isFirstView = this.$route.path === '/portal'
    },
    isActive(routeName) {
      return this.$route.name === routeName
    }
  }
})
</script>

<style scoped>
.public-portal {
  background: linear-gradient(135deg, #0f1b4a 0%, #1b2d7f 50%, #2f3e8c 100%);
  background-attachment: fixed;
  min-height: 100vh;
}
</style>
