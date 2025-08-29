<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
    <!-- Enhanced Search & Filters Header -->
    <div class="sticky top-16 lg:top-20 z-30 bg-white/95 backdrop-blur-lg border-b border-slate-200/60 shadow-sm">
      <div class="p-4 lg:p-6 space-y-4 lg:space-y-6">
        <!-- Main Search -->
        <div class="relative group max-w-4xl mx-auto">
          <div class="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl lg:rounded-3xl blur opacity-10 group-hover:opacity-20 transition-opacity"></div>
          <div class="relative bg-white rounded-2xl lg:rounded-3xl shadow-lg border border-slate-200/50 p-1 lg:p-2">
            <div class="flex items-center">
              <div class="flex-1 relative">
                <input
                  v-model="searchQuery"
                  @keyup.enter="search"
                  @input="debouncedSearch"
                  type="text"
                  placeholder="Поиск объявлений..."
                  class="w-full pl-12 lg:pl-16 pr-4 py-3 lg:py-4 bg-transparent text-slate-900 placeholder-slate-500 focus:outline-none font-medium text-lg lg:text-xl"
                />
                <div class="absolute left-4 lg:left-6 top-1/2 transform -translate-y-1/2 text-slate-400">
                  <svg class="w-5 h-5 lg:w-6 lg:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
              <button 
                @click="search"
                class="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-2.5 lg:p-3 rounded-xl lg:rounded-2xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 hover:scale-105 mr-1"
              >
                <svg class="w-5 h-5 lg:w-6 lg:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Filter Pills -->
        <div class="flex flex-wrap lg:justify-center space-x-2 lg:space-x-4 overflow-x-auto pb-2">
          <!-- Category Filter -->
          <div class="relative flex-shrink-0">
            <select
              v-model="filters.categoryId"
              @change="search"
              class="appearance-none bg-white border border-slate-200 rounded-xl lg:rounded-2xl px-4 lg:px-6 py-2 lg:py-3 pr-8 lg:pr-10 text-sm lg:text-base font-medium text-slate-700 hover:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            >
              <option value="">Все категории</option>
              <option v-for="cat in categories" :key="cat.id" :value="cat.id">
                {{ cat.name }}
              </option>
            </select>
            <div class="absolute right-2 lg:right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <svg class="w-4 h-4 lg:w-5 lg:h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          <!-- Location Filter -->
          <div class="relative flex-shrink-0">
            <select
              v-model="filters.locationId"
              @change="search"
              class="appearance-none bg-white border border-slate-200 rounded-xl lg:rounded-2xl px-4 lg:px-6 py-2 lg:py-3 pr-8 lg:pr-10 text-sm lg:text-base font-medium text-slate-700 hover:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            >
              <option value="">Все места</option>
              <option v-for="loc in locations" :key="loc.id" :value="loc.id">
                {{ loc.name }}
              </option>
            </select>
            <div class="absolute right-2 lg:right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <svg class="w-4 h-4 lg:w-5 lg:h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          <!-- VIP Filter -->
          <button
            @click="toggleVipFilter"
            class="flex-shrink-0 px-4 lg:px-6 py-2 lg:py-3 rounded-xl lg:rounded-2xl text-sm lg:text-base font-medium border transition-all duration-200 hover:scale-105"
            :class="filters.vip 
              ? 'bg-gradient-to-r from-yellow-400 to-amber-400 text-amber-900 border-amber-300 shadow-lg' 
              : 'bg-white text-slate-700 border-slate-200 hover:border-yellow-300'"
          >
            <span class="flex items-center">
              <svg class="w-4 h-4 lg:w-5 lg:h-5 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              VIP
            </span>
          </button>

          <!-- Clear Filters -->
          <button
            v-if="hasActiveFilters"
            @click="clearFilters"
            class="flex-shrink-0 px-3 lg:px-4 py-2 lg:py-3 text-slate-500 hover:text-slate-700 text-sm lg:text-base transition-colors"
          >
            <svg class="w-4 h-4 lg:w-5 lg:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Active Filters Display -->
        <div v-if="hasActiveFilters" class="flex flex-wrap gap-2 lg:justify-center">
          <span v-if="searchQuery" class="inline-flex items-center px-3 py-1 rounded-full text-xs lg:text-sm font-medium bg-blue-100 text-blue-800">
            "{{ searchQuery }}"
            <button @click="searchQuery = ''; search()" class="ml-1 hover:text-blue-600">
              <svg class="w-3 h-3 lg:w-4 lg:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </span>
          
          <span v-if="filters.categoryId" class="inline-flex items-center px-3 py-1 rounded-full text-xs lg:text-sm font-medium bg-green-100 text-green-800">
            {{ getCategoryName(filters.categoryId) }}
            <button @click="filters.categoryId = ''; search()" class="ml-1 hover:text-green-600">
              <svg class="w-3 h-3 lg:w-4 lg:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </span>
          
          <span v-if="filters.locationId" class="inline-flex items-center px-3 py-1 rounded-full text-xs lg:text-sm font-medium bg-purple-100 text-purple-800">
            {{ getLocationName(filters.locationId) }}
            <button @click="filters.locationId = ''; search()" class="ml-1 hover:text-purple-600">
              <svg class="w-3 h-3 lg:w-4 lg:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </span>
          
          <span v-if="filters.vip" class="inline-flex items-center px-3 py-1 rounded-full text-xs lg:text-sm font-medium bg-yellow-100 text-yellow-800">
            VIP только
            <button @click="toggleVipFilter()" class="ml-1 hover:text-yellow-600">
              <svg class="w-3 h-3 lg:w-4 lg:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </span>
        </div>
      </div>
    </div>

    <!-- Results Summary -->
    <div v-if="!loading && ads.length > 0" class="px-4 lg:px-6 py-3 text-sm lg:text-base text-slate-600 max-w-7xl mx-auto">
      Найдено <span class="font-semibold text-slate-900">{{ totalCount }}</span> объявлений
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center py-12 lg:py-16">
      <div class="relative">
        <div class="w-12 h-12 lg:w-16 lg:h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
        <div class="absolute inset-0 border-4 border-transparent border-t-blue-400 rounded-full animate-ping"></div>
      </div>
    </div>

    <!-- Ads Grid -->
    <div v-else-if="ads.length > 0" class="px-4 lg:px-6 pb-4 lg:pb-8 max-w-7xl mx-auto">
      <!-- Desktop Grid Layout -->
      <div class="hidden lg:grid lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
        <template v-for="(item, index) in ads" :key="item.id || `banner-${index}`">
          <!-- Regular Ad -->
          <div 
            v-if="!item.__banner"
            class="animate-fade-in-up"
            :style="{ animationDelay: `${index * 50}ms` }"
          >
            <AdCard
              :ad="item"
              @click="$router.push(`/ads/${item.id}`)"
            />
          </div>

          <!-- Banner Ad -->
          <div
            v-else
            @click="handleBannerClick(item.banner)"
            class="relative cursor-pointer group overflow-hidden rounded-2xl lg:rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in-up col-span-2"
            :style="{ animationDelay: `${index * 50}ms` }"
          >
            <img
              :src="item.banner.image"
              :alt="item.banner.title"
              class="w-full h-32 lg:h-48 object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            <div class="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">
              Реклама
            </div>
          </div>
        </template>
      </div>
      
      <!-- Mobile List Layout -->
      <div class="lg:hidden space-y-3">
        <template v-for="(item, index) in ads" :key="item.id || `banner-${index}`">
          <!-- Regular Ad -->
          <div 
            v-if="!item.__banner"
            class="animate-fade-in-up"
            :style="{ animationDelay: `${index * 50}ms` }"
          >
            <AdCard
              :ad="item"
              @click="$router.push(`/ads/${item.id}`)"
            />
          </div>

          <!-- Banner Ad -->
          <div
            v-else
            @click="handleBannerClick(item.banner)"
            class="relative cursor-pointer group overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in-up"
            :style="{ animationDelay: `${index * 50}ms` }"
          >
            <img
              :src="item.banner.image"
              :alt="item.banner.title"
              class="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            <div class="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">
              Реклама
            </div>
          </div>
        </template>
      </div>
    </div>

    <!-- No Results -->
    <div v-else class="text-center py-12 lg:py-16 px-4 lg:px-6">
      <div class="w-20 h-20 lg:w-32 lg:h-32 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full flex items-center justify-center mx-auto mb-4 lg:mb-6">
        <svg class="w-10 h-10 lg:w-16 lg:h-16 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.175-5.5-3M7 13a4.978 4.978 0 00-1 3c0 .6.1 1.2.3 1.8a9 9 0 006.4 6.4c.6.2 1.2.3 1.8.3 1 0 2-.2 3-1" />
        </svg>
      </div>
      <h3 class="text-lg lg:text-xl font-semibold text-slate-900 mb-2">Объявления не найдены</h3>
      <p class="text-slate-500 mb-6 lg:text-lg">Попробуйте изменить параметры поиска или создайте собственное объявление</p>
      
      <div class="space-y-3 lg:space-x-4 lg:space-y-0 lg:flex lg:justify-center">
        <button @click="clearFilters" class="btn-secondary w-full lg:w-auto">
          Сбросить фильтры
        </button>
        <router-link 
          v-if="user"
          to="/create-ad" 
          class="btn-primary block lg:inline-block"
        >
          Создать объявление
        </router-link>
      </div>
    </div>

    <!-- Pagination -->
    <div v-if="totalPages > 1" class="px-4 lg:px-6 py-6 lg:py-8">
      <div class="flex items-center justify-center space-x-2 lg:space-x-4">
        <button
          @click="changePage(currentPage - 1)"
          :disabled="currentPage === 1"
          class="flex items-center px-4 lg:px-6 py-2 lg:py-3 text-sm lg:text-base font-medium text-slate-700 bg-white border border-slate-300 rounded-xl lg:rounded-2xl hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-105"
        >
          <svg class="w-4 h-4 lg:w-5 lg:h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
          Назад
        </button>

        <div class="flex space-x-1 lg:space-x-2">
          <template v-for="page in visiblePages" :key="page">
            <button
              v-if="page !== '...'"
              @click="changePage(page)"
              class="px-3 lg:px-4 py-2 lg:py-3 text-sm lg:text-base font-medium rounded-xl lg:rounded-2xl transition-all hover:scale-105"
              :class="page === currentPage 
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg' 
                : 'text-slate-700 bg-white hover:bg-slate-50 border border-slate-300'"
            >
              {{ page }}
            </button>
            <span v-else class="px-3 lg:px-4 py-2 lg:py-3 text-slate-400">...</span>
          </template>
        </div>

        <button
          @click="changePage(currentPage + 1)"
          :disabled="currentPage === totalPages"
          class="flex items-center px-4 lg:px-6 py-2 lg:py-3 text-sm lg:text-base font-medium text-slate-700 bg-white border border-slate-300 rounded-xl lg:rounded-2xl hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-105"
        >
          Далее
          <svg class="w-4 h-4 lg:w-5 lg:h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <div class="text-center mt-3 lg:mt-4 text-sm lg:text-base text-slate-500">
        Страница {{ currentPage }} из {{ totalPages }}
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
    const hasActiveFilters = computed(() => {
      return searchQuery.value || filters.value.categoryId || filters.value.locationId || filters.value.vip;
    });

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

    // Helper functions
    const getCategoryName = (id) => {
      const category = categories.value.find(cat => cat.id.toString() === id.toString());
      return category ? category.name : '';
    };

    const getLocationName = (id) => {
      const location = locations.value.find(loc => loc.id.toString() === id.toString());
      return location ? location.name : '';
    };

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

        ads.value = response.data.data;
        totalPages.value = Math.ceil(response.data.count / 20);
        totalCount.value = response.data.count;
      } catch (error) {
        console.error("Failed to load ads:", error);
        // No toast notification for data loading failures
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

        categories.value = categoriesRes.data.filter(
          (cat) => cat.active && !cat.parentId
        );
        locations.value = locationsRes.data.filter(
          (loc) => loc.active && !loc.parentId
        );
      } catch (error) {
        console.error("Failed to load filters:", error);
        // No toast notification for filter loading failures
      }
    };

    const search = () => {
      currentPage.value = 1;
      updateURL();
      loadAds();
    };

    const toggleVipFilter = () => {
      filters.value.vip = !filters.value.vip;
      search();
    };

    const clearFilters = () => {
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
        // Scroll to top
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
        if (banner.link) {
          window.open(banner.link, "_blank");
        }
      } catch (error) {
        console.error("Failed to track banner click:", error);
        // No toast notification for banner click failures
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
      hasActiveFilters,
      visiblePages,
      getCategoryName,
      getLocationName,
      debouncedSearch,
      search,
      toggleVipFilter,
      clearFilters,
      changePage,
      handleBannerClick,
    };
  },
};
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
