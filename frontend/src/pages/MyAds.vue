<template>
  <div>
    <h2>Мои объявления</h2>

    <div class="card" style="margin-bottom:16px">
      <h3>Добавить объявление</h3>
      <div class="row">
        <div class="col">
          <label>Заголовок</label>
          <input class="input" v-model="form.title"/>
        </div>
        <div class="col">
          <label>Категория</label>
          <select v-model="form.categoryId">
            <option disabled value="">Выберите...</option>
            <option v-for="c in cats" :key="c.id" :value="c.id" v-if="c.active">{{ c.name }}</option>
          </select>
        </div>
        <div class="col">
          <label>Местоположение</label>
          <select v-model="form.locationId">
            <option disabled value="">Выберите...</option>
            <option v-for="l in locs" :key="l.id" :value="l.id" v-if="l.active">{{ l.name }}</option>
          </select>
        </div>
      </div>
      <label>Описание</label>
      <textarea rows="4" v-model="form.description"></textarea>

      <div class="row">
        <div class="col">
          <label>Фото (до 5)</label>
          <input type="file" multiple accept="image/*" @change="e=>files.images=[...e.target.files]" />
        </div>
        <div class="col">
          <label>Видео (до 5)</label>
          <input type="file" multiple accept="video/*" @change="e=>files.videos=[...e.target.files]" />
        </div>
      </div>

      <label class="flex"><input type="checkbox" v-model="accept" /> <span>Я принимаю условия</span></label>
      <div class="toolbar">
        <button class="btn primary" :disabled="!canSubmit" @click="createAd">Создать</button>
      </div>
      <small style="color:#666">После создания объявление отправится на модерацию.</small>
    </div>

    <div class="grid grid-4">
      <AdCard v-for="a in myAds" :key="a.id" :ad="a" />
    </div>
  </div>
</template>
<script setup>
import { ref, computed, onMounted } from 'vue'
import api from '../api'
import AdCard from '../components/AdCard.vue'

const cats = ref([])
const locs = ref([])
const myAds = ref([])
const me = ref(null)
const accept = ref(false)

const form = ref({ title:'', description:'', categoryId:'', locationId:'' })
const files = ref({ images: [], videos: [] })

const canSubmit = computed(()=> accept.value && form.value.title && form.value.description && form.value.categoryId && form.value.locationId)

const loadMine = async ()=>{
  me.value = await api.get('/users/me').then(r=>r.data).catch(()=>null)
  if (me.value) {
    myAds.value = await api.get(`/users/${me.value.id}/ads`).then(r=>r.data)
  }
}

const createAd = async ()=>{
  const fd = new FormData()
  fd.append('title', form.value.title)
  fd.append('description', form.value.description)
  fd.append('categoryId', form.value.categoryId)
  fd.append('locationId', form.value.locationId)
  files.value.images.forEach(f=>fd.append('images', f))
  files.value.videos.forEach(f=>fd.append('videos', f))
  await api.post('/ads', fd, { headers:{ 'Content-Type':'multipart/form-data' } })
  form.value = { title:'', description:'', categoryId:'', locationId:'' }
  files.value = { images:[], videos:[] }
  accept.value = false
  await loadMine()
}

onMounted(async ()=>{
  cats.value = await api.get('/categories').then(r=>r.data)
  locs.value = await api.get('/locations').then(r=>r.data)
  await loadMine()
})
</script>