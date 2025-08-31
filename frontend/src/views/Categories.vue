<template>
  <div class="min-h-screen dark-bg">
    <!-- Tab Navigation -->
    <nav class="tabs">
      <ul class="flex">
        <li 
          class="tab"
          :class="{ active: currentTab === 'all' }"
          @click="setTab('all')"
        >
          Все
        </li>
        <li 
          class="tab"
          :class="{ active: currentTab === 'popular' }"
          @click="setTab('popular')"
        >
          Популярные
        </li>
        <li 
          class="tab"
          :class="{ active: currentTab === 'services' }"
          @click="setTab('services')"
        >
          Услуги
        </li>
      </ul>
    </nav>

    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center py-8">
      <div class="loader"></div>
    </div>

    <!-- Categories List -->
    <ul v-else class="category-list">
      <li 
        v-for="category in filteredCategories" 
        :key="category.id"
        class="category-item"
        :class="{ expanded: expandedCategories.includes(category.id) }"
        @click="toggleCategory(category)"
      >
        <i :class="getCategoryIcon(category.name)"></i>
        {{ category.name }}
        <i 
          v-if="getSubcategories(category.id).length > 0"
          class="fas fa-chevron-right expand-icon"
          @click.stop="toggleExpansion(category.id)"
        ></i>

        <!-- Subcategories -->
        <ul v-if="getSubcategories(category.id).length > 0" class="subcategories">
          <li 
            v-for="subcategory in getSubcategories(category.id)" 
            :key="subcategory.id"
            class="subcategory-item"
            @click.stop="navigateToAds(subcategory)"
          >
            <i :class="getSubcategoryIcon(subcategory.name)"></i>
            {{ subcategory.name }}
          </li>
        </ul>
      </li>
    </ul>

    <!-- No Results -->
    <div v-if="!loading && filteredCategories.length === 0" class="empty-state">
      <p>Категории не найдены</p>
      <button @click="setTab('all')" class="btn-primary inline-block mt-4">
        Показать все категории
      </button>
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
      'Грузо��ики': 'fas fa-truck',
      'Телефоны': 'fas fa-mobile-alt',
      'Ноутбуки': 'fas fa-laptop',
      'ТВ': 'fas fa-tv',
      'Вакансии': 'fas fa-user-tie',
      'Резюме': 'fas fa-file-alt'
    }

    const parentCategories = computed(() => 
      categories.value.filter(cat => !cat.parentId && cat.active)
    )

    const filteredCategories = computed(() => {
      let cats = parentCategories.value
      
      if (currentTab.value === 'popular') {
        cats = cats.filter(cat => cat.adsCount > 10) // Example filter for popular
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
      return 'fas fa-list' // Default icon
    }

    const getSubcategoryIcon = (subcategoryName) => {
      for (const [key, icon] of Object.entries(subcategoryIcons)) {
        if (subcategoryName.toLowerCase().includes(key.toLowerCase())) {
          return icon
        }
      }
      return 'fas fa-tag' // Default icon
    }

    const loadCategories = async () => {
      try {
        loading.value = true
        
        // Try to load with counts first
        try {
          const response = await api.get('/categories/with-counts')
          categories.value = response.data
        } catch (error) {
          // Fallback to regular categories
          const response = await api.get('/categories')
          categories.value = response.data || []
        }
      } catch (error) {
        console.error('Failed to load categories:', error)
        // Fallback mock data
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
    }

    const toggleCategory = (category) => {
      const subcategories = getSubcategories(category.id)
      
      if (subcategories.length === 0) {
        // No subcategories, navigate directly
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
/* Styles are defined in the main CSS file */
</style>
