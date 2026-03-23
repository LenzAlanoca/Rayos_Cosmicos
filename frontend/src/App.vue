<template>
  <div id="app" class="bg-gradient-cosmos min-h-screen">
    <!-- Fondo animado con estrellas -->
    <div class="fixed inset-0 overflow-hidden pointer-events-none" v-if="showStars">
      <div 
        v-for="star in stars" 
        :key="star.id"
        class="absolute rounded-full bg-white"
        :style="{
          width: star.size + 'px',
          height: star.size + 'px',
          top: star.top + '%',
          left: star.left + '%',
          opacity: star.opacity,
          animation: `twinkle ${star.duration}s ease-in-out infinite`,
          animationDelay: star.delay + 's'
        }"
      />
    </div>

    <!-- Contenido principal -->
    <div class="relative z-10">
      <router-view />
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App',
  data() {
    return {
      showStars: true,
      stars: []
    }
  },
  mounted() {
    this.generateStars()
  },
  methods: {
    generateStars() {
      const starCount = 50
      for (let i = 0; i < starCount; i++) {
        this.stars.push({
          id: i,
          top: Math.random() * 100,
          left: Math.random() * 100,
          size: Math.random() * 2 + 0.5,
          opacity: Math.random() * 0.7 + 0.3,
          duration: Math.random() * 3 + 2,
          delay: Math.random() * 3
        })
      }
    }
  }
})
</script>

<style scoped>
#app {
  width: 100%;
  min-height: 100vh;
  overflow-x: hidden;
}
</style>
