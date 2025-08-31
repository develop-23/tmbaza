<template>
  <div class="min-h-screen dark-bg">
    <!-- Enhanced Ticker/News Banner -->
    <div class="h-14 overflow-hidden bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-b border-gray-700 relative">
      <div class="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-blue-600/10"></div>
      <div class="ticker-track dark-text-secondary text-sm font-medium">
        <div class="ticker-item bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-lg px-4 py-2 mx-2 border border-gray-600">
          <i class="fas fa-star text-yellow-400 mr-2"></i>
          Новые объявления каждый день!
        </div>
        <div class="ticker-item bg-gradient-to-r from-green-900/30 to-emerald-900/30 rounded-lg px-4 py-2 mx-2 border border-gray-600">
          <i class="fas fa-crown text-orange-400 mr-2"></i>
          VIP-объявления получают больше просмотров
        </div>
        <div class="ticker-item bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-lg px-4 py-2 mx-2 border border-gray-600">
          <i class="fas fa-shield-check text-green-400 mr-2"></i>
          Безопасные сделки через платформу
        </div>
        <div class="ticker-item bg-gradient-to-r from-orange-900/30 to-red-900/30 rounded-lg px-4 py-2 mx-2 border border-gray-600">
          <i class="fas fa-bolt text-blue-400 mr-2"></i>
          Быстрое размещение объявлений
        </div>
      </div>
    </div>

    <!-- Enhanced Main Category Block -->
    <div v-if="homeBlocks.length > 0" class="big-block bg-gradient-to-br from-gray-800 to-gray-900 m-4 h-64 rounded-2xl relative overflow-hidden cursor-pointer shadow-2xl border border-gray-700 group" @click="navigateToService(homeBlocks[0])">
      <!-- Background Pattern -->
      <div class="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/10 to-blue-600/20"></div>
      
      <!-- Animated Background Elements -->
      <div class="absolute top-4 right-4 w-32 h-32 bg-blue-500/5 rounded-full animate-pulse"></div>
      <div class="absolute bottom-8 left-8 w-24 h-24 bg-purple-500/5 rounded-full animate-bounce" style="animation-delay: 1s;"></div>
      
      <div class="relative h-full flex items-center justify-center">
        <img 
          v-if="homeBlocks[0].image"
          :src="homeBlocks[0].image" 
          :alt="homeBlocks[0].title"
          class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        >
        <div v-else class="text-center text-white">
          <div class="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl">
            <i class="fas fa-home text-3xl"></i>
          </div>
          <div class="text-2xl font-bold mb-2">{{ homeBlocks[0].title }}</div>
          <div class="text-sm opacity-80">Найдите лучшие предложения</div>
        </div>
      </div>
      
      <!-- Enhanced Label -->
      <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4">
        <div class="flex items-center justify-between">
          <span class="font-bold text-sm uppercase tracking-wide">
            <i class="fas fa-star mr-2"></i>
            {{ homeBlocks[0].title || 'Здесь твоё объявление' }}
          </span>
          <i class="fas fa-arrow-right text-lg opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all"></i>
        </div>
      </div>

      <div v-if="loading" class="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm">
        <div class="loader"></div>
      </div>
    </div>

    <!-- Enhanced Two Half Blocks -->
    <div v-if="homeBlocks.length > 1" class="double-blocks flex px-2 space-x-2">
      <div 
        v-for="(block, index) in homeBlocks.slice(1, 3)" 
        :key="block.id"
        class="half-block bg-gradient-to-br from-gray-800 to-gray-900 h-56 rounded-2xl relative overflow-hidden cursor-pointer flex-1 shadow-xl border border-gray-700 group" 
        @click="navigateToService(block)"
      >
        <!-- Background Pattern -->
        <div class="absolute inset-0 bg-gradient-to-br from-green-600/20 via-emerald-600/10 to-green-600/20"></div>
        
        <!-- Animated Elements -->
        <div class="absolute top-2 right-2 w-16 h-16 bg-green-500/5 rounded-full animate-ping" :style="{ animationDelay: `${index * 0.5}s` }"></div>
        
        <div class="relative h-full flex items-center justify-center">
          <img 
            v-if="block.image"
            :src="block.image" 
            :alt="block.title"
            class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          >
          <div v-else class="text-center text-white">
            <div class="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
              <i class="fas fa-car text-2xl"></i>
            </div>
            <div class="text-lg font-bold mb-1">{{ block.title }}</div>
            <div class="text-xs opacity-70">Популярная категория</div>
          </div>
        </div>
        
        <!-- Enhanced Label -->
        <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-r from-green-600 to-emerald-600 text-white py-2 px-3">
          <div class="flex items-center justify-between">
            <span class="font-semibold text-xs uppercase tracking-wide">
              {{ block.title || 'Здесь тоже' }}
            </span>
            <i class="fas fa-chevron-right text-sm opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all"></i>
          </div>
        </div>

        <div v-if="loading" class="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm">
          <div class="loader"></div>
        </div>
      </div>
    </div>

    <!-- Enhanced Recent Ads Section -->
    <div class="mt-8">
      <div class="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-gray-800 to-gray-900 border-b border-gray-700">
        <div class="flex items-center">
          <div class="w-1 h-6 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full mr-3"></div>
          <h2 class="text-xl font-bold dark-text">
            <i class="fas fa-clock mr-2 text-blue-400"></i>
            Последние объявления
          </h2>
        </div>
        <router-link 
          to="/ads" 
          class="text-blue-400 hover:text-blue-300 font-medium text-sm flex items-center group transition-colors"
        >
          Все
          <i class="fas fa-chevron-right ml-2 text-xs group-hover:translate-x-1 transition-transform"></i>
        </router-link>
      </div>
      
      <div v-if="recentAds.length" class="animate-fade-in">
        <div 
          v-for="(ad, index) in recentAds.slice(0, 10)" 
          :key="ad.id"
          class="animate-slide-up"
          :style="{ animationDelay: `${index * 0.1}s` }"
        >
          <AdCard 
            :ad="ad"
            @click="$router.push(`/ads/${ad.id}`)"
          />
          
          <!-- Enhanced Banner Integration -->
          <div 
            v-if="(index + 1) % 3 === 0 && bottomBanners.length > 0"
            class="ad-banner cursor-pointer m-4 rounded-2xl overflow-hidden relative group shadow-xl"
            @click="handleBannerClick(bottomBanners[Math.floor(Math.random() * bottomBanners.length)])"
          >
            <!-- Banner Background Effects -->
            <div class="absolute inset-0 bg-gradient-to-r from-purple-900/30 to-pink-900/30"></div>
            <div class="absolute top-2 right-2 w-16 h-16 bg-pink-500/10 rounded-full animate-pulse"></div>
            
            <!-- Banner Content -->
            <div class="relative">
              <!-- Banner Label -->
              <div class="absolute top-3 left-3 z-10">
                <span class="inline-block px-3 py-1 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xs font-bold rounded-full animate-bounce">
                  <i class="fas fa-bullhorn mr-1"></i>
                  РЕКЛАМА
                </span>
              </div>
              
              <img 
                :src="bottomBanners[Math.floor(Math.random() * bottomBanners.length)].image" 
                :alt="bottomBanners[Math.floor(Math.random() * bottomBanners.length)].title"
                class="w-full h-28 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              
              <!-- Overlay -->
              <div class="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              
              <!-- Hover Effect -->
              <div class="absolute inset-0 bg-gradient-to-r from-pink-600/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </div>
        </div>
      </div>
      
      <div v-else-if="!loading" class="empty-state mx-4 mt-8">
        <!-- Animated Background -->
        <div class="absolute inset-0 bg-gradient-to-br from-blue-900/10 to-purple-900/10 rounded-2xl"></div>
        
        <!-- Content -->
        <div class="relative">
          <!-- Icon with Animation -->
          <div class="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center border-2 border-dashed border-gray-600">
            <i class="fas fa-home text-4xl text-gray-500 animate-pulse"></i>
          </div>
          
          <h3 class="text-2xl font-bold text-gray-300 mb-3">
            🏠 Добро пожаловать!
          </h3>
          <p class="text-gray-400 leading-relaxed max-w-sm mx-auto mb-6">
            Станьте первым, кто разместит объявление в нашем сообществе
          </p>
          
          <router-link 
            v-if="user"
            to="/create-ad" 
            class="btn-primary inline-flex items-center px-8 py-4"
          >
            <i class="fas fa-plus mr-2"></i>
            Создать объявление
          </router-link>
        </div>
        
        <!-- Decorative Elements -->
        <div class="absolute top-4 right-4 text-4xl opacity-10 animate-bounce">✨</div>
        <div class="absolute bottom-4 left-4 text-3xl opacity-10 animate-pulse">🚀</div>
      </div>
    </div>

    <!-- Enhanced Bottom Banner -->
    <div v-if="bottomBanners.length > 0" class="ad-block bg-gradient-to-r from-gray-800 to-gray-900 m-4 p-6 rounded-2xl relative border border-gray-700 shadow-xl group cursor-pointer" @click="handleBannerClick(bottomBanners[0])">
      <!-- Background Effects -->
      <div class="absolute inset-0 bg-gradient-to-r from-orange-900/20 to-red-900/20 rounded-2xl"></div>
      <div class="absolute top-2 left-2 w-12 h-12 bg-orange-500/10 rounded-full animate-pulse"></div>
      
      <!-- Banner Label -->
      <div class="absolute top-3 right-3 z-10">
        <span class="inline-block px-3 py-1 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold rounded-full">
          <i class="fas fa-ad mr-1"></i>
          РЕКЛАМА
        </span>
      </div>
      
      <div class="relative">
        <img 
          :src="bottomBanners[0].image" 
          :alt="bottomBanners[0].title"
          class="w-full h-16 object-cover rounded-xl transition-transform duration-300 group-hover:scale-105"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl"></div>
      </div>
    </div>

    <!-- Enhanced Loading State -->
    <div v-if="loading" class="flex flex-col items-center justify-center py-16">
      <div class="relative">
        <div class="loader"></div>
        <div class="absolute inset-0 animate-ping">
          <div class="w-8 h-8 border-2 border-blue-400 rounded-full opacity-30"></div>
        </div>
      </div>
      <p class="mt-4 text-gray-400 animate-pulse">
        <i class="fas fa-magic mr-2"></i>
        Загружаем лучшие предложения...
      </p>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../store/auth'
import api from '../services/api'
import AdCard from '../components/AdCard.vue'

export default {
  name: 'Home',
  components: {
    AdCard
  },
  setup() {
    const router = useRouter()
    const authStore = useAuthStore()
    
    const user = computed(() => authStore.user)
    const loading = ref(true)
    const homeBlocks = ref([])
    const recentAds = ref([])
    const topBanners = ref([])
    const bottomBanners = ref([])

    const loadHomeData = async () => {
      try {
        loading.value = true
        
        // Load blocks
        try {
          const blocksResponse = await api.get('/blocks')
          homeBlocks.value = blocksResponse.data.filter(block => block.active) || []
        } catch (error) {
          console.error('Failed to load blocks:', error)
          // Enhanced fallback data
          homeBlocks.value = [
            { 
              id: 1, 
              title: 'Недвижимость', 
              image: null,
              description: 'Найдите дом своей мечты'
            },
            { 
              id: 2, 
              title: 'Автомобили', 
              image: null,
              description: 'Лучшие предложения авто'
            },
            { 
              id: 3, 
              title: 'Электроника', 
              image: null,
              description: 'Современные гаджеты'
            }
          ]
        }

        // Load recent ads
        try {
          const adsResponse = await api.get('/ads?limit=15')
          recentAds.value = adsResponse.data.data?.filter(item => !item.__banner) || []
        } catch (error) {
          console.error('Failed to load ads:', error)
          recentAds.value = []
        }

        // Load banners
        try {
          const bannersResponse = await api.get('/banners')
          const banners = bannersResponse.data?.filter(banner => banner.active) || []
          
          topBanners.value = banners.filter(banner => banner.position === 'top')
          bottomBanners.value = banners.filter(banner => banner.position === 'bottom' || banner.position === 'middle')
          
          // Enhanced fallback banner
          if (bottomBanners.value.length === 0) {
            bottomBanners.value = [
              {
                id: 'fallback',
                title: 'Реклама здесь',
                image: 'https://via.placeholder.com/600x100/2d2d2d/666?text=Разместите+вашу+рекламу+здесь',
                link: '#'
              }
            ]
          }
        } catch (error) {
          console.error('Failed to load banners:', error)
          bottomBanners.value = [
            {
              id: 'fallback',
              title: 'Реклама здесь',
              image: 'https://via.placeholder.com/600x100/2d2d2d/666?text=Разместите+вашу+рекламу+здесь',
              link: '#'
            }
          ]
        }
      } catch (error) {
        console.error('Failed to load home data:', error)
      } finally {
        loading.value = false
      }
    }

    const navigateToService = (block) => {
      if (block.categoryId) {
        router.push(`/ads?categoryId=${block.categoryId}`)
      } else if (block.service) {
        router.push(`/ads?service=${block.service}`)
      } else {
        router.push('/ads')
      }
    }

    const handleBannerClick = async (banner) => {
      try {
        await api.post(`/banners/${banner.id}/click`)
        if (banner.link && banner.link !== '#') {
          window.open(banner.link, '_blank')
        }
      } catch (error) {
        console.error('Failed to track banner click:', error)
      }
    }

    onMounted(() => {
      loadHomeData()
    })

    return {
      user,
      loading,
      homeBlocks,
      recentAds,
      topBanners,
      bottomBanners,
      navigateToService,
      handleBannerClick
    }
  }
}
</script>

<style scoped>
/* Enhanced Ticker Animation */
.ticker-track {
  display: flex;
  align-items: center;
  height: 56px;
  animation: ticker-scroll 40s infinite linear;
  position: absolute;
  left: 100%;
  white-space: nowrap;
}

@keyframes ticker-scroll {
  0% { transform: translateX(0); }
  100% { transform: translateX(-400%); }
}

/* Enhanced Block Styles */
.big-block, .half-block {
  box-shadow: 
    0 10px 30px rgba(0, 0, 0, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.big-block:hover, .half-block:hover {
  transform: translateY(-4px);
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.5),
    inset 0 1px 0 rgba(255, 255, 255, 0.15);
}

.big-block {
  height: 256px;
}

.half-block {
  height: 224px;
}

.double-blocks {
  display: flex;
  flex-direction: row;
  margin: 0 8px;
}

/* Enhanced Ticker Items */
.ticker-item {
  display: flex;
  align-items: center;
  padding: 8px 16px;
  height: 40px;
  margin: 8px;
  border-radius: 12px;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
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

/* Banner Enhancements */
.ad-banner {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.ad-banner:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.4);
}

.ad-block {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.ad-block:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
}
</style>
