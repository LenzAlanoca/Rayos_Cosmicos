<template>
  <div class="space-y-6">
    <!-- Estado de Sensores -->
    <section>
      <h2 class="text-2xl font-bold text-sky-dark-50 mb-4">Estado de Sensores</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div 
          v-for="sensor in sensors" 
          :key="sensor.id"
          class="glass-effect rounded-lg p-4 border-l-4"
          :class="sensor.active ? 'border-l-green-500' : 'border-l-red-500'"
        >
          <div class="flex justify-between items-start">
            <div>
              <h3 class="text-sky-dark-50 font-semibold">{{ sensor.name }}</h3>
              <p class="text-sky-dark-400 text-xs mt-1">{{ sensor.location }}</p>
            </div>
            <div 
              class="w-3 h-3 rounded-full animate-pulse"
              :class="sensor.active ? 'bg-green-500' : 'bg-red-500'"
            />
          </div>
          <div class="mt-4 pt-3 border-t border-sky-dark-700">
            <p class="text-sky-dark-300 text-sm">
              <span class="text-sky-dark-400">Última lectura:</span> 
              <span class="text-sky-dark-50 font-semibold">{{ sensor.lastReading }}</span>
            </p>
            <p class="text-sky-dark-300 text-sm mt-1">
              <span class="text-sky-dark-400">Promedio:</span> 
              <span class="text-sky-dark-50 font-semibold">{{ sensor.average }} CPM</span>
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Gráficos -->
    <section class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Gráfico de datos en tiempo real -->
      <div class="glass-effect rounded-lg p-6">
        <h2 class="text-xl font-bold text-sky-dark-50 mb-4">Detecciones en Tiempo Real</h2>
        <div class="h-64 flex items-center justify-center">
          <canvas ref="realtimeChart"></canvas>
        </div>
      </div>

      <!-- Gráfico de distribución -->
      <div class="glass-effect rounded-lg p-6">
        <h2 class="text-xl font-bold text-sky-dark-50 mb-4">Distribución por Sensor</h2>
        <div class="h-64 flex items-center justify-center">
          <canvas ref="distributionChart"></canvas>
        </div>
      </div>
    </section>

    <!-- Estadísticas -->
    <section class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div class="glass-effect rounded-lg p-4">
        <p class="text-sky-dark-400 text-sm">Total Detecciones</p>
        <p class="text-3xl font-bold text-cyan-300 mt-2">{{ stats.totalDetections }}</p>
      </div>
      <div class="glass-effect rounded-lg p-4">
        <p class="text-sky-dark-400 text-sm">Promedio Horario</p>
        <p class="text-3xl font-bold text-cyan-300 mt-2">{{ stats.hourlyAverage }}</p>
      </div>
      <div class="glass-effect rounded-lg p-4">
        <p class="text-sky-dark-400 text-sm">Sensores Activos</p>
        <p class="text-3xl font-bold text-green-400 mt-2">{{ stats.activeSensors }}/{{ sensors.length }}</p>
      </div>
      <div class="glass-effect rounded-lg p-4">
        <p class="text-sky-dark-400 text-sm">Última Actualización</p>
        <p class="text-sm font-mono text-cyan-300 mt-2">{{ new Date().toLocaleTimeString() }}</p>
      </div>
    </section>

    <!-- Filtros -->
    <section class="glass-effect rounded-lg p-6">
      <h2 class="text-xl font-bold text-sky-dark-50 mb-4">Filtros</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label class="block text-sky-dark-300 text-sm font-medium mb-2">Rango de Fechas</label>
          <input 
            v-model="filters.dateRange" 
            type="text" 
            placeholder="Últimas 24 horas"
            class="w-full"
          />
        </div>
        <div>
          <label class="block text-sky-dark-300 text-sm font-medium mb-2">Sensor</label>
          <select v-model="filters.sensor" class="w-full">
            <option value="">Todos</option>
            <option v-for="sensor in sensors" :key="sensor.id" :value="sensor.id">
              {{ sensor.name }}
            </option>
          </select>
        </div>
        <div class="flex items-end gap-2">
          <button 
            @click="applyFilters"
            class="flex-1 px-4 py-2 bg-gradient-to-r from-sky-dark-500 to-sky-dark-600 text-white font-medium rounded-lg hover:shadow-lg transition"
          >
            Aplicar Filtros
          </button>
          <button 
            @click="exportData"
            class="px-4 py-2 border border-sky-dark-500 text-sky-dark-300 font-medium rounded-lg hover:bg-sky-dark-800/50 transition"
            title="Exportar como CSV"
          >
            📥
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import Chart from 'chart.js/auto'

export default defineComponent({
  name: 'Dashboard',
  data() {
    return {
      sensors: [
        {
          id: 1,
          name: 'Sensor α',
          location: 'Lab Principal',
          active: true,
          lastReading: '245 CPM',
          average: '238'
        },
        {
          id: 2,
          name: 'Sensor β',
          location: 'Azotea',
          active: true,
          lastReading: '189 CPM',
          average: '195'
        },
        {
          id: 3,
          name: 'Sensor γ',
          location: 'Sótano',
          active: true,
          lastReading: '312 CPM',
          average: '305'
        },
        {
          id: 4,
          name: 'Sensor δ',
          location: 'Lab Secundario',
          active: false,
          lastReading: '0 CPM',
          average: '0'
        }
      ],
      stats: {
        totalDetections: '12,847',
        hourlyAverage: '456',
        activeSensors: 3
      },
      filters: {
        dateRange: 'Últimas 24 horas',
        sensor: ''
      },
      chartInstances: []
    }
  },
  mounted() {
    this.initCharts()
  },
  beforeUnmount() {
    this.chartInstances.forEach(chart => chart.destroy())
  },
  methods: {
    initCharts() {
      this.createRealtimeChart()
      this.createDistributionChart()
    },
    createRealtimeChart() {
      const ctx = this.$refs.realtimeChart.getContext('2d')
      const chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '23:59'],
          datasets: [
            {
              label: 'Sensor α',
              data: [245, 267, 234, 289, 256, 234, 245],
              borderColor: '#3d5aff',
              backgroundColor: 'rgba(61, 90, 255, 0.1)',
              tension: 0.3,
              fill: true
            },
            {
              label: 'Sensor β',
              data: [189, 195, 212, 198, 234, 201, 189],
              borderColor: '#7d9ff0',
              backgroundColor: 'rgba(125, 159, 240, 0.1)',
              tension: 0.3,
              fill: true
            },
            {
              label: 'Sensor γ',
              data: [312, 298, 334, 321, 289, 305, 312],
              borderColor: '#a8bef5',
              backgroundColor: 'rgba(168, 190, 245, 0.1)',
              tension: 0.3,
              fill: true
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              labels: {
                color: '#e0e7ff'
              }
            }
          },
          scales: {
            y: {
              grid: {
                color: 'rgba(61, 90, 255, 0.1)'
              },
              ticks: {
                color: '#a0aec0'
              }
            },
            x: {
              grid: {
                color: 'rgba(61, 90, 255, 0.05)'
              },
              ticks: {
                color: '#a0aec0'
              }
            }
          }
        }
      })
      this.chartInstances.push(chart)
    },
    createDistributionChart() {
      const ctx = this.$refs.distributionChart.getContext('2d')
      const chart = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['Sensor α', 'Sensor β', 'Sensor γ'],
          datasets: [
            {
              data: [2856, 2134, 3412],
              backgroundColor: [
                '#3d5aff',
                '#7d9ff0',
                '#a8bef5'
              ],
              borderColor: '#0f1b4a',
              borderWidth: 2
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              labels: {
                color: '#e0e7ff'
              }
            }
          }
        }
      })
      this.chartInstances.push(chart)
    },
    applyFilters() {
      this.$message = { type: 'success', text: 'Filtros aplicados correctamente' }
      setTimeout(() => (this.$message = null), 3000)
    },
    exportData() {
      const data = 'timestam,sensor,value\n2026-03-22 10:00:00,Sensor α,245\n2026-03-22 10:01:00,Sensor β,189\n2026-03-22 10:02:00,Sensor γ,312'
      const blob = new Blob([data], { type: 'text/csv' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'rayos-cosmicos-datos.csv'
      a.click()
      URL.revokeObjectURL(url)
    }
  }
})
</script>

<style scoped>
canvas {
  width: 100%;
  height: 100%;
}
</style>
