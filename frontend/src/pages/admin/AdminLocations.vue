<template>
  <div class="row">
    <div class="col">
      <h3>Местоположения</h3>
      <table class="table">
        <thead><tr><th>Название</th><th>Родитель</th><th>Сортировка</th><th>Активно</th><th></th></tr></thead>
        <tbody>
          <tr v-for="l in locs" :key="l.id">
            <td>{{ l.name }}</td>
            <td>{{ nameOf(l.parentId) }}</td>
            <td>{{ l.sortOrder }}</td>
            <td>{{ l.active? 'Да':'Нет' }}</td>
            <td class="flex">
              <button class="btn" @click="edit(l)">Изм.</button>
              <button class="btn danger" @click="remove(l)">Удалить</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="col card">
      <h3>{{ form.id? 'Редактировать':'Добавить' }} локацию</h3>
      <label>Название</label>
      <input class="input" v-model="form.name"/>
      <label>Родитель</label>
      <select v-model="form.parentId">
        <option :value="null">(нет)</option>
        <option v-for="l in locs" :key="l.id" :value="l.id">{{ l.name }}</option>
      </select>
      <label>Сортировка</label>
      <input class="input" type="number" v-model.number="form.sortOrder"/>
      <label class="flex"><input type="checkbox" v-model="form.active"/> Активно</label>
      <div class="toolbar">
        <button class="btn primary" @click="save">Сохранить</button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import api from '@/api'
const locs = ref([])
const form = ref({ id:null, name:'', parentId:null, sortOrder:0, active:true })
const load = async()=>{ locs.value = await api.get('/locations').then(r=>r.data) }
const nameOf = (id)=> locs.value.find(x=>x.id===id)?.name || '-'
const edit = (l)=> Object.assign(form.value, l)
const save = async ()=>{
  const body = { name:form.value.name, parentId:form.value.parentId, sortOrder:form.value.sortOrder, active:form.value.active }
  if (form.value.id) await api.patch(`/locations/${form.value.id}`, body)
  else await api.post('/locations', body)
  form.value = { id:null, name:'', parentId:null, sortOrder:0, active:true }
  await load()
}
const remove = async (l)=>{ if(confirm('Удалить?')){ await api.delete(`/locations/${l.id}`); await load() } }
onMounted(load)
</script>