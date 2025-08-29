<template>
  <div class="min-h-screen">
    <!-- Hero Section with Top Banners -->
    <div v-if="topBanners.length" class="relative mb-6 lg:mb-8">
      <div class="grid gap-4 lg:gap-6">
        <div 
          v-for="banner in topBanners" 
          :key="banner.id"
          @click="handleBannerClick(banner)"
          class="relative cursor-pointer group overflow-hidden rounded-2xl lg:rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <img 
            :src="banner.image" 
            :alt="banner.title"
            class="w-full h-40 lg:h-64 object-cover group-hover:scale-105 transition-transform duration-500"
          >
          <div class="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
          <div class="absolute bottom-4 lg:bottom-6 left-4 lg:left-6 text-white">
            <h3 class="font-semibold text-lg lg:text-2xl">{{ banner.title }}</h3>
          </div>
        </div>
      </div>
    </div>

    <!-- Enhanced Search Bar -->
    <div class="mb-8 lg:mb-12">
      <div class="relative group max-w-4xl mx-auto">
        <div class="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl lg:rounded-3xl blur opacity-20 group-hover:opacity-30 transition-opacity"></div>
        <div class="relative bg-white rounded-2xl lg:rounded-3xl shadow-lg border border-slate-200/50 p-1 lg:p-2">
          <div class="flex items-center">
            <div class="flex-1 relative">
              <input 
                v-model="searchQuery"
                @keyup.enter="searchAds"
                @focus="isSearchFocused = true"
                @blur="isSearchFocused = false"
                type="text" 
                placeholder="Что ищете? Например: iPhone, квартира..."
                class="w-full pl-12 lg:pl-16 pr-4 py-4 lg:py-6 bg-transparent text-slate-900 placeholder-slate-500 focus:outline-none text-lg lg:text-xl font-medium"
              >
              <div class="absolute left-4 lg:left-6 top-1/2 transform -translate-y-1/2 transition-all duration-200"
                   :class="isSearchFocused ? 'text-blue-600 scale-110' : 'text-slate-400'">
                <svg class="w-6 h-6 lg:w-8 lg:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
            <button 
              @click="searchAds"
              class="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-3 lg:p-4 rounded-xl lg:rounded-2xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 hover:scale-105 mr-1"
            >
              <svg class="w-6 h-6 lg:w-8 lg:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Service Blocks -->
    <div v-if="homeBlocks.length" class="mb-8 lg:mb-12">
      <div class="flex items-center justify-between mb-4 lg:mb-6">
        <h2 class="text-xl lg:text-3xl font-bold text-slate-900">Услуги</h2>
        <div class="w-12 lg:w-16 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full"></div>
      </div>
      
      <div class="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-3 lg:gap-6">
        <div 
          v-for="(block, index) in homeBlocks" 
          :key="block.id"
          @click="navigateToService(block)"
          class="group relative overflow-hidden bg-white rounded-2xl lg:rounded-3xl shadow-sm hover:shadow-xl border border-slate-100 cursor-pointer transition-all duration-300 hover:scale-105"
          :style="{ animationDelay: `${index * 100}ms` }"
        >
          <!-- Gradient Overlay -->
          <div class="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
               :class="getBlockGradient(index)"></div>
          
          <div class="relative p-4 lg:p-6">
            <div class="flex flex-col items-center text-center space-y-3 lg:space-y-4">
              <div class="w-16 h-16 lg:w-20 lg:h-20 rounded-2xl lg:rounded-3xl overflow-hidden shadow-lg transition-all duration-300 group-hover:scale-110"
                   :class="getCategoryIconBg(index)">
                <img 
                  v-if="block.image"
                  :src="block.image" 
                  :alt="block.title"
                  class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                >
                <div v-else class="w-full h-full flex items-center justify-center">
                  <svg class="w-8 h-8 lg:w-10 lg:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
              </div>
              
              <div>
                <h3 class="font-semibold text-slate-900 text-sm lg:text-base leading-tight">{{ block.title }}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Recent Ads Section -->
    <div class="mb-8 lg:mb-12">
      <div class="flex items-center justify-between mb-4 lg:mb-6">
        <h2 class="text-xl lg:text-3xl font-bold text-slate-900">Последние объявления</h2>
        <router-link 
          to="/ads" 
          class="text-blue-600 hover:text-blue-700 font-medium text-sm lg:text-base flex items-center group"
        >
          Все
          <svg class="w-4 h-4 lg:w-5 lg:h-5 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </router-link>
      </div>
      
      <div v-if="recentAds.length">
        <!-- Desktop Grid Layout -->
        <div class="hidden lg:grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
          <div 
            v-for="(ad, index) in recentAds" 
            :key="ad.id"
            class="animate-fade-in-up"
            :style="{ animationDelay: `${index * 50}ms` }"
          >
            <AdCard 
              :ad="ad"
              @click="$router.push(`/ads/${ad.id}`)"
            />
          </div>
        </div>
        
        <!-- Mobile List Layout -->
        <div class="lg:hidden space-y-3">
          <div 
            v-for="(ad, index) in recentAds" 
            :key="ad.id"
            class="animate-fade-in-up"
            :style="{ animationDelay: `${index * 50}ms` }"
          >
            <AdCard 
              :ad="ad"
              @click="$router.push(`/ads/${ad.id}`)"
            />
          </div>
        </div>
      </div>
      
      <div v-else class="text-center py-12 lg:py-16">
        <div class="w-20 h-20 lg:w-32 lg:h-32 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full flex items-center justify-center mx-auto mb-4 lg:mb-6">
          <svg class="w-10 h-10 lg:w-16 lg:h-16 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        </div>
        <h3 class="text-lg lg:text-xl font-medium text-slate-900 mb-2">Пока нет объявлений</h3>
        <p class="text-slate-500 mb-4 lg:mb-6 lg:text-lg">Станьте первым, кто разместит объявление!</p>
        <router-link 
          v-if="user"
          to="/create-ad" 
          class="btn-primary inline-block"
        >
          Создать объявление
        </router-link>
      </div>
    </div>

    <!-- Bottom Banners -->
    <div v-if="bottomBanners.length" class="mb-8 lg:mb-12">
      <div class="grid gap-4 lg:gap-6">
        <div 
          v-for="banner in bottomBanners" 
          :key="banner.id"
          @click="handleBannerClick(banner)"
          class="relative cursor-pointer group overflow-hidden rounded-2xl lg:rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <img 
            :src="banner.image" 
            :alt="banner.title"
            class="w-full h-32 lg:h-48 object-cover group-hover:scale-105 transition-transform duration-500"
          >
          <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center py-12 lg:py-16">
      <div class="relative">
        <div class="w-12 h-12 lg:w-16 lg:h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
        <div class="absolute inset-0 border-4 border-transparent border-t-blue-400 rounded-full animate-ping"></div>
      </div>
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
    const searchQuery = ref('')
    const homeBlocks = ref([])
    const recentAds = ref([])
    const topBanners = ref([])
    const bottomBanners = ref([])
    const isSearchFocused = ref(false)

    const blockGradients = [
      'bg-gradient-to-br from-blue-500 to-blue-600',
      'bg-gradient-to-br from-green-500 to-emerald-600',
      'bg-gradient-to-br from-purple-500 to-purple-600',
      'bg-gradient-to-br from-orange-500 to-red-500',
      'bg-gradient-to-br from-pink-500 to-rose-600',
      'bg-gradient-to-br from-indigo-500 to-blue-600',
      'bg-gradient-to-br from-teal-500 to-cyan-600',
      'bg-gradient-to-br from-yellow-500 to-orange-500'
    ]

    const getBlockGradient = (index) => {
      return blockGradients[index % blockGradients.length]
    }

    const getCategoryIconBg = (index) => {
      return blockGradients[index % blockGradients.length]
    }

    const loadHomeData = async () => {
      try {
        loading.value = true
        
        // Load blocks
        const blocksResponse = await api.get('/blocks')
        homeBlocks.value = blocksResponse.data.filter(block => block.active)

        // Load recent ads
        const adsResponse = await api.get('/ads?limit=10')
        recentAds.value = adsResponse.data.data.filter(item => !item.__banner)

        // Load banners
        const bannersResponse = await api.get('/banners')
        const banners = bannersResponse.data.filter(banner => banner.active)
        
        topBanners.value = banners.filter(banner => banner.position === 'top')
        bottomBanners.value = banners.filter(banner => banner.position === 'bottom')
      } catch (error) {
        console.error('Failed to load home data:', error)
        // No toast notification for data loading failures
      } finally {
        loading.value = false
      }
    }

    const searchAds = () => {
      if (searchQuery.value.trim()) {
        router.push(`/ads?q=${encodeURIComponent(searchQuery.value)}`)
      } else {
        router.push('/ads')
      }
    }

    const navigateToService = (block) => {
      if (block.service) {
        router.push(`/ads?service=${block.service}`)
      } else {
        router.push('/ads')
      }
    }

    const handleBannerClick = async (banner) => {
      try {
        await api.post(`/banners/${banner.id}/click`)
        if (banner.link) {
          window.open(banner.link, '_blank')
        }
      } catch (error) {
        console.error('Failed to track banner click:', error)
        // No toast notification for banner click failures
      }
    }

    onMounted(() => {
      loadHomeData()
    })

    return {
      user,
      loading,
      searchQuery,
      homeBlocks,
      recentAds,
      topBanners,
      bottomBanners,
      isSearchFocused,
      searchAds,
      navigateToService,
      handleBannerClick,
      getBlockGradient,
      getCategoryIconBg
    }
  }
}
</script>

<style scoped>
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.6s ease-out forwards;
  opacity: 0;
}
</style>
