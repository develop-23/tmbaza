<template>
  <div>
    <h3>Пользователи</h3>
    <table class="table">
      <thead><tr><th>Имя</th><th>Телефон</th><th>Роль</th><th>Статус</th><th>Действия</th></tr></thead>
      <tbody>
        <tr v-for="u in users" :key="u.id">
          <td>{{ u.name }}</td>
          <td>{{ u.phone }}</td>
          <td>{{ u.role }}</td>
          <td>
            <span v-if="u.verified">✅</span><span v-else>❌</span>
            <span v-if="u.blocked" class="badge">blocked</span>
          </td>
          <td class="flex">
            <button class="btn" @click="verify(u)">Вериф.</button>
            <button class="btn warn" @click="block(u)">Блок</button>
            <button class="btn" @click="viewAds(u)">Объявления</button>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-if="ads.length" class="card" style="margin-top:16px">
      <h4>Объявления пользователя</h4>
      <div class="grid grid-4"><AdCard v-for="a in ads" :key="a.id" :ad="a"/></div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import api from '@/api'
import AdCard from '@/components/AdCard.vue'
const users = ref([])
const ads = ref([])
const load = async()=>{ users.value = await api.get('/users').then(r=>r.data) }
const verify = async(u)=>{ await api.patch(`/users/${u.id}/verify`); await load() }
const block = async(u)=>{ await api.patch(`/users/${u.id}/block`); await load() }
const viewAds = async(u)=>{ ads.value = await api.get(`/users/${u.id}/ads`).then(r=>r.data) }
onMounted(load)
</script>