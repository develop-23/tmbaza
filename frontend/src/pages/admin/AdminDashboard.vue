<template>
  <div>
    <h2>Админ-панель</h2>
    <div class="toolbar">
      <router-link class="btn" to="/admin/users">Пользователи</router-link>
      <router-link class="btn" to="/admin/ads">Объявления</router-link>
      <router-link class="btn" to="/admin/categories">Категории</router-link>
      <router-link class="btn" to="/admin/locations">Местоположения</router-link>
      <router-link class="btn" to="/admin/banners">Реклама</router-link>
      <router-link class="btn" to="/admin/settings">Настройки</router-link>
    </div>
    <router-view />
  </div>
</template>
<script setup></script>