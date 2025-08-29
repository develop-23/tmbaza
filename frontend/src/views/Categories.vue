<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
    <!-- Header -->
    <div class="px-4 lg:px-6 py-6 lg:py-8">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-8 lg:mb-12">
          <h1 class="text-2xl lg:text-4xl font-bold text-slate-900 mb-2 lg:mb-4">Категории</h1>
          <p class="text-slate-600 lg:text-lg">Выберите категорию для поиска объя��лений</p>
          <div class="w-16 lg:w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mx-auto mt-3 lg:mt-4"></div>
        </div>

        <!-- Quick Search -->
        <div class="relative mb-6 lg:mb-8 max-w-2xl mx-auto">
          <input
            v-model="searchTerm"
            type="text"
            placeholder="Поиск категорий..."
            class="w-full pl-10 lg:pl-12 pr-4 py-3 lg:py-4 bg-white rounded-2xl lg:rounded-3xl shadow-sm border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all text-lg lg:text-xl"
          >
          <div class="absolute left-3 lg:left-4 top-1/2 transform -translate-y-1/2 text-slate-400">
            <svg class="w-5 h-5 lg:w-6 lg:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
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

    <!-- Categories Grid -->
    <div v-else class="px-4 lg:px-6 pb-8 lg:pb-12">
      <div class="max-w-6xl mx-auto space-y-4 lg:space-y-6">
        <div 
          v-for="(category, index) in filteredCategories" 
          :key="category.id"
          class="group bg-white rounded-2xl lg:rounded-3xl shadow-sm hover:shadow-xl border border-slate-100 overflow-hidden transition-all duration-300 hover:scale-[1.02] animate-fade-in-up"
          :style="{ animationDelay: `${index * 100}ms` }"
        >
          <!-- Main Category -->
          <div 
            @click="toggleCategory(category)"
            class="flex items-center p-4 lg:p-6 cursor-pointer relative overflow-hidden"
          >
            <!-- Background Pattern -->
            <div class="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300"
                 :class="getCategoryGradient(index)"></div>
            
            <!-- Icon/Image -->
            <div class="relative z-10 flex-shrink-0 mr-4 lg:mr-6">
              <div class="w-16 h-16 lg:w-20 lg:h-20 rounded-2xl lg:rounded-3xl overflow-hidden shadow-lg transition-all duration-300 group-hover:scale-110"
                   :class="getCategoryIconBg(index)">
                <img 
                  v-if="category.image"
                  :src="category.image" 
                  :alt="category.name"
                  class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                >
                <div v-else class="w-full h-full flex items-center justify-center">
                  <svg class="w-8 h-8 lg:w-10 lg:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="getCategoryIcon(category.name)" />
                  </svg>
                </div>
              </div>
            </div>

            <!-- Content -->
            <div class="relative z-10 flex-1 min-w-0">
              <h3 class="font-semibold text-lg lg:text-xl text-slate-900 group-hover:text-blue-600 transition-colors">
                {{ category.name }}
              </h3>
              <div class="flex items-center space-x-4 mt-1 lg:mt-2">
                <p v-if="getSubcategories(category.id).length" class="text-sm lg:text-base text-slate-500">
                  {{ getSubcategories(category.id).length }} подкатегорий
                </p>
                <span v-if="category.adsCount" class="inline-flex items-center px-2 lg:px-3 py-1 rounded-full text-xs lg:text-sm font-medium bg-blue-100 text-blue-800">
                  {{ category.adsCount }} объявлений
                </span>
              </div>
            </div>

            <!-- Expand Icon -->
            <div class="relative z-10 flex items-center ml-2 lg:ml-4">
              <div v-if="getSubcategories(category.id).length" 
                   class="p-2 lg:p-3 rounded-xl lg:rounded-2xl bg-slate-100 group-hover:bg-blue-100 transition-colors">
                <svg 
                  class="w-5 h-5 lg:w-6 lg:h-6 text-slate-600 group-hover:text-blue-600 transition-all duration-300"
                  :class="{ 'rotate-90': expandedCategories.includes(category.id) }"
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </div>
              <div v-else class="p-2 lg:p-3 rounded-xl lg:rounded-2xl bg-slate-100 group-hover:bg-blue-100 transition-colors">
                <svg class="w-5 h-5 lg:w-6 lg:h-6 text-slate-600 group-hover:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </div>
          </div>

          <!-- Subcategories -->
          <div 
            v-if="expandedCategories.includes(category.id) && getSubcategories(category.id).length"
            class="border-t border-slate-100 bg-gradient-to-r from-slate-50 to-blue-50/30"
          >
            <div class="p-2 lg:p-4">
              <!-- Desktop Grid Layout -->
              <div class="hidden lg:grid lg:grid-cols-2 xl:grid-cols-3 gap-3">
                <div 
                  v-for="(subcategory, subIndex) in getSubcategories(category.id)" 
                  :key="subcategory.id"
                  @click.stop="navigateToAds(subcategory)"
                  class="group/sub flex items-center justify-between px-4 py-3 hover:bg-white hover:shadow-sm rounded-xl cursor-pointer transition-all duration-200 hover:scale-[1.02]"
                >
                  <div class="flex items-center flex-1 min-w-0">
                    <div class="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 mr-3 flex-shrink-0"></div>
                    <span class="font-medium text-slate-700 group-hover/sub:text-blue-600 transition-colors truncate">
                      {{ subcategory.name }}
                    </span>
                  </div>
                  
                  <div class="flex items-center space-x-2 ml-2">
                    <span v-if="subcategory.adsCount" class="text-xs text-slate-500 bg-white px-2 py-1 rounded-full">
                      {{ subcategory.adsCount }}
                    </span>
                    <svg class="w-4 h-4 text-slate-400 group-hover/sub:text-blue-500 group-hover/sub:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
              
              <!-- Mobile List Layout -->
              <div class="lg:hidden grid grid-cols-1 gap-2">
                <div 
                  v-for="(subcategory, subIndex) in getSubcategories(category.id)" 
                  :key="subcategory.id"
                  @click.stop="navigateToAds(subcategory)"
                  class="group/sub flex items-center justify-between px-4 py-3 hover:bg-white hover:shadow-sm rounded-xl cursor-pointer transition-all duration-200 hover:scale-[1.02]"
                >
                  <div class="flex items-center flex-1 min-w-0">
                    <div class="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 mr-3 flex-shrink-0"></div>
                    <span class="font-medium text-slate-700 group-hover/sub:text-blue-600 transition-colors truncate">
                      {{ subcategory.name }}
                    </span>
                  </div>
                  
                  <div class="flex items-center space-x-2 ml-2">
                    <span v-if="subcategory.adsCount" class="text-xs text-slate-500 bg-white px-2 py-1 rounded-full">
                      {{ subcategory.adsCount }}
                    </span>
                    <svg class="w-4 h-4 text-slate-400 group-hover/sub:text-blue-500 group-hover/sub:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- No Results -->
      <div v-if="filteredCategories.length === 0" class="text-center py-12 lg:py-16 max-w-2xl mx-auto">
        <div class="w-20 h-20 lg:w-32 lg:h-32 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full flex items-center justify-center mx-auto mb-4 lg:mb-6">
          <svg class="w-10 h-10 lg:w-16 lg:h-16 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <h3 class="text-lg lg:text-xl font-semibold text-slate-900 mb-2">Категории не найдены</h3>
        <p class="text-slate-500 lg:text-lg mb-4 lg:mb-6">Попробуйте изменить поисковый запрос</p>
        <button @click="searchTerm = ''" class="btn-secondary">
          Показать все категории
        </button>
      </div>
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
    const searchTerm = ref('')

    const categoryGradients = [
      'bg-gradient-to-br from-blue-500 to-blue-600',
      'bg-gradient-to-br from-green-500 to-emerald-600',
      'bg-gradient-to-br from-purple-500 to-purple-600',
      'bg-gradient-to-br from-orange-500 to-red-500',
      'bg-gradient-to-br from-pink-500 to-rose-600',
      'bg-gradient-to-br from-indigo-500 to-blue-600',
      'bg-gradient-to-br from-teal-500 to-cyan-600',
      'bg-gradient-to-br from-yellow-500 to-orange-500'
    ]

    const categoryIcons = {
      'Недвижимость': 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
      'Транспорт': 'M8 12V9a4 4 0 118 0m-4 8h0m8-12v0.01M12 14h0m0 4v.01M16 8h0',
      'Электроника': 'M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z',
      'Работа': 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0H8m8 0v2a2 2 0 01-2 2H10a2 2 0 01-2-2V6',
      'Услуги': 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z'
    }

    const parentCategories = computed(() => 
      categories.value.filter(cat => !cat.parentId && cat.active)
    )

    const filteredCategories = computed(() => {
      if (!searchTerm.value) return parentCategories.value
      
      return parentCategories.value.filter(category => 
        category.name.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
        getSubcategories(category.id).some(sub => 
          sub.name.toLowerCase().includes(searchTerm.value.toLowerCase())
        )
      )
    })

    const getSubcategories = (parentId) => 
      categories.value.filter(cat => cat.parentId === parentId && cat.active)

    const getCategoryGradient = (index) => {
      return categoryGradients[index % categoryGradients.length]
    }

    const getCategoryIconBg = (index) => {
      return categoryGradients[index % categoryGradients.length]
    }

    const getCategoryIcon = (categoryName) => {
      for (const [key, icon] of Object.entries(categoryIcons)) {
        if (categoryName.toLowerCase().includes(key.toLowerCase())) {
          return icon
        }
      }
      // Default icon
      return 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10'
    }

    const loadCategories = async () => {
      try {
        loading.value = true
        const response = await api.get('/categories/with-counts')
        categories.value = response.data
      } catch (error) {
        console.error('Failed to load categories:', error)
        // Fallback to regular categories endpoint
        try {
          const response = await api.get('/categories')
          categories.value = response.data
        } catch (fallbackError) {
          console.error('Failed to load categories (fallback):', fallbackError)
          // No toast notification for data loading failures
        }
      } finally {
        loading.value = false
      }
    }

    const toggleCategory = (category) => {
      const subcategories = getSubcategories(category.id)
      
      if (subcategories.length === 0) {
        // No subcategories, navigate directly
        navigateToAds(category)
      } else {
        // Toggle expansion
        const index = expandedCategories.value.indexOf(category.id)
        if (index > -1) {
          expandedCategories.value.splice(index, 1)
        } else {
          expandedCategories.value.push(category.id)
        }
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
      categories: parentCategories,
      expandedCategories,
      searchTerm,
      filteredCategories,
      getSubcategories,
      getCategoryGradient,
      getCategoryIconBg,
      getCategoryIcon,
      toggleCategory,
      navigateToAds
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
