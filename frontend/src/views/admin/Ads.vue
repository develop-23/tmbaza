<template>
  <div class="p-4 sm:p-6 lg:p-8 space-y-6">
    <!-- Header Section -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 class="text-2xl sm:text-3xl font-bold text-slate-900">Управление объявлениями</h1>
        <p class="text-slate-600 mt-1">Модерация и управление всеми объявлениями</p>
      </div>
      <div class="flex items-center space-x-3">
        <button 
          @click="refreshAds" 
          class="btn-secondary"
          :disabled="loading"
        >
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
          </svg>
          Обновить
        </button>
        <button 
          @click="exportAds" 
          class="btn-primary"
        >
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
          </svg>
          Экспорт
        </button>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-2 lg:grid-cols-5 gap-4">
      <div class="card p-4">
        <div class="flex items-center">
          <div class="p-2 bg-blue-100 rounded-lg">
            <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
            </svg>
          </div>
          <div class="ml-3">
            <p class="text-sm text-slate-600">Всего</p>
            <p class="text-xl font-bold text-slate-900">{{ stats.total }}</p>
          </div>
        </div>
      </div>
      
      <div class="card p-4">
        <div class="flex items-center">
          <div class="p-2 bg-amber-100 rounded-lg">
            <svg class="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
          <div class="ml-3">
            <p class="text-sm text-slate-600">На модерации</p>
            <p class="text-xl font-bold text-slate-900">{{ stats.pending }}</p>
          </div>
        </div>
      </div>
      
      <div class="card p-4">
        <div class="flex items-center">
          <div class="p-2 bg-green-100 rounded-lg">
            <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
          <div class="ml-3">
            <p class="text-sm text-slate-600">Одобрено</p>
            <p class="text-xl font-bold text-slate-900">{{ stats.approved }}</p>
          </div>
        </div>
      </div>
      
      <div class="card p-4">
        <div class="flex items-center">
          <div class="p-2 bg-red-100 rounded-lg">
            <svg class="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </div>
          <div class="ml-3">
            <p class="text-sm text-slate-600">Отклонено</p>
            <p class="text-xl font-bold text-slate-900">{{ stats.rejected }}</p>
          </div>
        </div>
      </div>
      
      <div class="card p-4">
        <div class="flex items-center">
          <div class="p-2 bg-purple-100 rounded-lg">
            <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
            </svg>
          </div>
          <div class="ml-3">
            <p class="text-sm text-slate-600">VIP</p>
            <p class="text-xl font-bold text-slate-900">{{ stats.vip }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick Actions for Pending Ads -->
    <div v-if="pendingAds.length > 0" class="card p-6">
      <div class="flex items-center justify-between mb-4">
        <div>
          <h3 class="text-lg font-semibold text-slate-900">Требует модерации</h3>
          <p class="text-sm text-slate-600">{{ pendingAds.length }} объявлений ожидают вашего решения</p>
        </div>
        <div class="flex space-x-2">
          <button @click="approveAllPending" class="btn-success text-sm">
            Одобрить все
          </button>
          <button @click="rejectAllPending" class="btn-danger text-sm">
            Отклонить все
          </button>
        </div>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div 
          v-for="ad in pendingAds.slice(0, 6)" 
          :key="ad.id" 
          class="border border-amber-200 rounded-xl p-4 bg-amber-50"
        >
          <div class="flex items-start justify-between mb-3">
            <div class="flex-1">
              <h4 class="font-medium text-slate-900 line-clamp-2">{{ ad.title }}</h4>
              <p class="text-sm text-slate-600 mt-1">{{ ad.user?.name || 'Неизвестно' }}</p>
            </div>
            <span class="badge badge-warning text-xs">На модерации</span>
          </div>
          
          <div class="flex space-x-2">
            <button 
              @click="moderateAd(ad, 'approve')"
              class="flex-1 bg-green-600 hover:bg-green-700 text-white text-xs py-2 px-3 rounded-lg transition-colors"
            >
              Одобрить
            </button>
            <button 
              @click="moderateAd(ad, 'reject')"
              class="flex-1 bg-red-600 hover:bg-red-700 text-white text-xs py-2 px-3 rounded-lg transition-colors"
            >
              Отклонить
            </button>
          </div>
        </div>
      </div>
      
      <div v-if="pendingAds.length > 6" class="mt-4 text-center">
        <button @click="showAllPending = true" class="text-blue-600 hover:text-blue-700 text-sm font-medium">
          Показать все {{ pendingAds.length }} объявлений →
        </button>
      </div>
    </div>

    <!-- Filters -->
    <div class="card p-4 sm:p-6">
      <h3 class="text-lg font-semibold text-slate-900 mb-4">Фильтры и поиск</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div class="form-group">
          <label class="form-label">Поиск</label>
          <input
            v-model="filters.search"
            type="text"
            placeholder="Название объявления"
            class="input-field"
          >
        </div>
        <div class="form-group">
          <label class="form-label">Статус</label>
          <select v-model="filters.status" class="input-field">
            <option value="">Все статусы</option>
            <option value="pending">На модерации</option>
            <option value="approved">Одобрено</option>
            <option value="rejected">Отклонено</option>
            <option value="blocked">Заблокировано</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Категория</label>
          <select v-model="filters.categoryId" class="input-field">
            <option value="">Все категории</option>
            <option v-for="category in categories" :key="category.id" :value="category.id">
              {{ category.name }}
            </option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Тип</label>
          <select v-model="filters.vip" class="input-field">
            <option value="">Все типы</option>
            <option value="true">VIP</option>
            <option value="false">Обычные</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">&nbsp;</label>
          <button @click="loadAds" class="btn-primary w-full">
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
            Найти
          </button>
        </div>
      </div>
    </div>

    <!-- Ads Table - Desktop -->
    <div class="hidden lg:block table-container">
      <table class="table">
        <thead>
          <tr>
            <th>Объявление</th>
            <th>Пользователь</th>
            <th>Категория</th>
            <th>Статус</th>
            <th>Тип</th>
            <th>Дата создания</th>
            <th class="text-right">Действия</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="ad in filteredAds" :key="ad.id" class="animate-fade-in-up">
            <td>
              <div class="flex items-center space-x-3">
                <div class="w-12 h-12 bg-slate-200 rounded-lg flex-shrink-0 overflow-hidden">
                  <img 
                    v-if="ad.images && ad.images.length > 0" 
                    :src="getImageUrl(ad.images[0])" 
                    :alt="ad.title"
                    class="w-full h-full object-cover"
                  >
                  <div v-else class="w-full h-full flex items-center justify-center">
                    <svg class="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                    </svg>
                  </div>
                </div>
                <div class="flex-1 min-w-0">
                  <div class="font-medium text-slate-900 line-clamp-2">{{ ad.title }}</div>
                  <div class="text-sm text-slate-500 line-clamp-1">{{ ad.description }}</div>
                </div>
              </div>
            </td>
            <td>
              <div class="flex items-center space-x-2">
                <div class="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span class="text-xs font-semibold text-white">
                    {{ ad.user?.name?.charAt(0)?.toUpperCase() || '?' }}
                  </span>
                </div>
                <div>
                  <div class="font-medium text-slate-900">{{ ad.user?.name || 'Неизвестно' }}</div>
                  <div class="text-xs text-slate-500">{{ ad.user?.email || '' }}</div>
                </div>
              </div>
            </td>
            <td>
              <span class="text-sm text-slate-600">{{ ad.category?.name || 'Без категории' }}</span>
            </td>
            <td>
              <span :class="getStatusClass(ad.status)">
                {{ getStatusText(ad.status) }}
              </span>
            </td>
            <td>
              <span v-if="ad.vip" class="badge badge-info">VIP</span>
              <span v-else class="text-sm text-slate-500">Обычное</span>
            </td>
            <td>
              <span class="text-sm text-slate-600">{{ formatDate(ad.createdAt) }}</span>
            </td>
            <td class="text-right">
              <div class="flex items-center justify-end space-x-2">
                <button 
                  @click="viewAd(ad)" 
                  class="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  title="Просмотр"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                  </svg>
                </button>
                <button 
                  v-if="ad.status === 'pending'"
                  @click="moderateAd(ad, 'approve')" 
                  class="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                  title="Одобрить"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                  </svg>
                </button>
                <button 
                  v-if="ad.status === 'pending'"
                  @click="moderateAd(ad, 'reject')" 
                  class="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Отклонить"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                </button>
                <button 
                  @click="blockAd(ad)" 
                  class="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Заблокировать"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636M5.636 18.364l12.728-12.728"/>
                  </svg>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Ads Cards - Mobile -->
    <div class="lg:hidden space-y-4">
      <div 
        v-for="ad in filteredAds" 
        :key="ad.id" 
        class="card card-interactive p-4 animate-fade-in-up"
      >
        <div class="flex space-x-3">
          <div class="w-16 h-16 bg-slate-200 rounded-lg flex-shrink-0 overflow-hidden">
            <img 
              v-if="ad.images && ad.images.length > 0" 
              :src="getImageUrl(ad.images[0])" 
              :alt="ad.title"
              class="w-full h-full object-cover"
            >
            <div v-else class="w-full h-full flex items-center justify-center">
              <svg class="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
              </svg>
            </div>
          </div>
          
          <div class="flex-1 min-w-0">
            <div class="flex items-start justify-between">
              <div class="flex-1">
                <h3 class="font-medium text-slate-900 line-clamp-2">{{ ad.title }}</h3>
                <p class="text-sm text-slate-500 mt-1">{{ ad.user?.name || 'Неизвестно' }}</p>
              </div>
              <div class="ml-2 flex flex-col items-end space-y-1">
                <span :class="getStatusClass(ad.status) + ' text-xs'">
                  {{ getStatusText(ad.status) }}
                </span>
                <span v-if="ad.vip" class="badge badge-info text-xs">VIP</span>
              </div>
            </div>
            
            <div class="flex items-center justify-between mt-3">
              <span class="text-xs text-slate-500">{{ formatDate(ad.createdAt) }}</span>
              <div class="flex space-x-1">
                <button 
                  @click="viewAd(ad)" 
                  class="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                  </svg>
                </button>
                <button 
                  v-if="ad.status === 'pending'"
                  @click="moderateAd(ad, 'approve')" 
                  class="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                  </svg>
                </button>
                <button 
                  v-if="ad.status === 'pending'"
                  @click="moderateAd(ad, 'reject')" 
                  class="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="filteredAds.length === 0 && !loading" class="card p-8 text-center">
      <div class="w-16 h-16 mx-auto bg-slate-100 rounded-full flex items-center justify-center mb-4">
        <svg class="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
        </svg>
      </div>
      <h3 class="text-lg font-medium text-slate-900 mb-2">Объявления не найдены</h3>
      <p class="text-slate-600">Попробуйте изменить параметры поиска или проверьте позже.</p>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="card p-8 text-center">
      <div class="w-8 h-8 mx-auto spinner mb-4"></div>
      <p class="text-slate-600">Загрузка объявлений...</p>
    </div>

    <!-- Moderation Modal -->
    <div v-if="showModerationModal" class="modal-overlay" @click="showModerationModal = false">
      <div class="modal-content" @click.stop>
        <div class="p-6">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-xl font-bold text-slate-900">
              {{ moderationAction === 'reject' ? 'Отклонить объявление' : 'Одобрить объявление' }}
            </h2>
            <button 
              @click="showModerationModal = false"
              class="p-2 text-slate-400 hover:text-slate-600 rounded-lg transition-colors"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
          
          <div class="mb-4">
            <h3 class="font-medium text-slate-900">{{ currentAd?.title }}</h3>
            <p class="text-sm text-slate-600">{{ currentAd?.user?.name }}</p>
          </div>
          
          <form @submit.prevent="confirmModeration" class="space-y-4">
            <div v-if="moderationAction === 'reject'" class="form-group">
              <label class="form-label">Причина отклонения</label>
              <textarea
                v-model="rejectionReason"
                class="input-field"
                rows="3"
                placeholder="Укажите причину отклонения объявления..."
                required
              ></textarea>
            </div>
            
            <div class="flex items-center space-x-3 pt-4">
              <button 
                type="submit" 
                :class="moderationAction === 'reject' ? 'btn-danger' : 'btn-success'"
                class="flex-1"
              >
                {{ moderationAction === 'reject' ? 'Отклонить' : 'Одобрить' }}
              </button>
              <button 
                type="button" 
                @click="showModerationModal = false" 
                class="btn-secondary flex-1"
              >
                Отмена
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import api from '../../services/api'

export default {
  name: 'AdminAds',
  setup() {
    const ads = ref([])
    const categories = ref([])
    const loading = ref(false)
    const showModerationModal = ref(false)
    const showAllPending = ref(false)
    const currentAd = ref(null)
    const moderationAction = ref('')
    const rejectionReason = ref('')
    
    const filters = ref({
      search: '',
      status: '',
      categoryId: '',
      vip: ''
    })

    const stats = computed(() => {
      const total = ads.value.length
      const pending = ads.value.filter(ad => ad.status === 'pending').length
      const approved = ads.value.filter(ad => ad.status === 'approved').length
      const rejected = ads.value.filter(ad => ad.status === 'rejected').length
      const vip = ads.value.filter(ad => ad.vip).length
      
      return { total, pending, approved, rejected, vip }
    })

    const pendingAds = computed(() => 
      ads.value.filter(ad => ad.status === 'pending')
    )

    const filteredAds = computed(() => {
      let filtered = ads.value
      
      if (filters.value.search) {
        const search = filters.value.search.toLowerCase()
        filtered = filtered.filter(ad => 
          ad.title?.toLowerCase().includes(search)
        )
      }
      
      if (filters.value.status) {
        filtered = filtered.filter(ad => ad.status === filters.value.status)
      }
      
      if (filters.value.categoryId) {
        filtered = filtered.filter(ad => ad.categoryId === parseInt(filters.value.categoryId))
      }
      
      if (filters.value.vip !== '') {
        filtered = filtered.filter(ad => ad.vip === (filters.value.vip === 'true'))
      }
      
      return filtered
    })

    const loadAds = async () => {
      try {
        loading.value = true
        const params = new URLSearchParams()
        if (filters.value.search) params.append('search', filters.value.search)
        if (filters.value.status) params.append('status', filters.value.status)
        if (filters.value.categoryId) params.append('categoryId', filters.value.categoryId)
        if (filters.value.vip) params.append('vip', filters.value.vip)

        const response = await api.get(`/admin/ads?${params}`)
        ads.value = response.data.rows || response.data
      } catch (error) {
        console.error('Failed to load ads:', error)
      } finally {
        loading.value = false
      }
    }

    const loadCategories = async () => {
      try {
        const response = await api.get('/categories')
        categories.value = response.data
      } catch (error) {
        console.error('Failed to load categories:', error)
      }
    }

    const moderateAd = (ad, action) => {
      currentAd.value = ad
      moderationAction.value = action
      showModerationModal.value = true
      rejectionReason.value = ''
    }

    const confirmModeration = async () => {
      try {
        const payload = { 
          action: moderationAction.value === 'approve' ? 'approve' : 'reject'
        }
        
        if (moderationAction.value === 'reject') {
          payload.reason = rejectionReason.value
        }

        await api.post(`/ads/${currentAd.value.id}/moderate`, payload)
        
        showModerationModal.value = false
        await loadAds()
      } catch (error) {
        console.error('Failed to moderate ad:', error)
      }
    }

    const viewAd = (ad) => {
      window.open(`/ads/${ad.id}`, '_blank')
    }

    const blockAd = async (ad) => {
      if (confirm('Вы уверены, что хотите заблокировать это объявление?')) {
        try {
          await api.post(`/ads/${ad.id}/moderate`, { action: 'block' })
          await loadAds()
        } catch (error) {
          console.error('Failed to block ad:', error)
        }
      }
    }

    const refreshAds = () => {
      loadAds()
    }

    const exportAds = () => {
      // Implementation for exporting ads
      console.log('Export functionality to be implemented')
    }

    const approveAllPending = async () => {
      if (confirm(`Одобрить все ${pendingAds.value.length} объявлений?`)) {
        try {
          await Promise.all(
            pendingAds.value.map(ad => 
              api.post(`/ads/${ad.id}/moderate`, { action: 'approve' })
            )
          )
          await loadAds()
        } catch (error) {
          console.error('Failed to approve all ads:', error)
        }
      }
    }

    const rejectAllPending = async () => {
      const reason = prompt('Причина отклонения всех объявлений:')
      if (reason && confirm(`Отклонить все ${pendingAds.value.length} объявлений?`)) {
        try {
          await Promise.all(
            pendingAds.value.map(ad => 
              api.post(`/ads/${ad.id}/moderate`, { action: 'reject', reason })
            )
          )
          await loadAds()
        } catch (error) {
          console.error('Failed to reject all ads:', error)
        }
      }
    }

    const getStatusText = (status) => {
      switch (status) {
        case 'pending': return 'На модерации'
        case 'approved': return '��добрено'
        case 'rejected': return 'Отклонено'
        case 'blocked': return 'Заблокировано'
        default: return status
      }
    }

    const getStatusClass = (status) => {
      switch (status) {
        case 'pending': return 'badge badge-warning'
        case 'approved': return 'badge badge-success'
        case 'rejected': return 'badge badge-danger'
        case 'blocked': return 'badge badge-neutral'
        default: return 'badge badge-neutral'
      }
    }

    const getImageUrl = (imagePath) => {
      if (imagePath?.startsWith('http')) return imagePath
      return `/uploads/${imagePath}`
    }

    const formatDate = (dateString) => {
      if (!dateString) return 'Неизвестно'
      return new Date(dateString).toLocaleDateString('ru-RU')
    }

    onMounted(() => {
      loadAds()
      loadCategories()
    })

    return {
      ads,
      categories,
      filteredAds,
      pendingAds,
      stats,
      loading,
      showModerationModal,
      showAllPending,
      currentAd,
      moderationAction,
      rejectionReason,
      filters,
      loadAds,
      moderateAd,
      confirmModeration,
      viewAd,
      blockAd,
      refreshAds,
      exportAds,
      approveAllPending,
      rejectAllPending,
      getStatusText,
      getStatusClass,
      getImageUrl,
      formatDate
    }
  }
}
</script>
