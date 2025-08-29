<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 pb-8">
    <!-- Header -->
    <div class="bg-white/80 backdrop-blur-lg border-b border-slate-200/60 sticky top-16 lg:top-20 z-30">
      <div class="p-4 lg:p-6">
        <div class="max-w-4xl mx-auto">
          <div class="flex items-center">
            <button 
              @click="$router.go(-1)"
              class="p-2 hover:bg-slate-100 rounded-xl transition-colors mr-3"
            >
              <svg class="w-5 h-5 lg:w-6 lg:h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div>
              <h1 class="text-xl lg:text-2xl font-bold text-slate-900">Создать объявление</h1>
              <p class="text-sm lg:text-base text-slate-600">Заполните форму для размещения объявления</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="p-4 lg:p-6 max-w-4xl mx-auto">
      <form @submit.prevent="createAd" class="space-y-6 lg:space-y-8">
        <!-- Basic Information Section -->
        <div class="grid gap-6 lg:gap-8">
          <!-- Title -->
          <div class="bg-white rounded-2xl lg:rounded-3xl p-6 lg:p-8 shadow-sm border border-slate-100">
            <div class="flex items-center mb-3 lg:mb-4">
              <div class="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl lg:rounded-2xl flex items-center justify-center mr-3 lg:mr-4">
                <svg class="w-4 h-4 lg:w-6 lg:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
              </div>
              <div>
                <label class="block text-sm lg:text-base font-semibold text-slate-700">
                  Название объявления *
                </label>
                <p class="text-xs lg:text-sm text-slate-500">Краткое и понятное название</p>
              </div>
            </div>
            
            <input
              v-model="form.title"
              type="text"
              required
              maxlength="200"
              placeholder="Например: iPhone 13 Pro в отличном состоянии"
              class="w-full px-4 lg:px-6 py-3 lg:py-4 bg-slate-50 border border-slate-200 rounded-xl lg:rounded-2xl text-slate-900 placeholder-slate-500 focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 focus:bg-white transition-all duration-200 text-lg lg:text-xl"
            >
            <div class="flex justify-between items-center mt-2">
              <span class="text-xs lg:text-sm text-slate-500">{{ form.title.length }}/200</span>
              <div v-if="form.title.length > 0" class="flex items-center text-xs lg:text-sm text-green-600">
                <svg class="w-3 h-3 lg:w-4 lg:h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
                Готово
              </div>
            </div>
          </div>

          <!-- Description -->
          <div class="bg-white rounded-2xl lg:rounded-3xl p-6 lg:p-8 shadow-sm border border-slate-100">
            <div class="flex items-center mb-3 lg:mb-4">
              <div class="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl lg:rounded-2xl flex items-center justify-center mr-3 lg:mr-4">
                <svg class="w-4 h-4 lg:w-6 lg:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <label class="block text-sm lg:text-base font-semibold text-slate-700">
                  Описание *
                </label>
                <p class="text-xs lg:text-sm text-slate-500">Подробно опишите ваше предложение</p>
              </div>
            </div>
            
            <textarea
              v-model="form.description"
              required
              rows="4"
              maxlength="5000"
              placeholder="Опишите состояние, особенности, причину продажи..."
              class="w-full px-4 lg:px-6 py-3 lg:py-4 bg-slate-50 border border-slate-200 rounded-xl lg:rounded-2xl text-slate-900 placeholder-slate-500 focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 focus:bg-white transition-all duration-200 resize-none text-lg lg:text-xl"
            />
            <div class="flex justify-between items-center mt-2">
              <span class="text-xs lg:text-sm text-slate-500">{{ form.description.length }}/5000</span>
              <div v-if="form.description.length > 0" class="flex items-center text-xs lg:text-sm text-green-600">
                <svg class="w-3 h-3 lg:w-4 lg:h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
                Готово
              </div>
            </div>
          </div>

          <!-- Price (Desktop: Side by side with other fields) -->
          <div class="bg-white rounded-2xl lg:rounded-3xl p-6 lg:p-8 shadow-sm border border-slate-100">
            <div class="flex items-center mb-3 lg:mb-4">
              <div class="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl lg:rounded-2xl flex items-center justify-center mr-3 lg:mr-4">
                <svg class="w-4 h-4 lg:w-6 lg:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <div>
                <label class="block text-sm lg:text-base font-semibold text-slate-700">
                  Цена (необязательно)
                </label>
                <p class="text-xs lg:text-sm text-slate-500">Укажите цену в манатах</p>
              </div>
            </div>
            
            <div class="relative">
              <input
                v-model="form.price"
                type="number"
                min="0"
                step="0.01"
                placeholder="0"
                class="w-full pl-4 lg:pl-6 pr-16 lg:pr-20 py-3 lg:py-4 bg-slate-50 border border-slate-200 rounded-xl lg:rounded-2xl text-slate-900 placeholder-slate-500 focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 focus:bg-white transition-all duration-200 text-lg lg:text-xl"
              >
              <div class="absolute right-4 lg:right-6 top-1/2 transform -translate-y-1/2 text-slate-500 font-medium text-lg lg:text-xl">
                TMT
              </div>
            </div>
          </div>
        </div>

        <!-- Category & Location Row -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          <!-- Category -->
          <div class="bg-white rounded-2xl lg:rounded-3xl p-6 lg:p-8 shadow-sm border border-slate-100">
            <div class="flex items-center mb-3 lg:mb-4">
              <div class="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl lg:rounded-2xl flex items-center justify-center mr-3 lg:mr-4">
                <svg class="w-4 h-4 lg:w-6 lg:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
              </div>
              <div>
                <label class="block text-sm lg:text-base font-semibold text-slate-700">
                  Категория *
                </label>
                <p class="text-xs lg:text-sm text-slate-500">Выберите подходящую</p>
              </div>
            </div>
            
            <div class="relative">
              <select 
                v-model="form.categoryId" 
                required 
                class="w-full appearance-none px-4 lg:px-6 py-3 lg:py-4 bg-slate-50 border border-slate-200 rounded-xl lg:rounded-2xl text-slate-900 focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 focus:bg-white transition-all duration-200 text-lg lg:text-xl"
              >
                <option value="">Выберите категорию</option>
                <optgroup v-for="parent in parentCategories" :key="parent.id" :label="parent.name">
                  <option :value="parent.id">{{ parent.name }}</option>
                  <option 
                    v-for="child in getChildCategories(parent.id)" 
                    :key="child.id" 
                    :value="child.id"
                    class="pl-4"
                  >
                    &nbsp;&nbsp;{{ child.name }}
                  </option>
                </optgroup>
              </select>
              <div class="absolute right-3 lg:right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg class="w-5 h-5 lg:w-6 lg:h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          <!-- Location -->
          <div class="bg-white rounded-2xl lg:rounded-3xl p-6 lg:p-8 shadow-sm border border-slate-100">
            <div class="flex items-center mb-3 lg:mb-4">
              <div class="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-red-500 to-pink-600 rounded-xl lg:rounded-2xl flex items-center justify-center mr-3 lg:mr-4">
                <svg class="w-4 h-4 lg:w-6 lg:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <label class="block text-sm lg:text-base font-semibold text-slate-700">
                  Местоположение *
                </label>
                <p class="text-xs lg:text-sm text-slate-500">Где находится товар</p>
              </div>
            </div>
            
            <div class="relative">
              <select 
                v-model="form.locationId" 
                required 
                class="w-full appearance-none px-4 lg:px-6 py-3 lg:py-4 bg-slate-50 border border-slate-200 rounded-xl lg:rounded-2xl text-slate-900 focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 focus:bg-white transition-all duration-200 text-lg lg:text-xl"
              >
                <option value="">Выберите место</option>
                <optgroup v-for="parent in parentLocations" :key="parent.id" :label="parent.name">
                  <option :value="parent.id">{{ parent.name }}</option>
                  <option 
                    v-for="child in getChildLocations(parent.id)" 
                    :key="child.id" 
                    :value="child.id"
                    class="pl-4"
                  >
                    &nbsp;&nbsp;{{ child.name }}
                  </option>
                </optgroup>
              </select>
              <div class="absolute right-3 lg:right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg class="w-5 h-5 lg:w-6 lg:h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <!-- Contact Info -->
        <div class="bg-white rounded-2xl lg:rounded-3xl p-6 lg:p-8 shadow-sm border border-slate-100">
          <div class="flex items-center mb-3 lg:mb-4">
            <div class="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl lg:rounded-2xl flex items-center justify-center mr-3 lg:mr-4">
              <svg class="w-4 h-4 lg:w-6 lg:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <div>
              <label class="block text-sm lg:text-base font-semibold text-slate-700">
                Контактный телефон
              </label>
              <p class="text-xs lg:text-sm text-slate-500">Номер для связи с покупателями</p>
            </div>
          </div>
          
          <input
            v-model="form.contactPhone"
            type="tel"
            placeholder="+993 XX XXX XXX"
            class="w-full px-4 lg:px-6 py-3 lg:py-4 bg-slate-50 border border-slate-200 rounded-xl lg:rounded-2xl text-slate-900 placeholder-slate-500 focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 focus:bg-white transition-all duration-200 text-lg lg:text-xl"
          >
        </div>

        <!-- Media Upload -->
        <div class="bg-white rounded-2xl lg:rounded-3xl p-6 lg:p-8 shadow-sm border border-slate-100">
          <div class="flex items-center justify-between mb-4 lg:mb-6">
            <div class="flex items-center">
              <div class="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-xl lg:rounded-2xl flex items-center justify-center mr-3 lg:mr-4">
                <svg class="w-4 h-4 lg:w-6 lg:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <label class="block text-sm lg:text-base font-semibold text-slate-700">
                  Фото и видео
                </label>
                <p class="text-xs lg:text-sm text-slate-500">Максимум {{ mediaLimit }} файлов</p>
              </div>
            </div>
            <span class="text-xs lg:text-sm text-slate-500 bg-slate-100 px-2 lg:px-3 py-1 rounded-full">
              {{ uploadedFiles.length }}/{{ mediaLimit }}
            </span>
          </div>
          
          <!-- Uploaded Files Grid -->
          <div v-if="uploadedFiles.length > 0" class="grid grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 lg:gap-4 mb-4 lg:mb-6">
            <div 
              v-for="(file, index) in uploadedFiles" 
              :key="index"
              class="relative aspect-square bg-slate-100 rounded-xl lg:rounded-2xl overflow-hidden group"
            >
              <img 
                v-if="file.type.startsWith('image/')"
                :src="file.preview" 
                :alt="`Preview ${index}`"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
              >
              <video 
                v-else
                :src="file.preview"
                class="w-full h-full object-cover"
                muted
              />
              
              <!-- Remove Button -->
              <button 
                @click="removeFile(index)"
                type="button"
                class="absolute top-2 right-2 w-6 h-6 lg:w-7 lg:h-7 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center text-sm transition-all duration-200 hover:scale-110 opacity-0 group-hover:opacity-100"
              >
                <svg class="w-3 h-3 lg:w-4 lg:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <!-- File Type Indicator -->
              <div v-if="file.type.startsWith('video/')" class="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full">
                <svg class="w-3 h-3 inline mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 6a2 2 0 012-2h6l2 2h6a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM5 8a1 1 0 000 2v3a1 1 0 001 1h3a1 1 0 001-1v-3a1 1 0 000-2V8a1 1 0 000-2H6a1 1 0 000 2v3a1 1 0 000 2V8z" />
                </svg>
                Видео
              </div>
            </div>
          </div>

          <!-- Upload Button -->
          <input 
            ref="fileInput"
            type="file"
            multiple
            accept="image/*,video/*"
            @change="handleFileUpload"
            class="hidden"
          >
          
          <button 
            v-if="uploadedFiles.length < mediaLimit"
            @click="$refs.fileInput.click()"
            type="button"
            class="w-full border-2 border-dashed border-slate-300 hover:border-blue-400 bg-slate-50 hover:bg-blue-50 rounded-xl lg:rounded-2xl p-8 lg:p-12 text-center transition-all duration-200 group"
          >
            <div class="flex flex-col items-center">
              <div class="w-12 h-12 lg:w-16 lg:h-16 bg-blue-100 group-hover:bg-blue-200 rounded-xl lg:rounded-2xl flex items-center justify-center mb-3 lg:mb-4 transition-colors">
                <svg class="w-6 h-6 lg:w-8 lg:h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <span class="text-slate-600 font-medium group-hover:text-blue-600 transition-colors text-lg lg:text-xl">Добавить фото или видео</span>
              <span class="text-xs lg:text-sm text-slate-500 mt-1">PNG, JPG, MP4 до 10MB</span>
            </div>
          </button>
        </div>

        <!-- Submit Buttons -->
        <div class="bg-white rounded-2xl lg:rounded-3xl p-6 lg:p-8 shadow-sm border border-slate-100">
          <div class="space-y-3 lg:space-y-4">
            <button 
              type="submit" 
              :disabled="loading || !isFormValid"
              class="w-full group relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-slate-400 disabled:to-slate-500 text-white font-semibold py-4 lg:py-5 px-6 lg:px-8 rounded-2xl lg:rounded-3xl shadow-lg hover:shadow-xl disabled:shadow-none transition-all duration-300 transform hover:scale-[1.02] active:scale-95 disabled:scale-100 disabled:cursor-not-allowed text-lg lg:text-xl"
            >
              <!-- Button Background Animation -->
              <div class="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <!-- Loading Spinner -->
              <div v-if="loading" class="flex items-center justify-center">
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 lg:h-6 lg:w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Создание объявления...
              </div>
              
              <!-- Button Text -->
              <span v-else class="relative z-10 flex items-center justify-center">
                <svg class="w-5 h-5 lg:w-6 lg:h-6 mr-2 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
                Создать объявление
              </span>
            </button>
            
            <button 
              @click="$router.go(-1)"
              type="button"
              class="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium py-3 lg:py-4 px-6 lg:px-8 rounded-xl lg:rounded-2xl transition-all duration-200 hover:scale-[1.02] text-lg lg:text-xl"
            >
              Отмена
            </button>
          </div>

          <!-- Form Validation Status -->
          <div class="mt-4 lg:mt-6 p-3 lg:p-4 bg-slate-50 rounded-xl lg:rounded-2xl">
            <div class="text-xs lg:text-sm text-slate-600">
              <div class="flex items-center mb-1">
                <svg class="w-3 h-3 lg:w-4 lg:h-4 mr-2" :class="form.title ? 'text-green-500' : 'text-slate-400'" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
                Название объявления
              </div>
              <div class="flex items-center mb-1">
                <svg class="w-3 h-3 lg:w-4 lg:h-4 mr-2" :class="form.description ? 'text-green-500' : 'text-slate-400'" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
                Описание
              </div>
              <div class="flex items-center mb-1">
                <svg class="w-3 h-3 lg:w-4 lg:h-4 mr-2" :class="form.categoryId ? 'text-green-500' : 'text-slate-400'" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
                Категория
              </div>
              <div class="flex items-center">
                <svg class="w-3 h-3 lg:w-4 lg:h-4 mr-2" :class="form.locationId ? 'text-green-500' : 'text-slate-400'" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
                Местоположение
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import api from '../services/api'

export default {
  name: 'CreateAd',
  setup() {
    const router = useRouter()
    const toast = useToast()
    
    const loading = ref(false)
    const categories = ref([])
    const locations = ref([])
    const uploadedFiles = ref([])
    const mediaLimit = ref(5)
    
    const form = ref({
      title: '',
      description: '',
      price: '',
      categoryId: '',
      locationId: '',
      contactPhone: ''
    })

    const isFormValid = computed(() => {
      return form.value.title.trim() && 
             form.value.description.trim() && 
             form.value.categoryId && 
             form.value.locationId;
    })

    const parentCategories = computed(() => 
      categories.value.filter(cat => !cat.parentId)
    )

    const parentLocations = computed(() => 
      locations.value.filter(loc => !loc.parentId)
    )

    const getChildCategories = (parentId) => 
      categories.value.filter(cat => cat.parentId === parentId)

    const getChildLocations = (parentId) => 
      locations.value.filter(loc => loc.parentId === parentId)

    const loadData = async () => {
      try {
        const [categoriesRes, locationsRes, settingsRes] = await Promise.all([
          api.get('/categories'),
          api.get('/locations'),
          api.get('/settings')
        ])
        
        categories.value = categoriesRes.data.filter(cat => cat.active)
        locations.value = locationsRes.data.filter(loc => loc.active)
        mediaLimit.value = settingsRes.data.mediaLimit || 5
      } catch (error) {
        console.error('Failed to load data:', error)
        // No toast notification for data loading failures
      }
    }

    const handleFileUpload = (event) => {
      const files = Array.from(event.target.files)
      const remainingSlots = mediaLimit.value - uploadedFiles.value.length
      
      if (files.length > remainingSlots) {
        toast.warning(`Можно добавить только ${remainingSlots} файлов`)
        return
      }

      files.forEach(file => {
        if (file.size > 10 * 1024 * 1024) { // 10MB limit
          toast.error(`Файл ${file.name} слишком большой (максимум 10MB)`)
          return
        }

        const reader = new FileReader()
        reader.onload = (e) => {
          uploadedFiles.value.push({
            file,
            preview: e.target.result,
            type: file.type
          })
        }
        reader.readAsDataURL(file)
      })

      // Reset input
      event.target.value = ''
    }

    const removeFile = (index) => {
      uploadedFiles.value.splice(index, 1)
    }

    const createAd = async () => {
      if (!isFormValid.value) {
        toast.error('Заполните все обязательные поля')
        return
      }

      loading.value = true
      
      try {
        const formData = new FormData()
        
        // Add form fields
        formData.append('title', form.value.title)
        formData.append('description', form.value.description)
        formData.append('categoryId', form.value.categoryId)
        formData.append('locationId', form.value.locationId)
        
        if (form.value.price) {
          formData.append('price', form.value.price)
        }
        if (form.value.contactPhone) {
          formData.append('contactPhone', form.value.contactPhone)
        }

        // Add files
        uploadedFiles.value.forEach(fileObj => {
          if (fileObj.type.startsWith('image/')) {
            formData.append('images', fileObj.file)
          } else if (fileObj.type.startsWith('video/')) {
            formData.append('videos', fileObj.file)
          }
        })

        await api.post('/ads', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })

        toast.success('Объявление создано и отправлено на модерацию', {
          icon: "🎉"
        })
        router.push('/my-ads')
      } catch (error) {
        toast.error(error.response?.data?.message || 'Не удалось создать объявление')
      } finally {
        loading.value = false
      }
    }

    onMounted(() => {
      loadData()
    })

    return {
      loading,
      form,
      categories,
      locations,
      uploadedFiles,
      mediaLimit,
      isFormValid,
      parentCategories,
      parentLocations,
      getChildCategories,
      getChildLocations,
      handleFileUpload,
      removeFile,
      createAd
    }
  }
}
</script>
