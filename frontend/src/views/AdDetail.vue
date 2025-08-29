<template>
  <div v-if="ad" class="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
    <!-- Media Carousel -->
    <div class="relative bg-black">
      <div v-if="media.length > 0" class="aspect-square relative overflow-hidden">
        <!-- Media Display -->
        <img
          v-if="media[currentMediaIndex].type === 'image'"
          :src="media[currentMediaIndex].url"
          :alt="ad.title"
          class="w-full h-full object-contain bg-black"
        />
        <video
          v-else
          :src="media[currentMediaIndex].url"
          class="w-full h-full object-contain bg-black"
          controls
          playsinline
        />

        <!-- Navigation Arrows -->
        <div v-if="media.length > 1" class="absolute inset-y-0 left-0 right-0 flex items-center justify-between pointer-events-none">
          <button
            @click="previousMedia"
            class="ml-4 p-3 bg-black/50 backdrop-blur-sm text-white rounded-full hover:bg-black/70 transition-all duration-200 hover:scale-110 pointer-events-auto"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            @click="nextMedia"
            class="mr-4 p-3 bg-black/50 backdrop-blur-sm text-white rounded-full hover:bg-black/70 transition-all duration-200 hover:scale-110 pointer-events-auto"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      <!-- No Media Placeholder -->
      <div
        v-else
        class="aspect-square bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center"
      >
        <div class="text-center">
          <svg class="w-20 h-20 text-slate-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p class="text-slate-500 text-lg">Нет изображений</p>
        </div>
      </div>

      <!-- Media Counter -->
      <div
        v-if="media.length > 1"
        class="absolute top-4 right-4 bg-black/70 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-sm font-medium"
      >
        {{ currentMediaIndex + 1 }} / {{ media.length }}
      </div>

      <!-- VIP Badge -->
      <div
        v-if="ad.vip"
        class="absolute top-4 left-4 bg-gradient-to-r from-yellow-400 to-amber-400 text-amber-900 px-4 py-2 rounded-full text-sm font-bold shadow-lg"
      >
        <span class="flex items-center">
          <svg class="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          VIP
        </span>
      </div>

      <!-- Media Thumbnails -->
      <div v-if="media.length > 1" class="absolute bottom-4 left-0 right-0">
        <div class="flex justify-center space-x-2 px-4 overflow-x-auto">
          <button
            v-for="(item, index) in media"
            :key="index"
            @click="currentMediaIndex = index"
            class="w-3 h-3 rounded-full flex-shrink-0 transition-all duration-200"
            :class="currentMediaIndex === index 
              ? 'bg-white scale-125 shadow-lg' 
              : 'bg-white/50 hover:bg-white/75'"
          />
        </div>
      </div>

      <!-- Back Button -->
      <button
        @click="$router.go(-1)"
        class="absolute top-4 left-1/2 transform -translate-x-1/2 bg-black/50 backdrop-blur-sm text-white p-2 rounded-full hover:bg-black/70 transition-all duration-200 hover:scale-110"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
    </div>

    <!-- Ad Details -->
    <div class="p-4 space-y-6">
      <!-- Title and Meta -->
      <div class="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
        <h1 class="text-2xl font-bold text-slate-900 mb-4 leading-tight">{{ ad.title }}</h1>
        
        <!-- Price -->
        <div v-if="ad.price" class="mb-4">
          <div class="flex items-baseline">
            <span class="text-3xl font-bold text-green-600">{{ formatPrice(ad.price) }}</span>
            <span class="text-xl text-slate-500 ml-2">TMT</span>
          </div>
        </div>

        <!-- Meta Info -->
        <div class="flex flex-wrap items-center gap-4 text-sm text-slate-600">
          <div v-if="ad.location" class="flex items-center">
            <svg class="w-4 h-4 mr-1.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {{ ad.location.name }}
          </div>
          
          <div class="flex items-center">
            <svg class="w-4 h-4 mr-1.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {{ formatDate(ad.createdAt) }}
          </div>

          <div v-if="ad.views" class="flex items-center">
            <svg class="w-4 h-4 mr-1.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            {{ ad.views }} просмотров
          </div>
        </div>
      </div>

      <!-- Description -->
      <div class="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
        <h3 class="font-semibold text-lg text-slate-900 mb-3 flex items-center">
          <svg class="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Описание
        </h3>
        <p class="text-slate-700 leading-relaxed whitespace-pre-wrap">{{ ad.description }}</p>
      </div>

      <!-- Category -->
      <div v-if="ad.category" class="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
        <h3 class="font-semibold text-lg text-slate-900 mb-3 flex items-center">
          <svg class="w-5 h-5 mr-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
          </svg>
          Категория
        </h3>
        <router-link 
          :to="`/ads?categoryId=${ad.category.id}`"
          class="inline-flex items-center bg-gradient-to-r from-purple-100 to-purple-200 hover:from-purple-200 hover:to-purple-300 text-purple-800 px-4 py-2 rounded-xl font-medium transition-all duration-200 hover:scale-105"
        >
          {{ ad.category.name }}
          <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </router-link>
      </div>

      <!-- Contact Section -->
      <div class="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
        <h3 class="font-semibold text-lg text-slate-900 mb-4 flex items-center">
          <svg class="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          Контакты
        </h3>
        
        <div class="space-y-4">
          <!-- Seller Info -->
          <div class="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
            <div class="flex items-center">
              <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mr-3">
                <span class="text-white font-semibold text-lg">
                  {{ (ad.user?.name || 'A').charAt(0).toUpperCase() }}
                </span>
              </div>
              <div>
                <div class="flex items-center">
                  <span class="font-medium text-slate-900">{{ ad.user?.name || "Аноним" }}</span>
                  <svg
                    v-if="ad.user?.verified"
                    class="w-5 h-5 ml-2 text-green-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    title="Верифицированный пользователь"
                  >
                    <path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                  </svg>
                </div>
                <p class="text-sm text-slate-500">Продавец</p>
              </div>
            </div>
          </div>

          <!-- WhatsApp Contact -->
          <a
            v-if="ad.user?.phone"
            :href="`https://wa.me/${ad.user.phone.replace('+', '')}?text=Привет! Интересует ваше объявление: ${ad.title}`"
            class="flex items-center justify-center w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white py-4 px-6 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-95"
            target="_blank"
          >
            <svg class="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.886 3.488" />
            </svg>
            Написать в WhatsApp
          </a>
        </div>
      </div>

      <!-- VIP Request -->
      <div v-if="isOwner && !ad.vip" class="bg-gradient-to-r from-yellow-50 to-amber-50 rounded-2xl p-6 border border-yellow-200">
        <h3 class="font-semibold text-lg text-yellow-900 mb-3 flex items-center">
          <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          Продвижение
        </h3>
        <p class="text-yellow-800 mb-4">Сделайте ваше объявление VIP для увеличения количества просмотров</p>
        <button
          @click="requestVip"
          class="w-full bg-gradient-to-r from-yellow-400 to-amber-400 hover:from-yellow-500 hover:to-amber-500 text-yellow-900 py-3 px-6 rounded-xl font-semibold transition-all duration-200 hover:scale-[1.02]"
        >
          ⭐ Сделать VIP объявлением
        </button>
      </div>

      <!-- Owner Actions -->
      <div v-if="isOwner" class="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
        <h3 class="font-semibold text-lg text-slate-900 mb-4 flex items-center">
          <svg class="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
          </svg>
          Управление
        </h3>
        <div class="grid grid-cols-2 gap-3">
          <router-link
            :to="`/edit-ad/${ad.id}`"
            class="flex items-center justify-center bg-blue-50 hover:bg-blue-100 text-blue-700 py-3 px-4 rounded-xl font-medium transition-all duration-200 hover:scale-105"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Редактировать
          </router-link>
          <button
            @click="confirmDelete"
            class="flex items-center justify-center bg-red-50 hover:bg-red-100 text-red-700 py-3 px-4 rounded-xl font-medium transition-all duration-200 hover:scale-105"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Удалить
          </button>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div
      v-if="showDeleteModal"
      class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
    >
      <div class="bg-white rounded-3xl shadow-2xl max-w-sm w-full p-8 text-center animate-bounce-in">
        <div class="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <svg class="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </div>
        
        <h3 class="text-xl font-bold text-slate-900 mb-3">Удалить объявление?</h3>
        <p class="text-slate-600 mb-6">Это действие нельзя отменить. Объявление будет удалено навсегда.</p>
        
        <div class="grid grid-cols-2 gap-3">
          <button
            @click="deleteAd"
            class="bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-xl font-semibold transition-all duration-200 hover:scale-105"
          >
            Удалить
          </button>
          <button 
            @click="showDeleteModal = false"
            class="bg-slate-100 hover:bg-slate-200 text-slate-700 py-3 px-4 rounded-xl font-semibold transition-all duration-200 hover:scale-105"
          >
            Отмена
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Loading -->
  <div v-else class="min-h-screen flex items-center justify-center">
    <div class="relative">
      <div class="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
      <div class="absolute inset-0 border-4 border-transparent border-t-blue-400 rounded-full animate-ping"></div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import { useAuthStore } from "../store/auth";
import api from "../services/api";

export default {
  name: "AdDetail",
  setup() {
    const route = useRoute();
    const router = useRouter();
    const toast = useToast();
    const authStore = useAuthStore();

    const user = computed(() => authStore.user);

    const ad = ref(null);
    const currentMediaIndex = ref(0);
    const showDeleteModal = ref(false);

    const media = computed(() => {
      if (!ad.value) return [];

      const items = [];

      if (ad.value.images) {
        ad.value.images.forEach((img) => {
          items.push({ type: "image", url: img });
        });
      }

      if (ad.value.videos) {
        ad.value.videos.forEach((video) => {
          items.push({ type: "video", url: video });
        });
      }

      return items;
    });

    const isOwner = computed(() => {
      return user.value && ad.value && user.value.id === ad.value.UserId;
    });

    const loadAd = async () => {
      try {
        const response = await api.get(`/ads/${route.params.id}`);
        ad.value = response.data;
      } catch (error) {
        toast.error("Объявление не найдено");
        router.push("/ads");
      }
    };

    const nextMedia = () => {
      if (currentMediaIndex.value < media.value.length - 1) {
        currentMediaIndex.value++;
      } else {
        currentMediaIndex.value = 0;
      }
    };

    const previousMedia = () => {
      if (currentMediaIndex.value > 0) {
        currentMediaIndex.value--;
      } else {
        currentMediaIndex.value = media.value.length - 1;
      }
    };

    const requestVip = async () => {
      try {
        const response = await api.get(`/ads/${ad.value.id}/request-vip`);
        toast.info(response.data.message);

        if (response.data.whatsapp) {
          const whatsappNumber = response.data.whatsapp.replace("+", "");
          const message = `Привет! Хочу сделать VIP объявление: ${ad.value.title} (ID: ${ad.value.id})`;
          window.open(
            `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`,
            "_blank"
          );
        }
      } catch (error) {
        console.error("Failed to request VIP:", error);
        toast.error("Не удалось отправить запрос");
      }
    };

    const confirmDelete = () => {
      showDeleteModal.value = true;
    };

    const deleteAd = async () => {
      try {
        await api.delete(`/ads/${ad.value.id}`);
        toast.success("Объявление удалено");
        router.push("/my-ads");
      } catch (error) {
        toast.error("Не удалось удалить объявление");
      }
    };

    const formatDate = (dateString) => {
      const date = new Date(dateString);
      const now = new Date();
      const diffTime = Math.abs(now - date);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays === 1) return 'сегодня';
      if (diffDays === 2) return 'вчера';
      if (diffDays <= 7) return `${diffDays} дней назад`;
      
      return date.toLocaleDateString("ru-RU", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    };

    const formatPrice = (price) => {
      if (!price) return '';
      
      const numPrice = typeof price === 'string' ? parseFloat(price) : price;
      return numPrice.toLocaleString('ru-RU');
    };

    // Touch/swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    const handleTouchStart = (e) => {
      touchStartX = e.changedTouches[0].screenX;
    };

    const handleTouchEnd = (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    };

    const handleSwipe = () => {
      const swipeThreshold = 50;
      const diff = touchStartX - touchEndX;
      
      if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
          nextMedia(); // Swipe left - next image
        } else {
          previousMedia(); // Swipe right - previous image
        }
      }
    };

    onMounted(() => {
      loadAd();
      
      // Add touch event listeners
      const mediaContainer = document.querySelector('.aspect-square');
      if (mediaContainer) {
        mediaContainer.addEventListener('touchstart', handleTouchStart);
        mediaContainer.addEventListener('touchend', handleTouchEnd);
      }
    });

    return {
      ad,
      media,
      currentMediaIndex,
      isOwner,
      showDeleteModal,
      nextMedia,
      previousMedia,
      requestVip,
      confirmDelete,
      deleteAd,
      formatDate,
      formatPrice,
    };
  },
};
</script>

<style scoped>
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

.animate-bounce-in {
  animation: bounceIn 0.6s ease-out;
}
</style>
