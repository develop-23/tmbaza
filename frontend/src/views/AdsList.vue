<template>
  <div class="min-h-screen dark-bg">
    <!-- Tab Navigation -->
    <nav class="tabs">
      <ul class="flex">
        <li 
          class="tab"
          :class="{ active: !filters.vip }"
          @click="setTabFilter(false)"
        >
          Все
        </li>
        <li 
          class="tab"
          :class="{ active: filters.vip }"
          @click="setTabFilter(true)"
        >
          VIP
        </li>
      </ul>
    </nav>

    <!-- Search Container -->
    <div class="search-container">
      <input
        v-model="searchQuery"
        @keyup.enter="search"
        @input="debouncedSearch"
        type="text"
        placeholder="Поиск по объявлениям"
        class="search-input"
      />
      <button @click="search" class="search-btn">
        <i class="fas fa-search"></i>
      </button>
    </div>

    <!-- Filters Container -->
    <div class="filter-container">
      <select
        v-model="filters.locationId"
        @change="search"
        class="filter-select mb-3"
      >
        <option value="">Все местоположения</option>
        <option v-for="loc in locations" :key="loc.id" :value="loc.id">
          {{ loc.name }}
        </option>
      </select>

      <select
        v-model="filters.categoryId"
        @change="search"
        class="filter-select"
      >
        <option value="">Все категории</option>
        <option v-for="cat in categories" :key="cat.id" :value="cat.id">
          {{ cat.name }}
        </option>
      </select>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center py-8">
      <div class="loader"></div>
    </div>

    <!-- Ads Container -->
    <div v-else-if="ads.length > 0" id="adsContainer">
      <template v-for="(item, index) in ads" :key="item.id || `banner-${index}`">
        <!-- Regular Ad -->
        <div v-if="!item.__banner">
          <AdCard
            :ad="item"
            @click="$router.push(`/ads/${item.id}`)"
          />
        </div>

        <!-- Banner Ad -->
        <div
          v-else
          @click="handleBannerClick(item.banner)"
          class="ad-banner cursor-pointer"
        >
          <img
            :src="item.banner.image"
            :alt="item.banner.title"
            class="w-full h-full object-cover"
          />
        </div>
      </template>
    </div>

    <!-- No Results -->
    <div v-else class="empty-state">
      <p>Нет объявлений, соответствующих вашему запросу</p>
      <router-link 
        v-if="user"
        to="/create-ad" 
        class="btn-primary inline-block mt-4"
      >
        Создать объявление
      </router-link>
    </div>

    <!-- Pagination (if needed) -->
    <div v-if="totalPages > 1" class="px-4 py-6">
      <div class="flex items-center justify-center space-x-2">
        <button
          @click="changePage(currentPage - 1)"
          :disabled="currentPage === 1"
          class="btn-secondary text-sm py-2 px-4 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <i class="fas fa-chevron-left mr-1"></i>
          Назад
        </button>

        <div class="flex space-x-1">
          <template v-for="page in visiblePages" :key="page">
            <button
              v-if="page !== '...'"
              @click="changePage(page)"
              class="px-3 py-2 text-sm font-medium rounded transition-all"
              :class="page === currentPage 
                ? 'bg-[#2e6096] text-white' 
                : 'text-[#eee] bg-[#333] hover:bg-[#444]'"
            >
              {{ page }}
            </button>
            <span v-else class="px-3 py-2 text-[#888]">...</span>
          </template>
        </div>

        <button
          @click="changePage(currentPage + 1)"
          :disabled="currentPage === totalPages"
          class="btn-secondary text-sm py-2 px-4 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Далее
          <i class="fas fa-chevron-right ml-1"></i>
        </button>
      </div>

      <div class="text-center mt-3 text-sm text-[#888]">
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
      changePage,
      handleBannerClick,
    };
  },
};
</script>

<style scoped>
/* Styles are defined in the main CSS file */
</style>
