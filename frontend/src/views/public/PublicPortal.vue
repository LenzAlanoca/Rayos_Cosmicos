<template>
  <div class="public-portal min-h-screen portal-shell">
    <!-- Navbar con navegación del portal -->
    <nav class="sticky top-0 z-40 glass-effect border-b border-sky-dark-700 backdrop-blur-xl bg-sky-dark-950/80">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <router-link to="/" class="flex items-center gap-3 hover:opacity-80 transition">
            <div class="w-10 h-10 rounded-2xl bg-gradient-to-br from-sky-dark-500 to-sky-dark-700 flex items-center justify-center shadow-lg shadow-sky-dark-950/20">
              <span class="text-white text-sm">🌌</span>
            </div>
            <div>
              <div class="font-bold text-sky-dark-50">RAYOS CÓSMICOS</div>
              <div class="text-sky-dark-300 text-xs">UMSA · Portal Público</div>
            </div>
          </router-link>

          <div class="flex flex-wrap gap-4 items-center justify-end">
            <router-link 
              to="/portal/dashboard" 
              class="portal-nav-link font-medium"
              :class="{ active: isActive('public-dashboard') }"
            >
              Dashboard
            </router-link>
            <router-link 
              to="/portal/historico" 
              class="portal-nav-link font-medium"
              :class="{ active: isActive('public-historico') }"
            >
              Histórico
            </router-link>
            <router-link 
              to="/portal/info" 
              class="portal-nav-link font-medium"
              :class="{ active: isActive('public-info') }"
            >
              Información
            </router-link>
            <router-link 
              to="/login"
              class="portal-nav-link font-medium"
              :class="{ active: isActive('login') }"
            >
              Iniciar sesión
            </router-link>
          </div>
        </div>
      </div>
    </nav>

    <!-- Contenido del portal -->
    <main class="page-shell max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <!-- Mensaje de bienvenida en la primera vista -->
      <div v-if="isFirstView" class="mb-8 section-card">
        <div class="section-header">
          <span class="section-tag">Portal Público</span>
          <h1 class="section-title">Bienvenido al Portal de Rayos Cósmicos</h1>
          <p class="section-subtitle">Accede a las visualizaciones, el histórico y la información técnica con una experiencia consistente y moderna.</p>
        </div>
        <div class="grid gap-6 lg:grid-cols-[1.6fr_1fr] items-start">
          <div>
            <p class="text-sky-dark-300 text-lg leading-relaxed mb-6">
              Explora datos del sistema de forma ágil, sin necesidad de iniciar sesión, y revisa el estado de los sensores en tiempo real.
            </p>
            <div class="flex flex-wrap gap-4">
              <router-link 
                to="/portal/dashboard"
                class="cta-button cta-primary"
              >
                Ver Dashboard
              </router-link>
              <router-link 
                to="/login"
                class="cta-button cta-secondary"
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

      <!-- Router view para las diferentes páginas del portal -->
      <div class="space-y-8">
        <div class="section-card">
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
