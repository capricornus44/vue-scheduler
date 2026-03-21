import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface User {
  id: string
  email: string
  name?: string
}

const getCookie = (name: string) => {
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) {
    const cookieVal = parts.pop()?.split(';').shift()
    return cookieVal ? decodeURIComponent(cookieVal) : null
  }
  return null
}

const setCookie = (name: string, value: string, days = 7) => {
  const date = new Date()
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000))
  document.cookie = `${name}=${encodeURIComponent(value)};expires=${date.toUTCString()};path=/`
}

const deleteCookie = (name: string) => {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`
}

export const useUserStore = defineStore('user', () => {
  const user = ref<User | null>(JSON.parse(getCookie('user') || 'null'))
  const accessToken = ref<string | null>(getCookie('accessToken'))
  const refreshToken = ref<string | null>(getCookie('refreshToken'))

  const isAuthenticated = computed(() => !!accessToken.value)

  // Mock API delays
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

  const login = async (email: string, password: string) => {
    await delay(500)
    if (email && password) {
      const newUser = { id: '1', email }
      user.value = newUser
      accessToken.value = 'mock-jwt-token'
      refreshToken.value = 'mock-refresh-token'
      
      setCookie('user', JSON.stringify(newUser))
      setCookie('accessToken', 'mock-jwt-token')
      setCookie('refreshToken', 'mock-refresh-token')
      return true
    }
    throw new Error('Invalid credentials')
  }

  const register = async (email: string, password: string) => {
    await delay(500)
    if (email && password) {
      // Don't fully log in yet, wait for OTP in this flow
      const newUser = { id: '1', email }
      user.value = newUser
      setCookie('user', JSON.stringify(newUser))
      return true
    }
    throw new Error('Registration failed')
  }

  const verifyOtp = async (code: string) => {
    await delay(500)
    if (code.length === 6) {
      accessToken.value = 'mock-jwt-token'
      refreshToken.value = 'mock-refresh-token'
      
      setCookie('accessToken', 'mock-jwt-token')
      setCookie('refreshToken', 'mock-refresh-token')
      return true
    }
    throw new Error('Invalid OTP')
  }

  const forgotPassword = async (email: string) => {
    await delay(500)
    if (email) {
      return true
    }
    throw new Error('Email not found')
  }

  const logout = () => {
    user.value = null
    accessToken.value = null
    refreshToken.value = null
    
    deleteCookie('user')
    deleteCookie('accessToken')
    deleteCookie('refreshToken')
  }

  return {
    user,
    accessToken,
    refreshToken,
    isAuthenticated,
    login,
    register,
    verifyOtp,
    forgotPassword,
    logout,
  }
})
