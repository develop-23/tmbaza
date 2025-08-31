<template>
  <div id="app" class="min-h-screen dark-bg dark-text">
    <!-- Mobile Header (Primary Layout) -->
    <header v-if="!isAdminRoute" class="mobile-header">
      <div class="header-icon" @click="toggleMenu">
        <i class="fas fa-bars"></i>
      </div>
      <h3>{{ getPageTitle() }}</h3>
      <div class="header-icon" @click="$router.push('/profile')" v-if="user">
        <i class="fas fa-user"></i>
      </div>
      <div class="header-icon" v-else></div>
    </header>

    <!-- Side Menu -->
    <div v-if="!isAdminRoute" class="menu-container" :class="{ open: menuOpen }" @click.self="closeMenu">
      <div class="bg-[#1c1c1c] h-full">
        <router-link to="/" class="menu-item" :class="{ active: $route.path === '/' }" @click="closeMenu">
          <i class="fas fa-home"></i>
          Главная
        </router-link>
        
        <router-link to="/ads" class="menu-item" :class="{ active: $route.path.startsWith('/ads') }" @click="closeMenu">
          <i class="fas fa-list"></i>
          Все объявления
        </router-link>
        
        <router-link to="/categories" class="menu-item" :class="{ active: $route.path.startsWith('/categories') }" @click="closeMenu">
          <i class="fas fa-tags"></i>
          Категории
        </router-link>
        
        <router-link
          v-if="user"
          to="/my-ads"
          class="menu-item"
          :class="{ active: $route.path.startsWith('/my-ads') }"
          @click="closeMenu"
        >
          <i class="fas fa-user"></i>
          Мои объявления
        </router-link>
        
        <router-link
          v-if="user"
          to="/create-ad"
          class="menu-item"
          :class="{ active: $route.path.startsWith('/create-ad') }"
          @click="closeMenu"
        >
          <i class="fas fa-plus-circle"></i>
          Подать объявление
        </router-link>
        
        <div class="menu-item" @click="handleAuth">
          <i :class="user ? 'fas fa-sign-out-alt' : 'fas fa-sign-in-alt'"></i>
          <span>{{ user ? 'Выйти' : 'Войти' }}</span>
        </div>
      </div>
    </div>

    <!-- Menu Overlay -->
    <div
      v-if="menuOpen && !isAdminRoute"
      class="fixed inset-0 bg-black/50 z-40"
      @click="closeMenu"
    ></div>

    <!-- Admin Layout -->
    <div v-if="isAdminRoute && (isAdmin || isOperator)" class="flex h-screen bg-slate-50">
      <AdminSidebar />

      <!-- Main Content Area -->
      <div class="flex-1 flex flex-col overflow-hidden lg:ml-72">
        <!-- Top Bar -->
        <header class="bg-white/80 backdrop-blur-sm border-b border-slate-200 px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div class="flex items-center space-x-4 lg:hidden">
            <!-- Mobile menu button is now in AdminSidebar component -->
          </div>

          <div class="flex-1"></div>

          <!-- User Menu -->
          <div class="flex items-center space-x-4">
            <div class="flex items-center space-x-3">
              <div class="hidden sm:block text-right">
                <p class="text-sm font-medium text-slate-900">{{ user?.name || 'Администратор' }}</p>
                <p class="text-xs text-slate-600">{{ user?.role === "admin" ? "Администратор" : "Оператор" }}</p>
              </div>
              <div class="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <span class="text-sm font-semibold text-white">
                  {{ (user?.name || 'A').charAt(0).toUpperCase() }}
                </span>
              </div>
            </div>

            <!-- Logout Button -->
            <button
              @click="logout"
              class="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
              title="Выйти"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
              </svg>
            </button>
          </div>
        </header>

        <!-- Main Content -->
        <main class="flex-1 overflow-auto">
          <router-view />
        </main>
      </div>
    </div>

    <!-- Main Content (Mobile First) -->
    <main v-else class="w-full">
      <div class="min-h-screen">
        <router-view />
      </div>
    </main>

    <!-- Floating Action Button (Mobile Only) -->
    <router-link
      v-if="!isAdminRoute && user && !$route.path.includes('/create-ad')"
      to="/create-ad"
      class="fixed bottom-6 right-4 w-14 h-14 bg-[#2e6096] hover:bg-[#2a5489] text-white rounded-full shadow-lg flex items-center justify-center z-30 transition-all duration-300"
    >
      <i class="fas fa-plus text-lg"></i>
    </router-link>
  </div>
</template>

<script>
import { computed, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useAuthStore } from "./store/auth";
import AdminSidebar from "./components/AdminSidebar.vue";

export default {
  name: "App",
  components: {
    AdminSidebar,
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const authStore = useAuthStore();
    
    const menuOpen = ref(false);

    const user = computed(() => authStore.user);
    const isAdmin = computed(() => authStore.isAdmin);
    const isOperator = computed(() => authStore.isOperator);
    const isAdminRoute = computed(() => route.path.startsWith("/admin"));

    const toggleMenu = () => {
      menuOpen.value = !menuOpen.value;
    };

    const closeMenu = () => {
      menuOpen.value = false;
    };

    const getPageTitle = () => {
      const path = route.path;
      if (path === '/') return 'Главная';
      if (path.startsWith('/ads')) return 'Объявления';
      if (path.startsWith('/categories')) return 'Категории';
      if (path.startsWith('/my-ads')) return 'Мои объявления';
      if (path.startsWith('/create-ad')) return 'Подать объявление';
      if (path.startsWith('/edit-ad')) return 'Редактировать';
      if (path.startsWith('/profile')) return 'Мой профиль';
      if (path.startsWith('/login')) return 'Вход';
      return 'TürkmənBazar';
    };

    const handleAuth = () => {
      if (user.value) {
        logout();
      } else {
        router.push("/login");
      }
      closeMenu();
    };

    const logout = () => {
      authStore.logout();
      router.push("/");
    };

    // Close menu when route changes
    router.afterEach(() => {
      closeMenu();
    });

    return {
      user,
      isAdmin,
      isOperator,
      isAdminRoute,
      menuOpen,
      toggleMenu,
      closeMenu,
      getPageTitle,
      handleAuth,
      logout,
    };
  },
};
</script>

<style scoped>
/* Overlay for mobile menu */
.menu-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 40;
}

/* Menu animation */
.menu-container {
  transform: translateX(-100%);
  transition: transform 0.3s ease-in-out;
}

.menu-container.open {
  transform: translateX(0);
}

/* Header styling */
.mobile-header {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.6);
}

/* FAB styling */
.fixed.bottom-6.right-4 {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
}

.fixed.bottom-6.right-4:hover {
  transform: scale(1.1);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.5);
}
</style>
