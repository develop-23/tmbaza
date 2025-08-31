<template>
  <div class="min-h-screen dark-bg">
    <!-- Enhanced Tab Navigation -->
    <nav class="tabs">
      <ul class="flex">
        <li 
          class="tab"
          :class="{ active: currentFilter === 'all' }"
          @click="changeTab('all')"
        >
          <i class="fas fa-list mr-2"></i>
          Все
        </li>
        <li 
          class="tab"
          :class="{ active: currentFilter === 'active' }"
          @click="changeTab('active')"
        >
          <i class="fas fa-check-circle mr-2"></i>
          Активные
        </li>
        <li 
          class="tab"
          :class="{ active: currentFilter === 'pending' }"
          @click="changeTab('pending')"
        >
          <i class="fas fa-clock mr-2"></i>
          Модерация
        </li>
        <li 
          class="tab"
          :class="{ active: currentFilter === 'rejected' }"
          @click="changeTab('rejected')"
        >
          <i class="fas fa-times-circle mr-2"></i>
          Отклонённые
        </li>
      </ul>
    </nav>

    <!-- Enhanced Loading State -->
    <div v-if="loading" class="flex flex-col items-center justify-center py-16">
      <div class="relative">
        <div class="loader"></div>
        <div class="absolute inset-0 animate-ping">
          <div class="w-8 h-8 border-2 border-blue-400 rounded-full opacity-30"></div>
        </div>
      </div>
      <p class="mt-4 text-gray-400 animate-pulse">
        <i class="fas fa-user mr-2"></i>
        Загружаем ваши объявления...
      </p>
    </div>

    <!-- Enhanced Ads Container -->
    <div v-else-if="ads.length > 0" class="animate-fade-in">
      <div 
        v-for="(ad, index) in ads" 
        :key="ad.id"
        class="ad-container animate-slide-up group"
        :style="{ animationDelay: `${index * 0.1}s` }"
        @click="$router.push(`/ads/${ad.id}`)"
      >
        <!-- Enhanced Ad Image -->
        <div class="ad-image">
          <img 
            v-if="ad.images && ad.images.length > 0"
            :src="ad.images[0]" 
            :alt="ad.title"
            class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          >
          <div v-else class="w-full h-full bg-gradient-to-br from-gray-600 to-gray-700 flex items-center justify-center">
            <i class="fas fa-image text-gray-500 text-2xl"></i>
          </div>
          
          <!-- Image count indicator -->
          <div 
            v-if="ad.images && ad.images.length > 1"
            class="absolute bottom-1 right-1 bg-black/70 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm"
          >
            <i class="fas fa-images mr-1"></i>
            {{ ad.images.length }}
          </div>
        </div>

        <!-- Enhanced Ad Content -->
        <div class="ad-content">
          <div class="ad-title">
            {{ ad.title }}
            <!-- VIP Badge -->
            <span v-if="ad.vip" class="vip-badge">
              <i class="fas fa-crown mr-1"></i>
              VIP
            </span>
          </div>
          
          <div class="ad-price">
            {{ ad.price ? formatPrice(ad.price) + ' TMT' : 'Цена не указана' }}
          </div>
          
          <div class="ad-date">
            <span>
              <i class="fas fa-calendar mr-1"></i>
              {{ formatDate(ad.createdAt) }}
            </span>
            <span class="flex items-center">
              <i class="fas fa-eye mr-1"></i>
              {{ ad.views || 0 }}
            </span>
          </div>

          <!-- Rejection Reason -->
          <div v-if="ad.rejectionReason" class="rejection-reason mt-2">
            <i class="fas fa-exclamation-triangle mr-1"></i>
            Причина: {{ ad.rejectionReason }}
          </div>
        </div>

        <!-- Enhanced Status Badge -->
        <div class="absolute top-3 right-3">
          <span 
            class="status-badge text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wide"
            :class="getStatusClass(ad.status)"
          >
            <i :class="getStatusIcon(ad.status)" class="mr-1"></i>
            {{ getStatusText(ad.status) }}
          </span>
        </div>

        <!-- Enhanced Actions Menu -->
        <div class="ad-actions opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div class="flex space-x-2">
            <!-- Edit Button -->
            <button
              @click.stop="$router.push(`/edit-ad/${ad.id}`)"
              class="action-btn bg-blue-600 hover:bg-blue-700"
              title="Редактировать"
            >
              <i class="fas fa-edit"></i>
            </button>
            
            <!-- Delete Button -->
            <button
              @click.stop="handleDelete(ad.id)"
              class="action-btn bg-red-600 hover:bg-red-700"
              title="Удалить"
            >
              <i class="fas fa-trash"></i>
            </button>
            
            <!-- Make VIP Button -->
            <button
              v-if="!ad.vip && ad.status === 'active'"
              @click.stop="handleVIP(ad.id)"
              class="action-btn bg-yellow-600 hover:bg-yellow-700"
              title="Сделать VIP"
            >
              <i class="fas fa-crown"></i>
            </button>
            
            <!-- View Button -->
            <button
              @click.stop="$router.push(`/ads/${ad.id}`)"
              class="action-btn bg-green-600 hover:bg-green-700"
              title="Посмотреть"
            >
              <i class="fas fa-eye"></i>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Enhanced Empty State -->
    <div v-else class="empty-state mx-4 mt-8">
      <!-- Animated Background -->
      <div class="absolute inset-0 bg-gradient-to-br from-blue-900/10 to-purple-900/10 rounded-2xl"></div>
      
      <!-- Floating decorations -->
      <div class="absolute top-4 left-4 w-12 h-12 bg-blue-500/10 rounded-full animate-bounce" style="animation-delay: 0s;"></div>
      <div class="absolute top-8 right-8 w-8 h-8 bg-purple-500/10 rounded-full animate-bounce" style="animation-delay: 0.5s;"></div>
      <div class="absolute bottom-8 left-12 w-6 h-6 bg-green-500/10 rounded-full animate-bounce" style="animation-delay: 1s;"></div>
      
      <!-- Content -->
      <div class="relative">
        <!-- Icon with Animation -->
        <div class="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center border-2 border-dashed border-gray-600">
          <i :class="getEmptyStateIcon()" class="text-4xl text-gray-500 animate-pulse"></i>
        </div>
        
        <h3 class="text-2xl font-bold text-gray-300 mb-3">
          {{ getEmptyStateTitle() }}
        </h3>
        <p class="text-gray-400 leading-relaxed max-w-md mx-auto mb-6">
          {{ getEmptyStateMessage() }}
        </p>
        
        <!-- Action Buttons -->
        <div class="flex flex-col items-center space-y-3">
          <router-link 
            to="/create-ad" 
            class="btn-primary flex items-center px-8 py-4"
          >
            <i class="fas fa-plus mr-2"></i>
            Создать объявление
          </router-link>
          
          <button 
            v-if="currentFilter !== 'all'"
            @click="changeTab('all')"
            class="btn-secondary flex items-center px-6 py-3"
          >
            <i class="fas fa-list mr-2"></i>
            Показать все объявления
          </button>
        </div>
      </div>

      <!-- Decorative elements -->
      <div class="absolute bottom-4 right-4 text-6xl opacity-5 animate-pulse">
        📝
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { useAuthStore } from '../store/auth'
import api from '../services/api'

export default {
  name: 'MyAds',
  setup() {
    const router = useRouter()
    const toast = useToast()
    const authStore = useAuthStore()

    const user = computed(() => authStore.user)
    const loading = ref(false)
    const ads = ref([])
    const currentFilter = ref('all')

    const loadAds = async () => {
      if (!user.value) {
        router.push('/login')
        return
      }

      loading.value = true
      try {
        const params = { userId: user.value.id }
        if (currentFilter.value !== 'all') {
          params.status = currentFilter.value
        }

        const response = await api.get('/ads', { params })
        ads.value = response.data.data || []
      } catch (error) {
        console.error('Failed to load user ads:', error)
        ads.value = []
      } finally {
        loading.value = false
      }
    }

    const changeTab = (filter) => {
      currentFilter.value = filter
      loadAds()
    }

    const handleDelete = async (adId) => {
      if (confirm('Вы уверены, что хотите удалить это объявление?')) {
        try {
          await api.delete(`/ads/${adId}`)
          toast.success('Объявление успешно удалено')
          loadAds()
        } catch (error) {
          console.error('Failed to delete ad:', error)
          toast.error('Не удалось удалить объявление')
        }
      }
    }

    const handleVIP = async (adId) => {
      if (confirm('Сделать это объявление VIP за 10 TMT?')) {
        try {
          await api.post(`/ads/${adId}/vip`)
          toast.success('Объявление теперь VIP!')
          loadAds()
        } catch (error) {
          console.error('Failed to make ad VIP:', error)
          toast.error('Не удалось сделать объявление VIP')
        }
      }
    }

    const getStatusClass = (status) => {
      switch (status) {
        case 'active':
          return 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
        case 'pending':
          return 'bg-gradient-to-r from-yellow-500 to-orange-500 text-black'
        case 'rejected':
          return 'bg-gradient-to-r from-red-500 to-pink-500 text-white'
        default:
          return 'bg-gradient-to-r from-gray-500 to-gray-600 text-white'
      }
    }

    const getStatusIcon = (status) => {
      switch (status) {
        case 'active':
          return 'fas fa-check-circle'
        case 'pending':
          return 'fas fa-clock'
        case 'rejected':
          return 'fas fa-times-circle'
        default:
          return 'fas fa-question-circle'
      }
    }

    const getStatusText = (status) => {
      switch (status) {
        case 'active':
          return 'Активно'
        case 'pending':
          return 'Модерация'
        case 'rejected':
          return 'Отклонено'
        default:
          return status
      }
    }

    const getEmptyStateIcon = () => {
      switch (currentFilter.value) {
        case 'active':
          return 'fas fa-check-circle'
        case 'pending':
          return 'fas fa-clock'
        case 'rejected':
          return 'fas fa-times-circle'
        default:
          return 'fas fa-plus-circle'
      }
    }

    const getEmptyStateTitle = () => {
      switch (currentFilter.value) {
        case 'active':
          return '📋 Нет активных объявлений'
        case 'pending':
          return '⏳ Нет объявлений на модерации'
        case 'rejected':
          return '❌ Нет отклонённых объявлений'
        default:
          return '📝 У вас пока нет объявлений'
      }
    }

    const getEmptyStateMessage = () => {
      switch (currentFilter.value) {
        case 'active':
          return 'Ваши активные объявления будут отображаться здесь'
        case 'pending':
          return 'Объявления, ожидающие проверки, появятся здесь'
        case 'rejected':
          return 'Отклонённые объявления можно отредактировать и подать заново'
        default:
          return 'Создайте своё первое объявление и начните продавать'
      }
    }

    const formatDate = (dateString) => {
      if (!dateString) return 'Дата не указана'
      const date = new Date(dateString)
      return date.toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      })
    }

    const formatPrice = (price) => {
      if (!price) return ''
      const numPrice = typeof price === 'string' ? parseFloat(price) : price
      return numPrice.toLocaleString('ru-RU')
    }

    onMounted(() => {
      loadAds()
    })

    return {
      user,
      loading,
      ads,
      currentFilter,
      changeTab,
      handleDelete,
      handleVIP,
      getStatusClass,
      getStatusIcon,
      getStatusText,
      getEmptyStateIcon,
      getEmptyStateTitle,
      getEmptyStateMessage,
      formatDate,
      formatPrice
    }
  }
}
</script>

<style scoped>
/* Enhanced Action Buttons */
.action-btn {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: none;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.action-btn:hover {
  transform: translateY(-2px) scale(1.1);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.3);
}

/* Enhanced Ad Actions */
.ad-actions {
  position: absolute;
  bottom: 12px;
  right: 12px;
  z-index: 10;
}

/* Enhanced Status Badge */
.status-badge {
  box-shadow: 
    0 2px 8px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
}

/* Enhanced Rejection Reason */
.rejection-reason {
  color: #ef4444;
  font-size: 12px;
  padding: 8px 12px;
  background: linear-gradient(145deg, rgba(239, 68, 68, 0.1) 0%, rgba(220, 38, 38, 0.1) 100%);
  border: 1px solid rgba(239, 68, 68, 0.3);
  border-radius: 8px;
  line-height: 1.4;
}

/* Staggered Animations */
.animate-slide-up {
  animation: slideUp 0.6s ease-out forwards;
  opacity: 0;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fadeIn 0.6s ease-out;
}

@keyframes fadeIn {
  from { 
    opacity: 0;
  }
  to { 
    opacity: 1;
  }
}

/* Enhanced hover effects for ad containers */
.ad-container {
  position: relative;
}

.ad-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.05), transparent);
  transition: left 0.5s;
}

.ad-container:hover::before {
  left: 100%;
}
</style>
