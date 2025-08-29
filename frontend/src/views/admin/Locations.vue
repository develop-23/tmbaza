<template>
  <div class="p-4 sm:p-6 lg:p-8 space-y-6">
    <!-- Header Section -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 class="text-2xl sm:text-3xl font-bold text-slate-900">Управление локациями</h1>
        <p class="text-slate-600 mt-1">Создание и редактирование географических локаций</p>
      </div>
      <button 
        @click="showCreateModal = true"
        class="btn-primary w-full sm:w-auto"
      >
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
        </svg>
        Добавить локацию
      </button>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="card p-4">
        <div class="flex items-center">
          <div class="p-2 bg-blue-100 rounded-lg">
            <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
            </svg>
          </div>
          <div class="ml-3">
            <p class="text-sm text-slate-600">Всего локаций</p>
            <p class="text-xl font-bold text-slate-900">{{ locations.length }}</p>
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
            <p class="text-xl font-bold text-slate-900">{{ activeLocations }}</p>
          </div>
        </div>
      </div>
      
      <div class="card p-4">
        <div class="flex items-center">
          <div class="p-2 bg-purple-100 rounded-lg">
            <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
            </svg>
          </div>
          <div class="ml-3">
            <p class="text-sm text-slate-600">Города</p>
            <p class="text-xl font-bold text-slate-900">{{ parentLocations.length }}</p>
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
            <p class="text-sm text-slate-600">Районы</p>
            <p class="text-xl font-bold text-slate-900">{{ sublocations.length }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Search and Filters -->
    <div class="card p-4 sm:p-6">
      <h3 class="text-lg font-semibold text-slate-900 mb-4">Поиск и фильтры</h3>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="form-group">
          <label class="form-label">Поиск</label>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Название локации"
            class="input-field"
          >
        </div>
        <div class="form-group">
          <label class="form-label">Статус</label>
          <select v-model="statusFilter" class="input-field">
            <option value="">Все локации</option>
            <option value="active">Активные</option>
            <option value="inactive">Неактивные</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Тип</label>
          <select v-model="typeFilter" class="input-field">
            <option value="">Все типы</option>
            <option value="parent">Города</option>
            <option value="child">Районы</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Locations Tree View -->
    <div class="card overflow-hidden">
      <div class="px-6 py-4 border-b border-slate-200 bg-slate-50">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-semibold text-slate-900">Структура локаций</h3>
          <div class="flex items-center space-x-2">
            <button 
              @click="expandAll" 
              class="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              Развернуть все
            </button>
            <span class="text-slate-300">|</span>
            <button 
              @click="collapseAll" 
              class="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              Свернуть все
            </button>
          </div>
        </div>
      </div>

      <div class="divide-y divide-slate-100 max-h-96 overflow-y-auto custom-scrollbar">
        <div 
          v-for="location in filteredParentLocations" 
          :key="location.id"
          class="animate-fade-in-up"
        >
          <!-- Parent Location -->
          <div class="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors">
            <div class="flex items-center flex-1">
              <button 
                @click="toggleExpanded(location.id)"
                class="mr-3 p-1 hover:bg-slate-200 rounded transition-colors"
                v-if="getSublocations(location.id).length > 0"
              >
                <svg 
                  class="w-4 h-4 text-slate-600 transition-transform"
                  :class="{ 'rotate-90': expandedLocations.includes(location.id) }"
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                </svg>
              </button>
              <div v-else class="w-6 h-6 mr-3"></div>
              
              <div class="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center mr-3">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                </svg>
              </div>
              
              <div class="flex-1">
                <div class="flex items-center space-x-3">
                  <h4 class="font-medium text-slate-900">{{ location.name }}</h4>
                  <span v-if="location.active" class="badge badge-success text-xs">Активна</span>
                  <span v-else class="badge badge-neutral text-xs">Неактивна</span>
                  <span class="text-xs text-slate-500">
                    {{ getSublocations(location.id).length }} районов
                  </span>
                </div>
                <div class="text-sm text-slate-500 mt-1">
                  Порядок: {{ location.sortOrder || 0 }}
                </div>
              </div>
            </div>
            
            <div class="flex items-center space-x-2">
              <button 
                @click="editLocation(location)" 
                class="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                title="Редактировать"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                </svg>
              </button>
              <button 
                @click="toggleLocationStatus(location)" 
                :class="location.active ? 'text-red-600 hover:bg-red-50' : 'text-green-600 hover:bg-green-50'"
                class="p-2 rounded-lg transition-colors"
                :title="location.active ? 'Деактивировать' : 'Активировать'"
              >
                <svg v-if="location.active" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636M5.636 18.364l12.728-12.728"/>
                </svg>
                <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </button>
              <button 
                @click="deleteLocation(location)" 
                class="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Удалить"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                </svg>
              </button>
            </div>
          </div>

          <!-- Sublocations -->
          <div 
            v-if="expandedLocations.includes(location.id)"
            class="bg-slate-50 border-l-4 border-green-200"
          >
            <div 
              v-for="sublocation in getSublocations(location.id)" 
              :key="sublocation.id"
              class="flex items-center justify-between pl-12 pr-4 py-3 hover:bg-slate-100 transition-colors border-l border-slate-200 ml-4"
            >
              <div class="flex items-center flex-1">
                <div class="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center mr-3">
                  <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                </div>
                
                <div class="flex-1">
                  <div class="flex items-center space-x-3">
                    <h5 class="font-medium text-slate-800">{{ sublocation.name }}</h5>
                    <span v-if="sublocation.active" class="badge badge-success text-xs">Активна</span>
                    <span v-else class="badge badge-neutral text-xs">Неактивна</span>
                  </div>
                  <div class="text-xs text-slate-500 mt-1">
                    Порядок: {{ sublocation.sortOrder || 0 }}
                  </div>
                </div>
              </div>
              
              <div class="flex items-center space-x-2">
                <button 
                  @click="editLocation(sublocation)" 
                  class="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  title="Редактиро��ать"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                  </svg>
                </button>
                <button 
                  @click="toggleLocationStatus(sublocation)" 
                  :class="sublocation.active ? 'text-red-600 hover:bg-red-50' : 'text-green-600 hover:bg-green-50'"
                  class="p-2 rounded-lg transition-colors"
                  :title="sublocation.active ? 'Деактивировать' : 'Активировать'"
                >
                  <svg v-if="sublocation.active" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636M5.636 18.364l12.728-12.728"/>
                  </svg>
                  <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </button>
                <button 
                  @click="deleteLocation(sublocation)" 
                  class="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Удалить"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                  </svg>
                </button>
              </div>
            </div>
            
            <!-- Add Sublocation Button -->
            <div class="pl-12 pr-4 py-3 border-t border-slate-200">
              <button 
                @click="addSublocation(location)"
                class="flex items-center text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                </svg>
                Добавить район
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="filteredParentLocations.length === 0" class="card p-8 text-center">
      <div class="w-16 h-16 mx-auto bg-slate-100 rounded-full flex items-center justify-center mb-4">
        <svg class="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
        </svg>
      </div>
      <h3 class="text-lg font-medium text-slate-900 mb-2">Локации не найдены</h3>
      <p class="text-slate-600 mb-4">Создайте первую локацию для начала работы.</p>
      <button @click="showCreateModal = true" class="btn-primary">
        Создать локацию
      </button>
    </div>

    <!-- Create/Edit Modal -->
    <div v-if="showCreateModal" class="modal-overlay" @click="showCreateModal = false">
      <div class="modal-content" @click.stop>
        <div class="p-6">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-xl font-bold text-slate-900">
              {{ editingLocation ? 'Редактировать локацию' : 'Создать локацию' }}
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
          
          <form @submit.prevent="saveLocation" class="space-y-4">
            <div class="form-group">
              <label class="form-label">Название локации</label>
              <input
                v-model="locationForm.name"
                type="text"
                class="input-field"
                placeholder="Введите название локации"
                required
              >
            </div>
            
            <div class="form-group">
              <label class="form-label">Родительская локация</label>
              <select v-model="locationForm.parentId" class="input-field">
                <option value="">Основная локация (город/регион)</option>
                <option v-for="parent in parentLocations" :key="parent.id" :value="parent.id">
                  {{ parent.name }}
                </option>
              </select>
            </div>
            
            <div class="form-group">
              <label class="form-label">Порядок сортировки</label>
              <input
                v-model.number="locationForm.sortOrder"
                type="number"
                class="input-field"
                placeholder="0"
                min="0"
              >
            </div>
            
            <div class="form-group">
              <label class="flex items-center">
                <input
                  v-model="locationForm.active"
                  type="checkbox"
                  class="rounded border-slate-300 text-blue-600 focus:ring-blue-500 mr-2"
                >
                <span class="form-label mb-0">Активная локация</span>
              </label>
            </div>
            
            <div class="flex items-center space-x-3 pt-4">
              <button type="submit" class="btn-primary flex-1">
                {{ editingLocation ? 'Сохранить' : 'Создать' }}
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
  name: 'AdminLocations',
  setup() {
    const locations = ref([])
    const showCreateModal = ref(false)
    const editingLocation = ref(null)
    const expandedLocations = ref([])
    const searchQuery = ref('')
    const statusFilter = ref('')
    const typeFilter = ref('')
    
    const locationForm = ref({
      name: '',
      parentId: '',
      sortOrder: 0,
      active: true
    })

    const parentLocations = computed(() => 
      locations.value.filter(loc => !loc.parentId)
    )

    const sublocations = computed(() => 
      locations.value.filter(loc => loc.parentId)
    )

    const activeLocations = computed(() => 
      locations.value.filter(loc => loc.active).length
    )

    const filteredParentLocations = computed(() => {
      let filtered = parentLocations.value
      
      if (searchQuery.value) {
        const search = searchQuery.value.toLowerCase()
        filtered = filtered.filter(loc => 
          loc.name.toLowerCase().includes(search)
        )
      }
      
      if (statusFilter.value) {
        filtered = filtered.filter(loc => 
          statusFilter.value === 'active' ? loc.active : !loc.active
        )
      }
      
      return filtered.sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0))
    })

    const getSublocations = (parentId) => {
      return locations.value
        .filter(loc => loc.parentId === parentId)
        .sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0))
    }

    const loadLocations = async () => {
      try {
        const response = await api.get('/admin/locations')
        locations.value = response.data
      } catch (error) {
        console.error('Failed to load locations:', error)
      }
    }

    const editLocation = (location) => {
      editingLocation.value = location
      locationForm.value = {
        name: location.name,
        parentId: location.parentId || '',
        sortOrder: location.sortOrder || 0,
        active: location.active
      }
      showCreateModal.value = true
    }

    const addSublocation = (parentLocation) => {
      editingLocation.value = null
      locationForm.value = {
        name: '',
        parentId: parentLocation.id,
        sortOrder: 0,
        active: true
      }
      showCreateModal.value = true
    }

    const saveLocation = async () => {
      try {
        if (editingLocation.value) {
          await api.put(`/admin/locations/${editingLocation.value.id}`, locationForm.value)
        } else {
          await api.post('/admin/locations', locationForm.value)
        }
        
        showCreateModal.value = false
        editingLocation.value = null
        locationForm.value = { name: '', parentId: '', sortOrder: 0, active: true }
        await loadLocations()
      } catch (error) {
        console.error('Failed to save location:', error)
      }
    }

    const toggleLocationStatus = async (location) => {
      try {
        await api.put(`/admin/locations/${location.id}`, {
          ...location,
          active: !location.active
        })
        await loadLocations()
      } catch (error) {
        console.error('Failed to toggle location status:', error)
      }
    }

    const deleteLocation = async (location) => {
      const sublocs = getSublocations(location.id)
      let message = `Вы уверены, что хотите удалить локацию "${location.name}"?`
      
      if (sublocs.length > 0) {
        message += `\n\nВнимание: Эта локация содержит ${sublocs.length} районов, которые также будут удалены.`
      }
      
      if (confirm(message)) {
        try {
          await api.delete(`/admin/locations/${location.id}`)
          await loadLocations()
        } catch (error) {
          console.error('Failed to delete location:', error)
        }
      }
    }

    const toggleExpanded = (locationId) => {
      const index = expandedLocations.value.indexOf(locationId)
      if (index > -1) {
        expandedLocations.value.splice(index, 1)
      } else {
        expandedLocations.value.push(locationId)
      }
    }

    const expandAll = () => {
      expandedLocations.value = parentLocations.value
        .filter(loc => getSublocations(loc.id).length > 0)
        .map(loc => loc.id)
    }

    const collapseAll = () => {
      expandedLocations.value = []
    }

    onMounted(() => {
      loadLocations()
    })

    return {
      locations,
      parentLocations,
      sublocations,
      activeLocations,
      filteredParentLocations,
      showCreateModal,
      editingLocation,
      expandedLocations,
      searchQuery,
      statusFilter,
      typeFilter,
      locationForm,
      getSublocations,
      loadLocations,
      editLocation,
      addSublocation,
      saveLocation,
      toggleLocationStatus,
      deleteLocation,
      toggleExpanded,
      expandAll,
      collapseAll
    }
  }
}
</script>
