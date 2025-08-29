<template>
  <div v-if="ad">
    <div class="row">
      <div class="col">
        <div class="card">
          <div v-if="media.length" class="center" style="position:relative">
            <div v-if="current.type==='image'">
              <img :src="current.src" style="width:100%;max-height:420px;object-fit:contain"/>
            </div>
            <div v-else>
              <video :src="current.src" controls style="width:100%;max-height:420px"></video>
            </div>
            <div class="toolbar center" style="justify-content:center;margin-top:8px">
              <button class="btn" @click="prev">⟵</button>
              <span>{{ index+1 }} / {{ media.length }}</span>
              <button class="btn" @click="next">⟶</button>
            </div>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card">
          <h2>{{ ad.title }} <span v-if="ad.vip" class="badge">VIP</span></h2>
          <p style="white-space:pre-wrap">{{ ad.description }}</p>
          <div class="toolbar">
            <a class="btn primary" :href="waLink" target="_blank">Написать в WhatsApp</a>
          </div>
          <div style="color:#666;font-size:14px">
            Категория: {{ ad.category?.name || '-' }}<br>
            Местоположение: {{ ad.location?.name || '-' }}
          </div>
        </div>
      </div>
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
const index = ref(0)
const media = computed(()=>{
  if(!ad.value) return []
  const imgs = (ad.value.images||[]).map(src=>({type:'image',src}))
  const vids = (ad.value.videos||[]).map(src=>({type:'video',src}))
  return [...imgs, ...vids]
})
const current = computed(()=> media.value[index.value] || {type:'image',src:''})
const next = ()=>{ index.value = (index.value+1) % Math.max(1, media.value.length) }
const prev = ()=>{ index.value = (index.value-1+media.value.length) % Math.max(1, media.value.length) }

const waLink = computed(()=>{
  const num = settings.value?.whatsappNumber || ''
  const txt = encodeURIComponent(`Здравствуйте! Интересует объявление: ${ad.value?.title} (ID: ${ad.value?.id})`)
  const n = num.replace(/[^\d]/g,'')
  return `https://wa.me/${n}?text=${txt}`
})

onMounted(async () => {
  ad.value = await api.get(`/ads/${route.params.id}`).then(r=>r.data)
  settings.value = await api.get('/settings').then(r=>r.data)
})
</script>