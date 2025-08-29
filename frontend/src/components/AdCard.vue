<template>
  <div 
    class="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl border border-slate-100 cursor-pointer transition-all duration-300 hover:scale-[1.02] overflow-hidden"
    @click="$emit('click')"
  >
    <!-- VIP Badge -->
    <div 
      v-if="ad.vip" 
      class="absolute top-3 left-3 z-10 bg-gradient-to-r from-yellow-400 to-amber-400 text-amber-900 text-xs font-bold px-2.5 py-1 rounded-full shadow-lg"
    >
      <span class="flex items-center">
        <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
        VIP
      </span>
    </div>

    <div class="flex">
      <!-- Image Container -->
      <div class="relative w-24 h-24 flex-shrink-0 overflow-hidden">
        <img 
          v-if="ad.images && ad.images.length > 0"
          :src="ad.images[0]" 
          :alt="ad.title"
          class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        >
        <div 
          v-else 
          class="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center"
        >
          <svg class="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        
        <!-- Image count indicator -->
        <div 
          v-if="ad.images && ad.images.length > 1"
          class="absolute bottom-1 right-1 bg-black/70 text-white text-xs px-1.5 py-0.5 rounded-full backdrop-blur-sm"
        >
          {{ ad.images.length }}
        </div>

        <!-- Gradient overlay on hover -->
        <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      <!-- Content -->
      <div class="flex-1 p-4 min-w-0">
        <div class="space-y-2">
          <!-- Title -->
          <h3 class="font-semibold text-slate-900 line-clamp-2 text-sm leading-snug group-hover:text-blue-600 transition-colors">
            {{ ad.title }}
          </h3>
          
          <!-- Description -->
          <p class="text-slate-600 text-xs line-clamp-2 leading-relaxed">
            {{ ad.description }}
          </p>
          
          <!-- Price -->
          <div v-if="ad.price" class="flex items-center">
            <span class="text-lg font-bold text-green-600">{{ formatPrice(ad.price) }}</span>
            <span class="text-sm text-slate-500 ml-1">TMT</span>
          </div>
          
          <!-- Meta info -->
          <div class="flex items-center justify-between text-xs text-slate-500 pt-1">
            <div class="flex items-center space-x-3">
              <span v-if="ad.location" class="flex items-center">
                <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {{ ad.location.name }}
              </span>
              
              <span v-if="ad.category" class="flex items-center">
                <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
                {{ ad.category.name }}
              </span>
            </div>
            
            <span class="flex items-center">
              <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {{ formatDate(ad.createdAt) }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Hover effect overlay -->
    <div class="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-indigo-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
    
    <!-- Border animation on hover -->
    <div class="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-blue-200 transition-colors duration-300"></div>
  </div>
</template>

<script>
export default {
  name: 'AdCard',
  props: {
    ad: {
      type: Object,
      required: true
    }
  },
  emits: ['click'],
  setup() {
    const formatDate = (dateString) => {
      const date = new Date(dateString)
      const now = new Date()
      const diffTime = Math.abs(now - date)
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      
      if (diffDays === 1) return 'сегодня'
      if (diffDays === 2) return 'вчера'
      if (diffDays <= 7) return `${diffDays} дн. назад`
      if (diffDays <= 30) return `${Math.ceil(diffDays / 7)} нед. назад`
      
      return date.toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'short'
      })
    }

    const formatPrice = (price) => {
      if (!price) return ''
      
      // Convert to number if it's a string
      const numPrice = typeof price === 'string' ? parseFloat(price) : price
      
      // Format with thousands separator
      return numPrice.toLocaleString('ru-RU')
    }

    return {
      formatDate,
      formatPrice
    }
  }
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
