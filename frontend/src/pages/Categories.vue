<template>
  <div>
    <h2>Категории</h2>
    <div class="grid grid-3">
      <div class="card" v-for="c in roots" :key="c.id">
        <h3 style="margin:0 0 8px">{{ c.name }}</h3>
        <div v-for="ch in childrenOf(c.id)" :key="ch.id" class="flex" style="justify-content:space-between">
          <div>{{ ch.name }}</div>
          <router-link class="btn" :to="{ path:'/ads', query:{ categoryId: ch.id } }">Показать</router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed, onMounted } from 'vue'
import api from '@/api'
const cats = ref([])
const roots = computed(()=> cats.value.filter(x=>!x.parentId && x.active))
const childrenOf = (pid)=> cats.value.filter(x=>x.parentId===pid && x.active)

onMounted(async ()=>{
  cats.value = await api.get('/categories').then(r=>r.data)
})
</script>