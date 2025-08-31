<template>
  <div 
    class="ad-container"
    @click="$emit('click')"
  >
    <!-- Image Container -->
    <div class="ad-image">
      <img 
        v-if="ad.images && ad.images.length > 0"
        :src="ad.images[0]" 
        :alt="ad.title"
        class="w-full h-full object-cover"
      >
      <div 
        v-else 
        class="w-full h-full bg-[#444] flex items-center justify-center"
      >
        <i class="fas fa-image text-[#666] text-xl"></i>
      </div>
    </div>

    <!-- Content -->
    <div class="ad-content">
      <div class="ad-title">
        {{ ad.title }}
        <span v-if="ad.vip" class="vip-badge">
          <i class="fas fa-crown mr-1"></i>VIP
        </span>
      </div>
      
      <div v-if="ad.price" class="ad-price">
        {{ formatPrice(ad.price) }} TMT
      </div>
      <div v-else class="ad-price">
        Цена не указана
      </div>
      
      <div class="ad-date">
        <span v-if="ad.location">{{ ad.location.name }}, </span>
        {{ formatDate(ad.createdAt) }}
        <span v-if="ad.views" class="float-right">
          <i class="fas fa-eye mr-1"></i>{{ ad.views }}
        </span>
      </div>
    </div>

    <!-- Status badge (for user's own ads) -->
    <div 
      v-if="ad.status && ad.status !== 'active'" 
      class="absolute top-3 right-3 text-xs px-2 py-1 rounded"
      :class="{
        'status-pending': ad.status === 'pending',
        'status-rejected': ad.status === 'rejected'
      }"
    >
      {{ getStatusText(ad.status) }}
    </div>
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
      if (!dateString) return 'Дата не указана'
      
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

    const getStatusText = (status) => {
      switch(status) {
        case 'pending': return 'На модерации'
        case 'rejected': return 'Отклонено'
        case 'active': return 'Активно'
        default: return status
      }
    }

    return {
      formatDate,
      formatPrice,
      getStatusText
    }
  }
}
</script>

<style scoped>
/* Using styles from the main CSS file */
.ad-container {
  position: relative;
}
</style>
