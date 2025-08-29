import axios from 'axios'
import { useToast } from 'vue-toastification'

const api = axios.create({
  baseURL: '/api',
  timeout: 10000
})

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const toast = useToast()
    
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('role')
      window.location.href = '/login'
    } else if (error.response?.data?.message) {
      toast.error(error.response.data.message)
    } 
    
    return Promise.reject(error)
  }
)

export default api
