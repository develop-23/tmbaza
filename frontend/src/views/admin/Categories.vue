<template>
  <div class="p-4 sm:p-6 lg:p-8 space-y-6">
    <!-- Header Section -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 class="text-2xl sm:text-3xl font-bold text-slate-900">Управление категориями</h1>
        <p class="text-slate-600 mt-1">Создание и редактирование категорий объявлений</p>
      </div>
      <button 
        @click="showCreateModal = true"
        class="btn-primary w-full sm:w-auto"
      >
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
        </svg>
        Добавить категорию
      </button>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="card p-4">
        <div class="flex items-center">
          <div class="p-2 bg-blue-100 rounded-lg">
            <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/>
            </svg>
          </div>
          <div class="ml-3">
            <p class="text-sm text-slate-600">Всего кат��горий</p>
            <p class="text-xl font-bold text-slate-900">{{ categories.length }}</p>
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
            <p class="text-xl font-bold text-slate-900">{{ activeCategories }}</p>
          </div>
        </div>
      </div>
      
      <div class="card p-4">
        <div class="flex items-center">
          <div class="p-2 bg-purple-100 rounded-lg">
            <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
            </svg>
          </div>
          <div class="ml-3">
            <p class="text-sm text-slate-600">Родительские</p>
            <p class="text-xl font-bold text-slate-900">{{ parentCategories.length }}</p>
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
            <p class="text-sm text-slate-600">Подкатегории</p>
            <p class="text-xl font-bold text-slate-900">{{ subcategories.length }}</p>
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
            placeholder="Название категории"
            class="input-field"
          >
        </div>
        <div class="form-group">
          <label class="form-label">Статус</label>
          <select v-model="statusFilter" class="input-field">
            <option value="">Все категории</option>
            <option value="active">Активные</option>
            <option value="inactive">Неактивные</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Тип</label>
          <select v-model="typeFilter" class="input-field">
            <option value="">Все типы</option>
            <option value="parent">Родительские</option>
            <option value="child">Подкатегории</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Categories Tree View -->
    <div class="card overflow-hidden">
      <div class="px-6 py-4 border-b border-slate-200 bg-slate-50">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-semibold text-slate-900">Структура категорий</h3>
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
          v-for="category in filteredParentCategories" 
          :key="category.id"
          class="animate-fade-in-up"
        >
          <!-- Parent Category -->
          <div class="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors">
            <div class="flex items-center flex-1">
              <button 
                @click="toggleExpanded(category.id)"
                class="mr-3 p-1 hover:bg-slate-200 rounded transition-colors"
                v-if="getSubcategories(category.id).length > 0"
              >
                <svg 
                  class="w-4 h-4 text-slate-600 transition-transform"
                  :class="{ 'rotate-90': expandedCategories.includes(category.id) }"
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                </svg>
              </button>
              <div v-else class="w-6 h-6 mr-3"></div>
              
              <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-3">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/>
                </svg>
              </div>
              
              <div class="flex-1">
                <div class="flex items-center space-x-3">
                  <h4 class="font-medium text-slate-900">{{ category.name }}</h4>
                  <span v-if="category.active" class="badge badge-success text-xs">Активна</span>
                  <span v-else class="badge badge-neutral text-xs">Неактивна</span>
                  <span class="text-xs text-slate-500">
                    {{ getSubcategories(category.id).length }} подкатегорий
                  </span>
                </div>
                <div class="text-sm text-slate-500 mt-1">
                  Порядок: {{ category.sortOrder || 0 }}
                </div>
              </div>
            </div>
            
            <div class="flex items-center space-x-2">
              <button 
                @click="editCategory(category)" 
                class="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                title="Редактировать"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                </svg>
              </button>
              <button 
                @click="toggleCategoryStatus(category)" 
                :class="category.active ? 'text-red-600 hover:bg-red-50' : 'text-green-600 hover:bg-green-50'"
                class="p-2 rounded-lg transition-colors"
                :title="category.active ? 'Деактивировать' : 'Активировать'"
              >
                <svg v-if="category.active" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636M5.636 18.364l12.728-12.728"/>
                </svg>
                <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </button>
              <button 
                @click="deleteCategory(category)" 
                class="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Удалить"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                </svg>
              </button>
            </div>
          </div>

          <!-- Subcategories -->
          <div 
            v-if="expandedCategories.includes(category.id)"
            class="bg-slate-50 border-l-4 border-blue-200"
          >
            <div 
              v-for="subcategory in getSubcategories(category.id)" 
              :key="subcategory.id"
              class="flex items-center justify-between pl-12 pr-4 py-3 hover:bg-slate-100 transition-colors border-l border-slate-200 ml-4"
            >
              <div class="flex items-center flex-1">
                <div class="w-8 h-8 bg-gradient-to-br from-green-500 to-teal-600 rounded-lg flex items-center justify-center mr-3">
                  <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/>
                  </svg>
                </div>
                
                <div class="flex-1">
                  <div class="flex items-center space-x-3">
                    <h5 class="font-medium text-slate-800">{{ subcategory.name }}</h5>
                    <span v-if="subcategory.active" class="badge badge-success text-xs">Активна</span>
                    <span v-else class="badge badge-neutral text-xs">Неактивна</span>
                  </div>
                  <div class="text-xs text-slate-500 mt-1">
                    Порядок: {{ subcategory.sortOrder || 0 }}
                  </div>
                </div>
              </div>
              
              <div class="flex items-center space-x-2">
                <button 
                  @click="editCategory(subcategory)" 
                  class="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  title="Редактировать"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                  </svg>
                </button>
                <button 
                  @click="toggleCategoryStatus(subcategory)" 
                  :class="subcategory.active ? 'text-red-600 hover:bg-red-50' : 'text-green-600 hover:bg-green-50'"
                  class="p-2 rounded-lg transition-colors"
                  :title="subcategory.active ? 'Деактивировать' : 'Активировать'"
                >
                  <svg v-if="subcategory.active" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636M5.636 18.364l12.728-12.728"/>
                  </svg>
                  <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </button>
                <button 
                  @click="deleteCategory(subcategory)" 
                  class="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Удалить"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                  </svg>
                </button>
              </div>
            </div>
            
            <!-- Add Subcategory Button -->
            <div class="pl-12 pr-4 py-3 border-t border-slate-200">
              <button 
                @click="addSubcategory(category)"
                class="flex items-center text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                </svg>
                Добавить подкатегорию
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="filteredParentCategories.length === 0" class="card p-8 text-center">
      <div class="w-16 h-16 mx-auto bg-slate-100 rounded-full flex items-center justify-center mb-4">
        <svg class="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/>
        </svg>
      </div>
      <h3 class="text-lg font-medium text-slate-900 mb-2">Категории не найдены</h3>
      <p class="text-slate-600 mb-4">Создайте первую категорию для начала работы.</p>
      <button @click="showCreateModal = true" class="btn-primary">
        Создать категорию
      </button>
    </div>

    <!-- Create/Edit Modal -->
    <div v-if="showCreateModal" class="modal-overlay" @click="showCreateModal = false">
      <div class="modal-content" @click.stop>
        <div class="p-6">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-xl font-bold text-slate-900">
              {{ editingCategory ? 'Редактировать категорию' : 'Создать категорию' }}
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
          
          <form @submit.prevent="saveCategory" class="space-y-4">
            <div class="form-group">
              <label class="form-label">Название категории</label>
              <input
                v-model="categoryForm.name"
                type="text"
                class="input-field"
                placeholder="Введите название категории"
                required
              >
            </div>
            
            <div class="form-group">
              <label class="form-label">Родительская категория</label>
              <select v-model="categoryForm.parentId" class="input-field">
                <option value="">Основная категория</option>
                <option v-for="parent in parentCategories" :key="parent.id" :value="parent.id">
                  {{ parent.name }}
                </option>
              </select>
            </div>
            
            <div class="form-group">
              <label class="form-label">Порядок сортировки</label>
              <input
                v-model.number="categoryForm.sortOrder"
                type="number"
                class="input-field"
                placeholder="0"
                min="0"
              >
            </div>
            
            <div class="form-group">
              <label class="flex items-center">
                <input
                  v-model="categoryForm.active"
                  type="checkbox"
                  class="rounded border-slate-300 text-blue-600 focus:ring-blue-500 mr-2"
                >
                <span class="form-label mb-0">Активная категория</span>
              </label>
            </div>
            
            <div class="flex items-center space-x-3 pt-4">
              <button type="submit" class="btn-primary flex-1">
                {{ editingCategory ? 'Сохранить' : 'Создать' }}
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
  name: 'AdminCategories',
  setup() {
    const categories = ref([])
    const showCreateModal = ref(false)
    const editingCategory = ref(null)
    const expandedCategories = ref([])
    const searchQuery = ref('')
    const statusFilter = ref('')
    const typeFilter = ref('')
    
    const categoryForm = ref({
      name: '',
      parentId: '',
      sortOrder: 0,
      active: true
    })

    const parentCategories = computed(() => 
      categories.value.filter(cat => !cat.parentId)
    )

    const subcategories = computed(() => 
      categories.value.filter(cat => cat.parentId)
    )

    const activeCategories = computed(() => 
      categories.value.filter(cat => cat.active).length
    )

    const filteredParentCategories = computed(() => {
      let filtered = parentCategories.value
      
      if (searchQuery.value) {
        const search = searchQuery.value.toLowerCase()
        filtered = filtered.filter(cat => 
          cat.name.toLowerCase().includes(search)
        )
      }
      
      if (statusFilter.value) {
        filtered = filtered.filter(cat => 
          statusFilter.value === 'active' ? cat.active : !cat.active
        )
      }
      
      return filtered.sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0))
    })

    const getSubcategories = (parentId) => {
      return categories.value
        .filter(cat => cat.parentId === parentId)
        .sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0))
    }

    const loadCategories = async () => {
      try {
        const response = await api.get('/admin/categories')
        categories.value = response.data
        console.log(categories.value[0].name)
      } catch (error) {
        console.error('Failed to load categories:', error)
      }
    }

    const editCategory = (category) => {
      editingCategory.value = category
      categoryForm.value = {
        name: category.name,
        parentId: category.parentId || '',
        sortOrder: category.sortOrder || 0,
        active: category.active
      }
      showCreateModal.value = true
    }

    const addSubcategory = (parentCategory) => {
      editingCategory.value = null
      categoryForm.value = {
        name: '',
        parentId: parentCategory.id,
        sortOrder: 0,
        active: true
      }
      showCreateModal.value = true
    }

    const saveCategory = async () => {
      try {
        const payload = { ...categoryForm.value }
        if (payload.parentId === '') delete payload.parentId

        if (editingCategory.value) {
          await api.put(`/admin/categories/${editingCategory.value.id}`, payload)
        } else {
          await api.post('/admin/categories', payload)
        }

        showCreateModal.value = false
        editingCategory.value = null
        categoryForm.value = { name: '', parentId: '', sortOrder: 0, active: true }
        await loadCategories()
      } catch (error) {
        console.error('Failed to save category:', error)
      }
    }

    const toggleCategoryStatus = async (category) => {
      try {
        await api.put(`/admin/categories/${category.id}`, {
          ...category,
          active: !category.active
        })
        await loadCategories()
      } catch (error) {
        console.error('Failed to toggle category status:', error)
      }
    }

    const deleteCategory = async (category) => {
      const subcats = getSubcategories(category.id)
      let message = `Вы уверены, что хотите удалить категорию "${category.name}"?`
      
      if (subcats.length > 0) {
        message += `\n\nВнимание: Эта категория содержит ${subcats.length} подкатегорий, которые также будут удалены.`
      }
      
      if (confirm(message)) {
        try {
          await api.delete(`/admin/categories/${category.id}`)
          await loadCategories()
        } catch (error) {
          console.error('Failed to delete category:', error)
        }
      }
    }

    const toggleExpanded = (categoryId) => {
      const index = expandedCategories.value.indexOf(categoryId)
      if (index > -1) {
        expandedCategories.value.splice(index, 1)
      } else {
        expandedCategories.value.push(categoryId)
      }
    }

    const expandAll = () => {
      expandedCategories.value = parentCategories.value
        .filter(cat => getSubcategories(cat.id).length > 0)
        .map(cat => cat.id)
    }

    const collapseAll = () => {
      expandedCategories.value = []
    }

    onMounted(() => {
      loadCategories()
    })

    return {
      categories,
      parentCategories,
      subcategories,
      activeCategories,
      filteredParentCategories,
      showCreateModal,
      editingCategory,
      expandedCategories,
      searchQuery,
      statusFilter,
      typeFilter,
      categoryForm,
      getSubcategories,
      loadCategories,
      editCategory,
      addSubcategory,
      saveCategory,
      toggleCategoryStatus,
      deleteCategory,
      toggleExpanded,
      expandAll,
      collapseAll
    }
  }
}
</script>
