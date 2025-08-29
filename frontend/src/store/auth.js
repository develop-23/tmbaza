import { defineStore } from 'pinia'
import api from '../services/api'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token'),
    user: null,
    role: localStorage.getItem('role')
  }),

  getters: {
    isLoggedIn: (state) => !!state.token,
    isAdmin: (state) => state.role === 'admin',
    isOperator: (state) => state.role === 'operator',
    isUser: (state) => state.role === 'user'
  },

  actions: {
    async login(credentials) {
      try {
        const response = await api.post('/auth/login', credentials)
        const { token, role } = response.data
        
        this.token = token
        this.role = role
        
        localStorage.setItem('token', token)
        localStorage.setItem('role', role)
        
        await this.fetchUser()
        
        return { success: true }
      } catch (error) {
        return { 
          success: false, 
          message: error.response?.data?.message || 'Login failed' 
        }
      }
    },

    async loginAdmin(credentials) {
      try {
        const response = await api.post('/auth/admin/login', credentials)
        const { token, role } = response.data
       localStorage.setItem("responce", JSON.stringify(response.data))
        this.token = token
        this.role = role
        
        localStorage.setItem('token', token)
        localStorage.setItem('role', role)
        
        await this.fetchUser()
        
        return { success: true }
      } catch (error) {
        return { 
          success: false, 
          message: error.response?.data?.message || 'Login failed' 
        }
      }
    },

    async register(userData) {
      try {
        const response = await api.post('/auth/register', userData)
        return { 
          success: true, 
          message: response.data.message,
          whatsapp: response.data.whatsapp 
        }
      } catch (error) {
        return { 
          success: false, 
          message: error.response?.data?.message || 'Registration failed' 
        }
      }
    },

    async fetchUser() {
      if (!this.token) return
      
      try {
        const response = await api.get('/users/me')
        this.user = response.data
      } catch (error) {
        this.logout()
      }
    },

    logout() {
      this.token = null
      this.user = null
      this.role = null
      
      localStorage.removeItem('token')
      localStorage.removeItem('role')
    },

    async init() {
      if (this.token) {
        await this.fetchUser()
      }
    }
  }
})
