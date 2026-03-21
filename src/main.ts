import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from 'vue-router/auto-routes'
import App from './App.vue'
import './style.css'
import { useUserStore } from './stores/userStore'

const router = createRouter({
  history: createWebHistory(),
  routes,
})

const pinia = createPinia()

router.beforeEach((to, from) => {
  const store = useUserStore(pinia)
  if (to.path !== '/login' && !store.isAuthenticated) {
    return '/login'
  }
  if (to.path === '/login' && store.isAuthenticated) {
    // If it's a direct page load (no previous route), redirect to the main page to avoid a white screen.
    // Otherwise, cancel the navigation to stay on the current page.
    if (!from.name && from.path === '/') {
      return '/'
    }
    return false
  }
})

const app = createApp(App)

app.use(router)
app.use(pinia)
app.mount('#app')
