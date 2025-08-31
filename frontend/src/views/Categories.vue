<template>
  <div class="min-h-screen dark-bg">
    <!-- Enhanced Tab Navigation -->
    <nav class="tabs">
      <ul class="flex">
        <li 
          class="tab"
          :class="{ active: currentTab === 'all' }"
          @click="setTab('all')"
        >
          <i class="fas fa-list mr-2"></i>
          Все
        </li>
        <li 
          class="tab"
          :class="{ active: currentTab === 'popular' }"
          @click="setTab('popular')"
        >
          <i class="fas fa-fire mr-2"></i>
          Популярные
        </li>
        <li 
          class="tab"
          :class="{ active: currentTab === 'services' }"
          @click="setTab('services')"
        >
          <i class="fas fa-cog mr-2"></i>
          Услуги
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
        <i class="fas fa-tags mr-2"></i>
        Загружаем категории...
      </p>
    </div>

    <!-- Enhanced Categories List -->
    <ul v-else class="category-list animate-fade-in">
      <li 
        v-for="(category, index) in filteredCategories" 
        :key="category.id"
        class="category-item group"
        :class="{ expanded: expandedCategories.includes(category.id) }"
        @click="toggleCategory(category)"
        :style="{ animationDelay: `${index * 0.1}s` }"
      >
        <!-- Background Pattern -->
        <div class="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        <!-- Category Icon -->
        <div class="relative z-10 flex items-center">
          <div class="w-12 h-12 rounded-xl mr-4 flex items-center justify-center transition-all duration-300 group-hover:scale-110"
               :style="{ background: getCategoryGradient(index) }">
            <i :class="getCategoryIcon(category.name)" class="text-white text-xl"></i>
          </div>
          
          <!-- Category Info -->
          <div class="flex-1 min-w-0">
            <div class="flex items-center justify-between">
              <h3 class="font-semibold text-lg text-gray-200 group-hover:text-white transition-colors">
                {{ category.name }}
              </h3>
              <div class="flex items-center space-x-2">
                <!-- Ads Count Badge -->
                <span v-if="category.adsCount" class="inline-flex items-center px-2 py-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-bold rounded-full">
                  {{ category.adsCount }}
                </span>
                <!-- Expand Icon -->
                <i 
                  v-if="getSubcategories(category.id).length > 0"
                  class="fas fa-chevron-right expand-icon transition-transform duration-300 text-gray-400 group-hover:text-white"
                  @click.stop="toggleExpansion(category.id)"
                ></i>
                <i 
                  v-else
                  class="fas fa-arrow-right text-gray-400 group-hover:text-blue-400 transition-colors"
                ></i>
              </div>
            </div>
            <p v-if="getSubcategories(category.id).length" class="text-sm text-gray-500 mt-1">
              {{ getSubcategories(category.id).length }} подкатегорий
            </p>
          </div>
        </div>

        <!-- Enhanced Subcategories -->
        <ul v-if="getSubcategories(category.id).length > 0" class="subcategories">
          <li 
            v-for="(subcategory, subIndex) in getSubcategories(category.id)" 
            :key="subcategory.id"
            class="subcategory-item group/sub"
            @click.stop="navigateToAds(subcategory)"
            :style="{ animationDelay: `${(index * 0.1) + (subIndex * 0.05)}s` }"
          >
            <!-- Background Pattern -->
            <div class="absolute inset-0 bg-gradient-to-r from-green-600/10 to-emerald-600/10 opacity-0 group-hover/sub:opacity-100 transition-opacity duration-300 rounded-lg"></div>
            
            <div class="relative z-10 flex items-center">
              <div class="w-8 h-8 rounded-lg mr-3 bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center transition-all duration-300 group-hover/sub:scale-110">
                <i :class="getSubcategoryIcon(subcategory.name)" class="text-white text-sm"></i>
              </div>
              
              <div class="flex-1 min-w-0">
                <span class="font-medium text-gray-300 group-hover/sub:text-white transition-colors">
                  {{ subcategory.name }}
                </span>
              </div>
              
              <div class="flex items-center space-x-2">
                <span v-if="subcategory.adsCount" class="text-xs text-gray-500 bg-gray-700 px-2 py-1 rounded-full">
                  {{ subcategory.adsCount }}
                </span>
                <i class="fas fa-chevron-right text-xs text-gray-500 group-hover/sub:text-green-400 group-hover/sub:translate-x-1 transition-all"></i>
              </div>
            </div>
          </li>
        </ul>
      </li>
    </ul>

    <!-- Enhanced No Results State -->
    <div v-if="!loading && filteredCategories.length === 0" class="empty-state mx-4 mt-8">
      <!-- Animated Background -->
      <div class="absolute inset-0 bg-gradient-to-br from-purple-900/10 to-pink-900/10 rounded-2xl"></div>
      
      <!-- Content -->
      <div class="relative">
        <!-- Icon with Animation -->
        <div class="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center border-2 border-dashed border-gray-600">
          <i class="fas fa-search text-4xl text-gray-500 animate-pulse"></i>
        </div>
        
        <h3 class="text-2xl font-bold text-gray-300 mb-3">
          🏷️ Категории не найдены
        </h3>
        <p class="text-gray-400 leading-relaxed max-w-sm mx-auto mb-6">
          Попробуйте изменить фильтр или посмотреть все категории
        </p>
        
        <button @click="setTab('all')" class="btn-primary flex items-center px-8 py-4">
          <i class="fas fa-list mr-2"></i>
          Показать все категории
        </button>
      </div>
      
      <!-- Decorative Elements -->
      <div class="absolute top-4 right-4 text-4xl opacity-10 animate-bounce">🏪</div>
      <div class="absolute bottom-4 left-4 text-3xl opacity-10 animate-pulse">🔍</div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import api from '../services/api'

export default {
  name: 'Categories',
  setup() {
    const router = useRouter()
    
    const loading = ref(true)
    const categories = ref([])
    const expandedCategories = ref([])
    const currentTab = ref('all')

    const categoryIcons = {
      'Недвижимость': 'fas fa-building',
      'Транспорт': 'fas fa-car',
      'Электроника': 'fas fa-laptop',
      'Работа': 'fas fa-briefcase',
      'Услуги': 'fas fa-cog',
      'Мода': 'fas fa-tshirt',
      'Спорт': 'fas fa-futbol',
      'Дом': 'fas fa-home',
      'Животные': 'fas fa-paw',
      'Хобби': 'fas fa-guitar'
    }

    const subcategoryIcons = {
      'Квартиры': 'fas fa-home',
      'Дома': 'fas fa-house-user',
      'Коммерческая': 'fas fa-store',
      'Автомобили': 'fas fa-car-side',
      'Мотоциклы': 'fas fa-motorcycle',
      'Грузовики': 'fas fa-truck',
      'Телефоны': 'fas fa-mobile-alt',
      'Ноутбуки': 'fas fa-laptop',
      '��В': 'fas fa-tv',
      'Вакансии': 'fas fa-user-tie',
      'Резюме': 'fas fa-file-alt'
    }

    const categoryGradients = [
      'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
      'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
      'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
      'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
      'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
      'linear-gradient(135deg, #84cc16 0%, #65a30d 100%)',
      'linear-gradient(135deg, #f97316 0%, #ea580c 100%)'
    ]

    const parentCategories = computed(() => 
      categories.value.filter(cat => !cat.parentId && cat.active)
    )

    const filteredCategories = computed(() => {
      let cats = parentCategories.value
      
      if (currentTab.value === 'popular') {
        cats = cats.filter(cat => cat.adsCount > 10)
      } else if (currentTab.value === 'services') {
        cats = cats.filter(cat => 
          cat.name.toLowerCase().includes('услуг') || 
          cat.name.toLowerCase().includes('сервис')
        )
      }
      
      return cats
    })

    const getSubcategories = (parentId) => 
      categories.value.filter(cat => cat.parentId === parentId && cat.active)

    const getCategoryIcon = (categoryName) => {
      for (const [key, icon] of Object.entries(categoryIcons)) {
        if (categoryName.toLowerCase().includes(key.toLowerCase())) {
          return icon
        }
      }
      return 'fas fa-list'
    }

    const getSubcategoryIcon = (subcategoryName) => {
      for (const [key, icon] of Object.entries(subcategoryIcons)) {
        if (subcategoryName.toLowerCase().includes(key.toLowerCase())) {
          return icon
        }
      }
      return 'fas fa-tag'
    }

    const getCategoryGradient = (index) => {
      return categoryGradients[index % categoryGradients.length]
    }

    const loadCategories = async () => {
      try {
        loading.value = true
        
        try {
          const response = await api.get('/categories/with-counts')
          categories.value = response.data
        } catch (error) {
          const response = await api.get('/categories')
          categories.value = response.data || []
        }
      } catch (error) {
        console.error('Failed to load categories:', error)
        // Enhanced fallback mock data
        categories.value = [
          {
            id: 1,
            name: "Транспорт",
            active: true,
            adsCount: 150
          },
          {
            id: 2,
            name: "Недвижимость",
            active: true,
            adsCount: 89
          },
          {
            id: 3,
            name: "Электроника",
            active: true,
            adsCount: 234
          },
          {
            id: 4,
            name: "Работа",
            active: true,
            adsCount: 45
          },
          {
            id: 5,
            name: "Услуги",
            active: true,
            adsCount: 67
          },
          // Subcategories
          {
            id: 101,
            name: "Автомобили",
            parentId: 1,
            active: true,
            adsCount: 120
          },
          {
            id: 102,
            name: "Мотоциклы",
            parentId: 1,
            active: true,
            adsCount: 20
          },
          {
            id: 103,
            name: "Грузовики",
            parentId: 1,
            active: true,
            adsCount: 10
          },
          {
            id: 201,
            name: "Квартиры",
            parentId: 2,
            active: true,
            adsCount: 45
          },
          {
            id: 202,
            name: "Дома",
            parentId: 2,
            active: true,
            adsCount: 30
          },
          {
            id: 203,
            name: "Коммерческая",
            parentId: 2,
            active: true,
            adsCount: 14
          },
          {
            id: 301,
            name: "Телефоны",
            parentId: 3,
            active: true,
            adsCount: 180
          },
          {
            id: 302,
            name: "Ноутбуки",
            parentId: 3,
            active: true,
            adsCount: 34
          },
          {
            id: 303,
            name: "ТВ",
            parentId: 3,
            active: true,
            adsCount: 20
          },
          {
            id: 401,
            name: "Вакансии",
            parentId: 4,
            active: true,
            adsCount: 25
          },
          {
            id: 402,
            name: "Резюме",
            parentId: 4,
            active: true,
            adsCount: 20
          }
        ]
      } finally {
        loading.value = false
      }
    }

    const setTab = (tab) => {
      currentTab.value = tab
      // Close all expanded categories when switching tabs
      expandedCategories.value = []
    }

    const toggleCategory = (category) => {
      const subcategories = getSubcategories(category.id)
      
      if (subcategories.length === 0) {
        navigateToAds(category)
      }
    }

    const toggleExpansion = (categoryId) => {
      const index = expandedCategories.value.indexOf(categoryId)
      if (index > -1) {
        expandedCategories.value.splice(index, 1)
      } else {
        expandedCategories.value.push(categoryId)
      }
    }

    const navigateToAds = (category) => {
      router.push(`/ads?categoryId=${category.id}`)
    }

    onMounted(() => {
      loadCategories()
    })

    return {
      loading,
      categories: filteredCategories,
      expandedCategories,
      currentTab,
      getSubcategories,
      getCategoryIcon,
      getSubcategoryIcon,
      getCategoryGradient,
      setTab,
      toggleCategory,
      toggleExpansion,
      navigateToAds,
      filteredCategories
    }
  }
}
</script>

<style scoped>
/* Enhanced Category Items */
.category-item {
  position: relative;
  overflow: hidden;
  margin: 8px 16px;
  padding: 20px;
  background: linear-gradient(145deg, #2b2b2b 0%, #383838 100%);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 
    0 4px 16px rgba(0, 0, 0, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
}

.category-item:hover {
  transform: translateY(-4px);
  background: linear-gradient(145deg, #383838 0%, #454545 100%);
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.15);
  border-color: rgba(59, 130, 246, 0.3);
}

.expand-icon {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.category-item.expanded .expand-icon {
  transform: rotate(90deg);
}

/* Enhanced Subcategories */
.subcategories {
  display: none;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  space-y: 8px;
}

.category-item.expanded .subcategories {
  display: block;
  animation: slideDown 0.3s ease-out;
}

.subcategory-item {
  position: relative;
  padding: 12px 16px;
  margin: 8px 0;
  background: linear-gradient(145deg, #383838 0%, #454545 100%);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
}

.subcategory-item:hover {
  transform: translateY(-2px);
  background: linear-gradient(145deg, #454545 0%, #525252 100%);
  border-color: rgba(16, 185, 129, 0.3);
}

/* Animations */
@keyframes slideDown {
  from {
    opacity: 0;
    max-height: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    max-height: 500px;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fadeIn 0.6s ease-out;
}

@keyframes fadeIn {
  from { 
    opacity: 0;
    transform: translateY(20px);
  }
  to { 
    opacity: 1;
    transform: translateY(0);
  }
}

/* Staggered entrance animations */
.category-item {
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

.subcategory-item {
  animation: slideUp 0.4s ease-out forwards;
  opacity: 0;
}
</style>
