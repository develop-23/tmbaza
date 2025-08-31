<template>
  <div class="min-h-screen dark-bg">
    <!-- Ticker/News Banner -->
    <div class="h-12 overflow-hidden bg-[#2b2b2b] border-b border-[#444] relative">
      <div class="ticker-track dark-text-secondary text-sm">
        <div class="ticker-item bg-[#3a3a3a] rounded px-3 py-2 mx-1">
          Новые объявления каждый день!
        </div>
        <div class="ticker-item bg-[#3a3a3a] rounded px-3 py-2 mx-1">
          VIP-объявления получают больше просмотров
        </div>
        <div class="ticker-item bg-[#3a3a3a] rounded px-3 py-2 mx-1">
          Безопасные сделки через платформу
        </div>
      </div>
    </div>

    <!-- Main Category Block -->
    <div v-if="homeBlocks.length > 0" class="big-block bg-[#333] m-3 h-56 rounded relative overflow-hidden cursor-pointer" @click="navigateToService(homeBlocks[0])">
      <img 
        v-if="homeBlocks[0].image"
        :src="homeBlocks[0].image" 
        :alt="homeBlocks[0].title"
        class="w-full h-full object-cover"
      >
      <div v-else class="w-full h-full bg-gradient-to-br from-[#2e6096] to-[#1d4084] flex items-center justify-center">
        <div class="text-center text-white">
          <i class="fas fa-home text-4xl mb-2"></i>
          <div class="text-lg font-semibold">{{ homeBlocks[0].title }}</div>
        </div>
      </div>
      <div class="block-label blue">{{ homeBlocks[0].title || 'Здесь твоё объявление' }}</div>
      <div v-if="loading" class="absolute inset-0 flex items-center justify-center bg-black/20">
        <div class="loader"></div>
      </div>
    </div>

    <!-- Two Half Blocks -->
    <div v-if="homeBlocks.length > 1" class="double-blocks flex px-1">
      <div 
        v-for="(block, index) in homeBlocks.slice(1, 3)" 
        :key="block.id"
        class="half-block bg-[#333] mx-2 h-52 rounded relative overflow-hidden cursor-pointer flex-1" 
        @click="navigateToService(block)"
      >
        <img 
          v-if="block.image"
          :src="block.image" 
          :alt="block.title"
          class="w-full h-full object-cover"
        >
        <div v-else class="w-full h-full bg-gradient-to-br from-[#4caf50] to-[#2e7d32] flex items-center justify-center">
          <div class="text-center text-white">
            <i class="fas fa-car text-3xl mb-2"></i>
            <div class="text-sm font-semibold">{{ block.title }}</div>
          </div>
        </div>
        <div class="block-label green">{{ block.title || 'Здесь тоже' }}</div>
        <div v-if="loading" class="absolute inset-0 flex items-center justify-center bg-black/20">
          <div class="loader"></div>
        </div>
      </div>
    </div>

    <!-- Recent Ads Section -->
    <div class="mt-6">
      <div class="flex items-center justify-between px-4 py-3 bg-[#252525] border-b border-[#444]">
        <h2 class="text-lg font-medium dark-text">Последние объявления</h2>
        <router-link 
          to="/ads" 
          class="text-[#2e6096] hover:text-[#2a5489] font-medium text-sm flex items-center"
        >
          Все
          <i class="fas fa-chevron-right ml-1 text-xs"></i>
        </router-link>
      </div>
      
      <div v-if="recentAds.length">
        <div 
          v-for="(ad, index) in recentAds.slice(0, 10)" 
          :key="ad.id"
        >
          <AdCard 
            :ad="ad"
            @click="$router.push(`/ads/${ad.id}`)"
          />
          
          <!-- Insert banner after every 3rd ad -->
          <div 
            v-if="(index + 1) % 3 === 0 && bottomBanners.length > 0"
            class="ad-banner cursor-pointer"
            @click="handleBannerClick(bottomBanners[Math.floor(Math.random() * bottomBanners.length)])"
          >
            <img 
              :src="bottomBanners[Math.floor(Math.random() * bottomBanners.length)].image" 
              :alt="bottomBanners[Math.floor(Math.random() * bottomBanners.length)].title"
              class="w-full h-full object-cover"
            >
          </div>
        </div>
      </div>
      
      <div v-else-if="!loading" class="empty-state">
        <p>Нет объявлений, соответствующих вашему запросу</p>
        <router-link 
          v-if="user"
          to="/create-ad" 
          class="btn-primary inline-block mt-4"
        >
          Создать объявление
        </router-link>
      </div>
    </div>

    <!-- Bottom Banner -->
    <div v-if="bottomBanners.length > 0" class="ad-block bg-[#333] m-3 p-4 rounded relative">
      <div class="block-label gray">РЕКЛАМА</div>
      <img 
        :src="bottomBanners[0].image" 
        :alt="bottomBanners[0].title"
        class="w-full h-12 object-cover rounded cursor-pointer"
        @click="handleBannerClick(bottomBanners[0])"
      >
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
          // Fallback data
          homeBlocks.value = [
            { id: 1, title: 'Транспорт', image: null },
            { id: 2, title: 'Электроника', image: null },
            { id: 3, title: 'Недвижимость', image: null }
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
          
          // Fallback banner if none exist
          if (bottomBanners.value.length === 0) {
            bottomBanners.value = [
              {
                id: 'fallback',
                title: 'Реклама',
                image: 'https://via.placeholder.com/600x100/333/666?text=Реклама',
                link: '#'
              }
            ]
          }
        } catch (error) {
          console.error('Failed to load banners:', error)
          bottomBanners.value = [
            {
              id: 'fallback',
              title: 'Реклама',
              image: 'https://via.placeholder.com/600x100/333/666?text=Реклама',
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
        router.push(`/ads?category=${block.categoryId}`)
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
/* Ticker Animation */
.ticker-track {
  display: flex;
  align-items: center;
  height: 48px;
  animation: ticker-scroll 30s infinite linear;
  position: absolute;
  left: 100%;
  white-space: nowrap;
}

@keyframes ticker-scroll {
  0% { transform: translateX(0); }
  100% { transform: translateX(-300%); }
}

/* Block styles from HTML design */
.big-block, .half-block {
  background-color: #333;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  position: relative;
}

.big-block {
  height: 230px;
}

.half-block {
  height: 210px;
}

.double-blocks {
  display: flex;
  flex-direction: row;
  margin: 0 3px;
}

.block-label {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 5px 8px;
  font-size: 10px;
  font-weight: bold;
  text-transform: uppercase;
  color: #fff;
}

.block-label.blue { 
  background-color: #2196f3; 
}

.block-label.green { 
  background-color: #4caf50; 
}

.block-label.gray { 
  background-color: #616161; 
}

.ad-block {
  height: 55px;
  padding: 15px;
}

.ticker-item {
  display: flex;
  align-items: center;
  padding: 0 15px;
  height: 48px;
  background: #3a3a3a;
  margin: 2px;
  border-radius: 4px;
}
</style>
