<template>
  <div class="row">
    <div class="col">
      <h3>Реклама</h3>
      <table class="table">
        <thead><tr><th>Название</th><th>Позиция</th><th>Вкл</th><th>Клики</th><th>Действия</th></tr></thead>
        <tbody>
          <tr v-for="b in banners" :key="b.id">
            <td>{{ b.title }}</td>
            <td>{{ b.position }}</td>
            <td>{{ b.active? 'Да':'Нет' }}</td>
            <td>{{ b.clicks }}</td>
            <td class="flex">
              <button class="btn" @click="edit(b)">Изм.</button>
              <button class="btn danger" @click="remove(b)">Удалить</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="col card">
      <h3>{{ form.id? 'Редактировать':'Добавить' }} баннер</h3>
      <label>Название</label>
      <input class="input" v-model="form.title"/>
      <label>Ссылка</label>
      <input class="input" v-model="form.link"/>
      <label>Позиция</label>
      <select v-model="form.position">
        <option value="top">top</option>
        <option value="bottom">bottom</option>
        <option value="inline">inline</option>
      </select>
      <label class="flex"><input type="checkbox" v-model="form.active"/> Включён</label>
      <label>Изображение</label>
      <input type="file" @change="e=>image=e.target.files[0]" accept="image/*"/>
      <div class="toolbar">
        <button class="btn primary" @click="save">Сохранить</button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import api from '@/api'
const banners = ref([])
const form = ref({ id:null, title:'', link:'', position:'top', active:true })
let image = null
const load = async()=>{ banners.value = await api.get('/banners').then(r=>r.data) }
const edit = (b)=>{ Object.assign(form.value, b); image=null }
const remove = async(b)=>{ if(confirm('Удалить?')){ await api.delete(`/banners/${b.id}`); await load() } }
const save = async()=>{
  const fd = new FormData()
  fd.append('title', form.value.title)
  fd.append('link', form.value.link)
  fd.append('position', form.value.position)
  fd.append('active', form.value.active)
  if (image) fd.append('image', image)
  if (form.value.id) await api.patch(`/banners/${form.value.id}`, fd)
  else await api.post('/banners', fd)
  form.value = { id:null, title:'', link:'', position:'top', active:true }
  image = null
  await load()
}
onMounted(load)
</script>