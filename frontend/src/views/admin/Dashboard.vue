<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
    <!-- Header Section -->
    <div class="bg-white/80 backdrop-blur-sm border-b border-slate-200/60 sticky top-0 z-10">
      <div class="px-4 sm:px-6 lg:px-8 py-6">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div class="flex items-center space-x-3">
            <div class="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-lg">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
              </svg>
            </div>
            <div>
              <h1 class="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                Панель управления
              </h1>
              <p class="text-slate-600 text-sm mt-1">Добро пожаловать в административную панель</p>
            </div>
          </div>
          <div class="mt-4 sm:mt-0 flex items-center space-x-3">
            <div class="flex items-center px-3 py-2 bg-green-50 border border-green-200 rounded-lg">
              <div class="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
              <span class="text-green-700 text-sm font-medium">Система активна</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="px-4 sm:px-6 lg:px-8 py-8">
      <!-- Stats Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <!-- Users Card -->
        <div class="group relative overflow-hidden bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 hover:border-blue-200">
          <div class="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent opacity-50 group-hover:opacity-70 transition-opacity"></div>
          <div class="relative p-6">
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-4">
                <div class="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5 0a4 4 0 11-8-2.954"/>
                  </svg>
                </div>
                <div>
                  <p class="text-sm font-medium text-slate-600">Пользователи</p>
                  <p class="text-2xl font-bold text-slate-900 mt-1">{{ stats.users.toLocaleString() }}</p>
                </div>
              </div>
              <div class="text-green-500 text-sm font-semibold">
                +12%
              </div>
            </div>
            <div class="mt-4 flex items-center">
              <div class="w-full bg-slate-200 rounded-full h-2">
                <div class="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-500" style="width: 75%"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Ads Card -->
        <div class="group relative overflow-hidden bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 hover:border-green-200">
          <div class="absolute inset-0 bg-gradient-to-br from-green-50 to-transparent opacity-50 group-hover:opacity-70 transition-opacity"></div>
          <div class="relative p-6">
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-4">
                <div class="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
                  </svg>
                </div>
                <div>
                  <p class="text-sm font-medium text-slate-600">Объявления</p>
                  <p class="text-2xl font-bold text-slate-900 mt-1">{{ stats.ads.toLocaleString() }}</p>
                </div>
              </div>
              <div class="text-green-500 text-sm font-semibold">
                +8%
              </div>
            </div>
            <div class="mt-4 flex items-center">
              <div class="w-full bg-slate-200 rounded-full h-2">
                <div class="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full transition-all duration-500" style="width: 82%"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Pending Card -->
        <div class="group relative overflow-hidden bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 hover:border-amber-200">
          <div class="absolute inset-0 bg-gradient-to-br from-amber-50 to-transparent opacity-50 group-hover:opacity-70 transition-opacity"></div>
          <div class="relative p-6">
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-4">
                <div class="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <div>
                  <p class="text-sm font-medium text-slate-600">На модерации</p>
                  <p class="text-2xl font-bold text-slate-900 mt-1">{{ stats.pending.toLocaleString() }}</p>
                </div>
              </div>
              <div class="text-amber-600 text-sm font-semibold">
                Требует внимания
              </div>
            </div>
            <div class="mt-4 flex items-center">
              <div class="w-full bg-slate-200 rounded-full h-2">
                <div class="bg-gradient-to-r from-amber-500 to-amber-600 h-2 rounded-full transition-all duration-500" style="width: 35%"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- VIP Card -->
        <div class="group relative overflow-hidden bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 hover:border-purple-200">
          <div class="absolute inset-0 bg-gradient-to-br from-purple-50 to-transparent opacity-50 group-hover:opacity-70 transition-opacity"></div>
          <div class="relative p-6">
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-4">
                <div class="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                  </svg>
                </div>
                <div>
                  <p class="text-sm font-medium text-slate-600">VIP объявления</p>
                  <p class="text-2xl font-bold text-slate-900 mt-1">{{ stats.vip.toLocaleString() }}</p>
                </div>
              </div>
              <div class="text-purple-600 text-sm font-semibold">
                Премиум
              </div>
            </div>
            <div class="mt-4 flex items-center">
              <div class="w-full bg-slate-200 rounded-full h-2">
                <div class="bg-gradient-to-r from-purple-500 to-purple-600 h-2 rounded-full transition-all duration-500" style="width: 60%"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Activity Section -->
      <div class="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <!-- Recent Ads -->
        <div class="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-shadow">
          <div class="px-6 py-5 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-3">
                <div class="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
                  </svg>
                </div>
                <h3 class="text-lg font-semibold text-slate-900">Последние объявления</h3>
              </div>
              <router-link 
                to="/admin/ads" 
                class="text-sm text-blue-600 hover:text-blue-700 font-medium hover:underline transition-colors"
              >
                Посмотреть все
              </router-link>
            </div>
          </div>
          <div class="max-h-96 overflow-y-auto">
            <div v-if="recentAds.length === 0" class="px-6 py-8 text-center">
              <div class="w-16 h-16 mx-auto bg-slate-100 rounded-full flex items-center justify-center mb-3">
                <svg class="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
                </svg>
              </div>
              <p class="text-slate-500 text-sm">Пока нет объявлений</p>
            </div>
            <div v-else class="divide-y divide-slate-100">
              <div 
                v-for="(ad, index) in recentAds" 
                :key="ad.id" 
                class="px-6 py-4 hover:bg-slate-50 transition-colors group"
                :style="{ animationDelay: `${index * 100}ms` }"
              >
                <div class="flex items-center justify-between">
                  <div class="flex-1 min-w-0">
                    <p class="text-sm font-medium text-slate-900 truncate group-hover:text-blue-600 transition-colors">
                      {{ ad.title }}
                    </p>
                    <div class="flex items-center mt-1 space-x-2">
                      <div class="w-6 h-6 bg-slate-200 rounded-full flex items-center justify-center">
                        <span class="text-xs font-medium text-slate-600">
                          {{ ad.user?.name?.charAt(0)?.toUpperCase() || '?' }}
                        </span>
                      </div>
                      <p class="text-sm text-slate-500">{{ ad.user?.name || 'Неизвестный пользователь' }}</p>
                    </div>
                  </div>
                  <div class="ml-4 flex-shrink-0">
                    <span 
                      class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                      :class="getStatusClass(ad.status)"
                    >
                      {{ getStatusText(ad.status) }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Recent Users -->
        <div class="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-shadow">
          <div class="px-6 py-5 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-3">
                <div class="w-8 h-8 bg-gradient-to-r from-green-500 to-teal-600 rounded-lg flex items-center justify-center">
                  <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5 0a4 4 0 11-8-2.954"/>
                  </svg>
                </div>
                <h3 class="text-lg font-semibold text-slate-900">Новые пользователи</h3>
              </div>
              <router-link 
                to="/admin/users" 
                class="text-sm text-blue-600 hover:text-blue-700 font-medium hover:underline transition-colors"
              >
                Посмотреть все
              </router-link>
            </div>
          </div>
          <div class="max-h-96 overflow-y-auto">
            <div v-if="recentUsers.length === 0" class="px-6 py-8 text-center">
              <div class="w-16 h-16 mx-auto bg-slate-100 rounded-full flex items-center justify-center mb-3">
                <svg class="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5 0a4 4 0 11-8-2.954"/>
                </svg>
              </div>
              <p class="text-slate-500 text-sm">Пока нет новых пользователей</p>
            </div>
            <div v-else class="divide-y divide-slate-100">
              <div 
                v-for="(user, index) in recentUsers" 
                :key="user.id" 
                class="px-6 py-4 hover:bg-slate-50 transition-colors group"
                :style="{ animationDelay: `${index * 100}ms` }"
              >
                <div class="flex items-center space-x-4">
                  <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
                    <span class="text-sm font-semibold text-white">
                      {{ user.name?.charAt(0)?.toUpperCase() || '?' }}
                    </span>
                  </div>
                  <div class="flex-1 min-w-0">
                    <p class="text-sm font-medium text-slate-900 truncate group-hover:text-blue-600 transition-colors">
                      {{ user.name || 'Без имени' }}
                    </p>
                    <p class="text-sm text-slate-500 truncate">{{ user.email || 'Без email' }}</p>
                  </div>
                  <div class="text-xs text-slate-400">
                    {{ formatDate(user.createdAt) }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import api from '../../services/api'

export default {
  name: 'AdminDashboard',
  setup() {
    const stats = ref({
      users: 0,
      ads: 0,
      pending: 0,
      vip: 0
    })
    
    const recentAds = ref([])
    const recentUsers = ref([])

    const loadStats = async () => {
      try {
        const response = await api.get('/admin/stats')
        stats.value = response.data
      } catch (error) {
        console.error('Failed to load stats:', error)
      }
    }

    const loadRecentAds = async () => {
      try {
        const response = await api.get('/admin/ads/recent')
        recentAds.value = response.data
      } catch (error) {
        console.error('Failed to load recent ads:', error)
      }
    }

    const loadRecentUsers = async () => {
      try {
        const response = await api.get('/admin/users/recent')
        recentUsers.value = response.data
      } catch (error) {
        console.error('Failed to load recent users:', error)
      }
    }

    const getStatusText = (status) => {
      switch (status) {
        case 'approved': return 'Одобрено'
        case 'pending': return 'Модерация'
        case 'rejected': return 'Отклонено'
        case 'blocked': return 'Заблокировано'
        default: return status
      }
    }

    const getStatusClass = (status) => {
      switch (status) {
        case 'approved': return 'bg-green-100 text-green-800 border border-green-200'
        case 'pending': return 'bg-amber-100 text-amber-800 border border-amber-200'
        case 'rejected': return 'bg-red-100 text-red-800 border border-red-200'
        case 'blocked': return 'bg-slate-100 text-slate-800 border border-slate-200'
        default: return 'bg-slate-100 text-slate-800 border border-slate-200'
      }
    }

    const formatDate = (dateString) => {
      if (!dateString) return 'Недавно'
      const date = new Date(dateString)
      const now = new Date()
      const diffTime = Math.abs(now - date)
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      
      if (diffDays === 1) return 'Сегодня'
      if (diffDays === 2) return 'Вчера'
      if (diffDays < 7) return `${diffDays} дня назад`
      return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' })
    }

    onMounted(() => {
      loadStats()
      loadRecentAds()
      loadRecentUsers()
    })

    return {
      stats,
      recentAds,
      recentUsers,
      getStatusText,
      getStatusClass,
      formatDate
    }
  }
}
</script>

<style scoped>
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.group:hover .group-hover\:scale-105 {
  transform: scale(1.05);
}

.group:hover .group-hover\:scale-110 {
  transform: scale(1.1);
}
</style>
