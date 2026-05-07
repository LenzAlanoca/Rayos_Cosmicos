import { createRouter, createWebHistory } from 'vue-router'

// Vistas públicas
import Landing from '@views/public/Landing.vue'
import PublicPortal from '@views/public/PublicPortal.vue'

// Vistas internas (por implementar)
import InternalDashboard from '@views/internal/Dashboard.vue'

const routes = [
  {
    path: '/',
    name: 'landing',
    component: Landing,
    meta: { requiresAuth: false }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@views/public/login.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/portal',
    name: 'public-portal',
    component: PublicPortal,
    meta: { requiresAuth: false },
    children: [
      {
        path: 'dashboard',
        name: 'public-dashboard',
        component: () => import('@views/public/Dashboard.vue')
      },
      {
        path: 'historico',
        name: 'public-historico',
        component: () => import('@views/public/Historical.vue')
      },
      {
        path: 'info',
        name: 'public-info',
        component: () => import('@views/public/Info.vue')
      },
    ]
  },
  {
    path: '/admin',
    name: 'admin',
    component: InternalDashboard,
    meta: { requiresAuth: true },
    children: [
      {
        path: 'sensores',
        name: 'sensor-management',
        component: () => import('@views/internal/SensorManagement.vue')
      },
      {
        path: 'analisis',
        name: 'data-analysis',
        component: () => import('@views/internal/DataAnalysis.vue')
      },
      {
        path: 'monitoreo',
        name: 'realtime-monitoring',
        component: () => import('@views/internal/RealtimeMonitoring.vue')
      },
    ]
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior: () => ({ top: 0 })
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('auth.token')
  const isAuthenticated = Boolean(token)

  if (to.meta.requiresAuth && !isAuthenticated) {
    return next({ name: 'login', query: { redirect: to.fullPath } })
  }

  if (to.name === 'login' && isAuthenticated) {
    return next({ name: 'admin' })
  }

  return next()
})

export default router
