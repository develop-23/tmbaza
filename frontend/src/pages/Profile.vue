<template>
  <div class="row">
    <div class="col card">
      <h3>Регистрация (через WhatsApp)</h3>
      <label>Имя</label>
      <input class="input" v-model="reg.name"/>
      <label>Телефон</label>
      <input class="input" v-model="reg.phone" placeholder="+993..."/>
      <div class="toolbar">
        <button class="btn primary" @click="register">Зарегистрироваться</button>
      </div>
      <small v-if="whatsapp">Напишите администратору: <a :href="waAdminLink" target="_blank">{{ whatsapp }}</a></small>
    </div>

    <div class="col card">
      <h3>Вход для пользователя (по номеру)</h3>
      <label>Телефон</label>
      <input class="input" v-model="loginPhone" placeholder="+993..."/>
      <div class="toolbar">
        <button class="btn" @click="login">Войти</button>
      </div>
    </div>

    <div class="col card">
      <h3>Вход администратора/оператора</h3>
      <label>Логин</label>
      <input class="input" v-model="admin.username"/>
      <label>Пароль</label>
      <input class="input" type="password" v-model="admin.password"/>
      <div class="toolbar">
        <button class="btn" @click="adminLogin">Войти</button>
      </div>
    </div>
  </div>

  <div class="card" v-if="me">
    <h3>Профиль</h3>
    <div>Имя: <b>{{ me.name }}</b></div>
    <div>Телефон: <b>{{ me.phone }}</b></div>
    <div>
      Верификация: 
      <span v-if="me.verified">✅ подтверждён</span>
      <span v-else>❌ не подтверждён</span>
      <a class="btn" style="margin-left:8px" :href="waVerifyLink" target="_blank">Запросить верификацию (WhatsApp)</a>
    </div>
    <div class="toolbar" style="margin-top:8px">
      <button class="btn" @click="refreshMe">Обновить профиль</button>
      <button class="btn danger" @click="logout">Выйти</button>
    </div>
  </div>
</template>
<script setup>
import { ref, computed, onMounted } from 'vue'
import api from '@/api'

const whatsapp = ref('')
const reg = ref({ name:'', phone:'' })
const loginPhone = ref('')
const admin = ref({ username:'', password:'' })
const me = ref(null)

const settings = ref(null)
const waAdminLink = computed(()=>{
  const n = (whatsapp.value || '').replace(/[^\d]/g,'')
  const msg = encodeURIComponent('Здравствуйте! Хочу зарегистрироваться/верифицироваться.')
  return `https://wa.me/${n}?text=${msg}`
})
const waVerifyLink = computed(()=>{
  const n = (settings.value?.whatsappNumber || '').replace(/[^\d]/g,'')
  const msg = encodeURIComponent('Здравствуйте! Прошу верифицировать мой аккаунт.')
  return `https://wa.me/${n}?text=${msg}`
})

const refreshMe = async ()=>{ me.value = await api.get('/users/me').then(r=>r.data).catch(()=>null) }

const register = async ()=>{
  const r = await api.post('/auth/register', reg.value).then(r=>r.data)
  whatsapp.value = r.whatsapp
  alert('Регистрация создана. Напишите администратору в WhatsApp для подтверждения.')
}

const login = async ()=>{
  const r = await api.post('/auth/login', { phone: loginPhone.value }).then(r=>r.data)
  localStorage.setItem('token', r.token)
  await refreshMe()
}

const adminLogin = async ()=>{
  const r = await api.post('/auth/admin/login', admin.value).then(r=>r.data)
  localStorage.setItem('token', r.token)
  await refreshMe()
}

const logout = ()=>{ localStorage.removeItem('token'); me.value = null }

onMounted(async ()=>{
  settings.value = await api.get('/settings').then(r=>r.data)
  await refreshMe()
})
</script>