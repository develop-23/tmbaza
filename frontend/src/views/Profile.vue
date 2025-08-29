<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
    <!-- Header -->
    <div class="px-4 lg:px-6 py-6 lg:py-10">
      <div class="max-w-6xl mx-auto">
        <div class="relative overflow-hidden rounded-2xl lg:rounded-3xl bg-white shadow-sm border border-slate-200">
          <div class="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 opacity-10"></div>
          <div class="relative p-6 lg:p-8 flex items-center space-x-4 lg:space-x-6">
            <div class="w-16 h-16 lg:w-20 lg:h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-lg">
              <span class="text-2xl lg:text-3xl font-semibold">{{ (user?.name || 'U').charAt(0).toUpperCase() }}</span>
            </div>
            <div class="flex-1 min-w-0">
              <div class="flex items-center flex-wrap gap-2">
                <h1 class="text-xl lg:text-2xl font-bold text-slate-900 truncate">{{ user?.name || 'Пользователь' }}</h1>
                <span v-if="user?.verified" class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Подтверждён
                </span>
                <span v-else class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                  Не подтверждён
                </span>
                <span v-if="user?.blocked" class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                  ��аблокирован
                </span>
              </div>
              <div class="mt-1 text-slate-600 text-sm lg:text-base truncate">
                <span class="mr-4">Телефон: <span class="font-medium">{{ user?.phone }}</span></span>
                <span class="mr-4">Роль: <span class="font-medium">{{ roleLabel }}</span></span>
                <span v-if="user?.createdAt">Регистрация: <span class="font-medium">{{ formatDate(user.createdAt) }}</span></span>
              </div>
            </div>
            <div class="flex items-center space-x-2">
              <router-link to="/my-ads" class="hidden sm:inline-flex btn-primary">Мои объявления</router-link>
              <router-link to="/create-ad" class="hidden sm:inline-flex btn-secondary">Создать</router-link>
              <button @click="onLogout" class="inline-flex items-center px-4 py-2 rounded-xl text-slate-700 bg-white border border-slate-200 hover:bg-slate-50">
                Выйти
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="px-4 lg:px-6 pb-8 lg:pb-12">
      <div class="max-w-6xl mx-auto space-y-6 lg:space-y-8">
        <!-- Stats -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
          <div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-4">
            <div class="text-xs text-slate-500">Всего объявлений</div>
            <div class="mt-1 text-2xl font-bold text-slate-900">{{ stats.total }}</div>
          </div>
          <div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-4">
            <div class="text-xs text-slate-500">Активные</div>
            <div class="mt-1 text-2xl font-bold text-green-600">{{ stats.active }}</div>
          </div>
          <div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-4">
            <div class="text-xs text-slate-500">На модерации</div>
            <div class="mt-1 text-2xl font-bold text-amber-600">{{ stats.pending }}</div>
          </div>
          <div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-4">
            <div class="text-xs text-slate-500">Отклонённые</div>
            <div class="mt-1 text-2xl font-bold text-red-600">{{ stats.rejected }}</div>
          </div>
        </div>

        <!-- Quick Actions -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
          <router-link to="/create-ad" class="group bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow transition">
            <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center mb-3">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
            </div>
            <div class="font-semibold text-slate-900">Создать объявление</div>
            <div class="text-sm text-slate-500">Быстро разместите новое объявление</div>
          </router-link>
          <router-link to="/my-ads" class="group bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow transition">
            <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 text-white flex items-center justify-center mb-3">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7h18M3 12h18M3 17h18"/></svg>
            </div>
            <div class="font-semibold text-slate-900">Управление объявлениями</div>
            <div class="text-sm text-slate-500">Редактируйте и удаляйте ваши объявления</div>
          </router-link>
          <router-link to="/categories" class="group bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow transition">
            <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-fuchsia-600 text-white flex items-center justify-center mb-3">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"/></svg>
            </div>
            <div class="font-semibold text-slate-900">Категории</div>
            <div class="text-sm text-slate-500">Просмотрите доступные категории</div>
          </router-link>
          <button @click="onLogout" class="group bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow transition text-left">
            <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-500 to-slate-700 text-white flex items-center justify-center mb-3">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
            </div>
            <div class="font-semibold text-slate-900">Выйти</div>
            <div class="text-sm text-slate-500">Завершить сеанс</div>
          </button>
        </div>

        <!-- Recent Ads -->
        <div class="bg-white rounded-2xl shadow-sm border border-slate-200">
          <div class="p-4 lg:p-6 flex items-center justify-between">
            <h2 class="text-lg lg:text-xl font-bold text-slate-900">Последние объявления</h2>
            <router-link to="/my-ads" class="text-blue-600 hover:text-blue-700 text-sm">Все объявления</router-link>
          </div>
          <div v-if="loading" class="p-6 flex justify-center">
            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
          <div v-else>
            <div v-if="recentAds.length" class="divide-y divide-slate-100">
              <div v-for="ad in recentAds" :key="ad.id" class="p-4 lg:p-6 flex items-center">
                <div class="w-20 h-20 rounded-lg overflow-hidden bg-slate-100 flex-shrink-0 mr-4">
                  <img v-if="ad.images && ad.images.length" :src="ad.images[0]" :alt="ad.title" class="w-full h-full object-cover" />
                </div>
                <div class="flex-1 min-w-0">
                  <div class="flex items-center justify-between">
                    <h3 class="font-semibold text-slate-900 truncate">{{ ad.title }}</h3>
                    <span class="ml-2 text-xs px-2 py-1 rounded-full" :class="getStatusClass(ad.status)">{{ getStatusText(ad.status) }}</span>
                  </div>
                  <div class="text-sm text-slate-500 truncate">{{ ad.description }}</div>
                  <div class="text-xs text-slate-400 mt-1">{{ formatDate(ad.createdAt) }}</div>
                </div>
                <div class="ml-4 flex items-center space-x-2">
                  <button @click="$router.push(`/ads/${ad.id}`)" class="text-blue-600 hover:text-blue-800 text-sm">Открыть</button>
                  <button @click="$router.push(`/edit-ad/${ad.id}`)" class="text-slate-600 hover:text-slate-800 text-sm">Изменить</button>
                </div>
              </div>
            </div>
            <div v-else class="p-8 text-center text-slate-500">Нет объявлений</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../store/auth'
import api from '../services/api'

export default {
  name: 'Profile',
  setup() {
    const router = useRouter()
    const authStore = useAuthStore()

    const user = computed(() => authStore.user)
    const roleLabel = computed(() => {
      if (authStore.role === 'admin') return 'Администратор'
      if (authStore.role === 'operator') return 'Оператор'
      return 'Пользователь'
    })

    const loading = ref(false)
    const recentAds = ref([])
    const stats = ref({ total: 0, active: 0, pending: 0, rejected: 0 })

    const loadMyAds = async () => {
      loading.value = true
      try {
        const res = await api.get('/users/me/ads')
        const list = res.data || []
        stats.value.total = list.length
        stats.value.active = list.filter(a => a.status === 'active').length
        stats.value.pending = list.filter(a => a.status === 'pending').length
        stats.value.rejected = list.filter(a => a.status === 'rejected').length
        recentAds.value = list.slice(0, 5)
      } catch (e) {
        // silent
      } finally {
        loading.value = false
      }
    }

    const onLogout = () => {
      authStore.logout()
      router.push('/login')
    }

    const getStatusText = (status) => {
      switch (status) {
        case 'active': return 'Активно'
        case 'pending': return 'Модерация'
        case 'rejected': return 'Отклонено'
        case 'blocked': return 'Заблокировано'
        default: return status
      }
    }

    const getStatusClass = (status) => {
      switch (status) {
        case 'active': return 'bg-green-100 text-green-800'
        case 'pending': return 'bg-yellow-100 text-yellow-800'
        case 'rejected': return 'bg-red-100 text-red-800'
        case 'blocked': return 'bg-gray-100 text-gray-800'
        default: return 'bg-gray-100 text-gray-800'
      }
    }

    const formatDate = (dateString) => {
      const d = new Date(dateString)
      return d.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short', year: 'numeric' })
    }

    onMounted(() => {
      // ensure user loaded
      if (!authStore.user && authStore.token) {
        authStore.fetchUser().finally(loadMyAds)
      } else {
        loadMyAds()
      }
    })

    return {
      user,
      roleLabel,
      loading,
      stats,
      recentAds,
      onLogout,
      getStatusText,
      getStatusClass,
      formatDate,
    }
  }
}
</script>
