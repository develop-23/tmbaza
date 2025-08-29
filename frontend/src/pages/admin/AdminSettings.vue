<template>
  <div class="row">
    <div class="col card">
      <h3>Настройки сайта</h3>
      <label>Лимит медиа на объявление</label>
      <input class="input" type="number" v-model.number="s.mediaLimit"/>
      <label>Частота баннеров (после каждых N объявлений)</label>
      <input class="input" type="number" v-model.number="s.bannerFrequency"/>
      <label>Номер WhatsApp</label>
      <input class="input" v-model="s.whatsappNumber"/>
      <div class="toolbar"><button class="btn primary" @click="save">Сохранить</button></div>
    </div>

    <div class="col card">
      <h3>Пароль администратора/оператора</h3>
      <label>Текущий пароль</label>
      <input class="input" type="password" v-model="pwd.currentPassword"/>
      <label>Новый пароль</label>
      <input class="input" type="password" v-model="pwd.newPassword"/>
      <div class="toolbar"><button class="btn" @click="changePwd">Изменить</button></div>
    </div>

    <div class="col card">
      <h3>Операторы</h3>
      <div class="toolbar">
        <input class="input" placeholder="Имя" v-model="op.name"/>
        <input class="input" placeholder="Логин" v-model="op.username"/>
        <input class="input" placeholder="Пароль" v-model="op.password"/>
        <button class="btn" @click="addOp">Добавить</button>
      </div>
      <table class="table">
        <thead><tr><th>Имя</th><th>Логин</th><th></th></tr></thead>
        <tbody>
          <tr v-for="o in ops" :key="o.id">
            <td>{{ o.name }}</td>
            <td>{{ o.username }}</td>
            <td class="flex">
              <button class="btn" @click="editOp(o)">Изм.</button>
              <button class="btn danger" @click="delOp(o)">Удалить</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import api from '@/api'
const s = ref({ mediaLimit:5, bannerFrequency:30, whatsappNumber:'' })
const pwd = ref({ currentPassword:'', newPassword:'' })
const ops = ref([])
const op = ref({ name:'', username:'', password:'' })

const load = async()=>{
  s.value = await api.get('/settings').then(r=>r.data)
  ops.value = await api.get('/users/operators').then(r=>r.data)
}
const save = async()=>{ await api.patch('/settings', s.value); await load() }
const changePwd = async()=>{ await api.post('/users/change-password', pwd.value); alert('Пароль обновлён') }
const addOp = async()=>{ await api.post('/users/operators', op.value); op.value={ name:'', username:'', password:''}; await load() }
const editOp = async(o)=>{
  const name = prompt('Имя', o.name) || o.name
  const username = prompt('Логин', o.username) || o.username
  const password = prompt('Новый пароль (опционально)')
  await api.patch(`/users/operators/${o.id}`, { name, username, password })
  await load()
}
const delOp = async(o)=>{ if(confirm('Удалить оператора?')){ await api.delete(`/users/operators/${o.id}`); await load() } }

onMounted(load)
</script>