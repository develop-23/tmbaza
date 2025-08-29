<template>
  <div class="p-4 sm:p-6 lg:p-8 space-y-6">
    <!-- Header Section -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 class="text-2xl sm:text-3xl font-bold text-slate-900">Пользователи</h1>
        <p class="text-slate-600 mt-1">Управление пользователями системы</p>
      </div>
      <button 
        @click="showCreateModal = true"
        class="btn-primary w-full sm:w-auto"
      >
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
        </svg>
        Добавить пользователя
      </button>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="card p-4">
        <div class="flex items-center">
          <div class="p-2 bg-blue-100 rounded-lg">
            <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5 0a4 4 0 11-8-2.954"/>
            </svg>
          </div>
          <div class="ml-3">
            <p class="text-sm text-slate-600">Всего</p>
            <p class="text-xl font-bold text-slate-900">{{ users.length }}</p>
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
            <p class="text-xl font-bold text-slate-900">{{ activeUsers }}</p>
          </div>
        </div>
      </div>
      
      <div class="card p-4">
        <div class="flex items-center">
          <div class="p-2 bg-red-100 rounded-lg">
            <svg class="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"/>
            </svg>
          </div>
          <div class="ml-3">
            <p class="text-sm text-slate-600">Заблокированные</p>
            <p class="text-xl font-bold text-slate-900">{{ blockedUsers }}</p>
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
            <p class="text-sm text-slate-600">Администраторы</p>
            <p class="text-xl font-bold text-slate-900">{{ adminUsers }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Filters -->
    <div class="card p-4 sm:p-6">
      <h3 class="text-lg font-semibold text-slate-900 mb-4">Фильтры</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div class="form-group">
          <label class="form-label">Поиск</label>
          <input
            v-model="filters.search"
            type="text"
            placeholder="Имя или email"
            class="input-field"
          >
        </div>
        <div class="form-group">
          <label class="form-label">Статус</label>
          <select v-model="filters.status" class="input-field">
            <option value="">Все статусы</option>
            <option value="active">Активные</option>
            <option value="blocked">Заблокированные</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Роль</label>
          <select v-model="filters.role" class="input-field">
            <option value="">Все роли</option>
            <option value="user">Пользователь</option>
            <option value="admin">Администратор</option>
            <option value="operator">Оператор</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">&nbsp;</label>
          <button @click="loadUsers" class="btn-primary w-full">
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
            Найти
          </button>
        </div>
      </div>
    </div>

    <!-- Users Table - Desktop -->
    <div class="hidden lg:block table-container">
      <table class="table">
        <thead>
          <tr>
            <th>Пользователь</th>
            <th>Роль</th>
            <th>Статус</th>
            <th>Объявления</th>
            <th>Дата регистрации</th>
            <th class="text-right">Действия</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in filteredUsers" :key="user.id" class="animate-fade-in-up">
            <td>
              <div class="flex items-center space-x-3">
                <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span class="text-sm font-semibold text-white">
                    {{ user.name?.charAt(0)?.toUpperCase() || '?' }}
                  </span>
                </div>
                <div>
                  <div class="font-medium text-slate-900">{{ user.name || 'Без имени' }}</div>
                  <div class="text-sm text-slate-500">{{ user.email || 'Без email' }}</div>
                </div>
              </div>
            </td>
            <td>
              <span class="badge badge-info">
                {{ getRoleText(user.role) }}
              </span>
            </td>
            <td>
              <span :class="user.blocked ? 'badge badge-danger' : 'badge badge-success'">
                {{ user.blocked ? 'Заблокирован' : 'Активен' }}
              </span>
            </td>
            <td>
              <span class="text-sm text-slate-600">{{ user.adsCount || 0 }} объявлений</span>
            </td>
            <td>
              <span class="text-sm text-slate-600">{{ formatDate(user.createdAt) }}</span>
            </td>
            <td class="text-right">
              <div class="flex items-center justify-end space-x-2">
                <button 
                  @click="editUser(user)" 
                  class="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  title="Редактировать"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                  </svg>
                </button>
                <button 
                  @click="toggleUserStatus(user)" 
                  :class="user.blocked ? 'text-green-600 hover:bg-green-50' : 'text-red-600 hover:bg-red-50'"
                  class="p-2 rounded-lg transition-colors"
                  :title="user.blocked ? 'Разблокировать' : 'Заблокировать'"
                >
                  <svg v-if="user.blocked" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"/>
                  </svg>
                  <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                  </svg>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Users Cards - Mobile -->
    <div class="lg:hidden space-y-4">
      <div 
        v-for="user in filteredUsers" 
        :key="user.id" 
        class="card card-interactive p-4 animate-fade-in-up"
      >
        <div class="flex items-start justify-between">
          <div class="flex items-center space-x-3 flex-1">
            <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <span class="text-sm font-semibold text-white">
                {{ user.name?.charAt(0)?.toUpperCase() || '?' }}
              </span>
            </div>
            <div class="flex-1 min-w-0">
              <h3 class="font-medium text-slate-900 truncate">{{ user.name || 'Без имени' }}</h3>
              <p class="text-sm text-slate-500 truncate">{{ user.email || 'Без email' }}</p>
              <div class="flex items-center space-x-2 mt-2">
                <span class="badge badge-info text-xs">{{ getRoleText(user.role) }}</span>
                <span :class="user.blocked ? 'badge badge-danger text-xs' : 'badge badge-success text-xs'">
                  {{ user.blocked ? 'Заблокирован' : 'Активен' }}
                </span>
              </div>
            </div>
          </div>
          <div class="flex items-center space-x-1 ml-2">
            <button 
              @click="editUser(user)" 
              class="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
              </svg>
            </button>
            <button 
              @click="toggleUserStatus(user)" 
              :class="user.blocked ? 'text-green-600 hover:bg-green-50' : 'text-red-600 hover:bg-red-50'"
              class="p-2 rounded-lg transition-colors"
            >
              <svg v-if="user.blocked" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"/>
              </svg>
              <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
              </svg>
            </button>
          </div>
        </div>
        <div class="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-sm text-slate-600">
          <span>{{ user.adsCount || 0 }} объявлений</span>
          <span>{{ formatDate(user.createdAt) }}</span>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="filteredUsers.length === 0" class="card p-8 text-center">
      <div class="w-16 h-16 mx-auto bg-slate-100 rounded-full flex items-center justify-center mb-4">
        <svg class="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5 0a4 4 0 11-8-2.954"/>
        </svg>
      </div>
      <h3 class="text-lg font-medium text-slate-900 mb-2">Пользователи не найдены</h3>
      <p class="text-slate-600 mb-4">Попробуйте изменить параметры поиска или добавьте нового пользователя.</p>
      <button @click="showCreateModal = true" class="btn-primary">
        Добавить пользователя
      </button>
    </div>

    <!-- Create/Edit Modal -->
    <div v-if="showCreateModal" class="modal-overlay" @click="showCreateModal = false">
      <div class="modal-content" @click.stop>
        <div class="p-6">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-xl font-bold text-slate-900">
              {{ editingUser ? 'Редактировать пользователя' : 'Добавить п��льзователя' }}
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
          
          <form @submit.prevent="saveUser" class="space-y-4">
            <div class="form-group">
              <label class="form-label">Имя</label>
              <input
                v-model="userForm.name"
                type="text"
                class="input-field"
                required
              >
            </div>
            
            <div class="form-group">
              <label class="form-label">Email</label>
              <input
                v-model="userForm.email"
                type="email"
                class="input-field"
                required
              >
            </div>
            
            <div class="form-group">
              <label class="form-label">Роль</label>
              <select v-model="userForm.role" class="input-field" required>
                <option value="user">Пользователь</option>
                <option value="operator">Оператор</option>
                <option value="admin">Администратор</option>
              </select>
            </div>
            
            <div class="flex items-center space-x-3 pt-4">
              <button type="submit" class="btn-primary flex-1">
                {{ editingUser ? 'Сохранить' : 'Создать' }}
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
  name: 'AdminUsers',
  setup() {
    const users = ref([])
    const showCreateModal = ref(false)
    const editingUser = ref(null)
    const loading = ref(false)
    
    const filters = ref({
      search: '',
      status: '',
      role: ''
    })
    
    const userForm = ref({
      name: '',
      email: '',
      role: 'user'
    })

    const filteredUsers = computed(() => {
      let filtered = users.value
      
      if (filters.value.search) {
        const search = filters.value.search.toLowerCase()
        filtered = filtered.filter(user => 
          user.name?.toLowerCase().includes(search) || 
          user.email?.toLowerCase().includes(search)
        )
      }
      
      if (filters.value.status) {
        filtered = filtered.filter(user => 
          filters.value.status === 'active' ? !user.blocked : user.blocked
        )
      }
      
      if (filters.value.role) {
        filtered = filtered.filter(user => user.role === filters.value.role)
      }
      
      return filtered
    })

    const activeUsers = computed(() => 
      users.value.filter(user => !user.blocked).length
    )
    
    const blockedUsers = computed(() => 
      users.value.filter(user => user.blocked).length
    )
    
    const adminUsers = computed(() => 
      users.value.filter(user => user.role === 'admin').length
    )

    const loadUsers = async () => {
      try {
        loading.value = true
        const params = new URLSearchParams()
        if (filters.value.search) params.append('search', filters.value.search)
        if (filters.value.status) params.append('status', filters.value.status)
        if (filters.value.role) params.append('role', filters.value.role)

        const response = await api.get(`/admin/users?${params}`)
        users.value = response.data.rows || response.data
      } catch (error) {
        console.error('Failed to load users:', error)
      } finally {
        loading.value = false
      }
    }

    const editUser = (user) => {
      editingUser.value = user
      userForm.value = {
        name: user.name,
        email: user.email,
        role: user.role
      }
      showCreateModal.value = true
    }

    const saveUser = async () => {
      try {
        if (editingUser.value) {
          await api.put(`/admin/users/${editingUser.value.id}`, userForm.value)
        } else {
          await api.post('/admin/users', userForm.value)
        }
        
        showCreateModal.value = false
        editingUser.value = null
        userForm.value = { name: '', email: '', role: 'user' }
        await loadUsers()
      } catch (error) {
        console.error('Failed to save user:', error)
      }
    }

    const toggleUserStatus = async (user) => {
      try {
        await api.patch(`/admin/users/${user.id}`, { blocked: !user.blocked })
        await loadUsers()
      } catch (error) {
        console.error('Failed to toggle user status:', error)
      }
    }

    const getRoleText = (role) => {
      switch (role) {
        case 'admin': return 'Администратор'
        case 'operator': return 'Оператор'
        case 'user': return 'Пользователь'
        default: return role
      }
    }

    const formatDate = (dateString) => {
      if (!dateString) return 'Неизвестно'
      return new Date(dateString).toLocaleDateString('ru-RU')
    }

    onMounted(() => {
      loadUsers()
    })

    return {
      users,
      filteredUsers,
      activeUsers,
      blockedUsers,
      adminUsers,
      showCreateModal,
      editingUser,
      filters,
      userForm,
      loading,
      loadUsers,
      editUser,
      saveUser,
      toggleUserStatus,
      getRoleText,
      formatDate
    }
  }
}
</script>
