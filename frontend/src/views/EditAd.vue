<template>
  <div v-if="ad" class="p-4 pb-20">
    <h1 class="text-2xl font-bold mb-6">Редактировать объявление</h1>
    
    <form @submit.prevent="updateAd" class="space-y-6">
      <!-- Title -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">
          Название объявления *
        </label>
        <input
          v-model="form.title"
          type="text"
          required
          maxlength="200"
          placeholder="Краткое и понятное название"
          class="input-field"
        >
      </div>

      <!-- Description -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">
          Описание *
        </label>
        <textarea
          v-model="form.description"
          required
          rows="4"
          placeholder="Подробно опишите ваше предложение"
          class="input-field"
        />
      </div>

      <!-- Category -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">
          Категория *
        </label>
        <select v-model="form.categoryId" required class="input-field">
          <option value="">Выберите категорию</option>
          <optgroup v-for="parent in parentCategories" :key="parent.id" :label="parent.name">
            <option :value="parent.id">{{ parent.name }}</option>
            <option 
              v-for="child in getChildCategories(parent.id)" 
              :key="child.id" 
              :value="child.id"
            >
              &nbsp;&nbsp;{{ child.name }}
            </option>
          </optgroup>
        </select>
      </div>

      <!-- Location -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">
          Местоположение *
        </label>
        <select v-model="form.locationId" required class="input-field">
          <option value="">Выберите место</option>
          <optgroup v-for="parent in parentLocations" :key="parent.id" :label="parent.name">
            <option :value="parent.id">{{ parent.name }}</option>
            <option 
              v-for="child in getChildLocations(parent.id)" 
              :key="child.id" 
              :value="child.id"
            >
              &nbsp;&nbsp;{{ child.name }}
            </option>
          </optgroup>
        </select>
      </div>

      <!-- Media Upload -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Фото и видео (максимум {{ mediaLimit }})
        </label>
        
        <div class="grid grid-cols-3 gap-3 mb-3">
          <div 
            v-for="(file, index) in allFiles" 
            :key="index"
            class="relative aspect-square bg-gray-100 rounded-lg overflow-hidden"
          >
            <img 
              v-if="file.type === 'image' || file.type.startsWith('image/')"
              :src="file.url || file.preview" 
              :alt="`Preview ${index}`"
              class="w-full h-full object-cover"
            >
            <video 
              v-else
              :src="file.url || file.preview"
              class="w-full h-full object-cover"
              muted
            />
            <button 
              @click="removeFile(index)"
              type="button"
              class="absolute top-1 right-1 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm hover:bg-red-600"
            >
              ×
            </button>
          </div>
        </div>

        <input 
          ref="fileInput"
          type="file"
          multiple
          accept="image/*,video/*"
          @change="handleFileUpload"
          class="hidden"
        >
        
        <button 
          v-if="allFiles.length < mediaLimit"
          @click="$refs.fileInput.click()"
          type="button"
          class="w-full border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-400 transition-colors"
        >
          <svg class="w-8 h-8 mx-auto mb-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          <span class="text-gray-600">Добавить фото или видео</span>
        </button>
      </div>

      <!-- VIP Request -->
      <div v-if="!ad.vip" class="border-t pt-6">
        <button 
          @click.prevent="requestVip"
          class="w-full bg-yellow-100 text-yellow-800 py-3 px-4 rounded-lg font-medium hover:bg-yellow-200 transition-colors mb-4"
        >
          ⭐ Сделать VIP объявлением
        </button>
      </div>

      <!-- Submit -->
      <div class="flex space-x-3">
        <button 
          type="submit" 
          :disabled="loading"
          class="flex-1 btn-primary disabled:opacity-50"
        >
          {{ loading ? 'Сохранение...' : 'Сохранить изменения' }}
        </button>
        <button 
          @click="$router.go(-1)"
          type="button"
          class="flex-1 btn-secondary"
        >
          Отмена
        </button>
      </div>
    </form>
  </div>

  <!-- Loading -->
  <div v-else class="flex justify-center py-12">
    <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import api from '../services/api'

export default {
  name: 'EditAd',
  setup() {
    const route = useRoute()
    const router = useRouter()
    const toast = useToast()
    
    const loading = ref(false)
    const ad = ref(null)
    const categories = ref([])
    const locations = ref([])
    const existingFiles = ref([])
    const newFiles = ref([])
    const mediaLimit = ref(5)
    
    const form = ref({
      title: '',
      description: '',
      categoryId: '',
      locationId: ''
    })

    const parentCategories = computed(() => 
      categories.value.filter(cat => !cat.parentId)
    )

    const parentLocations = computed(() => 
      locations.value.filter(loc => !loc.parentId)
    )

    const allFiles = computed(() => [...existingFiles.value, ...newFiles.value])

    const getChildCategories = (parentId) => 
      categories.value.filter(cat => cat.parentId === parentId)

    const getChildLocations = (parentId) => 
      locations.value.filter(loc => loc.parentId === parentId)

    const loadData = async () => {
      try {
        const [adRes, categoriesRes, locationsRes, settingsRes] = await Promise.all([
          api.get(`/ads/${route.params.id}`),
          api.get('/categories'),
          api.get('/locations'),
          api.get('/settings')
        ])
        
        ad.value = adRes.data
        categories.value = categoriesRes.data.filter(cat => cat.active)
        locations.value = locationsRes.data.filter(loc => loc.active)
        mediaLimit.value = settingsRes.data.mediaLimit || 5

        // Populate form
        form.value.title = ad.value.title
        form.value.description = ad.value.description
        form.value.categoryId = ad.value.categoryId
        form.value.locationId = ad.value.locationId

        // Load existing media
        const files = []
        if (ad.value.images) {
          ad.value.images.forEach(url => {
            files.push({ type: 'image', url })
          })
        }
        if (ad.value.videos) {
          ad.value.videos.forEach(url => {
            files.push({ type: 'video', url })
          })
        }
        existingFiles.value = files
      } catch (error) {
        console.error('Failed to load data:', error)
        toast.error('Не удалось загрузить данные объявления')
        router.push('/my-ads')
      }
    }

    const handleFileUpload = (event) => {
      const files = Array.from(event.target.files)
      const remainingSlots = mediaLimit.value - allFiles.value.length
      
      if (files.length > remainingSlots) {
        toast.warning(`Можно добавить только ${remainingSlots} файлов`)
        return
      }

      files.forEach(file => {
        if (file.size > 10 * 1024 * 1024) { // 10MB limit
          toast.error(`Файл ${file.name} слишком большой (максимум 10MB)`)
          return
        }

        const reader = new FileReader()
        reader.onload = (e) => {
          newFiles.value.push({
            file,
            preview: e.target.result,
            type: file.type
          })
        }
        reader.readAsDataURL(file)
      })

      // Reset input
      event.target.value = ''
    }

    const removeFile = (index) => {
      if (index < existingFiles.value.length) {
        // Remove existing file
        existingFiles.value.splice(index, 1)
      } else {
        // Remove new file
        const newIndex = index - existingFiles.value.length
        newFiles.value.splice(newIndex, 1)
      }
    }

    const updateAd = async () => {
      loading.value = true
      
      try {
        const formData = new FormData()
        
        formData.append('title', form.value.title)
        formData.append('description', form.value.description)
        formData.append('categoryId', form.value.categoryId)
        formData.append('locationId', form.value.locationId)

        // Add existing media URLs
        existingFiles.value.forEach(file => {
          if (file.type === 'image') {
            formData.append('existingImages', file.url)
          } else {
            formData.append('existingVideos', file.url)
          }
        })

        // Add new files
        newFiles.value.forEach(fileObj => {
          if (fileObj.type.startsWith('image/')) {
            formData.append('images', fileObj.file)
          } else if (fileObj.type.startsWith('video/')) {
            formData.append('videos', fileObj.file)
          }
        })

        await api.put(`/ads/${ad.value.id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })

        toast.success('Объявление обновлено')
        router.push('/my-ads')
      } catch (error) {
        toast.error(error.response?.data?.message || 'Не удалось обновить объявление')
      } finally {
        loading.value = false
      }
    }

   const requestVip = async () => {
  try {
    const response = await api.get(`/ads/${ad.value.id}/request-vip`)
    toast.info(response.data.message)
    
    if (response.data.whatsapp) {
      const whatsappNumber = response.data.whatsapp.replace('+', '')
      const message = `Привет! Хочу сделать VIP объявление: ${ad.value.title} (ID: ${ad.value.id})`
      window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`)
    }
  } catch (error) {
    toast.error('Не удалось отправить запрос на VIP')
  }
}

onMounted(() => {
  loadData()
})

return {
  loading,
  ad,
  form,
  categories,
  locations,
  parentCategories,
  parentLocations,
  allFiles,
  mediaLimit,
  getChildCategories,
  getChildLocations,
  handleFileUpload,
  removeFile,
  updateAd,
  requestVip
}
  }
}
</script>

<style scoped>
.input-field {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 1rem;
}

.input-field:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.btn-primary {
  background-color: #3b82f6;
  color: white;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn-primary:hover {
  background-color: #2563eb;
}

.btn-secondary {
  background-color: #f3f4f6;
  color: #374151;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn-secondary:hover {
  background-color: #e5e7eb;
}
</style>