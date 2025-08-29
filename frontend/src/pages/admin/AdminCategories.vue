<template>
  <div class="row">
    <div class="col">
      <h3>Категории</h3>
      <table class="table">
        <thead><tr><th>Название</th><th>Родитель</th><th>Сортировка</th><th>Активна</th><th></th></tr></thead>
        <tbody>
          <tr v-for="c in cats" :key="c.id">
            <td>{{ c.name }}</td>
            <td>{{ nameOf(c.parentId) }}</td>
            <td>{{ c.sortOrder }}</td>
            <td>{{ c.active? 'Да':'Нет' }}</td>
            <td class="flex">
              <button class="btn" @click="edit(c)">Изм.</button>
              <button class="btn danger" @click="remove(c)">Удалить</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="col card">
      <h3>{{ form.id? 'Редактировать':'Добавить' }} категорию</h3>
      <label>Название</label>
      <input class="input" v-model="form.name"/>
      <label>Родитель</label>
      <select v-model="form.parentId">
        <option :value="null">(нет)</option>
        <option v-for="c in cats" :key="c.id" :value="c.id">{{ c.name }}</option>
      </select>
      <label>Сортировка</label>
      <input class="input" type="number" v-model.number="form.sortOrder"/>
      <label class="flex"><input type="checkbox" v-model="form.active"/> Активна</label>
      <div class="toolbar">
        <button class="btn primary" @click="save">Сохранить</button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import api from '@/api'
const cats = ref([])
const form = ref({ id:null, name:'', parentId:null, sortOrder:0, active:true })
const load = async()=>{ cats.value = await api.get('/categories').then(r=>r.data) }
const nameOf = (id)=> cats.value.find(x=>x.id===id)?.name || '-'
const edit = (c)=> Object.assign(form.value, c)
const save = async ()=>{
  const body = { name:form.value.name, parentId:form.value.parentId, sortOrder:form.value.sortOrder, active:form.value.active }
  if (form.value.id) await api.patch(`/categories/${form.value.id}`, body)
  else await api.post('/categories', body)
  form.value = { id:null, name:'', parentId:null, sortOrder:0, active:true }
  await load()
}
const remove = async (c)=>{ if(confirm('Удалить?')){ await api.delete(`/categories/${c.id}`); await load() } }
onMounted(load)
</script>