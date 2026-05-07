<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@stores/auth'

const correo = ref('')
const contrasena = ref('')
const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

const login = async () => {
  try {
    const response = await authStore.login(correo.value, contrasena.value)
    console.log(response)

    const redirect = route.query.redirect || '/admin'
    await router.push(redirect)
  } catch (error) {
    console.error(error)
    const message = error.response?.data?.error || 'Error al iniciar sesión'
    alert(message)
  }
}
</script>

<template>
  <div class="login-page min-h-screen flex items-center justify-center px-4 py-12">
    <div class="login-card glass-effect rounded-3xl shadow-[0_30px_90px_rgba(15,27,74,0.35)] max-w-3xl w-full grid gap-8 lg:grid-cols-[1.1fr_0.9fr] p-8">
      <div class="login-intro">
        <div class="text-sky-dark-300 uppercase tracking-[0.2em] text-sm mb-4">Acceso seguro</div>
        <h1 class="text-3xl font-bold text-sky-dark-50 mb-4">Iniciar sesión</h1>
        <p class="text-sky-dark-300 leading-relaxed">
          Ingresa tus credenciales para acceder al panel interno y ver la funcionalidad del login con el backend.
        </p>
      </div>

      <div class="login-form space-y-6">
        <label class="block text-sky-dark-200 text-sm font-medium">
          Correo
          <input
            v-model="correo"
            type="email"
            placeholder="correo@ejemplo.com"
            class="login-input mt-2"
          />
        </label>

        <label class="block text-sky-dark-200 text-sm font-medium">
          Contraseña
          <input
            v-model="contrasena"
            type="password"
            placeholder="********"
            class="login-input mt-2"
          />
        </label>

        <button
          @click="login"
          class="w-full rounded-full bg-gradient-to-r from-sky-dark-500 to-sky-dark-600 text-white py-3 font-semibold text-base hover:shadow-xl hover:shadow-sky-dark-500/30 transition"
        >
          Ingresar
        </button>

        <router-link
          to="/portal"
          class="block text-center text-sky-dark-300 hover:text-sky-dark-50 transition"
        >
          Volver al portal público
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-card {
  background: rgba(13, 24, 56, 0.78);
  border: 1px solid rgba(93, 124, 233, 0.2);
}

.login-input {
  width: 100%;
  border: 1px solid rgba(93, 124, 233, 0.35);
  background: rgba(15, 27, 74, 0.75);
  color: #edf2ff;
  padding: 0.9rem 1rem;
  border-radius: 1rem;
}

.login-input:focus {
  outline: none;
  border-color: #3d5aff;
  box-shadow: 0 0 0 3px rgba(61, 90, 255, 0.12);
}

.login-form {
  display: grid;
}

.login-intro {
  padding-right: 1rem;
}

@media (max-width: 768px) {
  .login-card {
    grid-template-columns: 1fr;
  }
}
</style>