<template>
  <div class="p-4 sm:p-6 lg:p-8 space-y-6">
    <!-- Header Section -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 class="text-2xl sm:text-3xl font-bold text-slate-900">Настройки системы</h1>
        <p class="text-slate-600 mt-1">Основные настройки и конфигурация системы</p>
      </div>
      <div class="flex items-center space-x-3">
        <button 
          @click="resetToDefaults" 
          class="btn-secondary"
        >
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
          </svg>
          Сбросить к умолчанию
        </button>
        <button 
          @click="saveSettings" 
          class="btn-primary"
          :disabled="saving"
        >
          <svg v-if="saving" class="w-4 h-4 mr-2 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <svg v-else class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"/>
          </svg>
          {{ saving ? 'Сохранение...' : 'Сохранить настройки' }}
        </button>
      </div>
    </div>

    <!-- Settings Categories -->
    <div class="grid grid-cols-1 xl:grid-cols-4 gap-6">
      <!-- Navigation Sidebar -->
      <div class="xl:col-span-1">
        <div class="card p-4 sticky top-4">
          <h3 class="font-semibold text-slate-900 mb-4">Категории настроек</h3>
          <nav class="space-y-2">
            <button
              v-for="section in settingSections"
              :key="section.id"
              @click="activeSection = section.id"
              class="w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors text-left"
              :class="activeSection === section.id 
                ? 'bg-blue-50 text-blue-700 border border-blue-200' 
                : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'"
            >
              <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="section.icon"/>
              </svg>
              {{ section.name }}
            </button>
          </nav>
        </div>
      </div>

      <!-- Settings Content -->
      <div class="xl:col-span-3 space-y-6">
        
        <!-- General Settings -->
        <div v-if="activeSection === 'general'" class="card p-6">
          <div class="flex items-center mb-6">
            <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
              <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
            </div>
            <div>
              <h2 class="text-xl font-bold text-slate-900">Общие настройки</h2>
              <p class="text-slate-600 text-sm">Основная информация о сайте</p>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="form-group">
              <label class="form-label">Название сайта</label>
              <input
                v-model="settings.siteName"
                type="text"
                class="input-field"
                placeholder="Türkmenbazar"
              >
            </div>
            
            <div class="form-group">
              <label class="form-label">Слоган</label>
              <input
                v-model="settings.siteSlogan"
                type="text"
                class="input-field"
                placeholder="Лучший сайт объявлений"
              >
            </div>
            
            <div class="form-group md:col-span-2">
              <label class="form-label">Описание сайта</label>
              <textarea
                v-model="settings.siteDescription"
                class="input-field"
                rows="3"
                placeholder="Краткое описание сайта для поисковых систем"
              ></textarea>
            </div>
            
            <div class="form-group">
              <label class="form-label">Email администратора</label>
              <input
                v-model="settings.adminEmail"
                type="email"
                class="input-field"
                placeholder="admin@turkmenbazar.com"
              >
            </div>
            
            <div class="form-group">
              <label class="form-label">Телефон поддержки</label>
              <input
                v-model="settings.supportPhone"
                type="tel"
                class="input-field"
                placeholder="+993 XX XXX XXX"
              >
            </div>
          </div>
        </div>

        <!-- Moderation Settings -->
        <div v-if="activeSection === 'moderation'" class="card p-6">
          <div class="flex items-center mb-6">
            <div class="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center mr-3">
              <svg class="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.25-3A2.25 2.25 0 0018 6.75v10.5A2.25 2.25 0 0015.75 19.5H8.25A2.25 2.25 0 016 17.25V6.75A2.25 2.25 0 018.25 4.5h7.5z"/>
              </svg>
            </div>
            <div>
              <h2 class="text-xl font-bold text-slate-900">Настройки модерации</h2>
              <p class="text-slate-600 text-sm">Параметры проверки объявлений</p>
            </div>
          </div>

          <div class="space-y-6">
            <div class="form-group">
              <label class="flex items-center">
                <input
                  v-model="settings.autoModerationEnabled"
                  type="checkbox"
                  class="rounded border-slate-300 text-blue-600 focus:ring-blue-500 mr-3"
                >
                <div>
                  <span class="form-label mb-0">Автоматическая модерация</span>
                  <p class="text-sm text-slate-500">Автоматически одобрять объявления от проверенных пользователей</p>
                </div>
              </label>
            </div>
            
            <div class="form-group">
              <label class="flex items-center">
                <input
                  v-model="settings.requireModerationForImages"
                  type="checkbox"
                  class="rounded border-slate-300 text-blue-600 focus:ring-blue-500 mr-3"
                >
                <div>
                  <span class="form-label mb-0">Модерация изображений</span>
                  <p class="text-sm text-slate-500">Требовать ручную проверку объявлений с изображениями</p>
                </div>
              </label>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="form-group">
                <label class="form-label">Максимум изображений</label>
                <input
                  v-model.number="settings.maxImagesPerAd"
                  type="number"
                  class="input-field"
                  min="1"
                  max="20"
                >
              </div>
              
              <div class="form-group">
                <label class="form-label">Максимум символов в описании</label>
                <input
                  v-model.number="settings.maxDescriptionLength"
                  type="number"
                  class="input-field"
                  min="100"
                  max="5000"
                >
              </div>
            </div>
          </div>
        </div>

        <!-- Email Settings -->
        <div v-if="activeSection === 'email'" class="card p-6">
          <div class="flex items-center mb-6">
            <div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
              <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
            </div>
            <div>
              <h2 class="text-xl font-bold text-slate-900">Настройки Email</h2>
              <p class="text-slate-600 text-sm">Конфигурация отправки писем</p>
            </div>
          </div>

          <div class="space-y-6">
            <div class="form-group">
              <label class="flex items-center">
                <input
                  v-model="settings.emailNotificationsEnabled"
                  type="checkbox"
                  class="rounded border-slate-300 text-blue-600 focus:ring-blue-500 mr-3"
                >
                <div>
                  <span class="form-label mb-0">Email уведомления</span>
                  <p class="text-sm text-slate-500">Отправлять уведомления пользователям</p>
                </div>
              </label>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="form-group">
                <label class="form-label">SMTP сервер</label>
                <input
                  v-model="settings.smtpHost"
                  type="text"
                  class="input-field"
                  placeholder="smtp.gmail.com"
                >
              </div>
              
              <div class="form-group">
                <label class="form-label">SMTP порт</label>
                <input
                  v-model.number="settings.smtpPort"
                  type="number"
                  class="input-field"
                  placeholder="587"
                >
              </div>
              
              <div class="form-group">
                <label class="form-label">SMTP пользователь</label>
                <input
                  v-model="settings.smtpUser"
                  type="text"
                  class="input-field"
                  placeholder="user@example.com"
                >
              </div>
              
              <div class="form-group">
                <label class="form-label">SMTP пароль</label>
                <input
                  v-model="settings.smtpPassword"
                  type="password"
                  class="input-field"
                  placeholder="••••••••"
                >
              </div>
            </div>
          </div>
        </div>

        <!-- Security Settings -->
        <div v-if="activeSection === 'security'" class="card p-6">
          <div class="flex items-center mb-6">
            <div class="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center mr-3">
              <svg class="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
              </svg>
            </div>
            <div>
              <h2 class="text-xl font-bold text-slate-900">Настройки безопасности</h2>
              <p class="text-slate-600 text-sm">Параметры защиты системы</p>
            </div>
          </div>

          <div class="space-y-6">
            <div class="form-group">
              <label class="flex items-center">
                <input
                  v-model="settings.requirePhoneVerification"
                  type="checkbox"
                  class="rounded border-slate-300 text-blue-600 focus:ring-blue-500 mr-3"
                >
                <div>
                  <span class="form-label mb-0">Проверка телефона</span>
                  <p class="text-sm text-slate-500">Требовать подтверждение номера телефона для регистрации</p>
                </div>
              </label>
            </div>
            
            <div class="form-group">
              <label class="flex items-center">
                <input
                  v-model="settings.enableCaptcha"
                  type="checkbox"
                  class="rounded border-slate-300 text-blue-600 focus:ring-blue-500 mr-3"
                >
                <div>
                  <span class="form-label mb-0">CAPTCHA проверка</span>
                  <p class="text-sm text-slate-500">Включить CAPTCHA для регистрации и создания объявлений</p>
                </div>
              </label>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="form-group">
                <label class="form-label">Мин. длина пароля</label>
                <input
                  v-model.number="settings.minPasswordLength"
                  type="number"
                  class="input-field"
                  min="6"
                  max="32"
                >
              </div>
              
              <div class="form-group">
                <label class="form-label">Макс. попыток входа</label>
                <input
                  v-model.number="settings.maxLoginAttempts"
                  type="number"
                  class="input-field"
                  min="3"
                  max="10"
                >
              </div>
            </div>
          </div>
        </div>

        <!-- VIP Settings -->
        <div v-if="activeSection === 'vip'" class="card p-6">
          <div class="flex items-center mb-6">
            <div class="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
              <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
              </svg>
            </div>
            <div>
              <h2 class="text-xl font-bold text-slate-900">VIP настройки</h2>
              <p class="text-slate-600 text-sm">Параметры VIP объявлений</p>
            </div>
          </div>

          <div class="space-y-6">
            <div class="form-group">
              <label class="flex items-center">
                <input
                  v-model="settings.vipEnabled"
                  type="checkbox"
                  class="rounded border-slate-300 text-blue-600 focus:ring-blue-500 mr-3"
                >
                <div>
                  <span class="form-label mb-0">VIP объявления</span>
                  <p class="text-sm text-slate-500">Разрешить пользователям создавать VIP объявления</p>
                </div>
              </label>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="form-group">
                <label class="form-label">Стоимость VIP (₼)</label>
                <input
                  v-model.number="settings.vipPrice"
                  type="number"
                  class="input-field"
                  min="0"
                  step="0.01"
                >
              </div>
              
              <div class="form-group">
                <label class="form-label">Длительность VIP (дни)</label>
                <input
                  v-model.number="settings.vipDuration"
                  type="number"
                  class="input-field"
                  min="1"
                  max="365"
                >
              </div>
            </div>
          </div>
        </div>

        <!-- System Status -->
        <div class="card p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200">
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <div>
                <h3 class="font-semibold text-slate-900">Статус системы</h3>
                <p class="text-sm text-slate-600">Все сервисы работают нормально</p>
              </div>
            </div>
            <div class="text-right">
              <div class="text-sm text-slate-600">Последнее обновление</div>
              <div class="font-medium text-slate-900">{{ lastUpdated }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import api from '../../services/api'

export default {
  name: 'AdminSettings',
  setup() {
    const activeSection = ref('general')
    const saving = ref(false)
    
    const settings = ref({
      siteName: '',
      siteSlogan: '',
      siteDescription: '',
      adminEmail: '',
      supportPhone: '',
      autoModerationEnabled: false,
      requireModerationForImages: true,
      maxImagesPerAd: 5,
      maxDescriptionLength: 1000,
      emailNotificationsEnabled: true,
      smtpHost: '',
      smtpPort: 587,
      smtpUser: '',
      smtpPassword: '',
      requirePhoneVerification: false,
      enableCaptcha: false,
      minPasswordLength: 8,
      maxLoginAttempts: 5,
      vipEnabled: true,
      vipPrice: 10.00,
      vipDuration: 30
    })

    const settingSections = [
      {
        id: 'general',
        name: 'Общие',
        icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z'
      },
      {
        id: 'moderation',
        name: 'Модерация',
        icon: 'M9 12l2 2 4-4m5.25-3A2.25 2.25 0 0018 6.75v10.5A2.25 2.25 0 0015.75 19.5H8.25A2.25 2.25 0 016 17.25V6.75A2.25 2.25 0 018.25 4.5h7.5z'
      },
      {
        id: 'email',
        name: 'Email',
        icon: 'M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
      },
      {
        id: 'security',
        name: 'Безопасность',
        icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z'
      },
      {
        id: 'vip',
        name: 'VIP',
        icon: 'M13 10V3L4 14h7v7l9-11h-7z'
      }
    ]

    const lastUpdated = computed(() => {
      return new Date().toLocaleString('ru-RU')
    })

    const loadSettings = async () => {
      try {
        const response = await api.get('/admin/settings')
        // Merge loaded settings with defaults
        Object.assign(settings.value, response.data)
      } catch (error) {
        console.error('Failed to load settings:', error)
      }
    }

    const saveSettings = async () => {
      try {
        saving.value = true
        await api.put('/admin/settings', settings.value)
        // Show success message
        alert('Настройки успешно сохранены')
      } catch (error) {
        console.error('Failed to save settings:', error)
        alert('Ошибка при сохранении настроек')
      } finally {
        saving.value = false
      }
    }

    const resetToDefaults = () => {
      if (confirm('Вы уверены, что хотите сбросить все настройки к значениям по умолчанию?')) {
        settings.value = {
          siteName: 'Türkmenbazar',
          siteSlogan: 'Лучший сайт объявлений Туркменистана',
          siteDescription: 'Платформа для размещения объявлений в Туркменистане',
          adminEmail: 'admin@turkmenbazar.com',
          supportPhone: '+993 XX XXX XXX',
          autoModerationEnabled: false,
          requireModerationForImages: true,
          maxImagesPerAd: 5,
          maxDescriptionLength: 1000,
          emailNotificationsEnabled: true,
          smtpHost: '',
          smtpPort: 587,
          smtpUser: '',
          smtpPassword: '',
          requirePhoneVerification: false,
          enableCaptcha: false,
          minPasswordLength: 8,
          maxLoginAttempts: 5,
          vipEnabled: true,
          vipPrice: 10.00,
          vipDuration: 30
        }
      }
    }

    onMounted(() => {
      loadSettings()
    })

    return {
      activeSection,
      saving,
      settings,
      settingSections,
      lastUpdated,
      loadSettings,
      saveSettings,
      resetToDefaults
    }
  }
}
</script>
