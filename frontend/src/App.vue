<template>
  <div id="app" class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50">
    <!-- Desktop Header -->
    <header
      v-if="!isAdminRoute"
      class="sticky top-0 z-50 bg-white/95 backdrop-blur-lg border-b border-slate-200/60 shadow-sm"
    >
      <!-- Desktop Navigation -->
      <div class="hidden lg:block">
        <div class="max-w-7xl mx-auto px-6 py-4">
          <div class="flex items-center justify-between">
            <!-- Logo -->
            <router-link 
              to="/" 
              class="flex items-center space-x-3 group"
            >
              <div class="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                <span class="text-white font-bold text-lg">T</span>
              </div>
              <span class="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Türkmenbazar
              </span>
            </router-link>
            
            <!-- Desktop Navigation Links -->
            <nav class="flex items-center space-x-8">
              <router-link
                to="/"
                class="nav-link"
                :class="$route.path === '/' ? 'nav-link-active' : 'nav-link-inactive'"
              >
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Главная
              </router-link>
              
              <router-link
                to="/ads"
                class="nav-link"
                :class="$route.path.startsWith('/ads') ? 'nav-link-active' : 'nav-link-inactive'"
              >
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                Объявления
              </router-link>
              
              <router-link
                to="/categories"
                class="nav-link"
                :class="$route.path.startsWith('/categories') ? 'nav-link-active' : 'nav-link-inactive'"
              >
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
                Категории
              </router-link>
              
              <router-link
                v-if="user"
                to="/my-ads"
                class="nav-link"
                :class="$route.path.startsWith('/my-ads') ? 'nav-link-active' : 'nav-link-inactive'"
              >
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Мои объявления
              </router-link>
            </nav>
            
            <!-- Desktop User Actions -->
            <div class="flex items-center space-x-4">
              <router-link
                v-if="user"
                to="/create-ad"
                class="btn-primary flex items-center"
              >
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
                Создать объявление
              </router-link>
              
              <div v-if="user" class="flex items-center space-x-3">
                <router-link
                  to="/profile"
                  class="flex items-center space-x-2 p-2 hover:bg-slate-100 rounded-xl transition-colors"
                >
                  <div class="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                    <span class="text-white font-semibold text-sm">
                      {{ (user?.name || 'U').charAt(0).toUpperCase() }}
                    </span>
                  </div>
                  <span class="text-sm font-medium text-slate-700">{{ user?.name || 'Пользователь' }}</span>
                </router-link>
              </div>
              
              <router-link
                v-if="!user"
                to="/login"
                class="btn-primary"
              >
                Войти
              </router-link>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Mobile Navigation -->
      <div class="lg:hidden">
        <div class="max-w-md mx-auto px-4 py-3">
          <div class="flex items-center justify-between">
            <router-link 
              to="/" 
              class="flex items-center space-x-2 group"
            >
              <div class="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                <span class="text-white font-bold text-sm">T</span>
              </div>
              <span class="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Türkmenbazar
              </span>
            </router-link>
            
            <div class="flex items-center space-x-2">
              <router-link
                to="/categories"
                class="p-2.5 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 hover:scale-105"
                title="Категории"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </router-link>
              
              <router-link
                v-if="!user"
                to="/login"
                class="btn-primary text-sm py-2 px-4"
              >
                Войти
              </router-link>
              
              <router-link
                v-else
                to="/profile"
                class="p-2.5 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 hover:scale-105 relative"
                title="Профиль"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <!-- Online indicator -->
                <div class="absolute -top-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </header>

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

    <!-- Main Content - Responsive Layout -->
    <main v-else class="w-full">
      <!-- Desktop Layout -->
      <div class="hidden lg:block">
        <div class="max-w-7xl mx-auto px-6">
          <router-view />
        </div>
      </div>
      
      <!-- Mobile Layout -->
      <div class="lg:hidden">
        <div class="max-w-md mx-auto min-h-screen pb-20">
          <router-view />
        </div>
      </div>
    </main>

    <!-- Bottom Navigation (Mobile Only) -->
    <nav
      v-if="!isAdminRoute"
      class="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-t border-slate-200/60 z-50 lg:hidden"
    >
      <div class="max-w-md mx-auto">
        <div class="flex">
          <router-link
            to="/"
            class="flex-1 py-3 px-2 flex flex-col items-center text-xs group relative overflow-hidden"
            :class="$route.path === '/' ? 'text-blue-600' : 'text-slate-600'"
          >
            <div 
              v-if="$route.path === '/'"
              class="absolute inset-0 bg-gradient-to-t from-blue-50 to-transparent opacity-50"
            ></div>
            <div class="relative z-10 group-hover:scale-110 transition-transform duration-200">
              <svg class="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span class="font-medium">Главная</span>
            </div>
          </router-link>
          
          <router-link
            to="/ads"
            class="flex-1 py-3 px-2 flex flex-col items-center text-xs group relative overflow-hidden"
            :class="$route.path.startsWith('/ads') ? 'text-blue-600' : 'text-slate-600'"
          >
            <div 
              v-if="$route.path.startsWith('/ads')"
              class="absolute inset-0 bg-gradient-to-t from-blue-50 to-transparent opacity-50"
            ></div>
            <div class="relative z-10 group-hover:scale-110 transition-transform duration-200">
              <svg class="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              <span class="font-medium">Объявления</span>
            </div>
          </router-link>
          
          <router-link
            to="/categories"
            class="flex-1 py-3 px-2 flex flex-col items-center text-xs group relative overflow-hidden"
            :class="$route.path.startsWith('/categories') ? 'text-blue-600' : 'text-slate-600'"
          >
            <div 
              v-if="$route.path.startsWith('/categories')"
              class="absolute inset-0 bg-gradient-to-t from-blue-50 to-transparent opacity-50"
            ></div>
            <div class="relative z-10 group-hover:scale-110 transition-transform duration-200">
              <svg class="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
              <span class="font-medium">Категории</span>
            </div>
          </router-link>
          
          <router-link
            v-if="user"
            to="/my-ads"
            class="flex-1 py-3 px-2 flex flex-col items-center text-xs group relative overflow-hidden"
            :class="$route.path.startsWith('/my-ads') ? 'text-blue-600' : 'text-slate-600'"
          >
            <div 
              v-if="$route.path.startsWith('/my-ads')"
              class="absolute inset-0 bg-gradient-to-t from-blue-50 to-transparent opacity-50"
            ></div>
            <div class="relative z-10 group-hover:scale-110 transition-transform duration-200">
              <svg class="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span class="font-medium">Мои</span>
            </div>
          </router-link>
          
          <router-link
            v-if="user"
            to="/profile"
            class="flex-1 py-3 px-2 flex flex-col items-center text-xs group relative overflow-hidden"
            :class="$route.path.startsWith('/profile') ? 'text-blue-600' : 'text-slate-600'"
          >
            <div 
              v-if="$route.path.startsWith('/profile')"
              class="absolute inset-0 bg-gradient-to-t from-blue-50 to-transparent opacity-50"
            ></div>
            <div class="relative z-10 group-hover:scale-110 transition-transform duration-200">
              <svg class="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span class="font-medium">Профиль</span>
            </div>
          </router-link>
          
          <router-link
            v-else
            to="/login"
            class="flex-1 py-3 px-2 flex flex-col items-center text-xs group relative overflow-hidden text-slate-600"
          >
            <div class="relative z-10 group-hover:scale-110 transition-transform duration-200">
              <svg class="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
              <span class="font-medium">Войти</span>
            </div>
          </router-link>
        </div>
      </div>
    </nav>

    <!-- Floating Action Button (Mobile Only) -->
    <router-link
      v-if="!isAdminRoute && user && !$route.path.includes('/create-ad')"
      to="/create-ad"
      class="fixed bottom-24 right-4 w-14 h-14 bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-full shadow-lg hover:shadow-xl flex items-center justify-center z-40 hover:scale-110 transition-all duration-300 group lg:hidden"
    >
      <svg class="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
      </svg>
      
      <!-- Ripple effect -->
      <div class="absolute inset-0 rounded-full bg-white/20 scale-0 group-hover:scale-100 transition-transform duration-300"></div>
    </router-link>
  </div>
</template>

<script>
import { computed } from "vue";
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

    const user = computed(() => authStore.user);
    const isAdmin = computed(() => authStore.isAdmin);
    const isOperator = computed(() => authStore.isOperator);
    const isAdminRoute = computed(() => route.path.startsWith("/admin"));

    const logout = () => {
      authStore.logout();
      router.push("/login");
    };

    return {
      user,
      isAdmin,
      isOperator,
      isAdminRoute,
      logout,
    };
  },
};
</script>
