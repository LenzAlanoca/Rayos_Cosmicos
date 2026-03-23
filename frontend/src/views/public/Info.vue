<template>
  <div class="space-y-6">
    <div class="glass-effect rounded-lg p-6">
      <h2 class="text-2xl font-bold text-sky-dark-50 mb-6">Información del Proyecto</h2>

      <!-- Descripción general -->
      <div class="mb-8">
        <h3 class="text-xl font-semibold text-cyan-300 mb-3">Acerca de este Proyecto</h3>
        <p class="text-sky-dark-300 leading-relaxed mb-4">
          El Sistema Web de Monitoreo de Rayos Cósmicos es un proyecto desarrollado por la carrera de Física 
          de la Universidad Mayor de San Andrés (UMSA). Su objetivo es centralizar, procesar y visualizar datos 
          provenientes de sensores especializados en la detección de radiación cósmica.
        </p>
        <p class="text-sky-dark-300 leading-relaxed">
          Esta plataforma permite tanto al público general como a investigadores acceder a información científica 
          de calidad sobre los fenómenos cósmicos detectados en la región, facilitando análisis comparativos y 
          contribuyendo al conocimiento científico en el campo de la física de altas energías.
        </p>
      </div>

      <!-- Equipamiento -->
      <div class="mb-8">
        <h3 class="text-xl font-semibold text-cyan-300 mb-3">Equipamiento y Sensores</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="bg-sky-dark-900/50 rounded-lg p-4 border border-sky-dark-700">
            <h4 class="text-sky-dark-50 font-semibold mb-2">🔬 Sensores Ativos</h4>
            <p class="text-sky-dark-300 text-sm mb-3">
              El sistema actual está equipado con detectores de radiación de alta sensibilidad:
            </p>
            <ul class="space-y-1 text-sky-dark-400 text-sm">
              <li>• Detector Geiger-Müller (GM)</li>
              <li>• Contador de centelleo (Scintillation)</li>
              <li>• Sensor de humedad y temperatura</li>
              <li>• Sistema de registro de timestamps precisos</li>
            </ul>
          </div>

          <div class="bg-sky-dark-900/50 rounded-lg p-4 border border-sky-dark-700">
            <h4 class="text-sky-dark-50 font-semibold mb-2">📍 Ubicaciones de Sensores</h4>
            <ul class="space-y-2 text-sky-dark-300 text-sm">
              <li class="flex justify-between">
                <span><strong>Sensor α</strong> - Laboratorio Principal</span>
                <span class="text-green-400">● Activo</span>
              </li>
              <li class="flex justify-between">
                <span><strong>Sensor β</strong> - Azotea del edificio</span>
                <span class="text-green-400">● Activo</span>
              </li>
              <li class="flex justify-between">
                <span><strong>Sensor γ</strong> - Sótano</span>
                <span class="text-green-400">● Activo</span>
              </li>
              <li class="flex justify-between">
                <span><strong>Sensor δ</strong> - Lab Secundario (en mantenimiento)</span>
                <span class="text-red-400">● Inactivo</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Metodología -->
      <div class="mb-8">
        <h3 class="text-xl font-semibold text-cyan-300 mb-3">Metodología de Recolección</h3>
        <div class="bg-sky-dark-900/50 rounded-lg p-4 border border-sky-dark-700">
          <ol class="space-y-3 text-sky-dark-300 text-sm">
            <li class="flex gap-3">
              <span class="flex-shrink-0 w-6 h-6 rounded-full bg-sky-dark-500 text-white flex items-center justify-center text-xs font-bold">1</span>
              <span><strong>Detección:</strong> Los sensores capturan eventos de radiación en tiempo real (CPM - Conteos Por Minuto)</span>
            </li>
            <li class="flex gap-3">
              <span class="flex-shrink-0 w-6 h-6 rounded-full bg-sky-dark-500 text-white flex items-center justify-center text-xs font-bold">2</span>
              <span><strong>Transmisión:</strong> Los datos se envían automáticamente al servidor central cada minuto</span>
            </li>
            <li class="flex gap-3">
              <span class="flex-shrink-0 w-6 h-6 rounded-full bg-sky-dark-500 text-white flex items-center justify-center text-xs font-bold">3</span>
              <span><strong>Validación:</strong> Se validan los datos para asegurar coherencia y eliminar posibles errores de transmisión</span>
            </li>
            <li class="flex gap-3">
              <span class="flex-shrink-0 w-6 h-6 rounded-full bg-sky-dark-500 text-white flex items-center justify-center text-xs font-bold">4</span>
              <span><strong>Procesamiento:</strong> Se aplican filtros, normalización y agregación de datos</span>
            </li>
            <li class="flex gap-3">
              <span class="flex-shrink-0 w-6 h-6 rounded-full bg-sky-dark-500 text-white flex items-center justify-center text-xs font-bold">5</span>
              <span><strong>Visualización:</strong> Los datos procesados se presentan en tiempo (casi) real en este portal</span>
            </li>
          </ol>
        </div>
      </div>

      <!-- Contacto e información adicional -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="glass-effect rounded-lg p-4">
          <h4 class="text-sky-dark-50 font-semibold mb-3">📧 Contacto</h4>
          <p class="text-sky-dark-300 text-sm mb-2">
            Para preguntas o sugerencias sobre este proyecto:
          </p>
          <p class="text-cyan-400 text-sm font-mono">fisica@umsa.edu.bo</p>
        </div>

        <div class="glass-effect rounded-lg p-4">
          <h4 class="text-sky-dark-50 font-semibold mb-3">📚 Referencias</h4>
          <p class="text-sky-dark-300 text-sm">
            Para más información sobre radiación cósmica y detección, 
            consulta la literatura científica especializada en física de altas energías.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Info',
  data() {
    return {
      projectInfo: {}
    }
  }
})
</script>

<style scoped>
</style>
