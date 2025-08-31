<template>
  <!-- Mobile Sidebar Overlay -->
  <div 
    v-if="sidebarOpen" 
    class="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-30 lg:hidden"
    @click="closeSidebar"
  ></div>

  <!-- Sidebar -->
  <aside 
    class="fixed lg:static inset-y-0 left-0 z-40 w-72 transform transition-transform duration-300 ease-in-out lg:translate-x-0"
    :class="sidebarOpen ? 'translate-x-0' : '-translate-x-full'"
  >
    <!-- Sidebar Content -->
    <div class="h-full bg-white border-r border-slate-200 shadow-xl lg:shadow-none overflow-y-auto">
      <!-- Logo/Brand Section -->
      <div class="flex items-center justify-between px-6 py-6 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-white">
        <div class="flex items-center space-x-3">
          <div class="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/>
            </svg>
          </div>
          <div>
            <h2 class="font-bold text-slate-900 text-lg">Admin Panel</h2>
            <p class="text-xs text-slate-500">Türkmenbazar</p>
          </div>
        </div>
        <!-- Mobile Close Button -->
        <button 
          @click="closeSidebar"
          class="lg:hidden p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>

      <!-- Navigation Menu -->
      <nav class="px-4 py-6 space-y-2">
        <!-- Dashboard -->
        <router-link
          to="/admin/dashboard"
          class="nav-item group"
          :class="{ 'active': $route.path === '/admin/dashboard' || $route.path === '/admin' }"
        >
          <div class="nav-icon">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
            </svg>
          </div>
          <span class="nav-text">Панель управления</span>
          <div class="nav-indicator"></div>
        </router-link>

        <!-- Content Management Section -->
        <div class="pt-4">
          <div class="px-3 mb-3">
            <p class="text-xs font-semibold text-slate-500 uppercase tracking-wider">Управление контентом</p>
          </div>

          <!-- Ads -->
          <router-link
            to="/admin/ads"
            class="nav-item group"
            :class="{ 'active': $route.path === '/admin/ads' }"
          >
            <div class="nav-icon">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
              </svg>
            </div>
            <span class="nav-text">Объявления</span>
            <div class="nav-indicator"></div>
            <span v-if="stats.pending > 0" class="nav-badge">{{ stats.pending }}</span>
          </router-link>

          <!-- Categories (Admin only) -->
          <router-link
            v-if="isAdmin"
            to="/admin/categories"
            class="nav-item group"
            :class="{ 'active': $route.path === '/admin/categories' }"
          >
            <div class="nav-icon">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/>
              </svg>
            </div>
            <span class="nav-text">Категории</span>
            <div class="nav-indicator"></div>
          </router-link>

          <!-- Locations (Admin only) -->
          <router-link
            v-if="isAdmin"
            to="/admin/locations"
            class="nav-item group"
            :class="{ 'active': $route.path === '/admin/locations' }"
          >
            <div class="nav-icon">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
            </div>
            <span class="nav-text">Локации</span>
            <div class="nav-indicator"></div>
          </router-link>
        </div>

        <!-- Promotion Section -->
        <div class="pt-4" v-if="isAdmin">
          <div class="px-3 mb-3">
            <p class="text-xs font-semibold text-slate-500 uppercase tracking-wider">Продвижение</p>
          </div>

          <!-- Banners -->
          <router-link
            to="/admin/banners"
            class="nav-item group"
            :class="{ 'active': $route.path === '/admin/banners' }"
          >
            <div class="nav-icon">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
              </svg>
            </div>
            <span class="nav-text">Баннеры</span>
            <div class="nav-indicator"></div>
          </router-link>

          <!-- Blocks -->
          <router-link
            to="/admin/blocks"
            class="nav-item group"
            :class="{ 'active': $route.path === '/admin/blocks' }"
          >
            <div class="nav-icon">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
              </svg>
            </div>
            <span class="nav-text">Блоки контента</span>
            <div class="nav-indicator"></div>
          </router-link>
        </div>

        <!-- User Management Section -->
        <div class="pt-4" v-if="isAdmin">
          <div class="px-3 mb-3">
            <p class="text-xs font-semibold text-slate-500 uppercase tracking-wider">Пользователи</p>
          </div>

          <!-- Users -->
          <router-link
            to="/admin/users"
            class="nav-item group"
            :class="{ 'active': $route.path === '/admin/users' }"
          >
            <div class="nav-icon">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5 0a4 4 0 11-8-2.954"/>
              </svg>
            </div>
            <span class="nav-text">Пользователи</span>
            <div class="nav-indicator"></div>
          </router-link>

          <!-- Operators -->
          <router-link
            to="/admin/operators"
            class="nav-item group"
            :class="{ 'active': $route.path === '/admin/operators' }"
          >
            <div class="nav-icon">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
              </svg>
            </div>
            <span class="nav-text">Операторы</span>
            <div class="nav-indicator"></div>
          </router-link>
        </div>

        <!-- System Section -->
        <div class="pt-4" v-if="isAdmin || isOperator">
          <div class="px-3 mb-3">
            <p class="text-xs font-semibold text-slate-500 uppercase tracking-wider">Система</p>
          </div>

          <!-- Settings -->
          <router-link
            to="/admin/settings"
            class="nav-item group"
            :class="{ 'active': $route.path === '/admin/settings' }"
          >
            <div class="nav-icon">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
            </div>
            <span class="nav-text">Настройки</span>
            <div class="nav-indicator"></div>
          </router-link>
        </div>
      </nav>

      <!-- Footer/Status -->
      <div class="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-200 bg-slate-50">
        <div class="flex items-center space-x-3">
          <div class="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
            <div class="w-2 h-2 bg-white rounded-full animate-pulse"></div>
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-sm font-medium text-slate-900 truncate">Система работает</p>
            <p class="text-xs text-slate-500">Всё в порядке</p>
          </div>
        </div>
      </div>
    </div>
  </aside>

  <!-- Mobile Sidebar Toggle Button -->
  <button
    @click="openSidebar"
    class="lg:hidden fixed top-4 left-4 z-20 p-2 bg-white rounded-lg shadow-lg border border-slate-200 text-slate-600 hover:text-slate-900 transition-colors"
  >
    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
    </svg>
  </button>
</template>

<script>
import { computed, ref, inject } from "vue";
import { useAuthStore } from "../store/auth";

export default {
  name: "AdminSidebar",
  setup() {
    const authStore = useAuthStore();
    const sidebarOpen = ref(false);

    // Mock stats for notification badges
    const stats = ref({
      pending: 3
    });

    const isAdmin = computed(() => authStore.isAdmin);
    const isOperator = computed(() => authStore.isOperator);

    const openSidebar = () => {
      sidebarOpen.value = true;
    };

    const closeSidebar = () => {
      sidebarOpen.value = false;
    };

    return {
      isAdmin,
      isOperator,
      sidebarOpen,
      openSidebar,
      closeSidebar,
      stats
    };
  },
};
</script>

<style scoped>
.nav-item {
  @apply flex items-center px-3 py-2.5 text-sm font-medium rounded-xl transition-all duration-200 relative;
  @apply text-slate-700 hover:text-slate-900 hover:bg-slate-100;
}

.nav-item.active {
  @apply text-blue-700 bg-blue-50 border border-blue-200;
}

.nav-item.active .nav-indicator {
  @apply absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-6 bg-blue-600 rounded-r-full;
}

.nav-icon {
  @apply flex-shrink-0 mr-3 transition-transform duration-200;
}

.nav-item:hover .nav-icon {
  @apply scale-110;
}

.nav-text {
  @apply flex-1;
}

.nav-badge {
  @apply ml-auto px-2 py-0.5 text-xs font-semibold bg-red-500 text-white rounded-full min-w-[1.25rem] text-center;
}

.nav-item.active .nav-badge {
  @apply bg-blue-600;
}

/* Custom scrollbar */
aside::-webkit-scrollbar {
  width: 4px;
}

aside::-webkit-scrollbar-track {
  background: transparent;
}

aside::-webkit-scrollbar-thumb {
  background: rgba(148, 163, 184, 0.3);
  border-radius: 2px;
}

aside::-webkit-scrollbar-thumb:hover {
  background: rgba(148, 163, 184, 0.5);
}
</style>
