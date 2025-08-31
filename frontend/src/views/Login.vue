<template>
  <div class="min-h-screen dark-bg flex items-center justify-center p-4">
    <div class="w-full max-w-md">
      <!-- Logo/Brand Section -->
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-[#2e6096] rounded-xl mb-4">
          <span class="text-2xl font-bold text-white">T</span>
        </div>
        <h1 class="text-3xl font-bold dark-text mb-2">
          TürkmenBazar
        </h1>
        <p class="dark-text-secondary">Войдите в свой аккаунт</p>
      </div>

      <!-- Login Form -->
      <div class="bg-[#1c1c1c] rounded-xl shadow-lg border border-[#444] p-8">
        <form @submit.prevent="handleLogin" class="space-y-6">
          <!-- Phone Input -->
          <div class="space-y-2">
            <label class="form-label">
              Номер телефона
            </label>
            <div class="relative">
              <input
                v-model="form.phone"
                type="tel"
                required
                placeholder="+993 XX XXX XXX"
                class="input-field pl-12"
                :class="{ 'input-field-error': phoneError }"
              />
              <div class="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#888]">
                <i class="fas fa-phone text-sm"></i>
              </div>
            </div>
            <p v-if="phoneError" class="form-error">
              <i class="fas fa-exclamation-circle mr-1"></i>
              {{ phoneError }}
            </p>
          </div>

          <!-- Login Button -->
          <button
            type="submit"
            :disabled="loading || !form.phone.trim()"
            class="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            <!-- Loading Spinner -->
            <div v-if="loading" class="flex items-center">
              <div class="loader w-5 h-5 mr-2"></div>
              Вход...
            </div>
            
            <!-- Button Text -->
            <span v-else class="flex items-center">
              <i class="fas fa-sign-in-alt mr-2"></i>
              Войти
            </span>
          </button>
        </form>

        <!-- Registration Link -->
        <div class="mt-8 text-center">
          <p class="dark-text-secondary mb-4">Нет аккаунта?</p>
          <router-link 
            to="/register" 
            class="inline-flex items-center font-medium text-[#2e6096] hover:text-[#2a5489] transition-colors"
          >
            Зарегистрироваться
            <i class="fas fa-chevron-right ml-1 text-xs"></i>
          </router-link>
        </div>

        <!-- Admin Link -->
        <div class="mt-6 pt-6 border-t border-[#444]">
          <div class="text-center">
            <router-link
              to="/admin/login"
              class="inline-flex items-center text-sm font-medium dark-text-secondary hover:text-[#eee] transition-colors"
            >
              <i class="fas fa-shield-alt mr-2"></i>
              Вход для администрации
            </router-link>
          </div>
        </div>
      </div>

      <!-- Features Info -->
      <div class="mt-8 grid grid-cols-2 gap-4 text-center">
        <div class="bg-[#1c1c1c] rounded-xl p-4 border border-[#444]">
          <div class="w-10 h-10 bg-[#4caf50] rounded-xl flex items-center justify-center mx-auto mb-2">
            <i class="fas fa-check text-white"></i>
          </div>
          <h3 class="font-semibold dark-text text-sm">Безопасно</h3>
          <p class="text-xs dark-text-secondary mt-1">Защищенная авторизация</p>
        </div>
        
        <div class="bg-[#1c1c1c] rounded-xl p-4 border border-[#444]">
          <div class="w-10 h-10 bg-[#2e6096] rounded-xl flex items-center justify-center mx-auto mb-2">
            <i class="fas fa-bolt text-white"></i>
          </div>
          <h3 class="font-semibold dark-text text-sm">Быстро</h3>
          <p class="text-xs dark-text-secondary mt-1">Мгновенный доступ</p>
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
          toast.success("Добро пожаловать!");
          
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
/* Styles are defined in the main CSS file */
</style>
