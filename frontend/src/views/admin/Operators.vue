<template>
  <div class="p-4 sm:p-6 lg:p-8 space-y-6">
    <!-- Header Section -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 class="text-2xl sm:text-3xl font-bold text-slate-900">Управление операторами</h1>
        <p class="text-slate-600 mt-1">Создание и управление операторами системы</p>
      </div>
      <button 
        @click="showCreateModal = true"
        class="btn-primary w-full sm:w-auto"
      >
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
        </svg>
        Добавить оператора
      </button>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="card p-4">
        <div class="flex items-center">
          <div class="p-2 bg-blue-100 rounded-lg">
            <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
            </svg>
          </div>
          <div class="ml-3">
            <p class="text-sm text-slate-600">Всего операторов</p>
            <p class="text-xl font-bold text-slate-900">{{ operators.length }}</p>
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
            <p class="text-xl font-bold text-slate-900">{{ activeOperators }}</p>
          </div>
        </div>
      </div>
      
      <div class="card p-4">
        <div class="flex items-center">
          <div class="p-2 bg-purple-100 rounded-lg">
            <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.25-3A2.25 2.25 0 0018 6.75v10.5A2.25 2.25 0 0015.75 19.5H8.25A2.25 2.25 0 016 17.25V6.75A2.25 2.25 0 018.25 4.5h7.5z"/>
            </svg>
          </div>
          <div class="ml-3">
            <p class="text-sm text-slate-600">Администраторы</p>
            <p class="text-xl font-bold text-slate-900">{{ adminOperators }}</p>
          </div>
        </div>
      </div>
      
      <div class="card p-4">
        <div class="flex items-center">
          <div class="p-2 bg-amber-100 rounded-lg">
            <svg class="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
            </svg>
          </div>
          <div class="ml-3">
            <p class="text-sm text-slate-600">Операторы</p>
            <p class="text-xl font-bold text-slate-900">{{ normalOperators }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Search and Filters -->
    <div class="card p-4 sm:p-6">
      <h3 class="text-lg font-semibold text-slate-900 mb-4">Фильтры и поиск</h3>
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div class="form-group">
          <label class="form-label">Поиск</label>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Имя или email"
            class="input-field"
          >
        </div>
        <div class="form-group">
          <label class="form-label">Роль</label>
          <select v-model="roleFilter" class="input-field">
            <option value="">Все роли</option>
            <option value="admin">Администраторы</option>
            <option value="operator">Операторы</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Статус</label>
          <select v-model="statusFilter" class="input-field">
            <option value="">Все статусы</option>
            <option value="active">Активные</option>
            <option value="blocked">Заблокированные</option>
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

    <!-- Operators Table - Desktop -->
    <div class="hidden lg:block table-container">
      <table class="table">
        <thead>
          <tr>
            <th>Оператор</th>
            <th>Роль</th>
            <th>Статус</th>
            <th>Последний вход</th>
            <th>Дата создания</th>
            <th class="text-right">Действия</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="operator in filteredOperators" :key="operator.id" class="animate-fade-in-up">
            <td>
              <div class="flex items-center space-x-3">
                <div class="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span class="text-sm font-semibold text-white">
                    {{ operator.name?.charAt(0)?.toUpperCase() || '?' }}
                  </span>
                </div>
                <div>
                  <div class="font-medium text-slate-900">{{ operator.name || 'Без имени' }}</div>
                  <div class="text-sm text-slate-500">{{ operator.email || operator.username || 'Без email' }}</div>
                </div>
              </div>
            </td>
            <td>
              <span :class="getRoleClass(operator.role)">
                {{ getRoleText(operator.role) }}
              </span>
            </td>
            <td>
              <span :class="operator.blocked ? 'badge badge-danger' : 'badge badge-success'">
                {{ operator.blocked ? 'Заблокирован' : 'Активен' }}
              </span>
            </td>
            <td>
              <span class="text-sm text-slate-600">{{ formatDate(operator.lastLogin) || 'Никогда' }}</span>
            </td>
            <td>
              <span class="text-sm text-slate-600">{{ formatDate(operator.createdAt) }}</span>
            </td>
            <td class="text-right">
              <div class="flex items-center justify-end space-x-2">
                <button 
                  @click="editOperator(operator)" 
                  class="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  title="Редактировать"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                  </svg>
                </button>
                <button 
                  @click="resetPassword(operator)" 
                  class="p-2 text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                  title="Сбросить пароль"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m0 0a2 2 0 012 2m-2-2v6m0 0V9a2 2 0 00-2-2m0 0a2 2 0 00-2 2v2m0 4h.01"/>
                  </svg>
                </button>
                <button 
                  @click="toggleOperatorStatus(operator)" 
                  :class="operator.blocked ? 'text-green-600 hover:bg-green-50' : 'text-red-600 hover:bg-red-50'"
                  class="p-2 rounded-lg transition-colors"
                  :title="operator.blocked ? 'Разблокировать' : 'Заблокировать'"
                >
                  <svg v-if="operator.blocked" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"/>
                  </svg>
                  <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                  </svg>
                </button>
                <button 
                  v-if="operator.role !== 'admin' || adminOperators > 1"
                  @click="deleteOperator(operator)" 
                  class="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Удалить"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                  </svg>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Operators Cards - Mobile -->
    <div class="lg:hidden space-y-4">
      <div 
        v-for="operator in filteredOperators" 
        :key="operator.id" 
        class="card card-interactive p-4 animate-fade-in-up"
      >
        <div class="flex items-start justify-between">
          <div class="flex items-center space-x-3 flex-1">
            <div class="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
              <span class="text-sm font-semibold text-white">
                {{ operator.name?.charAt(0)?.toUpperCase() || '?' }}
              </span>
            </div>
            <div class="flex-1 min-w-0">
              <h3 class="font-medium text-slate-900 truncate">{{ operator.name || 'Без имени' }}</h3>
              <p class="text-sm text-slate-500 truncate">{{ operator.email || operator.username || 'Без email' }}</p>
              <div class="flex items-center space-x-2 mt-2">
                <span :class="getRoleClass(operator.role) + ' text-xs'">{{ getRoleText(operator.role) }}</span>
                <span :class="(operator.blocked ? 'badge badge-danger' : 'badge badge-success') + ' text-xs'">
                  {{ operator.blocked ? 'Заблокирован' : 'Активен' }}
                </span>
              </div>
            </div>
          </div>
          <div class="flex items-center space-x-1 ml-2">
            <button 
              @click="editOperator(operator)" 
              class="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
              </svg>
            </button>
            <button 
              @click="toggleOperatorStatus(operator)" 
              :class="operator.blocked ? 'text-green-600 hover:bg-green-50' : 'text-red-600 hover:bg-red-50'"
              class="p-2 rounded-lg transition-colors"
            >
              <svg v-if="operator.blocked" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"/>
              </svg>
              <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
              </svg>
            </button>
          </div>
        </div>
        <div class="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-sm text-slate-600">
          <span>Создан: {{ formatDate(operator.createdAt) }}</span>
          <span>Последний вход: {{ formatDate(operator.lastLogin) || 'Никогда' }}</span>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="filteredOperators.length === 0" class="card p-8 text-center">
      <div class="w-16 h-16 mx-auto bg-slate-100 rounded-full flex items-center justify-center mb-4">
        <svg class="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
        </svg>
      </div>
      <h3 class="text-lg font-medium text-slate-900 mb-2">Операторы не найдены</h3>
      <p class="text-slate-600 mb-4">Создайте первого оператора для начала работы.</p>
      <button @click="showCreateModal = true" class="btn-primary">
        Добавить оператора
      </button>
    </div>

    <!-- Create/Edit Modal -->
    <div v-if="showCreateModal" class="modal-overlay" @click="showCreateModal = false">
      <div class="modal-content" @click.stop>
        <div class="p-6">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-xl font-bold text-slate-900">
              {{ editingOperator ? 'Редактировать оператора' : 'Создать оператора' }}
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
          
          <form @submit.prevent="saveOperator" class="space-y-4">
            <div class="form-group">
              <label class="form-label">Имя</label>
              <input
                v-model="operatorForm.name"
                type="text"
                class="input-field"
                placeholder="Полное имя оператора"
                required
              >
            </div>
            
            <div class="form-group">
              <label class="form-label">Email</label>
              <input
                v-model="operatorForm.email"
                type="email"
                class="input-field"
                placeholder="email@example.com"
              >
            </div>
            
            <div class="form-group">
              <label class="form-label">Имя пользователя</label>
              <input
                v-model="operatorForm.username"
                type="text"
                class="input-field"
                placeholder="username"
                required
              >
            </div>
            
            <div v-if="!editingOperator" class="form-group">
              <label class="form-label">Пароль</label>
              <input
                v-model="operatorForm.password"
                type="password"
                class="input-field"
                placeholder="Минимум 8 символов"
                required
              >
            </div>
            
            <div class="form-group">
              <label class="form-label">Роль</label>
              <select v-model="operatorForm.role" class="input-field" required>
                <option value="operator">Оператор</option>
                <option value="admin">Администратор</option>
              </select>
            </div>
            
            <div class="flex items-center space-x-3 pt-4">
              <button type="submit" class="btn-primary flex-1">
                {{ editingOperator ? 'Сохранить' : 'Создать' }}
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
  name: 'AdminOperators',
  setup() {
    const operators = ref([])
    const showCreateModal = ref(false)
    const editingOperator = ref(null)
    const searchQuery = ref('')
    const roleFilter = ref('')
    const statusFilter = ref('')
    
    const operatorForm = ref({
      name: '',
      email: '',
      username: '',
      password: '',
      role: 'operator'
    })

    const activeOperators = computed(() => 
      operators.value.filter(op => !op.blocked).length
    )
    
    const adminOperators = computed(() => 
      operators.value.filter(op => op.role === 'admin').length
    )
    
    const normalOperators = computed(() => 
      operators.value.filter(op => op.role === 'operator').length
    )

    const filteredOperators = computed(() => {
      let filtered = operators.value
      
      if (searchQuery.value) {
        const search = searchQuery.value.toLowerCase()
        filtered = filtered.filter(op => 
          op.name?.toLowerCase().includes(search) ||
          op.email?.toLowerCase().includes(search) ||
          op.username?.toLowerCase().includes(search)
        )
      }
      
      if (roleFilter.value) {
        filtered = filtered.filter(op => op.role === roleFilter.value)
      }
      
      if (statusFilter.value) {
        filtered = filtered.filter(op => 
          statusFilter.value === 'active' ? !op.blocked : op.blocked
        )
      }
      
      return filtered
    })

    const loadOperators = async () => {
      try {
        const response = await api.get('/admin/operators')
        operators.value = response.data
      } catch (error) {
        console.error('Failed to load operators:', error)
      }
    }

    const editOperator = (operator) => {
      editingOperator.value = operator
      operatorForm.value = {
        name: operator.name || '',
        email: operator.email || '',
        username: operator.username || '',
        password: '',
        role: operator.role
      }
      showCreateModal.value = true
    }

    const saveOperator = async () => {
      try {
        if (editingOperator.value) {
          const updateData = { ...operatorForm.value }
          delete updateData.password // Don't update password on edit
          await api.put(`/admin/operators/${editingOperator.value.id}`, updateData)
        } else {
          await api.post('/admin/operators', operatorForm.value)
        }
        
        showCreateModal.value = false
        editingOperator.value = null
        operatorForm.value = { name: '', email: '', username: '', password: '', role: 'operator' }
        await loadOperators()
      } catch (error) {
        console.error('Failed to save operator:', error)
      }
    }

    const toggleOperatorStatus = async (operator) => {
      try {
        await api.put(`/admin/operators/${operator.id}`, {
          ...operator,
          blocked: !operator.blocked
        })
        await loadOperators()
      } catch (error) {
        console.error('Failed to toggle operator status:', error)
      }
    }

    const resetPassword = async (operator) => {
      const newPassword = prompt('Введите новый пароль для оператора:')
      if (newPassword && newPassword.length >= 8) {
        try {
          await api.put(`/admin/operators/${operator.id}`, {
            ...operator,
            password: newPassword
          })
          alert('Пароль успеш��о изменен')
        } catch (error) {
          console.error('Failed to reset password:', error)
          alert('Ошибка при сбросе пароля')
        }
      } else if (newPassword !== null) {
        alert('Пароль должен содержать минимум 8 символов')
      }
    }

    const deleteOperator = async (operator) => {
      if (operator.role === 'admin' && adminOperators.value <= 1) {
        alert('Нельзя удалить последнего администратора')
        return
      }
      
      if (confirm(`Вы уверены, что хотите удалить оператора "${operator.name}"?`)) {
        try {
          await api.delete(`/admin/operators/${operator.id}`)
          await loadOperators()
        } catch (error) {
          console.error('Failed to delete operator:', error)
        }
      }
    }

    const clearFilters = () => {
      searchQuery.value = ''
      roleFilter.value = ''
      statusFilter.value = ''
    }

    const getRoleText = (role) => {
      switch (role) {
        case 'admin': return 'Администратор'
        case 'operator': return 'Оператор'
        default: return role
      }
    }

    const getRoleClass = (role) => {
      switch (role) {
        case 'admin': return 'badge bg-purple-100 text-purple-800 border border-purple-200'
        case 'operator': return 'badge badge-info'
        default: return 'badge badge-neutral'
      }
    }

    const formatDate = (dateString) => {
      if (!dateString) return null
      return new Date(dateString).toLocaleDateString('ru-RU')
    }

    onMounted(() => {
      loadOperators()
    })

    return {
      operators,
      filteredOperators,
      activeOperators,
      adminOperators,
      normalOperators,
      showCreateModal,
      editingOperator,
      searchQuery,
      roleFilter,
      statusFilter,
      operatorForm,
      loadOperators,
      editOperator,
      saveOperator,
      toggleOperatorStatus,
      resetPassword,
      deleteOperator,
      clearFilters,
      getRoleText,
      getRoleClass,
      formatDate
    }
  }
}
</script>
