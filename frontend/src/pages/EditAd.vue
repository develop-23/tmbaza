<template>
  <div v-if="ad" class="card">
    <h2>Редактирование объявления</h2>
    <label>Заголовок</label>
    <input class="input" v-model="ad.title"/>
    <label>Описание</label>
    <textarea rows="4" v-model="ad.description"></textarea>

    <div class="row">
      <div class="col">
        <label>Новые фото</label>
        <input type="file" multiple accept="image/*" @change="e=>images=[...e.target.files]" />
      </div>
      <div class="col">
        <label>Новые видео</label>
        <input type="file" multiple accept="video/*" @change="e=>videos=[...e.target.files]" />
      </div>
    </div>

    <div class="toolbar">
      <button class="btn primary" @click="save">Сохранить (на модерацию)</button>
      <a class="btn warn" :href="waVip" target="_blank">Запрос VIP через WhatsApp</a>
    </div>
  </div>
</template>
<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import api from '@/api'
const route = useRoute()
const ad = ref(null)
const settings = ref(null)
const images = ref([])
const videos = ref([])

const waVip = computed(()=>{
  const num = settings.value?.whatsappNumber || ''
  const txt = encodeURIComponent(`Здравствуйте! Хочу VIP для объявления ID: ${ad.value?.id}`)
  const n = num.replace(/[^\d]/g,'')
  return `https://wa.me/${n}?text=${txt}`
})

const save = async ()=>{
  const fd = new FormData()
  fd.append('title', ad.value.title)
  fd.append('description', ad.value.description)
  images.value.forEach(f=>fd.append('images', f))
  videos.value.forEach(f=>fd.append('videos', f))
  await api.patch(`/ads/${route.params.id}`, fd, { headers:{ 'Content-Type':'multipart/form-data' } })
  alert('Сохранено. Объявление снова отправлено на модерацию.')
}

onMounted(async ()=>{
  ad.value = await api.get(`/ads/${route.params.id}`).then(r=>r.data)
  settings.value = await api.get('/settings').then(r=>r.data)
})
</script>