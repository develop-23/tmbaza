<template>
  <div class="p-4 sm:p-6 lg:p-8 space-y-6">
    <!-- Header Section -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 class="text-2xl sm:text-3xl font-bold text-slate-900">Управление блоками контента</h1>
        <p class="text-slate-600 mt-1">Создание и управление блоками для главной страницы</p>
      </div>
      <button 
        @click="showCreateModal = true"
        class="btn-primary w-full sm:w-auto"
      >
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
        </svg>
        Создать блок
      </button>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="card p-4">
        <div class="flex items-center">
          <div class="p-2 bg-blue-100 rounded-lg">
            <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
            </svg>
          </div>
          <div class="ml-3">
            <p class="text-sm text-slate-600">Всего блоков</p>
            <p class="text-xl font-bold text-slate-900">{{ blocks.length }}</p>
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
            <p class="text-xl font-bold text-slate-900">{{ activeBlocks }}</p>
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
            <p class="text-sm text-slate-600">С изображениями</p>
            <p class="text-xl font-bold text-slate-900">{{ blocksWithImages }}</p>
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
            <p class="text-sm text-slate-600">Неактивные</p>
            <p class="text-xl font-bold text-slate-900">{{ inactiveBlocks }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Search and Filters -->
    <div class="card p-4 sm:p-6">
      <h3 class="text-lg font-semibold text-slate-900 mb-4">Фильтры</h3>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="form-group">
          <label class="form-label">Поиск</label>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Заголовок блока"
            class="input-field"
          >
        </div>
        <div class="form-group">
          <label class="form-label">Статус</label>
          <select v-model="statusFilter" class="input-field">
            <option value="">Все блоки</option>
            <option value="active">Активные</option>
            <option value="inactive">Неактивные</option>
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

    <!-- Blocks List with Drag & Drop -->
    <div class="card overflow-hidden">
      <div class="px-6 py-4 border-b border-slate-200 bg-slate-50">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-semibold text-slate-900">Блоки контента</h3>
          <p class="text-sm text-slate-600">Перетащите блоки для изменения порядка</p>
        </div>
      </div>

      <div class="divide-y divide-slate-100">
        <div 
          v-for="(block, index) in filteredBlocks" 
          :key="block.id"
          class="flex items-center p-4 hover:bg-slate-50 transition-colors animate-fade-in-up"
          :style="{ animationDelay: `${index * 50}ms` }"
        >
          <!-- Drag Handle -->
          <div class="mr-4 cursor-move text-slate-400 hover:text-slate-600">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8h16M4 16h16"/>
            </svg>
          </div>
          
          <!-- Block Image -->
          <div class="w-16 h-16 bg-slate-200 rounded-lg flex-shrink-0 overflow-hidden mr-4">
            <img 
              v-if="block.imageUrl || block.image"
              :src="getBlockImageUrl(block.imageUrl || block.image)" 
              :alt="block.title"
              class="w-full h-full object-cover"
            >
            <div v-else class="w-full h-full flex items-center justify-center">
              <svg class="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
              </svg>
            </div>
          </div>
          
          <!-- Block Info -->
          <div class="flex-1 min-w-0">
            <div class="flex items-center space-x-3 mb-1">
              <h4 class="font-medium text-slate-900">{{ block.title || 'Без названия' }}</h4>
              <span v-if="block.active" class="badge badge-success text-xs">Активен</span>
              <span v-else class="badge badge-neutral text-xs">Неактиве��</span>
              <span class="text-xs text-slate-500">Порядок: {{ block.sortOrder || 0 }}</span>
            </div>
            <p class="text-sm text-slate-600 line-clamp-2">{{ block.content || 'Без содержимого' }}</p>
          </div>
          
          <!-- Actions -->
          <div class="flex items-center space-x-2 ml-4">
            <button 
              @click="editBlock(block)" 
              class="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              title="Редактировать"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
              </svg>
            </button>
            <button 
              @click="toggleBlockStatus(block)" 
              :class="block.active ? 'text-red-600 hover:bg-red-50' : 'text-green-600 hover:bg-green-50'"
              class="p-2 rounded-lg transition-colors"
              :title="block.active ? 'Деактивировать' : 'Активировать'"
            >
              <svg v-if="block.active" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636M5.636 18.364l12.728-12.728"/>
              </svg>
              <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </button>
            <button 
              @click="deleteBlock(block)" 
              class="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
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
    <div v-if="filteredBlocks.length === 0" class="card p-8 text-center">
      <div class="w-16 h-16 mx-auto bg-slate-100 rounded-full flex items-center justify-center mb-4">
        <svg class="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
        </svg>
      </div>
      <h3 class="text-lg font-medium text-slate-900 mb-2">Блоки не найдены</h3>
      <p class="text-slate-600 mb-4">Создайте первый блок для главной страницы.</p>
      <button @click="showCreateModal = true" class="btn-primary">
        Создать блок
      </button>
    </div>

    <!-- Create/Edit Modal -->
    <div v-if="showCreateModal" class="modal-overlay" @click="showCreateModal = false">
      <div class="modal-content max-w-2xl" @click.stop>
        <div class="p-6">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-xl font-bold text-slate-900">
              {{ editingBlock ? 'Редактировать блок' : 'Создать блок' }}
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
          
          <form @submit.prevent="saveBlock" class="space-y-4">
            <div class="form-group">
              <label class="form-label">Заголовок блока</label>
              <input
                v-model="blockForm.title"
                type="text"
                class="input-field"
                placeholder="Введите заголовок блока"
                required
              >
            </div>
            
            <div class="form-group">
              <label class="form-label">Содержимое</label>
              <textarea
                v-model="blockForm.content"
                class="input-field"
                rows="4"
                placeholder="Основное содержимое блока"
                required
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
              <p class="text-xs text-slate-500 mt-1">Рекомендуемый размер: 800x600px</p>
            </div>
            
            <div class="form-group">
              <label class="form-label">Ссылка</label>
              <input
                v-model="blockForm.link"
                type="url"
                class="input-field"
                placeholder="https://example.com (необязательно)"
              >
            </div>
            
            <div class="grid grid-cols-2 gap-4">
              <div class="form-group">
                <label class="form-label">Порядок отображения</label>
                <input
                  v-model.number="blockForm.sortOrder"
                  type="number"
                  class="input-field"
                  placeholder="0"
                  min="0"
                >
              </div>
              
              <div class="form-group">
                <label class="flex items-center">
                  <input
                    v-model="blockForm.active"
                    type="checkbox"
                    class="rounded border-slate-300 text-blue-600 focus:ring-blue-500 mr-2"
                  >
                  <span class="form-label mb-0">Активный блок</span>
                </label>
              </div>
            </div>
            
            <div class="flex items-center space-x-3 pt-4">
              <button type="submit" class="btn-primary flex-1">
                {{ editingBlock ? 'Сохранить' : 'Создать' }}
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
  name: 'AdminBlocks',
  setup() {
    const blocks = ref([])
    const showCreateModal = ref(false)
    const editingBlock = ref(null)
    const searchQuery = ref('')
    const statusFilter = ref('')
    const imageInput = ref(null)
    
    const blockForm = ref({
      title: '',
      content: '',
      link: '',
      sortOrder: 0,
      active: true
    })

    const activeBlocks = computed(() => 
      blocks.value.filter(block => block.active).length
    )

    const inactiveBlocks = computed(() => 
      blocks.value.filter(block => !block.active).length
    )

    const blocksWithImages = computed(() => 
      blocks.value.filter(block => block.imageUrl || block.image).length
    )

    const filteredBlocks = computed(() => {
      let filtered = blocks.value
      
      if (searchQuery.value) {
        const search = searchQuery.value.toLowerCase()
        filtered = filtered.filter(block => 
          block.title?.toLowerCase().includes(search) ||
          block.content?.toLowerCase().includes(search)
        )
      }
      
      if (statusFilter.value) {
        filtered = filtered.filter(block => 
          statusFilter.value === 'active' ? block.active : !block.active
        )
      }
      
      return filtered.sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0))
    })

    const loadBlocks = async () => {
      try {
        const response = await api.get('/admin/blocks')
        blocks.value = response.data.sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0))
      } catch (error) {
        console.error('Failed to load blocks:', error)
      }
    }

    const editBlock = (block) => {
      editingBlock.value = block
      blockForm.value = {
        title: block.title || '',
        content: block.content || '',
        link: block.link || '',
        sortOrder: block.sortOrder || 0,
        active: block.active
      }
      showCreateModal.value = true
    }

    const handleImageUpload = (event) => {
      const file = event.target.files[0]
      if (file) {
        blockForm.value.image = file
      }
    }

    const saveBlock = async () => {
      try {
        const formData = new FormData()
        Object.keys(blockForm.value).forEach(key => {
          if (blockForm.value[key] !== null && blockForm.value[key] !== undefined) {
            formData.append(key, blockForm.value[key])
          }
        })

        if (editingBlock.value) {
          await api.put(`/admin/blocks/${editingBlock.value.id}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
          })
        } else {
          await api.post('/admin/blocks', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
          })
        }
        
        showCreateModal.value = false
        editingBlock.value = null
        blockForm.value = { title: '', content: '', link: '', sortOrder: 0, active: true }
        if (imageInput.value) imageInput.value.value = ''
        await loadBlocks()
      } catch (error) {
        console.error('Failed to save block:', error)
      }
    }

    const toggleBlockStatus = async (block) => {
      try {
        await api.put(`/admin/blocks/${block.id}`, {
          ...block,
          active: !block.active
        })
        await loadBlocks()
      } catch (error) {
        console.error('Failed to toggle block status:', error)
      }
    }

    const deleteBlock = async (block) => {
      if (confirm(`Вы уверены, что хотите удалить блок "${block.title}"?`)) {
        try {
          await api.delete(`/admin/blocks/${block.id}`)
          await loadBlocks()
        } catch (error) {
          console.error('Failed to delete block:', error)
        }
      }
    }

    const clearFilters = () => {
      searchQuery.value = ''
      statusFilter.value = ''
    }

    const getBlockImageUrl = (imagePath) => {
      if (!imagePath) return ''
      if (imagePath.startsWith('http')) return imagePath
      return `/uploads/${imagePath}`
    }

    onMounted(() => {
      loadBlocks()
    })

    return {
      blocks,
      filteredBlocks,
      activeBlocks,
      inactiveBlocks,
      blocksWithImages,
      showCreateModal,
      editingBlock,
      searchQuery,
      statusFilter,
      blockForm,
      imageInput,
      loadBlocks,
      editBlock,
      handleImageUpload,
      saveBlock,
      toggleBlockStatus,
      deleteBlock,
      clearFilters,
      getBlockImageUrl
    }
  }
}
</script>
