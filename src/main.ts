import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from 'vue-router/auto-routes'
import { VueQueryPlugin } from '@tanstack/vue-query'
import App from './App.vue'
import './style.css'

const router = createRouter({
  history: createWebHistory(),
  routes,
})

const pinia = createPinia()

const app = createApp(App)

app.use(router)
app.use(pinia)
app.use(VueQueryPlugin)
app.mount('#app')
