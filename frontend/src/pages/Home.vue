<template>
  <div>
    <h2>Главная</h2>
    <div class="grid grid-3">
      <Block v-for="b in blocks" :key="b.id" :block="b" />
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import api from '@/api'
import Block from '@/components/Block.vue'

const blocks = ref([])

onMounted(async () => {
  blocks.value = await api.get('/blocks').then(r=>r.data)
})
</script>