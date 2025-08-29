<template>
  <div class="p-4 sm:p-6 lg:p-8 space-y-6">
    <!-- Header Section -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 class="text-2xl sm:text-3xl font-bold text-slate-900">Управление баннерами</h1>
        <p class="text-slate-600 mt-1">Создание и управление рекламными баннерами</p>
      </div>
      <button 
        @click="showCreateModal = true"
        class="btn-primary w-full sm:w-auto"
      >
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
        </svg>
        Создать баннер
      </button>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="card p-4">
        <div class="flex items-center">
          <div class="p-2 bg-blue-100 rounded-lg">
            <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
            </svg>
          </div>
          <div class="ml-3">
            <p class="text-sm text-slate-600">Всего баннеров</p>
            <p class="text-xl font-bold text-slate-900">{{ banners.length }}</p>
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
            <p class="text-sm text-slate-600">Активные</p>
            <p class="text-xl font-bold text-slate-900">{{ activeBanners }}</p>
          </div>
        </div>
      </div>
      
      <div class="card p-4">
        <div class="flex items-center">
          <div class="p-2 bg-purple-100 rounded-lg">
            <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2h4a1 1 0 011 1v14a1 1 0 01-1 1H3a1 1 0 01-1-1V5a1 1 0 011-1h4z"/>
            </svg>
          </div>
          <div class="ml-3">
            <p class="text-sm text-slate-600">Верхние</p>
            <p class="text-xl font-bold text-slate-900">{{ topBanners }}</p>
          </div>
        </div>
      </div>
      
      <div class="card p-4">
        <div class="flex items-center">
          <div class="p-2 bg-amber-100 rounded-lg">
            <svg class="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
          <div class="ml-3">
            <p class="text-sm text-slate-600">Нижние</p>
            <p class="text-xl font-bold text-slate-900">{{ bottomBanners }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Search and Filters -->
    <div class="card p-4 sm:p-6">
      <h3 class="text-lg font-semibold text-slate-900 mb-4">Фильтры</h3>
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div class="form-group">
          <label class="form-label">Поиск</label>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Заголовок баннера"
            class="input-field"
          >
        </div>
        <div class="form-group">
          <label class="form-label">Статус</label>
          <select v-model="statusFilter" class="input-field">
            <option value="">Все баннеры</option>
            <option value="active">Активные</option>
            <option value="inactive">Неактивные</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Позиция</label>
          <select v-model="positionFilter" class="input-field">
            <option value="">Все позиции</option>
            <option value="top">Верхние</option>
            <option value="bottom">Нижние</option>
            <option value="sidebar">Боковые</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">&nbsp;</label>
          <button @click="clearFilters" class="btn-secondary w-full">
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
            </svg>
            Сбросить
          </button>
        </div>
      </div>
    </div>

    <!-- Banners Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      <div 
        v-for="banner in filteredBanners" 
        :key="banner.id" 
        class="card overflow-hidden hover:shadow-lg transition-all duration-300 animate-fade-in-up"
      >
        <!-- Banner Image -->
        <div class="aspect-video bg-slate-200 relative overflow-hidden">
          <img 
            v-if="banner.imageUrl || banner.image"
            :src="getBannerImageUrl(banner.imageUrl || banner.image)" 
            :alt="banner.title"
            class="w-full h-full object-cover"
          >
          <div v-else class="w-full h-full flex items-center justify-center">
            <svg class="w-12 h-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
            </svg>
          </div>
          
          <!-- Status Badge -->
          <div class="absolute top-2 left-2">
            <span v-if="banner.active" class="badge badge-success">Активен</span>
            <span v-else class="badge badge-neutral">Неактивен</span>
          </div>
          
          <!-- Position Badge -->
          <div class="absolute top-2 right-2">
            <span :class="getPositionClass(banner.position)">
              {{ getPositionText(banner.position) }}
            </span>
          </div>
        </div>
        
        <!-- Banner Info -->
        <div class="p-4">
          <div class="flex items-start justify-between mb-3">
            <div class="flex-1 min-w-0">
              <h3 class="font-medium text-slate-900 line-clamp-2">{{ banner.title || 'Без названия' }}</h3>
              <p class="text-sm text-slate-500 mt-1 line-clamp-1">{{ banner.description || 'Без описания' }}</p>
            </div>
          </div>
          
          <div class="flex items-center justify-between text-sm text-slate-600 mb-3">
            <span>Порядок: {{ banner.sortOrder || 0 }}</span>
            <span v-if="banner.link" class="flex items-center">
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
              </svg>
              Ссылка
            </span>
          </div>
          
          <!-- Actions -->
          <div class="flex items-center space-x-2">
            <button 
              @click="editBanner(banner)" 
              class="flex-1 btn-secondary text-sm py-2"
            >
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
              </svg>
              Редактировать
            </button>
            <button 
              @click="toggleBannerStatus(banner)" 
              :class="banner.active ? 'btn-warning' : 'btn-success'"
              class="text-sm py-2 px-3"
              :title="banner.active ? 'Деактивировать' : 'Активировать'"
            >
              <svg v-if="banner.active" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636M5.636 18.364l12.728-12.728"/>
              </svg>
              <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </button>
            <button 
              @click="deleteBanner(banner)" 
              class="btn-danger text-sm py-2 px-3"
              title="Удалить"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="filteredBanners.length === 0" class="card p-8 text-center">
      <div class="w-16 h-16 mx-auto bg-slate-100 rounded-full flex items-center justify-center mb-4">
        <svg class="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
        </svg>
      </div>
      <h3 class="text-lg font-medium text-slate-900 mb-2">Баннеры не найдены</h3>
      <p class="text-slate-600 mb-4">Создайте первый баннер для начала работы.</p>
      <button @click="showCreateModal = true" class="btn-primary">
        Создать баннер
      </button>
    </div>

    <!-- Create/Edit Modal -->
    <div v-if="showCreateModal" class="modal-overlay" @click="showCreateModal = false">
      <div class="modal-content max-w-lg" @click.stop>
        <div class="p-6">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-xl font-bold text-slate-900">
              {{ editingBanner ? 'Редактировать баннер' : 'Создать баннер' }}
            </h2>
            <button 
              @click="showCreateModal = false"
              class="p-2 text-slate-400 hover:text-slate-600 rounded-lg transition-colors"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
          
          <form @submit.prevent="saveBanner" class="space-y-4">
            <div class="form-group">
              <label class="form-label">Заголовок баннера</label>
              <input
                v-model="bannerForm.title"
                type="text"
                class="input-field"
                placeholder="Введите заголов��к баннера"
                required
              >
            </div>
            
            <div class="form-group">
              <label class="form-label">Описание</label>
              <textarea
                v-model="bannerForm.description"
                class="input-field"
                rows="3"
                placeholder="Краткое описание баннера"
              ></textarea>
            </div>
            
            <div class="form-group">
              <label class="form-label">Изображение</label>
              <input
                ref="imageInput"
                type="file"
                accept="image/*"
                @change="handleImageUpload"
                class="input-field"
              >
              <p class="text-xs text-slate-500 mt-1">Рекомендуемый размер: 1200x400px</p>
            </div>
            
            <div class="form-group">
              <label class="form-label">Ссылка</label>
              <input
                v-model="bannerForm.link"
                type="url"
                class="input-field"
                placeholder="https://example.com"
              >
            </div>
            
            <div class="grid grid-cols-2 gap-4">
              <div class="form-group">
                <label class="form-label">Позиция</label>
                <select v-model="bannerForm.position" class="input-field" required>
                  <option value="top">Верх страницы</option>
                  <option value="bottom">Низ страницы</option>
                  <option value="sidebar">Боковая панель</option>
                </select>
              </div>
              
              <div class="form-group">
                <label class="form-label">Порядок</label>
                <input
                  v-model.number="bannerForm.sortOrder"
                  type="number"
                  class="input-field"
                  placeholder="0"
                  min="0"
                >
              </div>
            </div>
            
            <div class="form-group">
              <label class="flex items-center">
                <input
                  v-model="bannerForm.active"
                  type="checkbox"
                  class="rounded border-slate-300 text-blue-600 focus:ring-blue-500 mr-2"
                >
                <span class="form-label mb-0">Активный баннер</span>
              </label>
            </div>
            
            <div class="flex items-center space-x-3 pt-4">
              <button type="submit" class="btn-primary flex-1">
                {{ editingBanner ? 'Сохранить' : 'Создать' }}
              </button>
              <button 
                type="button" 
                @click="showCreateModal = false" 
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
  name: 'AdminBanners',
  setup() {
    const banners = ref([])
    const showCreateModal = ref(false)
    const editingBanner = ref(null)
    const searchQuery = ref('')
    const statusFilter = ref('')
    const positionFilter = ref('')
    const imageInput = ref(null)
    
    const bannerForm = ref({
      title: '',
      description: '',
      link: '',
      position: 'top',
      sortOrder: 0,
      active: true
    })

    const activeBanners = computed(() => 
      banners.value.filter(banner => banner.active).length
    )

    const topBanners = computed(() => 
      banners.value.filter(banner => banner.position === 'top').length
    )

    const bottomBanners = computed(() => 
      banners.value.filter(banner => banner.position === 'bottom').length
    )

    const filteredBanners = computed(() => {
      let filtered = banners.value
      
      if (searchQuery.value) {
        const search = searchQuery.value.toLowerCase()
        filtered = filtered.filter(banner => 
          banner.title?.toLowerCase().includes(search) ||
          banner.description?.toLowerCase().includes(search)
        )
      }
      
      if (statusFilter.value) {
        filtered = filtered.filter(banner => 
          statusFilter.value === 'active' ? banner.active : !banner.active
        )
      }
      
      if (positionFilter.value) {
        filtered = filtered.filter(banner => banner.position === positionFilter.value)
      }
      
      return filtered.sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0))
    })

    const loadBanners = async () => {
      try {
        const response = await api.get('/admin/banners')
        banners.value = response.data
      } catch (error) {
        console.error('Failed to load banners:', error)
      }
    }

    const editBanner = (banner) => {
      editingBanner.value = banner
      bannerForm.value = {
        title: banner.title || '',
        description: banner.description || '',
        link: banner.link || '',
        position: banner.position || 'top',
        sortOrder: banner.sortOrder || 0,
        active: banner.active
      }
      showCreateModal.value = true
    }

    const handleImageUpload = (event) => {
      const file = event.target.files[0]
      if (file) {
        bannerForm.value.image = file
      }
    }

    const saveBanner = async () => {
      try {
        const formData = new FormData()
        Object.keys(bannerForm.value).forEach(key => {
          if (bannerForm.value[key] !== null && bannerForm.value[key] !== undefined) {
            formData.append(key, bannerForm.value[key])
          }
        })

        if (editingBanner.value) {
          await api.put(`/admin/banners/${editingBanner.value.id}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
          })
        } else {
          await api.post('/admin/banners', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
          })
        }
        
        showCreateModal.value = false
        editingBanner.value = null
        bannerForm.value = { title: '', description: '', link: '', position: 'top', sortOrder: 0, active: true }
        if (imageInput.value) imageInput.value.value = ''
        await loadBanners()
      } catch (error) {
        console.error('Failed to save banner:', error)
      }
    }

    const toggleBannerStatus = async (banner) => {
      try {
        await api.put(`/admin/banners/${banner.id}`, {
          ...banner,
          active: !banner.active
        })
        await loadBanners()
      } catch (error) {
        console.error('Failed to toggle banner status:', error)
      }
    }

    const deleteBanner = async (banner) => {
      if (confirm(`Вы уверены, что хотите удалить баннер "${banner.title}"?`)) {
        try {
          await api.delete(`/admin/banners/${banner.id}`)
          await loadBanners()
        } catch (error) {
          console.error('Failed to delete banner:', error)
        }
      }
    }

    const clearFilters = () => {
      searchQuery.value = ''
      statusFilter.value = ''
      positionFilter.value = ''
    }

    const getBannerImageUrl = (imagePath) => {
      if (!imagePath) return ''
      if (imagePath.startsWith('http')) return imagePath
      return `/uploads/${imagePath}`
    }

    const getPositionText = (position) => {
      switch (position) {
        case 'top': return 'Верх'
        case 'bottom': return 'Низ'
        case 'sidebar': return 'Сбоку'
        default: return position
      }
    }

    const getPositionClass = (position) => {
      switch (position) {
        case 'top': return 'badge badge-info'
        case 'bottom': return 'badge badge-warning'
        case 'sidebar': return 'badge badge-neutral'
        default: return 'badge badge-neutral'
      }
    }

    onMounted(() => {
      loadBanners()
    })

    return {
      banners,
      filteredBanners,
      activeBanners,
      topBanners,
      bottomBanners,
      showCreateModal,
      editingBanner,
      searchQuery,
      statusFilter,
      positionFilter,
      bannerForm,
      imageInput,
      loadBanners,
      editBanner,
      handleImageUpload,
      saveBanner,
      toggleBannerStatus,
      deleteBanner,
      clearFilters,
      getBannerImageUrl,
      getPositionText,
      getPositionClass
    }
  }
}
</script>
