<template>
  <div class="min-h-screen dark-bg">
    <!-- Profile Header -->
    <div class="profile-header">
      <div class="avatar">
        <span>{{ (user?.name || 'U').charAt(0).toUpperCase() }}</span>
        <div v-if="user?.verified" class="verified-badge">
          <i class="fas fa-check"></i>
        </div>
      </div>
      <div class="user-info">
        <h2>
          {{ user?.name || 'Пользователь' }}
          <span v-if="user?.verified" class="verified-icon">
            <i class="fas fa-check-circle"></i>
          </span>
        </h2>
        <p>{{ user?.phone || 'Телефон не указан' }}</p>
      </div>
    </div>

    <div class="profile-container">
      <!-- Main Information -->
      <div class="profile-section">
        <div class="section-title">Основная информация</div>
        <div class="info-item">
          <span class="info-label">Дата регистрации:</span>
          <span class="info-value">{{ user?.createdAt ? formatDate(user.createdAt) : '--.--.----' }}</span>
        </div>
        <div class="info-item">
          <span class="info-label">Объявлений:</span>
          <span class="info-value">{{ stats.total }}</span>
        </div>
        <div class="info-item">
          <span class="info-label">Активных:</span>
          <span class="info-value">{{ stats.active }}</span>
        </div>
        <div class="info-item">
          <span class="info-label">Рейтинг:</span>
          <span class="info-value">{{ user?.rating ? user.rating.toFixed(1) + ' ★' : 'Нет оценок' }}</span>
        </div>
      </div>

      <!-- Account Verification -->
      <div class="profile-section">
        <div class="section-title">
          Верификация аккаунта
          <a href="#" @click.prevent="showVerifyInfo" class="text-[#4a90e2] text-xs">Что это дает?</a>
        </div>
        <p class="dark-text-secondary mb-4 text-xs">
          Подтвержденные аккаунты получают больше доверия от других пользователей
        </p>
        <button 
          class="action-btn verify-btn"
          :class="{
            'verified': user?.verified,
            'pending': user?.verificationStatus === 'pending'
          }"
          @click="handleVerification"
          :disabled="user?.verified || user?.verificationStatus === 'pending'"
        >
          <span v-if="verifyLoading" class="flex items-center justify-center">
            <div class="loader w-4 h-4 mr-2"></div>
            Отправка...
          </span>
          <span v-else-if="user?.verified">
            <i class="fas fa-check mr-2"></i>
            Аккаунт подтвержден
          </span>
          <span v-else-if="user?.verificationStatus === 'pending'">
            <i class="fas fa-clock mr-2"></i>
            Запрос на проверку отправлен
          </span>
          <span v-else>
            <i class="fas fa-shield-check mr-2"></i>
            Подтвердить аккаунт
          </span>
        </button>
      </div>

      <!-- Quick Actions -->
      <div class="profile-section">
        <div class="section-title">Быстрые действия</div>
        <router-link to="/create-ad" class="action-btn btn-primary mb-2 block text-center">
          <i class="fas fa-plus mr-2"></i>
          Создать объявление
        </router-link>
        <router-link to="/my-ads" class="action-btn btn-secondary mb-2 block text-center">
          <i class="fas fa-list mr-2"></i>
          Мои объявления ({{ stats.total }})
        </router-link>
        <router-link to="/categories" class="action-btn btn-secondary mb-2 block text-center">
          <i class="fas fa-tags mr-2"></i>
          Категории
        </router-link>
      </div>

      <!-- Recent Ads Section -->
      <div v-if="recentAds.length > 0" class="profile-section">
        <div class="section-title">
          Последние объявления
          <router-link to="/my-ads" class="text-[#4a90e2] text-xs">Все</router-link>
        </div>
        <div v-for="ad in recentAds" :key="ad.id" class="ad-container mb-3" @click="$router.push(`/ads/${ad.id}`)">
          <div class="ad-image">
            <img 
              v-if="ad.images && ad.images.length > 0"
              :src="ad.images[0]" 
              :alt="ad.title"
              class="w-full h-full object-cover"
            >
            <div v-else class="w-full h-full bg-[#444] flex items-center justify-center">
              <i class="fas fa-image text-[#666]"></i>
            </div>
          </div>
          <div class="ad-content">
            <div class="ad-title">
              {{ ad.title }}
              <span 
                v-if="ad.status !== 'active'"
                class="text-xs px-2 py-1 rounded ml-2"
                :class="{
                  'bg-[#ff9800] text-black': ad.status === 'pending',
                  'bg-[#e53935] text-white': ad.status === 'rejected'
                }"
              >
                {{ getStatusText(ad.status) }}
              </span>
            </div>
            <div class="ad-price">{{ ad.price ? formatPrice(ad.price) + ' TMT' : 'Цена не указана' }}</div>
            <div class="ad-date">{{ formatDate(ad.createdAt) }}</div>
          </div>
        </div>
      </div>

      <!-- Actions Section -->
      <div class="profile-section">
        <div class="section-title">Действия</div>
        <button @click="onLogout" class="action-btn logout-btn">
          <i class="fas fa-sign-out-alt mr-2"></i>
          Выйти из аккаунта
        </button>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center py-8">
      <div class="loader"></div>
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
  name: 'Profile',
  setup() {
    const router = useRouter()
    const toast = useToast()
    const authStore = useAuthStore()

    const user = computed(() => authStore.user)

    const loading = ref(false)
    const verifyLoading = ref(false)
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
        recentAds.value = list.slice(0, 3) // Show only 3 recent ads
      } catch (e) {
        console.error('Failed to load user ads:', e)
      } finally {
        loading.value = false
      }
    }

    const handleVerification = async () => {
      if (user.value?.verified || user.value?.verificationStatus === 'pending') return

      verifyLoading.value = true
      try {
        await api.post('/users/me/verify')
        // Update user verification status
        await authStore.fetchUser()
        toast.success('Запрос на верификацию отправлен администратору. Мы свяжемся с вами через WhatsApp.')
      } catch (error) {
        console.error('Verification error:', error)
        toast.error('Произошла ошибка при отправке запроса')
      } finally {
        verifyLoading.value = false
      }
    }

    const showVerifyInfo = () => {
      alert("Подтвержденные аккаунты получают:\n✔ Голубую отметку\n✔ Больше доверия от покупателей\n✔ Возможность создавать VIP-объявления")
    }

    const onLogout = () => {
      if (confirm('Вы уверены, что хотите выйти?')) {
        authStore.logout()
        router.push('/')
      }
    }

    const getStatusText = (status) => {
      switch (status) {
        case 'active': return 'Активно'
        case 'pending': return 'На модерации'
        case 'rejected': return 'Отклонено'
        case 'blocked': return 'Заблокировано'
        default: return status
      }
    }

    const formatDate = (dateString) => {
      if (!dateString) return 'Дата не указана'
      const d = new Date(dateString)
      return d.toLocaleDateString('ru-RU')
    }

    const formatPrice = (price) => {
      if (!price) return ''
      const numPrice = typeof price === 'string' ? parseFloat(price) : price
      return numPrice.toLocaleString('ru-RU')
    }

    onMounted(() => {
      // Ensure user is loaded
      if (!authStore.user && authStore.token) {
        authStore.fetchUser().finally(loadMyAds)
      } else {
        loadMyAds()
      }
    })

    return {
      user,
      loading,
      verifyLoading,
      stats,
      recentAds,
      handleVerification,
      showVerifyInfo,
      onLogout,
      getStatusText,
      formatDate,
      formatPrice,
    }
  }
}
</script>

<style scoped>
/* Styles are defined in the main CSS file */
</style>
