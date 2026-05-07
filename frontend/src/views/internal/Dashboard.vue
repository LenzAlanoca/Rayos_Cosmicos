<template>
  <div class="page-shell space-y-6">
    <div class="glass-effect rounded-3xl p-6 border border-sky-dark-500/20 shadow-[0_30px_80px_rgba(15,27,74,0.18)]">
      <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 class="text-3xl font-bold text-sky-dark-50 mb-2">Panel de Administración</h2>
          <p class="text-sky-dark-300 leading-relaxed">
            Bienvenido al panel interno. Aquí podrás gestionar sensores, ver datos en tiempo real y realizar análisis avanzados.
          </p>
          <p v-if="currentUser" class="text-sky-dark-200 text-sm mt-2">
            Sesión iniciada como <strong>{{ currentUser.nombre }}</strong> (<span class="text-sky-dark-400">{{ currentUser.correo }}</span>)
          </p>
        </div>
        <div class="flex flex-wrap items-center gap-3">
          <router-link
            to="/admin/sensores"
            class="px-4 py-2 rounded-full border border-sky-dark-500 text-sky-dark-100 hover:bg-sky-dark-700/60 transition"
          >
            Sensores
          </router-link>
          <router-link
            to="/admin/monitoreo"
            class="px-4 py-2 rounded-full border border-sky-dark-500 text-sky-dark-100 hover:bg-sky-dark-700/60 transition"
          >
            Monitoreo
          </router-link>
          <router-link
            to="/admin/analisis"
            class="px-4 py-2 rounded-full border border-sky-dark-500 text-sky-dark-100 hover:bg-sky-dark-700/60 transition"
          >
            Análisis
          </router-link>
          <button
            @click="logout"
            class="px-4 py-2 rounded-full bg-red-500/90 text-white hover:bg-red-500 transition"
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <router-link
        to="/admin/sensores"
        class="glass-effect rounded-3xl p-6 border border-sky-dark-500/20 hover:border-sky-dark-400 transition"
      >
        <div class="text-4xl mb-3">⚙️</div>
        <h3 class="text-sky-dark-50 font-semibold">Gestión de Sensores</h3>
        <p class="text-sky-dark-400 text-sm mt-2">Crear, editar y eliminar sensores</p>
      </router-link>

      <router-link
        to="/admin/monitoreo"
        class="glass-effect rounded-3xl p-6 border border-sky-dark-500/20 hover:border-sky-dark-400 transition"
      >
        <div class="text-4xl mb-3">📊</div>
        <h3 class="text-sky-dark-50 font-semibold">Monitoreo en Tiempo Real</h3>
        <p class="text-sky-dark-400 text-sm mt-2">Ver datos crudos en vivo</p>
      </router-link>

      <router-link
        to="/admin/analisis"
        class="glass-effect rounded-3xl p-6 border border-sky-dark-500/20 hover:border-sky-dark-400 transition"
      >
        <div class="text-4xl mb-3">🔬</div>
        <h3 class="text-sky-dark-50 font-semibold">Análisis Avanzado</h3>
        <p class="text-sky-dark-400 text-sm mt-2">Procesar y transformar datos</p>
      </router-link>
    </div>

    <div class="glass-effect rounded-3xl p-6 border border-sky-dark-500/20 shadow-[0_30px_80px_rgba(15,27,74,0.18)]">
      <router-view />
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { useAuthStore } from '@stores/auth'

export default defineComponent({
  name: 'Dashboard',
  data() {
    return {
      currentUser: null
    }
  },
  mounted() {
    const authStore = useAuthStore()
    this.currentUser = authStore.user
  },
  methods: {
    async logout() {
      const authStore = useAuthStore()
      await authStore.logout()
      this.$router.push('/login')
    }
  }
})
</script>
