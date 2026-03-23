<template>
  <div class="glass-effect rounded-lg p-6">
    <h2 class="text-2xl font-bold text-sky-dark-50 mb-4">Panel de Administración</h2>
    <p class="text-sky-dark-300 mb-6">Bienvenido al panel interno. Aquí podrás gestionar sensores, ver datos en tiempo real y realizar análisis avanzados.</p>
    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <router-link 
        to="/admin/sensores"
        class="glass-effect rounded-lg p-4 hover:border-sky-dark-400 transition cursor-pointer"
      >
        <div class="text-4xl mb-3">⚙️</div>
        <h3 class="text-sky-dark-50 font-semibold">Gestión de Sensores</h3>
        <p class="text-sky-dark-400 text-sm mt-2">Crear, editar y eliminar sensores</p>
      </router-link>

      <router-link 
        to="/admin/monitoreo"
        class="glass-effect rounded-lg p-4 hover:border-sky-dark-400 transition cursor-pointer"
      >
        <div class="text-4xl mb-3">📊</div>
        <h3 class="text-sky-dark-50 font-semibold">Monitoreo en Tiempo Real</h3>
        <p class="text-sky-dark-400 text-sm mt-2">Ver datos crudos en vivo</p>
      </router-link>

      <router-link 
        to="/admin/analisis"
        class="glass-effect rounded-lg p-4 hover:border-sky-dark-400 transition cursor-pointer"
      >
        <div class="text-4xl mb-3">🔬</div>
        <h3 class="text-sky-dark-50 font-semibold">Análisis Avanzado</h3>
        <p class="text-sky-dark-400 text-sm mt-2">Procesar y transformar datos</p>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Dashboard'
}
</script>
