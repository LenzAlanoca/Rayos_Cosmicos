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
            <router-link 
              to="/login"
              class="text-sky-dark-300 hover:text-sky-dark-50 transition font-medium"
              :class="{ 'text-sky-dark-50 border-b-2 border-sky-dark-500': isActive('login') }"
            >
              Iniciar sesión
            </router-link>
          </div>
        </div>
      </div>
    </nav>

    <!-- Contenido del portal -->
    <main class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Mensaje de bienvenida en la primera vista -->
      <div v-if="isFirstView" class="mb-8">
        <div class="glass-effect rounded-3xl p-8 border-2 border-sky-dark-500/40 shadow-[0_20px_80px_rgba(15,27,74,0.25)]">
          <div class="grid gap-6 lg:grid-cols-[1.5fr_1fr] items-center">
            <div>
              <h1 class="text-3xl md:text-4xl font-bold text-sky-dark-50 mb-4 leading-tight">
                Bienvenido al Portal Público
              </h1>
              <p class="text-sky-dark-300 text-lg mb-6 leading-relaxed">
                Explora visualizaciones en tiempo real de los datos de rayos cósmicos.
                Aquí puedes ver el dashboard, consultar histórico y acceder a información técnica sin necesidad de iniciar sesión.
              </p>
              <div class="flex flex-col sm:flex-row gap-4">
                <router-link 
                  to="/portal/dashboard"
                  class="px-5 py-3 bg-gradient-to-r from-sky-dark-500 to-sky-dark-600 rounded-full text-white font-semibold text-center hover:shadow-xl hover:shadow-sky-dark-500/30 transition"
                >
                  Ver Dashboard en Vivo
                </router-link>
                <router-link 
                  to="/login"
                  class="px-5 py-3 border border-sky-dark-500 rounded-full text-sky-dark-100 font-semibold text-center hover:bg-sky-dark-700/60 transition"
                >
                  Iniciar sesión
                </router-link>
              </div>
            </div>
            <div class="portal-hero-panel glass-effect rounded-3xl p-6 border border-sky-dark-500/30">
              <div class="text-sky-dark-50 font-semibold text-sm uppercase tracking-[0.2em] mb-4">Panel del portal</div>
              <div class="space-y-4">
                <div class="rounded-2xl bg-sky-dark-950/70 p-4">
                  <div class="text-sky-dark-100 text-xl font-bold">Dashboard</div>
                  <div class="text-sky-dark-400 text-sm">Visualiza detecciones en tiempo real.</div>
                </div>
                <div class="rounded-2xl bg-sky-dark-950/70 p-4">
                  <div class="text-sky-dark-100 text-xl font-bold">Histórico</div>
                  <div class="text-sky-dark-400 text-sm">Consulta series y registros anteriores.</div>
                </div>
                <div class="rounded-2xl bg-sky-dark-950/70 p-4">
                  <div class="text-sky-dark-100 text-xl font-bold">Información</div>
                  <div class="text-sky-dark-400 text-sm">Aprende sobre el proyecto y los sensores.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Router view para las diferentes páginas del portal -->
      <div class="space-y-8">
        <div class="glass-effect rounded-3xl p-6 border border-sky-dark-500/20 shadow-[0_30px_80px_rgba(15,27,74,0.18)]">
          <router-view />
        </div>
      </div>
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

.public-portal nav {
  backdrop-filter: blur(12px);
}

.portal-hero-panel {
  border: 1px solid rgba(61, 90, 255, 0.15);
}

.public-portal .glass-effect {
  box-shadow: 0 20px 60px rgba(15, 27, 74, 0.35);
}
</style>
