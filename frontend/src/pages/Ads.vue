<template>
  <div>
    <h2>Объявления</h2>
    <div class="toolbar">
      <input v-model="q" class="input" placeholder="Поиск..." @keyup.enter="load" style="max-width:320px"/>
      <select v-model="locationId" @change="load">
        <option value="">Все местоположения</option>
        <option v-for="l in locations" :key="l.id" :value="l.id">{{ l.name }}</option>
      </select>
      <button class="btn" @click="load">Искать</button>
    </div>

    <div class="grid grid-4">
      <template v-for="item in items" :key="keyOf(item)">
        <AdCard v-if="!item.__banner" :ad="item" />
        <BannerInline v-else :b="item" />
      </template>
    </div>

    <div class="toolbar center" style="justify-content:center;margin-top:16px">
      <button class="btn" :disabled="page===1" @click="page--; load()">Назад</button>
      <span style="padding:8px 12px">Стр. {{ page }} / {{ totalPages }}</span>
      <button class="btn" :disabled="page>=totalPages" @click="page++; load()">Вперёд</button>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import api from '@/api'
import AdCard from '@/components/AdCard.vue'
import BannerInline from '@/components/BannerInline.vue'

const route = useRoute()
const q = ref(route.query.q || '')
const locationId = ref(route.query.locationId || '')
const locations = ref([])
const items = ref([])
const page = ref(1)
const limit = ref(20)
const count = ref(0)

const keyOf = (item) => item.__banner ? `bnr-${item.banner.id}-${Math.random()}` : `ad-${item.id}`
const totalPages = computed(() => Math.max(1, Math.ceil(count.value/limit.value)))

const load = async () => {
  const params = { page: page.value, limit: limit.value }
  if (q.value) params.q = q.value
  if (locationId.value) params.locationId = locationId.value
  const res = await api.get('/ads', { params }).then(r=>r.data)
  items.value = res.data
  count.value = res.count
}

onMounted(async () => {
  locations.value = await api.get('/locations').then(r=>r.data)
  await load()
})
</script>