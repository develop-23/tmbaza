<template>
  <div class="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center p-4">
    <!-- Background Pattern -->
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute top-1/4 left-1/4 w-72 h-72 bg-green-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
      <div class="absolute top-1/3 right-1/4 w-72 h-72 bg-emerald-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
      <div class="absolute bottom-1/4 left-1/3 w-72 h-72 bg-teal-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
    </div>

    <div class="relative z-10 w-full max-w-md">
      <!-- Logo/Brand Section -->
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-600 to-emerald-600 rounded-2xl mb-4 shadow-xl">
          <span class="text-2xl font-bold text-white">T</span>
        </div>
        <h1 class="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2">
          Türkmenbazar
        </h1>
        <p class="text-slate-600">Создайте новый аккаунт</p>
      </div>

      <!-- Registration Form -->
      <div class="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-8">
        <form @submit.prevent="handleRegister" class="space-y-6">
          <!-- Name Input -->
          <div class="space-y-2">
            <label class="block text-sm font-semibold text-slate-700">
              Ваше имя *
            </label>
            <div class="relative group">
              <div class="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl blur opacity-20 group-hover:opacity-30 transition-opacity"></div>
              <div class="relative">
                <input
                  v-model="form.name"
                  type="text"
                  required
                  placeholder="Введите ваше имя"
                  class="w-full pl-12 pr-4 py-4 bg-white/90 border border-slate-200 rounded-2xl text-slate-900 placeholder-slate-500 focus:ring-2 focus:ring-green-500/30 focus:border-green-500 transition-all duration-200 shadow-sm hover:shadow-md"
                  :class="{ 'border-red-300 focus:border-red-500 focus:ring-red-500/30': nameError }"
                />
                <div class="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              </div>
            </div>
            <p v-if="nameError" class="text-sm text-red-600 flex items-center">
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {{ nameError }}
            </p>
          </div>

          <!-- Phone Input -->
          <div class="space-y-2">
            <label class="block text-sm font-semibold text-slate-700">
              Номер телефона *
            </label>
            <div class="relative group">
              <div class="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl blur opacity-20 group-hover:opacity-30 transition-opacity"></div>
              <div class="relative">
                <input
                  v-model="form.phone"
                  type="tel"
                  required
                  placeholder="+993 XX XXX XXX"
                  class="w-full pl-12 pr-4 py-4 bg-white/90 border border-slate-200 rounded-2xl text-slate-900 placeholder-slate-500 focus:ring-2 focus:ring-green-500/30 focus:border-green-500 transition-all duration-200 shadow-sm hover:shadow-md"
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

          <!-- Terms Checkbox -->
          <div class="space-y-2">
            <label class="flex items-start space-x-3 cursor-pointer group">
              <div class="relative flex-shrink-0 mt-0.5">
                <input
                  v-model="form.acceptTerms"
                  type="checkbox"
                  required
                  class="w-5 h-5 text-green-600 border-2 border-slate-300 rounded-lg focus:ring-green-500/30 focus:ring-2 transition-all"
                  :class="{ 'border-red-300': termsError }"
                />
                <div v-if="form.acceptTerms" class="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <svg class="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                  </svg>
                </div>
              </div>
              <span class="text-sm text-slate-700 group-hover:text-slate-900 transition-colors">
                Принимаю 
                <a href="#" class="text-green-600 hover:text-green-700 font-semibold underline">условия использования</a>
                и 
                <a href="#" class="text-green-600 hover:text-green-700 font-semibold underline">политику конфиденциальности</a>
              </span>
            </label>
            <p v-if="termsError" class="text-sm text-red-600 flex items-center">
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {{ termsError }}
            </p>
          </div>

          <!-- Register Button -->
          <button
            type="submit"
            :disabled="loading || !isFormValid"
            class="group relative w-full overflow-hidden bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 disabled:from-slate-400 disabled:to-slate-500 text-white font-semibold py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl disabled:shadow-none transition-all duration-300 transform hover:scale-[1.02] active:scale-95 disabled:scale-100 disabled:cursor-not-allowed"
          >
            <!-- Button Background Animation -->
            <div class="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <!-- Loading Spinner -->
            <div v-if="loading" class="flex items-center justify-center">
              <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Регистрация...
            </div>
            
            <!-- Button Text -->
            <span v-else class="relative z-10 flex items-center justify-center">
              <svg class="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
              Создать аккаунт
            </span>
          </button>
        </form>

        <!-- Login Link -->
        <div class="mt-8 text-center">
          <p class="text-slate-600 mb-4">Уже есть аккаунт?</p>
          <router-link 
            to="/login" 
            class="inline-flex items-center font-semibold text-green-600 hover:text-green-700 transition-colors group"
          >
            Войти
            <svg class="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </router-link>
        </div>
      </div>

      <!-- Benefits Info -->
      <div class="mt-8 grid grid-cols-1 gap-4">
        <div class="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center flex-shrink-0">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <h3 class="font-semibold text-slate-900 text-sm">Быстрая регистрация</h3>
              <p class="text-xs text-slate-600">Всего несколько шагов для создания аккаунта</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- WhatsApp Verification Modal -->
    <div
      v-if="showWhatsAppModal"
      class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
    >
      <div class="bg-white rounded-3xl shadow-2xl max-w-sm w-full p-8 text-center animate-bounce-in">
        <div class="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.886 3.488" />
          </svg>
        </div>
        
        <h3 class="text-xl font-bold text-slate-900 mb-3">Регистрация завершена!</h3>
        <p class="text-slate-600 mb-6">
          Для активации аккаунта напишите администратору в WhatsApp с вашим номером телефона
        </p>
        
        <a
          :href="`https://wa.me/${whatsappNumber}?text=Привет! Хочу активировать аккаунт: ${form.phone}`"
          class="w-full btn-success mb-4 inline-flex items-center justify-center"
          target="_blank"
        >
          <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.886 3.488" />
          </svg>
          Написать в WhatsApp
        </a>
        
        <button @click="closeModal" class="w-full btn-secondary">
          Закрыть
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import { useAuthStore } from "../store/auth";

export default {
  name: "Register",
  setup() {
    const router = useRouter();
    const toast = useToast();
    const authStore = useAuthStore();

    const loading = ref(false);
    const showWhatsAppModal = ref(false);
    const whatsappNumber = ref("");
    
    const nameError = ref('');
    const phoneError = ref('');
    const termsError = ref('');

    const form = ref({
      name: "",
      phone: "",
      acceptTerms: false,
    });

    const isFormValid = computed(() => {
      return form.value.name.trim() && 
             form.value.phone.trim() && 
             form.value.acceptTerms;
    });

    const validateForm = () => {
      nameError.value = '';
      phoneError.value = '';
      termsError.value = '';
      
      let isValid = true;
      
      if (!form.value.name.trim()) {
        nameError.value = 'Имя обязательно';
        isValid = false;
      } else if (form.value.name.trim().length < 2) {
        nameError.value = 'Имя должно содержать минимум 2 символа';
        isValid = false;
      }
      
      if (!form.value.phone.trim()) {
        phoneError.value = 'Номер телефона обязателен';
        isValid = false;
      } else {
        const phoneRegex = /^\+?[1-9]\d{1,14}$/;
        if (!phoneRegex.test(form.value.phone.replace(/\s/g, ''))) {
          phoneError.value = 'Неверный формат номера телефона';
          isValid = false;
        }
      }
      
      if (!form.value.acceptTerms) {
        termsError.value = 'Необходим�� принять условия использования';
        isValid = false;
      }
      
      return isValid;
    };

    const handleRegister = async () => {
      if (!validateForm()) return;
      
      loading.value = true;

      try {
        const result = await authStore.register({
          name: form.value.name,
          phone: form.value.phone,
        });

        if (result.success) {
          whatsappNumber.value = result.whatsapp?.replace("+", "") || '';
          showWhatsAppModal.value = true;
          
          toast.success("Регистрация успешна!", {
            icon: "🎉"
          });
        } else {
          toast.error(result.message || "Ошибка регистрации");
        }
      } catch (error) {
        toast.error("Произошла ошибка при регистрации");
      } finally {
        loading.value = false;
      }
    };

    const closeModal = () => {
      showWhatsAppModal.value = false;
      router.push("/login");
    };

    return {
      form,
      loading,
      showWhatsAppModal,
      whatsappNumber,
      nameError,
      phoneError,
      termsError,
      isFormValid,
      handleRegister,
      closeModal,
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

@keyframes bounceIn {
  0% {
    opacity: 0;
    transform: scale(0.3);
  }
  50% {
    transform: scale(1.05);
  }
  70% {
    transform: scale(0.9);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-blob {
  animation: blob 7s infinite;
}

.animate-bounce-in {
  animation: bounceIn 0.6s ease-out;
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
