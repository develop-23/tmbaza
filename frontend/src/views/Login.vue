<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
    <!-- Background Pattern -->
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
      <div class="absolute top-1/3 right-1/4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
      <div class="absolute bottom-1/4 left-1/3 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
    </div>

    <div class="relative z-10 w-full max-w-md">
      <!-- Logo/Brand Section -->
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl mb-4 shadow-xl">
          <span class="text-2xl font-bold text-white">T</span>
        </div>
        <h1 class="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
          Türkmenbazar
        </h1>
        <p class="text-slate-600">Войдите в свой аккаунт</p>
      </div>

      <!-- Login Form -->
      <div class="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-8">
        <form @submit.prevent="handleLogin" class="space-y-6">
          <!-- Phone Input -->
          <div class="space-y-2">
            <label class="block text-sm font-semibold text-slate-700">
              Номер телефона
            </label>
            <div class="relative group">
              <div class="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur opacity-20 group-hover:opacity-30 transition-opacity"></div>
              <div class="relative">
                <input
                  v-model="form.phone"
                  type="tel"
                  required
                  placeholder="+993 XX XXX XXX"
                  class="w-full pl-12 pr-4 py-4 bg-white/90 border border-slate-200 rounded-2xl text-slate-900 placeholder-slate-500 focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all duration-200 shadow-sm hover:shadow-md"
                  :class="{ 'border-red-300 focus:border-red-500 focus:ring-red-500/30': phoneError }"
                />
                <div class="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
              </div>
            </div>
            <p v-if="phoneError" class="text-sm text-red-600 flex items-center">
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {{ phoneError }}
            </p>
          </div>

          <!-- Login Button -->
          <button
            type="submit"
            :disabled="loading || !form.phone.trim()"
            class="group relative w-full overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-slate-400 disabled:to-slate-500 text-white font-semibold py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl disabled:shadow-none transition-all duration-300 transform hover:scale-[1.02] active:scale-95 disabled:scale-100 disabled:cursor-not-allowed"
          >
            <!-- Button Background Animation -->
            <div class="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <!-- Loading Spinner -->
            <div v-if="loading" class="flex items-center justify-center">
              <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Вход...
            </div>
            
            <!-- Button Text -->
            <span v-else class="relative z-10 flex items-center justify-center">
              <svg class="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
              Войти
            </span>
          </button>
        </form>

        <!-- Registration Link -->
        <div class="mt-8 text-center">
          <p class="text-slate-600 mb-4">Нет аккаунта?</p>
          <router-link 
            to="/register" 
            class="inline-flex items-center font-semibold text-blue-600 hover:text-blue-700 transition-colors group"
          >
            Зарегистрироваться
            <svg class="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </router-link>
        </div>

        <!-- Admin Link -->
        <div class="mt-6 pt-6 border-t border-slate-200">
          <div class="text-center">
            <router-link
              to="/admin/login"
              class="inline-flex items-center text-sm font-medium text-slate-500 hover:text-slate-700 transition-colors group"
            >
              <svg class="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              Вход для администрации
            </router-link>
          </div>
        </div>
      </div>

      <!-- Features Info -->
      <div class="mt-8 grid grid-cols-2 gap-4 text-center">
        <div class="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
          <div class="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-2">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 class="font-semibold text-slate-900 text-sm">Безопасно</h3>
          <p class="text-xs text-slate-600 mt-1">Защищенная авторизация</p>
        </div>
        
        <div class="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
          <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-2">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 class="font-semibold text-slate-900 text-sm">Быстро</h3>
          <p class="text-xs text-slate-600 mt-1">Мгновенный доступ</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import { useAuthStore } from "../store/auth";

export default {
  name: "Login",
  setup() {
    const router = useRouter();
    const toast = useToast();
    const authStore = useAuthStore();

    const loading = ref(false);
    const phoneError = ref('');
    
    const form = ref({
      phone: "",
    });

    const validatePhone = () => {
      phoneError.value = '';
      
      if (!form.value.phone) {
        phoneError.value = 'Номер телефона обязателен';
        return false;
      }
      
      const phoneRegex = /^\+?[1-9]\d{1,14}$/;
      if (!phoneRegex.test(form.value.phone.replace(/\s/g, ''))) {
        phoneError.value = 'Неверный формат номера телефона';
        return false;
      }
      
      return true;
    };

    const handleLogin = async () => {
      if (!validatePhone()) return;
      
      loading.value = true;
      phoneError.value = '';

      try {
        const result = await authStore.login(form.value);

        if (result.success) {
          toast.success("Добро пожаловать!", {
            icon: "🎉"
          });
          
          // Redirect to previous page or home
          const redirect = router.currentRoute.value.query.redirect || '/';
          router.push(redirect);
        } else {
          phoneError.value = result.message || 'Ошибка входа';
          toast.error(result.message || "Ошибка входа");
        }
      } catch (error) {
        phoneError.value = 'Произошла ошибка при входе';
        toast.error("Произошла ошибка при входе");
      } finally {
        loading.value = false;
      }
    };

    return {
      form,
      loading,
      phoneError,
      handleLogin,
    };
  },
};
</script>

<style scoped>
@keyframes blob {
  0% {
    transform: translate(0px, 0px) scale(1);
  }
  33% {
    transform: translate(30px, -50px) scale(1.1);
  }
  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }
  100% {
    transform: translate(0px, 0px) scale(1);
  }
}

.animate-blob {
  animation: blob 7s infinite;
}

.animation-delay-2000 {
  animation-delay: 2s;
}

.animation-delay-4000 {
  animation-delay: 4s;
}

/* Custom focus styles */
input:focus {
  transform: scale(1.01);
}
</style>
