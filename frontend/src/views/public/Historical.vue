<template>
  <div class="space-y-6">
    <div class="glass-effect rounded-lg p-6">
      <h2 class="text-2xl font-bold text-sky-dark-50 mb-4">Datos Históricos</h2>
      
      <!-- Filtros históricos -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div>
          <label class="block text-sky-dark-300 text-sm font-medium mb-2">Fecha Inicial</label>
          <input v-model="filters.startDate" type="date" class="w-full" />
        </div>
        <div>
          <label class="block text-sky-dark-300 text-sm font-medium mb-2">Fecha Final</label>
          <input v-model="filters.endDate" type="date" class="w-full" />
        </div>
        <div>
          <label class="block text-sky-dark-300 text-sm font-medium mb-2">Sensor</label>
          <select v-model="filters.sensor" class="w-full">
            <option value="">Todos</option>
            <option>Sensor α</option>
            <option>Sensor β</option>
            <option>Sensor γ</option>
          </select>
        </div>
        <div class="flex items-end gap-2">
          <button 
            @click="searchHistorical"
            class="flex-1 px-4 py-2 bg-gradient-to-r from-sky-dark-500 to-sky-dark-600 text-white font-medium rounded-lg hover:shadow-lg transition"
          >
            Buscar
          </button>
        </div>
      </div>

      <!-- Tabla de datos -->
      <div class="overflow-x-auto">
        <table class="w-full text-sky-dark-200">
          <thead class="border-b border-sky-dark-700">
            <tr>
              <th class="px-4 py-3 text-left text-sky-dark-50 font-semibold">Fecha/Hora</th>
              <th class="px-4 py-3 text-left text-sky-dark-50 font-semibold">Sensor</th>
              <th class="px-4 py-3 text-left text-sky-dark-50 font-semibold">Lecturas (CPM)</th>
              <th class="px-4 py-3 text-left text-sky-dark-50 font-semibold">Temperatura</th>
              <th class="px-4 py-3 text-left text-sky-dark-50 font-semibold">Estado</th>
            </tr>
          </thead>
          <tbody>
            <tr 
              v-for="(record, idx) in historicalData" 
              :key="idx"
              class="border-b border-sky-dark-800 hover:bg-sky-dark-800/30 transition"
            >
              <td class="px-4 py-3 font-mono text-xs">{{ record.timestamp }}</td>
              <td class="px-4 py-3">{{ record.sensor }}</td>
              <td class="px-4 py-3 font-semibold text-cyan-300">{{ record.readings }}</td>
              <td class="px-4 py-3">{{ record.temperature }}</td>
              <td class="px-4 py-3">
                <span 
                  class="px-2 py-1 rounded text-xs font-semibold"
                  :class="record.status === 'Normal' ? 'bg-green-500/20 text-green-300' : 'bg-yellow-500/20 text-yellow-300'"
                >
                  {{ record.status }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Paginación y descargas -->
      <div class="mt-6 flex justify-between items-center">
        <div class="text-sky-dark-400 text-sm">
          Mostrando 1 a {{ historicalData.length }} de 5,234 registros
        </div>
        <div class="flex gap-3">
          <button 
            @click="downloadCSV"
            class="px-4 py-2 bg-sky-dark-800/50 border border-sky-dark-500 text-sky-dark-300 font-medium rounded-lg hover:bg-sky-dark-700/50 transition flex items-center gap-2"
          >
            📥 Descargar CSV
          </button>
          <button 
            @click="downloadJSON"
            class="px-4 py-2 bg-sky-dark-800/50 border border-sky-dark-500 text-sky-dark-300 font-medium rounded-lg hover:bg-sky-dark-700/50 transition flex items-center gap-2"
          >
            📥 Descargar JSON
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Historical',
  data() {
    return {
      filters: {
        startDate: '2026-03-20',
        endDate: '2026-03-22',
        sensor: ''
      },
      historicalData: [
        {
          timestamp: '2026-03-22 10:15:00',
          sensor: 'Sensor α',
          readings: '245',
          temperature: '21.3°C',
          status: 'Normal'
        },
        {
          timestamp: '2026-03-22 10:14:00',
          sensor: 'Sensor β',
          readings: '189',
          temperature: '20.8°C',
          status: 'Normal'
        },
        {
          timestamp: '2026-03-22 10:13:00',
          sensor: 'Sensor γ',
          readings: '312',
          temperature: '22.1°C',
          status: 'Normal'
        },
        {
          timestamp: '2026-03-22 10:12:00',
          sensor: 'Sensor α',
          readings: '267',
          temperature: '21.4°C',
          status: 'Normal'
        },
        {
          timestamp: '2026-03-22 10:11:00',
          sensor: 'Sensor β',
          readings: '195',
          temperature: '20.9°C',
          status: 'Alerta'
        }
      ]
    }
  },
  methods: {
    searchHistorical() {
      console.log('Buscando datos históricos...', this.filters)
    },
    downloadCSV() {
      const csv = 'Timestamp,Sensor,Lecturas,Temperatura,Estado\n' + 
        this.historicalData.map(r => 
          `"${r.timestamp}","${r.sensor}","${r.readings}","${r.temperature}","${r.status}"`
        ).join('\n')
      
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' })
      const link = document.createElement('a')
      link.href = URL.createObjectURL(blob)
      link.download = 'historico-rayos-cosmicos.csv'
      link.click()
    },
    downloadJSON() {
      const json = JSON.stringify(this.historicalData, null, 2)
      const blob = new Blob([json], { type: 'application/json' })
      const link = document.createElement('a')
      link.href = URL.createObjectURL(blob)
      link.download = 'historico-rayos-cosmicos.json'
      link.click()
    }
  }
})
</script>

<style scoped>
</style>
