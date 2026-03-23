<template>
  <div class="landing-page" ref="landingRef">
    <!-- Canvas de estrellas y nebulosas -->
    <canvas ref="starsCanvas" class="stars-canvas"></canvas>

    <!-- Partículas de rayos cósmicos -->
    <div class="cosmic-particles">
      <div v-for="i in 20" :key="i" class="cosmic-ray" :style="getCosmicRayStyle(i)"></div>
    </div>

    <!-- Navbar -->
    <nav class="navbar">
      <div class="navbar-inner">
        <div class="navbar-brand">
          <div class="brand-icon">
            <!-- Atom / Cosmic SVG -->
            <svg class="brand-svg" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <ellipse cx="20" cy="20" rx="16" ry="7" stroke="rgba(180,210,255,0.8)" stroke-width="1.5"/>
              <ellipse cx="20" cy="20" rx="16" ry="7" stroke="rgba(180,210,255,0.8)" stroke-width="1.5" transform="rotate(60 20 20)"/>
              <ellipse cx="20" cy="20" rx="16" ry="7" stroke="rgba(180,210,255,0.8)" stroke-width="1.5" transform="rotate(120 20 20)"/>
              <circle cx="20" cy="20" r="3" fill="rgba(180,210,255,0.95)"/>
            </svg>
            <div class="brand-icon-pulse"></div>
          </div>
          <div class="brand-text">
            <span class="brand-title">RAYOS CÓSMICOS</span>
            <span class="brand-subtitle">UMSA · Sistema de Monitoreo</span>
          </div>
        </div>

        <div class="navbar-links">
          <a href="#caracteristicas" class="nav-link">Características</a>
          <a href="#info" class="nav-link">Tecnología</a>
          <a href="#sensores" class="nav-link">Sensores</a>
          <router-link to="/portal" class="nav-cta">
            <span>Acceder al Portal</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </router-link>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-glow hero-glow-1"></div>
      <div class="hero-glow hero-glow-2"></div>

      <div class="hero-content">
        <!-- Badge de estado -->
        <div class="status-badge">
          <span class="status-dot"></span>
          <span>Sistema Activo · UMSA La Paz, Bolivia</span>
        </div>

        <!-- Título principal -->
        <h1 class="hero-title">
          <span class="hero-title-line1">Monitoreo de</span>
          <span class="hero-title-accent">
            <span class="accent-text">Rayos Cósmicos</span>
            <div class="accent-glow"></div>
          </span>
          <span class="hero-title-line3">desde los Andes</span>
        </h1>

        <!-- Descripción -->
        <p class="hero-description">
          Sistema integral científico desarrollado por la carrera de <strong>Física de la UMSA</strong>.
          Recolectamos, procesamos y visualizamos datos de radiación cósmica en tiempo real
          desde sensores ubicados a <strong>3.640 m.s.n.m.</strong>
        </p>

        <!-- Estadísticas en vivo -->
        <div class="hero-stats">
          <div class="stat-card" v-for="stat in stats" :key="stat.label">
            <div class="stat-value">{{ stat.value }}</div>
            <div class="stat-label">{{ stat.label }}</div>
          </div>
        </div>

        <!-- CTAs -->
        <div class="hero-ctas">
          <router-link to="/portal" class="cta-primary">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/></svg>
            Explorar Portal Público
          </router-link>
          <a href="#caracteristicas" class="cta-secondary">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
            Conocer más
          </a>
        </div>
      </div>

      <!-- Instrumento visual derecho -->
      <div class="hero-visual">
        <div class="detector-ring detector-ring-1">
          <div class="detector-ring-inner"></div>
        </div>
        <div class="detector-ring detector-ring-2"></div>
        <div class="detector-ring detector-ring-3"></div>
        <div class="detector-core">
          <!-- Radiation / Atom SVG -->
          <svg class="detector-svg" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="24" cy="24" r="5" fill="rgba(160,200,255,0.9)"/>
            <path d="M24 4 C14 4 4 14 4 24" stroke="rgba(140,190,255,0.7)" stroke-width="2" stroke-linecap="round"/>
            <path d="M24 4 C34 4 44 14 44 24" stroke="rgba(140,190,255,0.7)" stroke-width="2" stroke-linecap="round"/>
            <path d="M4 24 C4 34 14 44 24 44" stroke="rgba(100,160,255,0.5)" stroke-width="2" stroke-linecap="round"/>
            <path d="M44 24 C44 34 34 44 24 44" stroke="rgba(100,160,255,0.5)" stroke-width="2" stroke-linecap="round"/>
            <circle cx="24" cy="6" r="2.5" fill="rgba(180,220,255,0.8)"/>
            <circle cx="42" cy="30" r="2.5" fill="rgba(180,220,255,0.8)"/>
            <circle cx="6" cy="30" r="2.5" fill="rgba(180,220,255,0.8)"/>
            <circle cx="24" cy="42" r="2" fill="rgba(120,180,255,0.5)"/>
          </svg>
          <div class="detector-scan"></div>
        </div>
        <div class="detector-data">
          <div class="data-line" v-for="i in 4" :key="i" :class="`data-line-${i}`"></div>
        </div>
      </div>
    </section>

    <!-- Características -->
    <section id="caracteristicas" class="features-section">
      <div class="section-container">
        <div class="section-header">
          <span class="section-tag">CAPACIDADES</span>
          <h2 class="section-title">Características del Sistema</h2>
          <p class="section-subtitle">Una plataforma de monitoreo de clase científica diseñada para investigadores y el público en general.</p>
        </div>

        <div class="features-grid">
          <div class="feature-card" v-for="feature in features" :key="feature.title">
            <div class="feature-icon-wrap">
              <div class="feature-icon-svg" v-html="feature.svg"></div>
              <div class="feature-icon-glow"></div>
            </div>
            <h3 class="feature-title">{{ feature.title }}</h3>
            <p class="feature-desc">{{ feature.desc }}</p>
            <div class="feature-line"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- Stack Tecnológico -->
    <section id="info" class="tech-section">
      <div class="section-container">
        <div class="section-header">
          <span class="section-tag">ARQUITECTURA</span>
          <h2 class="section-title">Stack Tecnológico</h2>
          <p class="section-subtitle">Construido con tecnologías modernas para máximo rendimiento y escalabilidad.</p>
        </div>

        <div class="tech-grid">
          <div class="tech-card tech-card-frontend">
            <div class="tech-card-header">
              <div class="tech-card-icon-svg">
                <!-- Monitor / Code icon -->
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
                </svg>
              </div>
              <h3 class="tech-card-title">Frontend</h3>
            </div>
            <div class="tech-items">
              <div class="tech-item" v-for="item in techFrontend" :key="item.name">
                <div class="tech-item-dot"></div>
                <div>
                  <span class="tech-item-name">{{ item.name }}</span>
                  <span class="tech-item-desc">{{ item.desc }}</span>
                </div>
              </div>
            </div>
          </div>

          <div class="tech-card tech-card-backend">
            <div class="tech-card-header">
              <div class="tech-card-icon-svg">
                <!-- Server icon -->
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="2" y="2" width="20" height="8" rx="2" ry="2"/>
                  <rect x="2" y="14" width="20" height="8" rx="2" ry="2"/>
                  <line x1="6" y1="6" x2="6.01" y2="6"/>
                  <line x1="6" y1="18" x2="6.01" y2="18"/>
                </svg>
              </div>
              <h3 class="tech-card-title">Backend</h3>
            </div>
            <div class="tech-items">
              <div class="tech-item" v-for="item in techBackend" :key="item.name">
                <div class="tech-item-dot"></div>
                <div>
                  <span class="tech-item-name">{{ item.name }}</span>
                  <span class="tech-item-desc">{{ item.desc }}</span>
                </div>
              </div>
            </div>
          </div>

          <div class="tech-card tech-card-science">
            <div class="tech-card-header">
              <div class="tech-card-icon-svg">
                <!-- Zap / Particle icon -->
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="2"/>
                  <path d="M12 2v3m0 14v3M2 12h3m14 0h3"/>
                  <path d="M4.93 4.93l2.12 2.12m9.9 9.9 2.12 2.12M19.07 4.93l-2.12 2.12M7.05 16.95l-2.12 2.12"/>
                </svg>
              </div>
              <h3 class="tech-card-title">Ciencia</h3>
            </div>
            <div class="tech-items">
              <div class="tech-item" v-for="item in techScience" :key="item.name">
                <div class="tech-item-dot"></div>
                <div>
                  <span class="tech-item-name">{{ item.name }}</span>
                  <span class="tech-item-desc">{{ item.desc }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Sensores -->
    <section id="sensores" class="sensors-section">
      <div class="section-container">
        <div class="section-header">
          <span class="section-tag">INFRAESTRUCTURA</span>
          <h2 class="section-title">Red de Sensores</h2>
          <p class="section-subtitle">Detectores científicos de alta precisión distribuidos estratégicamente en la ciudad universitaria.</p>
        </div>

        <div class="sensors-grid">
          <div class="sensor-card" v-for="sensor in sensors" :key="sensor.name">
            <div class="sensor-header">
              <div class="sensor-status-dot" :class="{ active: sensor.active }"></div>
              <span class="sensor-name">{{ sensor.name }}</span>
            </div>
            <div class="sensor-type">{{ sensor.type }}</div>
            <div class="sensor-metrics">
              <div class="sensor-metric" v-for="m in sensor.metrics" :key="m.label">
                <div class="sensor-metric-value">{{ m.value }}</div>
                <div class="sensor-metric-label">{{ m.label }}</div>
              </div>
            </div>
            <div class="sensor-wave">
              <div class="sensor-wave-bar" v-for="j in 12" :key="j" :style="{ height: getSensorBarHeight(j) + 'px', animationDelay: (j * 0.1) + 's' }"></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Final -->
    <section class="final-cta-section">
      <div class="final-cta-glow"></div>
      <div class="final-cta-content">
        <div class="final-cta-icon-wrap">
          <svg class="final-cta-svg" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="32" cy="32" r="28" stroke="rgba(100,160,255,0.25)" stroke-width="1"/>
            <circle cx="32" cy="32" r="18" stroke="rgba(100,160,255,0.35)" stroke-width="1"/>
            <ellipse cx="32" cy="32" rx="26" ry="10" stroke="rgba(140,200,255,0.45)" stroke-width="1.5"/>
            <ellipse cx="32" cy="32" rx="26" ry="10" stroke="rgba(140,200,255,0.45)" stroke-width="1.5" transform="rotate(60 32 32)"/>
            <ellipse cx="32" cy="32" rx="26" ry="10" stroke="rgba(140,200,255,0.35)" stroke-width="1.5" transform="rotate(120 32 32)"/>
            <circle cx="32" cy="32" r="5" fill="rgba(160,210,255,0.9)"/>
            <circle cx="32" cy="6" r="3" fill="rgba(200,230,255,0.8)"/>
            <circle cx="55.5" cy="45" r="3" fill="rgba(200,230,255,0.8)"/>
            <circle cx="8.5" cy="45" r="3" fill="rgba(200,230,255,0.8)"/>
          </svg>
        </div>
        <h2 class="final-cta-title">Explora el universo en datos</h2>
        <p class="final-cta-desc">Accede al portal público para visualizar datos en tiempo real de nuestros detectores de rayos cósmicos.</p>
        <router-link to="/portal" class="cta-primary cta-large">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/></svg>
          Ingresar al Portal
        </router-link>
      </div>
    </section>

    <!-- Footer -->
    <footer class="landing-footer">
      <div class="footer-inner">
        <div class="footer-brand">
          <div class="footer-logo-row">
            <svg class="footer-atom" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <ellipse cx="12" cy="12" rx="10" ry="4" stroke="rgba(140,180,255,0.7)" stroke-width="1.2"/>
              <ellipse cx="12" cy="12" rx="10" ry="4" stroke="rgba(140,180,255,0.7)" stroke-width="1.2" transform="rotate(60 12 12)"/>
              <ellipse cx="12" cy="12" rx="10" ry="4" stroke="rgba(140,180,255,0.7)" stroke-width="1.2" transform="rotate(120 12 12)"/>
              <circle cx="12" cy="12" r="2" fill="rgba(160,200,255,0.9)"/>
            </svg>
            <span class="footer-logo">RAYOS CÓSMICOS · UMSA</span>
          </div>
          <p class="footer-tagline">Carrera de Física · Laboratorio de Astrofísica</p>
        </div>
        <div class="footer-links">
          <router-link to="/portal">Portal Público</router-link>
          <router-link to="/portal/dashboard">Dashboard</router-link>
          <router-link to="/portal/historico">Histórico</router-link>
          <router-link to="/portal/info">Información</router-link>
        </div>
        <div class="footer-copy">
          © 2026 UMSA | Todos los derechos reservados
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted, onUnmounted } from 'vue'

export default defineComponent({
  name: 'Landing',

  setup() {
    const landingRef = ref(null)
    const starsCanvas = ref(null)
    let animationId = null
    let stars = []
    let shootingStars = []

    // --- Canvas de estrellas ---
    function initCanvas() {
      const canvas = starsCanvas.value
      if (!canvas) return
      const ctx = canvas.getContext('2d')

      function resize() {
        canvas.width = window.innerWidth
        canvas.height = document.body.scrollHeight || window.innerHeight * 4
        createStars()
      }

      function createStars() {
        stars = []
        const count = Math.floor((canvas.width * canvas.height) / 6000)
        for (let i = 0; i < count; i++) {
          stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            r: Math.random() * 1.8 + 0.2,
            alpha: Math.random(),
            alphaSpeed: (Math.random() * 0.008 + 0.002) * (Math.random() > 0.5 ? 1 : -1),
            color: getStarColor(),
          })
        }
      }

      function getStarColor() {
        const colors = [
          'rgba(255,255,255,',
          'rgba(200,220,255,',
          'rgba(180,200,255,',
          'rgba(150,180,255,',
          'rgba(255,240,200,',
          'rgba(255,200,150,',
        ]
        return colors[Math.floor(Math.random() * colors.length)]
      }

      function spawnShootingStar() {
        if (Math.random() < 0.004) {
          const x = Math.random() * canvas.width
          shootingStars.push({
            x,
            y: Math.random() * canvas.height * 0.4,
            len: Math.random() * 120 + 60,
            speed: Math.random() * 6 + 4,
            alpha: 1,
            angle: Math.PI / 5,
          })
        }
      }

      function drawNebula(ctx) {
        // Nebulosas de color
        const nebulae = [
          { x: canvas.width * 0.2, y: canvas.height * 0.15, r: 300, color: 'rgba(61,90,255,0.04)' },
          { x: canvas.width * 0.8, y: canvas.height * 0.1, r: 250, color: 'rgba(80,200,255,0.03)' },
          { x: canvas.width * 0.5, y: canvas.height * 0.05, r: 400, color: 'rgba(120,60,220,0.04)' },
          { x: canvas.width * 0.1, y: canvas.height * 0.55, r: 200, color: 'rgba(40,120,255,0.03)' },
          { x: canvas.width * 0.9, y: canvas.height * 0.6, r: 280, color: 'rgba(60,200,200,0.03)' },
        ]
        nebulae.forEach(n => {
          const grad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r)
          grad.addColorStop(0, n.color)
          grad.addColorStop(1, 'rgba(0,0,0,0)')
          ctx.fillStyle = grad
          ctx.fillRect(0, 0, canvas.width, canvas.height)
        })
      }

      function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        // Fondo degradado nocturno
        const bg = ctx.createLinearGradient(0, 0, 0, canvas.height)
        bg.addColorStop(0, '#050d1f')
        bg.addColorStop(0.2, '#0a1535')
        bg.addColorStop(0.5, '#0d1e4a')
        bg.addColorStop(0.8, '#0f2060')
        bg.addColorStop(1, '#0a1535')
        ctx.fillStyle = bg
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        drawNebula(ctx)

        // Estrellas
        stars.forEach(s => {
          s.alpha += s.alphaSpeed
          if (s.alpha <= 0.05 || s.alpha >= 1) s.alphaSpeed *= -1
          s.alpha = Math.max(0.05, Math.min(1, s.alpha))

          if (s.r > 1.2) {
            // Glow para estrellas grandes
            const glow = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.r * 3)
            glow.addColorStop(0, s.color + s.alpha + ')')
            glow.addColorStop(1, s.color + '0)')
            ctx.fillStyle = glow
            ctx.beginPath()
            ctx.arc(s.x, s.y, s.r * 3, 0, Math.PI * 2)
            ctx.fill()
          }

          ctx.fillStyle = s.color + s.alpha + ')'
          ctx.beginPath()
          ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
          ctx.fill()
        })

        // Estrellas fugaces
        spawnShootingStar()
        shootingStars.forEach((ss, idx) => {
          ctx.save()
          ctx.translate(ss.x, ss.y)
          ctx.rotate(ss.angle)
          const grad = ctx.createLinearGradient(0, 0, -ss.len, 0)
          grad.addColorStop(0, `rgba(255,255,255,${ss.alpha})`)
          grad.addColorStop(1, 'rgba(255,255,255,0)')
          ctx.strokeStyle = grad
          ctx.lineWidth = 2
          ctx.beginPath()
          ctx.moveTo(0, 0)
          ctx.lineTo(-ss.len, 0)
          ctx.stroke()
          ctx.restore()
          ss.x += ss.speed * Math.cos(ss.angle)
          ss.y += ss.speed * Math.sin(ss.angle)
          ss.alpha -= 0.012
          if (ss.alpha <= 0) shootingStars.splice(idx, 1)
        })

        animationId = requestAnimationFrame(draw)
      }

      resize()
      window.addEventListener('resize', resize)
      draw()
    }

    function getCosmicRayStyle(i) {
      const top = Math.random() * 100
      const left = Math.random() * 100
      const duration = 2 + Math.random() * 4
      const delay = Math.random() * 6
      const width = 1 + Math.random() * 2
      const height = 40 + Math.random() * 80
      return {
        top: top + '%',
        left: left + '%',
        width: width + 'px',
        height: height + 'px',
        animationDuration: duration + 's',
        animationDelay: delay + 's',
        opacity: 0,
      }
    }

    function getSensorBarHeight(j) {
      const base = [12, 20, 15, 28, 18, 35, 22, 16, 30, 25, 19, 24]
      return base[(j - 1) % base.length]
    }

    const stats = ref([
      { value: '3', label: 'Sensores Activos' },
      { value: '24/7', label: 'Monitoreo Continuo' },
      { value: '3.640m', label: 'Altitud (m.s.n.m.)' },
      { value: '~100%', label: 'Tasa de captura' },
    ])

    const features = ref([
      {
        svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>',
        title: 'Visualización en Tiempo Real',
        desc: 'Gráficos interactivos con Chart.js que se actualizan automáticamente con los datos del detector.'
      },
      {
        svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>',
        title: 'Análisis Científico',
        desc: 'Herramientas avanzadas para filtrar, correlacionar y analizar eventos de radiación cósmica.'
      },
      {
        svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>',
        title: 'Exportación de Datos',
        desc: 'Descarga los datasets en CSV o JSON para análisis independiente con Python, MATLAB, ROOT.'
      },
      {
        svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
        title: 'Acceso Seguro',
        desc: 'Panel administrativo con autenticación JWT para gestión avanzada de sensores y alertas.'
      },
      {
        svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/></svg>',
        title: 'Gestión de Sensores',
        desc: 'Monitoreo del estado, configuración y mantenimiento de cada detector en tiempo real.'
      },
      {
        svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>',
        title: 'Sistema de Alertas',
        desc: 'Notificaciones automáticas ante anomalías en el flujo de partículas o fallos en sensores.'
      },
    ])

    const techFrontend = ref([
      { name: 'Vue.js 3', desc: 'Framework reactivo progresivo' },
      { name: 'Chart.js 4', desc: 'Gráficos interactivos' },
      { name: 'Tailwind CSS 3', desc: 'Estilos utilitarios' },
      { name: 'Pinia 2', desc: 'Gestión de estado global' },
      { name: 'Vite 5', desc: 'Build tool ultrarrápido' },
    ])

    const techBackend = ref([
      { name: 'PHP 8.1+', desc: 'Servidor API REST' },
      { name: 'Slim Framework 4', desc: 'Micro-framework liviano' },
      { name: 'MySQL 5.7+', desc: 'Base de datos relacional' },
      { name: 'Monolog 3', desc: 'Sistema de logging' },
      { name: 'PDO', desc: 'Abstracción BD segura' },
    ])

    const techScience = ref([
      { name: 'Detectores EAS', desc: 'Lluvia aérea extensa' },
      { name: 'Magnetómetro', desc: 'Campo magnético local' },
      { name: 'Scintilladores', desc: 'Detección de partículas' },
      { name: 'GPS Sincronización', desc: 'Marcas temporales precisas' },
      { name: 'Análisis estadístico', desc: 'Procesamiento automático' },
    ])

    const sensors = ref([
      {
        name: 'Detector EAS-01',
        type: 'Scintillador de Muones',
        active: true,
        metrics: [
          { value: '142 Hz', label: 'Frecuencia' },
          { value: '98.5%', label: 'Uptime' },
        ],
      },
      {
        name: 'Magnetómetro MT-01',
        type: 'Sensor de Campo Magnético',
        active: true,
        metrics: [
          { value: '28.4 µT', label: 'Campo B' },
          { value: '99.1%', label: 'Uptime' },
        ],
      },
      {
        name: 'Detector Rc-03',
        type: 'Contador Geiger – Mueller',
        active: false,
        metrics: [
          { value: '—', label: 'Frecuencia' },
          { value: 'Mant.', label: 'Estado' },
        ],
      },
    ])

    onMounted(() => {
      initCanvas()
    })

    onUnmounted(() => {
      if (animationId) cancelAnimationFrame(animationId)
      window.removeEventListener('resize', () => {})
    })

    return {
      landingRef,
      starsCanvas,
      stats,
      features,
      techFrontend,
      techBackend,
      techScience,
      sensors,
      getCosmicRayStyle,
      getSensorBarHeight,
    }
  },
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@400;500;600;700&display=swap');

/* ===================== BASE ===================== */
.landing-page {
  position: relative;
  min-height: 100vh;
  font-family: 'Inter', sans-serif;
  color: #e8eeff;
  overflow-x: hidden;
}

/* ===================== CANVAS ===================== */
.stars-canvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
}

/* ===================== RAYOS CÓSMICOS ===================== */
.cosmic-particles {
  position: fixed;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  overflow: hidden;
}

.cosmic-ray {
  position: absolute;
  background: linear-gradient(to bottom, rgba(100, 180, 255, 0.8), transparent);
  border-radius: 2px;
  animation: cosmicFall linear infinite;
}

@keyframes cosmicFall {
  0% { opacity: 0; transform: translateY(-30px) rotate(-15deg); }
  10% { opacity: 0.6; }
  80% { opacity: 0.3; }
  100% { opacity: 0; transform: translateY(120px) rotate(-15deg); }
}

/* ===================== NAVBAR ===================== */
.navbar {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(5, 13, 31, 0.75);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(61, 90, 255, 0.15);
}

.navbar-inner {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 2rem;
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.navbar-brand {
  display: flex;
  align-items: center;
  gap: 14px;
}

.brand-icon {
  position: relative;
  width: 44px;
  height: 44px;
  background: linear-gradient(135deg, #1e36c4, #3d5aff);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 20px rgba(61, 90, 255, 0.4);
}

.brand-svg {
  width: 26px;
  height: 26px;
  position: relative;
  z-index: 1;
}

.brand-icon-pulse {
  position: absolute;
  inset: -4px;
  border-radius: 14px;
  border: 2px solid rgba(61, 90, 255, 0.4);
  animation: pulseBorder 2.5s ease-in-out infinite;
}

@keyframes pulseBorder {
  0%, 100% { opacity: 0.4; transform: scale(1); }
  50% { opacity: 0.8; transform: scale(1.06); }
}

.brand-title {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1.1rem;
  font-weight: 700;
  color: #f0f4ff;
  letter-spacing: 0.08em;
  display: block;
}

.brand-subtitle {
  font-size: 0.7rem;
  color: rgba(160, 180, 255, 0.7);
  letter-spacing: 0.05em;
  display: block;
  margin-top: 1px;
}

.navbar-links {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.nav-link {
  font-size: 0.9rem;
  color: rgba(180, 200, 255, 0.8);
  text-decoration: none;
  transition: color 0.2s;
  font-weight: 500;
}

.nav-link:hover {
  color: #fff;
}

.nav-cta {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 22px;
  background: linear-gradient(135deg, #1e36c4, #3d5aff);
  color: #fff;
  text-decoration: none;
  border-radius: 10px;
  font-size: 0.88rem;
  font-weight: 600;
  transition: all 0.25s;
  box-shadow: 0 0 20px rgba(61, 90, 255, 0.35);
}

.nav-cta:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 30px rgba(61, 90, 255, 0.55);
  color: #fff;
}

/* ===================== HERO ===================== */
.hero-section {
  position: relative;
  z-index: 10;
  min-height: calc(100vh - 72px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3rem 2rem 3rem;
  max-width: 1280px;
  margin: 0 auto;
  gap: 3rem;
}

.hero-glow {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  filter: blur(80px);
}

.hero-glow-1 {
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(61, 90, 255, 0.15), transparent 70%);
  top: 5%;
  left: -8%;
}

.hero-glow-2 {
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, rgba(80, 200, 255, 0.1), transparent 70%);
  bottom: 5%;
  right: -4%;
}

.hero-content {
  flex: 1;
  max-width: 600px;
  min-width: 0;
}

.status-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 5px 14px;
  background: rgba(61, 90, 255, 0.12);
  border: 1px solid rgba(61, 90, 255, 0.3);
  border-radius: 100px;
  font-size: 0.78rem;
  color: rgba(180, 210, 255, 0.9);
  margin-bottom: 1.25rem;
  letter-spacing: 0.03em;
}

.status-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #4ade80;
  box-shadow: 0 0 8px #4ade80;
  animation: blinkDot 1.5s ease-in-out infinite;
}

@keyframes blinkDot {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
}

.hero-title {
  font-family: 'Space Grotesk', sans-serif;
  font-size: clamp(1.9rem, 3.5vw, 3.2rem);
  font-weight: 800;
  line-height: 1.12;
  margin-bottom: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.15em;
}

.hero-title-line1,
.hero-title-line3 {
  color: rgba(220, 235, 255, 0.9);
}

.hero-title-accent {
  position: relative;
  display: inline-block;
}

.accent-text {
  background: linear-gradient(90deg, #7eb8ff, #a5f3fc, #6aadff);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: gradientShift 4s ease-in-out infinite;
  background-size: 200% auto;
}

@keyframes gradientShift {
  0%, 100% { background-position: 0% center; }
  50% { background-position: 100% center; }
}

.accent-glow {
  position: absolute;
  inset: -8px -20px;
  background: radial-gradient(ellipse, rgba(100, 160, 255, 0.15), transparent 70%);
  filter: blur(10px);
  pointer-events: none;
}

.hero-description {
  font-size: 0.97rem;
  line-height: 1.75;
  color: rgba(180, 200, 255, 0.8);
  margin-bottom: 1.75rem;
}

.hero-description strong {
  color: rgba(220, 235, 255, 0.95);
}

/* Stats */
.hero-stats {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 1.75rem;
  flex-wrap: wrap;
}

.stat-card {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(61, 90, 255, 0.2);
  border-radius: 10px;
  padding: 10px 16px;
  min-width: 90px;
  text-align: center;
  backdrop-filter: blur(10px);
  transition: border-color 0.2s, transform 0.2s;
}

.stat-card:hover {
  border-color: rgba(61, 90, 255, 0.5);
  transform: translateY(-3px);
}

.stat-value {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1.15rem;
  font-weight: 700;
  color: #a5c8ff;
  margin-bottom: 2px;
}

.stat-label {
  font-size: 0.72rem;
  color: rgba(150, 180, 255, 0.65);
  letter-spacing: 0.04em;
}

/* CTAs */
.hero-ctas {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.cta-primary {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 11px 24px;
  background: linear-gradient(135deg, #1e36c4 0%, #3d5aff 100%);
  color: #fff;
  text-decoration: none;
  border-radius: 10px;
  font-size: 0.9rem;
  font-weight: 600;
  box-shadow: 0 0 24px rgba(61, 90, 255, 0.4), 0 4px 12px rgba(0,0,0,0.3);
  transition: all 0.25s;
  border: 1px solid rgba(120, 150, 255, 0.3);
}

.cta-primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 0 50px rgba(61, 90, 255, 0.6), 0 8px 25px rgba(0,0,0,0.4);
  color: #fff;
}

.cta-secondary {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 11px 24px;
  background: rgba(255,255,255,0.05);
  color: rgba(180, 210, 255, 0.9);
  text-decoration: none;
  border-radius: 10px;
  font-size: 0.9rem;
  font-weight: 500;
  border: 1px solid rgba(61, 90, 255, 0.25);
  backdrop-filter: blur(8px);
  transition: all 0.25s;
}

.cta-secondary:hover {
  background: rgba(61, 90, 255, 0.1);
  border-color: rgba(61, 90, 255, 0.5);
  color: #fff;
  transform: translateY(-2px);
}

.cta-large {
  padding: 13px 32px;
  font-size: 0.95rem;
}

/* ===================== DETECTOR VISUAL ===================== */
.hero-visual {
  position: relative;
  flex-shrink: 0;
  width: 280px;
  height: 280px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.detector-ring {
  position: absolute;
  border-radius: 50%;
  border: 1px solid;
  animation: ringRotate linear infinite;
}

.detector-ring-1 {
  width: 260px;
  height: 260px;
  border-color: rgba(61, 90, 255, 0.3);
  animation-duration: 20s;
}

.detector-ring-2 {
  width: 195px;
  height: 195px;
  border-color: rgba(80, 200, 255, 0.2);
  animation-duration: 14s;
  animation-direction: reverse;
}

.detector-ring-3 {
  width: 130px;
  height: 130px;
  border-color: rgba(61, 90, 255, 0.25);
  animation-duration: 9s;
}

.detector-ring::before {
  content: '';
  position: absolute;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: rgba(100, 160, 255, 0.9);
  top: -5px;
  left: 50%;
  transform: translateX(-50%);
  box-shadow: 0 0 10px rgba(100, 160, 255, 0.8);
}

@keyframes ringRotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.detector-ring-inner {
  position: absolute;
  inset: 20px;
  border-radius: 50%;
  border: 1px dashed rgba(61, 90, 255, 0.15);
}

.detector-core {
  position: relative;
  z-index: 2;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: radial-gradient(circle at 35% 35%, rgba(100, 150, 255, 0.3), rgba(20, 40, 120, 0.8));
  border: 2px solid rgba(61, 90, 255, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 40px rgba(61, 90, 255, 0.4), inset 0 0 20px rgba(61, 90, 255, 0.1);
  overflow: hidden;
}

.detector-svg {
  width: 48px;
  height: 48px;
  animation: detectorPulse 2.5s ease-in-out infinite;
}

@keyframes detectorPulse {
  0%, 100% { opacity: 0.7; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.08); }
}

.detector-scan {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: conic-gradient(from 0deg, transparent 0deg, rgba(61, 90, 255, 0.25) 60deg, transparent 60deg);
  animation: scanRotate 2.5s linear infinite;
}

@keyframes scanRotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.detector-data {
  position: absolute;
  inset: 0;
}

.data-line {
  position: absolute;
  background: linear-gradient(to right, transparent, rgba(61, 90, 255, 0.6), transparent);
  height: 1px;
  width: 60%;
  animation: dataFlow 3s ease-in-out infinite;
}

.data-line-1 { top: 20%; left: 20%; animation-delay: 0s; }
.data-line-2 { top: 35%; left: 10%; width: 80%; animation-delay: 0.7s; }
.data-line-3 { top: 65%; left: 15%; width: 70%; animation-delay: 1.4s; }
.data-line-4 { top: 80%; left: 25%; animation-delay: 2.1s; }

@keyframes dataFlow {
  0%, 100% { opacity: 0; transform: scaleX(0.3); }
  50% { opacity: 0.8; transform: scaleX(1); }
}

/* ===================== SECTIONS COMUNES ===================== */
.section-container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 4rem 2rem;
  position: relative;
  z-index: 10;
}

.section-header {
  text-align: center;
  margin-bottom: 2.5rem;
}

.section-tag {
  display: inline-block;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  color: rgba(100, 160, 255, 0.8);
  background: rgba(61, 90, 255, 0.1);
  border: 1px solid rgba(61, 90, 255, 0.2);
  padding: 4px 14px;
  border-radius: 100px;
  margin-bottom: 1rem;
}

.section-title {
  font-family: 'Space Grotesk', sans-serif;
  font-size: clamp(1.6rem, 2.8vw, 2.2rem);
  font-weight: 700;
  color: #f0f4ff;
  margin-bottom: 0.75rem;
}

.section-subtitle {
  font-size: 1rem;
  color: rgba(160, 190, 255, 0.7);
  max-width: 560px;
  margin: 0 auto;
  line-height: 1.7;
}

/* ===================== FEATURES ===================== */
.features-section {
  position: relative;
  z-index: 10;
  border-top: 1px solid rgba(61, 90, 255, 0.1);
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.25rem;
}

.feature-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(61, 90, 255, 0.14);
  border-radius: 16px;
  padding: 1.5rem;
  transition: all 0.3s;
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(10px);
}

.feature-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 0% 0%, rgba(61, 90, 255, 0.08), transparent 60%);
  opacity: 0;
  transition: opacity 0.3s;
}

.feature-card:hover {
  border-color: rgba(61, 90, 255, 0.4);
  transform: translateY(-6px);
  box-shadow: 0 20px 50px rgba(0,0,0,0.3), 0 0 30px rgba(61, 90, 255, 0.1);
}

.feature-card:hover::before {
  opacity: 1;
}

.feature-icon-wrap {
  position: relative;
  width: 52px;
  height: 52px;
  margin-bottom: 1.1rem;
  background: rgba(61, 90, 255, 0.1);
  border: 1px solid rgba(61, 90, 255, 0.2);
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.3s, border-color 0.3s;
}

.feature-card:hover .feature-icon-wrap {
  background: rgba(61, 90, 255, 0.18);
  border-color: rgba(100, 150, 255, 0.4);
}

.feature-icon-svg {
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.feature-icon-svg svg {
  width: 28px;
  height: 28px;
  stroke: rgba(140, 190, 255, 0.85);
  transition: stroke 0.3s;
}

.feature-card:hover .feature-icon-svg svg {
  stroke: rgba(180, 220, 255, 1);
}

.feature-icon-glow {
  position: absolute;
  inset: -8px;
  background: radial-gradient(circle, rgba(61, 90, 255, 0.2), transparent 70%);
  border-radius: 50%;
  opacity: 0;
  transition: opacity 0.3s;
}

.feature-card:hover .feature-icon-glow {
  opacity: 1;
}

.feature-title {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1.1rem;
  font-weight: 600;
  color: #e8eeff;
  margin-bottom: 0.75rem;
}

.feature-desc {
  font-size: 0.9rem;
  color: rgba(160, 185, 255, 0.7);
  line-height: 1.7;
  margin-bottom: 1.25rem;
}

.feature-line {
  height: 2px;
  background: linear-gradient(to right, rgba(61, 90, 255, 0.5), transparent);
  border-radius: 4px;
  transform: scaleX(0.3);
  transform-origin: left;
  transition: transform 0.4s;
}

.feature-card:hover .feature-line {
  transform: scaleX(1);
}

/* ===================== TECH ===================== */
.tech-section {
  position: relative;
  z-index: 10;
  border-top: 1px solid rgba(61, 90, 255, 0.1);
}

.tech-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.25rem;
}

.tech-card {
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(61, 90, 255, 0.15);
  border-radius: 16px;
  padding: 1.5rem;
  backdrop-filter: blur(10px);
  transition: all 0.3s;
}

.tech-card:hover {
  border-color: rgba(61, 90, 255, 0.4);
  transform: translateY(-4px);
}

.tech-card-frontend { border-top: 3px solid rgba(61, 90, 255, 0.6); }
.tech-card-backend { border-top: 3px solid rgba(80, 200, 200, 0.5); }
.tech-card-science { border-top: 3px solid rgba(200, 100, 255, 0.5); }

.tech-card-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 1.5rem;
}

.tech-card-icon { font-size: 1.8rem; }

.tech-card-title {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1.2rem;
  font-weight: 700;
  color: #e8eeff;
}

.tech-items {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.tech-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.tech-item-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: rgba(100, 160, 255, 0.7);
  box-shadow: 0 0 6px rgba(100, 160, 255, 0.5);
  margin-top: 7px;
  flex-shrink: 0;
}

.tech-item-name {
  display: block;
  font-size: 0.9rem;
  font-weight: 600;
  color: rgba(210, 225, 255, 0.9);
}

.tech-item-desc {
  display: block;
  font-size: 0.78rem;
  color: rgba(140, 170, 255, 0.6);
}

/* ===================== SENSORES ===================== */
.sensors-section {
  position: relative;
  z-index: 10;
  border-top: 1px solid rgba(61, 90, 255, 0.1);
}

.sensors-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.sensor-card {
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(61, 90, 255, 0.15);
  border-radius: 20px;
  padding: 1.75rem;
  backdrop-filter: blur(10px);
  transition: all 0.3s;
}

.sensor-card:hover {
  border-color: rgba(61, 90, 255, 0.4);
  transform: translateY(-4px);
  box-shadow: 0 16px 40px rgba(0,0,0,0.3);
}

.sensor-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 0.5rem;
}

.sensor-status-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: rgba(100, 100, 100, 0.5);
  flex-shrink: 0;
}

.sensor-status-dot.active {
  background: #4ade80;
  box-shadow: 0 0 8px #4ade80;
  animation: blinkDot 2s ease-in-out infinite;
}

.sensor-name {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  color: #e8eeff;
}

.sensor-type {
  font-size: 0.78rem;
  color: rgba(140, 170, 255, 0.6);
  margin-bottom: 1.25rem;
  padding-left: 20px;
}

.sensor-metrics {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.sensor-metric-value {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1.25rem;
  font-weight: 700;
  color: #a5c8ff;
}

.sensor-metric-label {
  font-size: 0.72rem;
  color: rgba(140, 170, 255, 0.55);
  margin-top: 2px;
}

/* Mini waveform */
.sensor-wave {
  display: flex;
  align-items: flex-end;
  gap: 3px;
  height: 36px;
}

.sensor-wave-bar {
  flex: 1;
  background: rgba(61, 90, 255, 0.5);
  border-radius: 2px 2px 0 0;
  animation: waveAnim 1.5s ease-in-out infinite alternate;
  min-height: 4px;
}

.sensor-card:hover .sensor-wave-bar {
  background: rgba(100, 160, 255, 0.7);
}

@keyframes waveAnim {
  from { transform: scaleY(0.4); }
  to { transform: scaleY(1); }
}

/* ===================== FINAL CTA ===================== */
.final-cta-section {
  position: relative;
  z-index: 10;
  border-top: 1px solid rgba(61, 90, 255, 0.1);
  padding: 5rem 2rem;
  text-align: center;
  overflow: hidden;
}

.final-cta-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 600px;
  height: 400px;
  background: radial-gradient(ellipse, rgba(61, 90, 255, 0.12), transparent 70%);
  pointer-events: none;
}

.final-cta-content {
  position: relative;
  max-width: 600px;
  margin: 0 auto;
}

.final-cta-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
  animation: floatIcon 3s ease-in-out infinite;
}

@keyframes floatIcon {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-12px); }
}

.final-cta-title {
  font-family: 'Space Grotesk', sans-serif;
  font-size: clamp(1.5rem, 2.5vw, 2rem);
  font-weight: 700;
  color: #f0f4ff;
  margin-bottom: 0.75rem;
}

.final-cta-desc {
  font-size: 0.95rem;
  color: rgba(160, 190, 255, 0.7);
  line-height: 1.7;
  margin-bottom: 2rem;
}

/* ===================== FOOTER ===================== */
.landing-footer {
  position: relative;
  z-index: 10;
  border-top: 1px solid rgba(61, 90, 255, 0.1);
  background: rgba(5, 13, 31, 0.5);
  backdrop-filter: blur(20px);
}

.footer-inner {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2.5rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1.5rem;
}

.footer-logo {
  font-family: 'Space Grotesk', sans-serif;
  font-weight: 700;
  font-size: 0.95rem;
  color: rgba(200, 220, 255, 0.9);
  display: block;
  margin-bottom: 4px;
}

.footer-tagline {
  font-size: 0.78rem;
  color: rgba(140, 170, 255, 0.5);
}

.footer-links {
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.footer-links a {
  font-size: 0.85rem;
  color: rgba(150, 180, 255, 0.65);
  text-decoration: none;
  transition: color 0.2s;
}

.footer-links a:hover {
  color: rgba(200, 220, 255, 0.95);
}

.footer-copy {
  font-size: 0.78rem;
  color: rgba(120, 150, 255, 0.4);
}

/* ===================== RESPONSIVE ===================== */
@media (max-width: 1100px) {
  .hero-visual {
    width: 240px;
    height: 240px;
  }

  .detector-ring-1 { width: 220px; height: 220px; }
  .detector-ring-2 { width: 165px; height: 165px; }
  .detector-ring-3 { width: 110px; height: 110px; }
}

@media (max-width: 860px) {
  .hero-section {
    flex-direction: column;
    text-align: center;
    padding: 2.5rem 1.5rem;
    gap: 2rem;
    min-height: auto;
  }

  .hero-visual {
    width: 200px;
    height: 200px;
  }

  .detector-ring-1 { width: 185px; height: 185px; }
  .detector-ring-2 { width: 138px; height: 138px; }
  .detector-ring-3 { width: 92px; height: 92px; }

  .hero-ctas, .hero-stats {
    justify-content: center;
  }

  .navbar-links {
    gap: 1rem;
  }

  .nav-link { display: none; }

  .footer-inner {
    flex-direction: column;
    text-align: center;
  }

  .section-container {
    padding: 3rem 1.5rem;
  }

  .features-grid,
  .tech-grid,
  .sensors-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 600px) {
  .navbar-inner { padding: 0 1rem; }
  .hero-stats { gap: 0.5rem; }
  .stat-card { min-width: 75px; padding: 8px 12px; }
  .brand-text { display: none; }
  .section-container { padding: 2.5rem 1rem; }
  .hero-section { padding: 2rem 1rem; }
}
</style>
