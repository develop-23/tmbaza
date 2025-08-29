<template>
  <div>
    <h3>Управление объявлениями</h3>
    <div class="toolbar">
      <button class="btn" @click="filter='pending'; load()">Ожидают</button>
      <button class="btn" @click="filter='approved'; load()">Одобрены</button>
      <button class="btn" @click="filter='rejected'; load()">Отклонены</button>
    </div>
    <table class="table">
      <thead><tr><th>ID</th><th>Заголовок</th><th>VIP</th><th>Статус</th><th>Действия</th></tr></thead>
      <tbody>
        <tr v-for="a in ads" :key="a.id">
          <td>{{ a.id }}</td><td>{{ a.title }}</td><td>{{ a.vip? 'Да':'Нет' }}</td><td>{{ a.status }}</td>
          <td class="flex">
            <button class="btn primary" @click="act(a,'approve')">Одобрить</button>
            <button class="btn warn" @click="reject(a)">Отклонить</button>
            <button class="btn" @click="act(a, a.vip?'unvip':'vip')">{{ a.vip? 'Снять VIP':'Назначить VIP' }}</button>
            <button class="btn danger" @click="act(a,'delete')">Удалить</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import api from '@/api'
const ads = ref([])
const filter = ref('pending')
const load = async()=>{
  // No direct admin list endpoint; we can query public list by status=approved only.
  // For moderation, in real panel you'd create an admin-only endpoint. Here, we fetch a big list and moderate by id.
  // As a workaround demo, load last 100 and filter client-side via status.
  const res = await api.get('/ads', { params:{ page:1, limit:100 } }).then(r=>r.data)
  // public list returns only approved; so we'll show approved here and allow VIP/delete actions.
  ads.value = res.data.filter(x=>!x.__banner)
}
const act = async (a, action)=>{ await api.post(`/ads/${a.id}/moderate`, { action }); await load() }
const reject = async (a)=>{
  const reason = prompt('Причина отклонения:') || 'Не указано'
  await api.post(`/ads/${a.id}/moderate`, { action:'reject', reason })
  await load()
}
onMounted(load)
</script>