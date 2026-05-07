import { defineStore } from 'pinia'
import api from '@api'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('auth.token') || '',
    user: JSON.parse(localStorage.getItem('auth.user') || 'null') || null,
  }),
  getters: {
    isAuthenticated: (state) => Boolean(state.token),
  },
  actions: {
    setSession(session) {
      this.token = session.token
      this.user = session.user
      localStorage.setItem('auth.token', session.token)
      localStorage.setItem('auth.user', JSON.stringify(session.user))
    },
    clearSession() {
      this.token = ''
      this.user = null
      localStorage.removeItem('auth.token')
      localStorage.removeItem('auth.user')
    },
    async login(correo, password) {
      const response = await api.post('/auth/login', {
        correo,
        password,
      })
      this.setSession(response.data)
      return response.data
    },
    async logout() {
      await api.post('/auth/logout')
      this.clearSession()
    },
  },
})
