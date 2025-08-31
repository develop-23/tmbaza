<template>
  <div class="min-h-screen dark-bg">
    <!-- Enhanced Tab Navigation -->
    <nav class="tabs">
      <ul class="flex">
        <li 
          class="tab"
          :class="{ active: !filters.vip }"
          @click="setTabFilter(false)"
        >
          <i class="fas fa-list mr-2"></i>
          Все
        </li>
        <li 
          class="tab"
          :class="{ active: filters.vip }"
          @click="setTabFilter(true)"
        >
          <i class="fas fa-crown mr-2"></i>
          VIP
        </li>
      </ul>
    </nav>

    <!-- Enhanced Search Container -->
    <div class="search-container">
      <div class="flex items-center">
        <input
          v-model="searchQuery"
          @keyup.enter="search"
          @input="debouncedSearch"
          type="text"
          placeholder="🔍 Поиск по объявлениям..."
          class="search-input"
        />
        <button @click="search" class="search-btn">
          <i class="fas fa-search"></i>
        </button>
      </div>
    </div>

    <!-- Enhanced Filters Container -->
    <div class="filter-container">
      <select
        v-model="filters.locationId"
        @change="search"
        class="filter-select"
      >
        <option value="">📍 Все местоположения</option>
        <option v-for="loc in locations" :key="loc.id" :value="loc.id">
          {{ loc.name }}
        </option>
      </select>

      <select
        v-model="filters.categoryId"
        @change="search"
        class="filter-select"
      >
        <option value="">🏷️ Все категории</option>
        <option v-for="cat in categories" :key="cat.id" :value="cat.id">
          {{ cat.name }}
        </option>
      </select>
    </div>

    <!-- Loading State with Beautiful Animation -->
    <div v-if="loading" class="flex flex-col items-center justify-center py-16">
      <div class="relative">
        <div class="loader"></div>
        <div class="absolute inset-0 animate-ping">
          <div class="w-8 h-8 border-2 border-blue-400 rounded-full opacity-30"></div>
        </div>
      </div>
      <p class="mt-4 text-gray-400 animate-pulse">Загружаем объявления...</p>
    </div>

    <!-- Ads Container with Staggered Animation -->
    <div v-else-if="ads.length > 0" id="adsContainer" class="animate-fade-in">
      <template v-for="(item, index) in ads" :key="item.id || `banner-${index}`">
        <!-- Regular Ad -->
        <div 
          v-if="!item.__banner"
          class="animate-slide-up"
          :style="{ animationDelay: `${index * 0.1}s` }"
        >
          <AdCard
            :ad="item"
            @click="$router.push(`/ads/${item.id}`)"
          />
        </div>

        <!-- Enhanced Banner Ad -->
        <div
          v-else
          @click="handleBannerClick(item.banner)"
          class="ad-banner cursor-pointer m-4 rounded-2xl overflow-hidden relative group"
          :style="{ animationDelay: `${index * 0.1}s` }"
        >
          <!-- Banner Background -->
          <div class="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-blue-900/20"></div>
          
          <!-- Banner Content -->
          <div class="relative p-6 text-center">
            <div class="inline-block px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold rounded-full mb-3 animate-bounce">
              📢 РЕКЛАМА
            </div>
            <img
              :src="item.banner.image"
              :alt="item.banner.title"
              class="w-full h-24 object-cover rounded-xl transition-transform duration-300 group-hover:scale-105"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl"></div>
          </div>
        </div>
      </template>
    </div>

    <!-- Enhanced Empty State -->
    <div v-else class="empty-state">
      <!-- Animated Background Elements -->
      <div class="absolute top-4 left-4 w-12 h-12 bg-blue-500/10 rounded-full animate-bounce" style="animation-delay: 0s;"></div>
      <div class="absolute top-8 right-8 w-8 h-8 bg-green-500/10 rounded-full animate-bounce" style="animation-delay: 0.5s;"></div>
      <div class="absolute bottom-8 left-12 w-6 h-6 bg-purple-500/10 rounded-full animate-bounce" style="animation-delay: 1s;"></div>
      
      <!-- Main Icon -->
      <div class="relative mb-6">
        <div class="w-24 h-24 mx-auto bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center border-2 border-dashed border-gray-600 animate-pulse">
          <i class="fas fa-search text-4xl text-gray-500"></i>
        </div>
        <!-- Floating dots around icon -->
        <div class="absolute -top-2 -right-2 w-4 h-4 bg-blue-500 rounded-full animate-ping"></div>
        <div class="absolute -bottom-2 -left-2 w-3 h-3 bg-green-500 rounded-full animate-ping" style="animation-delay: 0.5s;"></div>
      </div>

      <!-- Enhanced Message -->
      <div class="space-y-4">
        <h3 class="text-2xl font-bold text-gray-300 mb-2">
          🤔 Ничего не найдено
        </h3>
        <p class="text-gray-400 text-lg leading-relaxed max-w-md mx-auto">
          К сожалению, нет объявлений, соответствующих вашему запросу
        </p>
        
        <!-- Search suggestions -->
        <div class="mt-6 p-4 bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-xl border border-gray-700">
          <p class="text-sm text-gray-400 mb-2">💡 Попробуйте:</p>
          <ul class="text-sm text-gray-300 space-y-1">
            <li>• Изменит�� параметры поиска</li>
            <li>• Проверить фильтры</li>
            <li>• Попробовать другие ключевые слова</li>
          </ul>
        </div>

        <!-- Action Buttons -->
        <div class="flex flex-col items-center space-y-3 mt-8">
          <button 
            @click="clearFiltersAndSearch"
            class="btn-primary flex items-center px-6 py-3"
          >
            <i class="fas fa-refresh mr-2"></i>
            Сбросить фильтры
          </button>
          
          <router-link 
            v-if="user"
            to="/create-ad" 
            class="btn-secondary flex items-center px-6 py-3"
          >
            <i class="fas fa-plus mr-2"></i>
            Создать объявление
          </router-link>
        </div>
      </div>

      <!-- Decorative elements -->
      <div class="absolute bottom-4 right-4 text-6xl opacity-5 animate-pulse">
        🏪
      </div>
    </div>

    <!-- Enhanced Pagination -->
    <div v-if="totalPages > 1" class="px-4 py-8">
      <div class="flex items-center justify-center space-x-2">
        <button
          @click="changePage(currentPage - 1)"
          :disabled="currentPage === 1"
          class="btn-secondary text-sm py-3 px-4 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
        >
          <i class="fas fa-chevron-left mr-2"></i>
          Назад
        </button>

        <div class="flex space-x-1">
          <template v-for="page in visiblePages" :key="page">
            <button
              v-if="page !== '...'"
              @click="changePage(page)"
              class="px-4 py-3 text-sm font-medium rounded-xl transition-all duration-300"
              :class="page === currentPage 
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg transform scale-105' 
                : 'text-gray-300 bg-gray-800 hover:bg-gray-700 border border-gray-600'"
            >
              {{ page }}
            </button>
            <span v-else class="px-4 py-3 text-gray-500 flex items-center">
              <i class="fas fa-ellipsis-h"></i>
            </span>
          </template>
        </div>

        <button
          @click="changePage(currentPage + 1)"
          :disabled="currentPage === totalPages"
          class="btn-secondary text-sm py-3 px-4 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
        >
          Далее
          <i class="fas fa-chevron-right ml-2"></i>
        </button>
      </div>

      <div class="text-center mt-4 text-sm text-gray-400">
        <span class="inline-flex items-center px-3 py-1 bg-gray-800 rounded-full">
          <i class="fas fa-list mr-2"></i>
          Страница {{ currentPage }} из {{ totalPages }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAuthStore } from "../store/auth";
import api from "../services/api";
import AdCard from "../components/AdCard.vue";

export default {
  name: "AdsList",
  components: {
    AdCard,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const authStore = useAuthStore();

    const user = computed(() => authStore.user);

    const loading = ref(false);
    const ads = ref([]);
    const categories = ref([]);
    const locations = ref([]);
    const searchQuery = ref(route.query.q || "");
    const currentPage = ref(1);
    const totalPages = ref(1);
    const totalCount = ref(0);

    const filters = ref({
      categoryId: route.query.categoryId || "",
      locationId: route.query.locationId || "",
      vip: route.query.vip === "true",
    });

    // Computed properties
    const visiblePages = computed(() => {
      const pages = [];
      const total = totalPages.value;
      const current = currentPage.value;
      
      if (total <= 7) {
        for (let i = 1; i <= total; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        
        if (current > 4) {
          pages.push('...');
        }
        
        const start = Math.max(2, current - 1);
        const end = Math.min(total - 1, current + 1);
        
        for (let i = start; i <= end; i++) {
          pages.push(i);
        }
        
        if (current < total - 3) {
          pages.push('...');
        }
        
        pages.push(total);
      }
      
      return pages;
    });

    // Debounced search
    let searchTimeout;
    const debouncedSearch = () => {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        search();
      }, 500);
    };

    const loadAds = async () => {
      loading.value = true;

      try {
        const params = {
          page: currentPage.value,
          limit: 20,
        };

        if (searchQuery.value) params.q = searchQuery.value;
        if (filters.value.categoryId) params.categoryId = filters.value.categoryId;
        if (filters.value.locationId) params.locationId = filters.value.locationId;
        if (filters.value.vip) params.vip = true;

        const response = await api.get("/ads", { params });

        ads.value = response.data.data || [];
        totalPages.value = Math.ceil((response.data.count || 0) / 20);
        totalCount.value = response.data.count || 0;
      } catch (error) {
        console.error("Failed to load ads:", error);
        ads.value = [];
      } finally {
        loading.value = false;
      }
    };

    const loadFilters = async () => {
      try {
        const [categoriesRes, locationsRes] = await Promise.all([
          api.get("/categories"),
          api.get("/locations"),
        ]);

        categories.value = categoriesRes.data?.filter(
          (cat) => cat.active && !cat.parentId
        ) || [];
        locations.value = locationsRes.data?.filter(
          (loc) => loc.active && !loc.parentId
        ) || [];
      } catch (error) {
        console.error("Failed to load filters:", error);
        categories.value = [];
        locations.value = [];
      }
    };

    const search = () => {
      currentPage.value = 1;
      updateURL();
      loadAds();
    };

    const setTabFilter = (isVip) => {
      filters.value.vip = isVip;
      search();
    };

    const clearFiltersAndSearch = () => {
      searchQuery.value = '';
      filters.value.categoryId = '';
      filters.value.locationId = '';
      filters.value.vip = false;
      search();
    };

    const changePage = (page) => {
      if (page >= 1 && page <= totalPages.value && page !== '...') {
        currentPage.value = page;
        updateURL();
        loadAds();
        // Scroll to top with smooth animation
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    const updateURL = () => {
      const query = {};
      if (searchQuery.value) query.q = searchQuery.value;
      if (filters.value.categoryId) query.categoryId = filters.value.categoryId;
      if (filters.value.locationId) query.locationId = filters.value.locationId;
      if (filters.value.vip) query.vip = "true";
      if (currentPage.value > 1) query.page = currentPage.value;

      router.replace({ query });
    };

    const handleBannerClick = async (banner) => {
      try {
        await api.post(`/banners/${banner.id}/click`);
        if (banner.link && banner.link !== '#') {
          window.open(banner.link, "_blank");
        }
      } catch (error) {
        console.error("Failed to track banner click:", error);
      }
    };

    // Watch for route changes
    watch(
      () => route.query,
      (newQuery) => {
        searchQuery.value = newQuery.q || "";
        filters.value.categoryId = newQuery.categoryId || "";
        filters.value.locationId = newQuery.locationId || "";
        filters.value.vip = newQuery.vip === "true";
        currentPage.value = parseInt(newQuery.page) || 1;
        loadAds();
      }
    );

    onMounted(() => {
      loadFilters();
      loadAds();
    });

    return {
      user,
      loading,
      ads,
      categories,
      locations,
      searchQuery,
      filters,
      currentPage,
      totalPages,
      totalCount,
      visiblePages,
      debouncedSearch,
      search,
      setTabFilter,
      clearFiltersAndSearch,
      changePage,
      handleBannerClick,
    };
  },
};
</script>

<style scoped>
/* Additional component-specific animations */
@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-slide-up {
  animation: slideUp 0.6s ease-out forwards;
}

/* Stagger children animations */
.animate-slide-up:nth-child(1) { animation-delay: 0.1s; }
.animate-slide-up:nth-child(2) { animation-delay: 0.2s; }
.animate-slide-up:nth-child(3) { animation-delay: 0.3s; }
.animate-slide-up:nth-child(4) { animation-delay: 0.4s; }
.animate-slide-up:nth-child(5) { animation-delay: 0.5s; }
</style>
