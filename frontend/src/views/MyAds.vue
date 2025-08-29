<template>
  <div class="p-4 pb-20">
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-bold">Мои объявления</h1>
      <router-link 
        to="/create-ad"
        class="btn-primary"
      >
        Создать
      </router-link>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-3 gap-4 mb-6">
      <div class="bg-white rounded-lg p-4 text-center">
        <div class="text-2xl font-bold text-blue-600">{{ stats.total }}</div>
        <div class="text-sm text-gray-600">Всего</div>
      </div>
      <div class="bg-white rounded-lg p-4 text-center">
        <div class="text-2xl font-bold text-green-600">{{ stats.active }}</div>
        <div class="text-sm text-gray-600">Активные</div>
      </div>
      <div class="bg-white rounded-lg p-4 text-center">
        <div class="text-2xl font-bold text-yellow-600">{{ stats.pending }}</div>
        <div class="text-sm text-gray-600">На модерации</div>
      </div>
    </div>

    <!-- Filter Tabs -->
    <div class="flex mb-4 bg-gray-100 rounded-lg p-1">
      <button 
        @click="currentFilter = 'all'"
        class="flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors"
        :class="currentFilter === 'all' ? 'bg-white text-gray-900 shadow' : 'text-gray-600'"
      >
        Все
      </button>
      <button 
        @click="currentFilter = 'active'"
        class="flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors"
        :class="currentFilter === 'active' ? 'bg-white text-gray-900 shadow' : 'text-gray-600'"
      >
        Активные
      </button>
      <button 
        @click="currentFilter = 'pending'"
        class="flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors"
        :class="currentFilter === 'pending' ? 'bg-white text-gray-900 shadow' : 'text-gray-600'"
      >
        Модерация
      </button>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="flex justify-center py-8">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
    </div>

    <!-- Ads List -->
    <div v-else class="space-y-4">
      <div 
        v-for="ad in filteredAds" 
        :key="ad.id"
        class="bg-white rounded-lg overflow-hidden shadow-sm border"
      >
        <div class="flex">
          <!-- Image -->
          <div class="w-24 h-24 flex-shrink-0">
            <img 
              v-if="ad.images && ad.images.length > 0"
              :src="ad.images[0]" 
              :alt="ad.title"
              class="w-full h-full object-cover"
            >
            <div 
              v-else 
              class="w-full h-full bg-gray-200 flex items-center justify-center"
            >
              <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>

          <!-- Content -->
          <div class="flex-1 p-4">
            <div class="flex items-start justify-between mb-2">
              <h3 class="font-semibold text-gray-900 line-clamp-1">{{ ad.title }}</h3>
              <div class="flex items-center ml-2">
                <span 
                  v-if="ad.vip" 
                  class="bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-1 rounded mr-2"
                >
                  VIP
                </span>
                <span 
                  class="text-xs font-medium px-2 py-1 rounded"
                  :class="getStatusClass(ad.status)"
                >
                  {{ getStatusText(ad.status) }}
                </span>
              </div>
            </div>
            
            <p class="text-gray-600 text-sm line-clamp-1 mb-2">{{ ad.description }}</p>
            
            <div class="flex items-center justify-between text-sm">
              <span class="text-gray-500">{{ formatDate(ad.createdAt) }}</span>
              <div class="flex space-x-2">
                <button 
                  @click="$router.push(`/ads/${ad.id}`)"
                  class="text-blue-600 hover:text-blue-800"
                >
                  Просмотр
                </button>
                <button 
                  v-if="ad.status === 'active'"
                  @click="$router.push(`/edit-ad/${ad.id}`)"
                  class="text-green-600 hover:text-green-800"
                >
                  Изменить
                </button>
                <button 
                  @click="confirmDelete(ad)"
                  class="text-red-600 hover:text-red-800"
                >
                  Удалить
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- No Results -->
    <div v-if="!loading && filteredAds.length === 0" class="text-center py-12">
      <svg class="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
      <h3 class="text-lg font-medium text-gray-900 mb-2">Объявлений не найдено</h3>
      <p class="text-gray-500 mb-4">Создайте свое первое объявление</p>
      <router-link 
        to="/create-ad"
        class="btn-primary"
      >
        Создать объявление
      </router-link>
    </div>

    <!-- Delete Confirmation Modal -->
    <div 
      v-if="showDeleteModal" 
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
    >
      <div class="bg-white rounded-lg p-6 max-w-sm w-full">
        <h3 class="text-lg font-semibold mb-4">Удалить объявление?</h3>
        <p class="text-gray-600 mb-4">Это действие нельзя отменить.</p>
        <div class="flex space-x-3">
          <button 
            @click="deleteAd"
            class="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-red-700"
          >
            Удалить
          </button>
          <button 
            @click="showDeleteModal = false"
            class="flex-1 btn-secondary"
          >
            Отмена
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useToast } from 'vue-toastification'
import api from '../services/api'

export default {
  name: 'MyAds',
  setup() {
    const toast = useToast()
    
    const loading = ref(false)
    const ads = ref([])
    const currentFilter = ref('all')
    const showDeleteModal = ref(false)
    const adToDelete = ref(null)

    const stats = computed(() => ({
      total: ads.value.length,
      active: ads.value.filter(ad => ad.status === 'active').length,
      pending: ads.value.filter(ad => ad.status === 'pending').length
    }))

    const filteredAds = computed(() => {
      if (currentFilter.value === 'all') return ads.value
      return ads.value.filter(ad => ad.status === currentFilter.value)
    })

    const loadAds = async () => {
      loading.value = true
      
      try {
        const response = await api.get('/users/me/ads')
        ads.value = response.data
      } catch (error) {
        console.error('Failed to load ads:', error)
      } finally {
        loading.value = false
      }
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

    const confirmDelete = (ad) => {
      adToDelete.value = ad
      showDeleteModal.value = true
    }

    const deleteAd = async () => {
      try {
        await api.delete(`/ads/${adToDelete.value.id}`)
        ads.value = ads.value.filter(ad => ad.id !== adToDelete.value.id)
        toast.success('Объявление удалено')
        showDeleteModal.value = false
        adToDelete.value = null
      } catch (error) {
        toast.error('Не удалось удалить объявление')
      }
    }

    const formatDate = (dateString) => {
      const date = new Date(dateString)
      return date.toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      })
    }

    onMounted(() => {
      loadAds()
    })

    return {
      loading,
      ads,
      stats,
      currentFilter,
      filteredAds,
      showDeleteModal,
      getStatusText,
      getStatusClass,
      confirmDelete,
      deleteAd,
      formatDate
    }
  }
}
</script>

<style scoped>
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>