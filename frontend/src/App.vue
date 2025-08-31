<template>
  <div id="app" class="min-h-screen dark-bg">
    <!-- Enhanced Mobile Header -->
    <header v-if="!isAdminRoute" class="mobile-header">
      <div class="header-icon" @click="toggleMenu">
        <i class="fas fa-bars"></i>
      </div>
      <h3>{{ getPageTitle() }}</h3>
      
      <!-- Conditional header action based on page and user status -->
      <div class="header-icon" @click="handleHeaderAction()" v-if="showHeaderAction()">
        <div class="relative">
          <i :class="getHeaderIcon()"></i>
          <!-- Online indicator for logged in users -->
          <div v-if="user" class="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-800 animate-pulse"></div>
        </div>
      </div>
      
      <!-- Empty space to maintain header balance when no action needed -->
      <div v-else class="header-icon opacity-0 pointer-events-none">
        <i class="fas fa-user"></i>
      </div>
    </header>

    <!-- Enhanced Side Menu -->
    <div v-if="!isAdminRoute" class="menu-container custom-scrollbar" :class="{ open: menuOpen }" @click.self="closeMenu">
      <div class="h-full">
        <!-- Menu Header -->
        <div class="p-6 border-b border-gray-700">
          <div class="flex items-center space-x-3">
            <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <span class="text-white font-bold text-lg">T</span>
            </div>
            <div>
              <h3 class="text-lg font-bold text-white">TürkmenBazar</h3>
              <p class="text-sm text-gray-400">Ваш маркетплейс</p>
            </div>
          </div>
        </div>

        <!-- User Section (if logged in) -->
        <div v-if="user" class="p-4 border-b border-gray-700 bg-gradient-to-r from-blue-900/20 to-purple-900/20">
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white font-semibold shadow-lg">
              {{ (user?.name || 'U').charAt(0).toUpperCase() }}
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-semibold text-white truncate">{{ user?.name || 'Пользователь' }}</p>
              <p class="text-xs text-gray-400 truncate">{{ user?.phone || 'Телефон не указан' }}</p>
            </div>
            <div v-if="user?.verified" class="text-blue-400">
              <i class="fas fa-check-circle text-sm"></i>
            </div>
          </div>
        </div>

        <!-- Guest Welcome Section (if not logged in) -->
        <div v-else class="p-4 border-b border-gray-700 bg-gradient-to-r from-purple-900/20 to-pink-900/20">
          <div class="text-center">
            <div class="w-12 h-12 mx-auto mb-2 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center shadow-lg">
              <i class="fas fa-user text-white text-xl"></i>
            </div>
            <p class="text-sm font-semibold text-white">Добро пожаловать!</p>
            <p class="text-xs text-gray-400">Войдите, чтобы создавать объявления</p>
          </div>
        </div>

        <!-- Navigation Links -->
        <div class="py-2">
          <router-link to="/" class="menu-item" :class="{ active: $route.path === '/' }" @click="closeMenu">
            <i class="fas fa-home"></i>
            <span>Главная</span>
            <i class="fas fa-chevron-right ml-auto text-xs opacity-50"></i>
          </router-link>
          
          <router-link to="/ads" class="menu-item" :class="{ active: $route.path.startsWith('/ads') }" @click="closeMenu">
            <i class="fas fa-list"></i>
            <span>Все объявления</span>
            <i class="fas fa-chevron-right ml-auto text-xs opacity-50"></i>
          </router-link>
          
          <router-link to="/categories" class="menu-item" :class="{ active: $route.path.startsWith('/categories') }" @click="closeMenu">
            <i class="fas fa-tags"></i>
            <span>Категории</span>
            <i class="fas fa-chevron-right ml-auto text-xs opacity-50"></i>
          </router-link>
          
          <router-link
            v-if="user"
            to="/my-ads"
            class="menu-item"
            :class="{ active: $route.path.startsWith('/my-ads') }"
            @click="closeMenu"
          >
            <i class="fas fa-user"></i>
            <span>Мои объявления</span>
            <i class="fas fa-chevron-right ml-auto text-xs opacity-50"></i>
          </router-link>
          
          <router-link
            v-if="user"
            to="/create-ad"
            class="menu-item"
            :class="{ active: $route.path.startsWith('/create-ad') }"
            @click="closeMenu"
          >
            <i class="fas fa-plus-circle"></i>
            <span>Подать объявление</span>
            <i class="fas fa-chevron-right ml-auto text-xs opacity-50"></i>
          </router-link>

          <router-link
            v-if="user"
            to="/profile"
            class="menu-item"
            :class="{ active: $route.path.startsWith('/profile') }"
            @click="closeMenu"
          >
            <i class="fas fa-user-circle"></i>
            <span>Мой профиль</span>
            <i class="fas fa-chevron-right ml-auto text-xs opacity-50"></i>
          </router-link>
        </div>

        <!-- Bottom Section -->
        <div class="mt-auto">
          <!-- Auth Section -->
          <div class="p-4 border-t border-gray-700">
            <div class="menu-item" @click="handleAuth">
              <i :class="user ? 'fas fa-sign-out-alt text-red-400' : 'fas fa-sign-in-alt text-green-400'"></i>
              <span>{{ user ? 'Выйти' : 'Войти' }}</span>
              <i class="fas fa-chevron-right ml-auto text-xs opacity-50"></i>
            </div>
          </div>

          <!-- App Info -->
          <div class="p-4 bg-gradient-to-r from-gray-800 to-gray-900">
            <div class="text-center">
              <p class="text-xs text-gray-400 mb-1">TürkmenBazar v1.0</p>
              <div class="flex items-center justify-center space-x-4 text-xs text-gray-500">
                <span class="flex items-center">
                  <i class="fas fa-shield-check mr-1"></i>
                  Безопасно
                </span>
                <span class="flex items-center">
                  <i class="fas fa-bolt mr-1"></i>
                  Быстро
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Enhanced Menu Overlay -->
    <div
      v-if="menuOpen && !isAdminRoute"
      class="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300"
      @click="closeMenu"
    ></div>

    <!-- Admin Layout (unchanged) -->
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

    <!-- Enhanced Floating Action Button -->
    <router-link
      v-if="!isAdminRoute && user && !$route.path.includes('/create-ad')"
      to="/create-ad"
      class="fab"
    >
      <i class="fas fa-plus"></i>
      
      <!-- Ripple Effect -->
      <div class="absolute inset-0 rounded-full bg-white/20 scale-0 group-hover:scale-100 transition-transform duration-300"></div>
      
      <!-- Pulse Animation -->
      <div class="absolute inset-0 rounded-full bg-blue-400/30 animate-ping"></div>
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
      if (path === '/') return '🏠 Главная';
      if (path.startsWith('/ads') && !path.includes('/my-ads')) return '📋 Объявления';
      if (path.startsWith('/categories')) return '🏷️ Категории';
      if (path.startsWith('/my-ads')) return '📝 Мои объявления';
      if (path.startsWith('/create-ad')) return '➕ Подать объявление';
      if (path.startsWith('/edit-ad')) return '✏️ Редактировать';
      if (path.startsWith('/profile')) return '👤 Мой профиль';
      if (path.startsWith('/login')) return '🔐 Вход';
      return 'TürkmenBazar';
    };

    // Determine if header action should be shown
    const showHeaderAction = () => {
      const path = route.path;
      // Don't show login button on homepage
      if (path === '/') return false;
      // Show user icon for logged in users on other pages
      if (user.value) return true;
      // Show login icon for guests on non-home pages
      return path !== '/';
    };

    const getHeaderIcon = () => {
      if (user.value) {
        return 'fas fa-user';
      }
      return 'fas fa-sign-in-alt';
    };

    const handleHeaderAction = () => {
      if (user.value) {
        router.push("/profile");
      } else {
        router.push("/login");
      }
      closeMenu();
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
      showHeaderAction,
      getHeaderIcon,
      handleHeaderAction,
      handleAuth,
      logout,
    };
  },
};
</script>

<style scoped>
/* Enhanced Menu Animations */
.menu-container {
  transform: translateX(-100%);
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.menu-container.open {
  transform: translateX(0);
}

/* Enhanced Header Styling */
.mobile-header {
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}

/* Enhanced FAB */
.fab {
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 64px;
  height: 64px;
  background: linear-gradient(135deg, #2e6096 0%, #4a90e2 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 24px;
  cursor: pointer;
  z-index: 1000;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 
    0 8px 24px rgba(46, 96, 150, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  border: 2px solid rgba(255, 255, 255, 0.1);
  text-decoration: none;
}

.fab:hover {
  transform: translateY(-4px) scale(1.05);
  box-shadow: 
    0 12px 32px rgba(46, 96, 150, 0.5),
    inset 0 1px 0 rgba(255, 255, 255, 0.3);
  background: linear-gradient(135deg, #4a90e2 0%, #2e6096 100%);
}

.fab:active {
  transform: translateY(-2px) scale(1.02);
}

/* Menu item hover effects */
.menu-item {
  position: relative;
  overflow: hidden;
}

.menu-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(46, 96, 150, 0.1), transparent);
  transition: left 0.5s;
}

.menu-item:hover::before {
  left: 100%;
}

/* Smooth transitions for all interactive elements */
.header-icon,
.menu-item {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Enhanced scrollbar for menu */
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: linear-gradient(135deg, #2e6096 0%, #4a90e2 100%);
  border-radius: 3px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(135deg, #4a90e2 0%, #2e6096 100%);
}
</style>
