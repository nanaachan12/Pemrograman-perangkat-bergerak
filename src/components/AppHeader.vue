<template>
  <header class="bg-linear-to-r from-blue-500 to-indigo-800 text-white p-5 shadow-lg flex justify-between items-center sticky top-0 z-20">
    <h1 class="text-2xl font-bold">
      Crypto Tracker
    </h1>
    <div class="flex items-center gap-1 sm:gap-2">
      
      <!-- Tombol: Konverter Mata Uang -->
      <button
        @click="$emit('toggle-currency')"
        :disabled="isLoadingRate"
        class="p-2 px-3 rounded-full text-white/80 hover:bg-white/20 transition-all duration-200 font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-white/50"
        aria-label="Ganti Mata Uang"
      >
        <svg v-if="isLoadingRate" class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span v-else>{{ currency }}</span>
      </button>
      
      <!-- Tombol Refresh -->
      <button
        @click="$emit('refresh')"
        :disabled="loading"
        class="p-2 rounded-full text-white/80 hover:bg-white/20 transition-all duration-200 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-white/50"
        aria-label="Refresh data"
      >
        <ion-icon :icon="refreshOutline" class="w-5 h-5" :class="{ 'animate-spin': loading }"></ion-icon>
      </button>

      <!-- Tombol: Tentang Pembuat -->
      <button
        @click="$emit('open-about')"
        class="p-2 rounded-full text-white/80 hover:bg-white/20 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50"
        aria-label="Tentang Pembuat"
      >
        <ion-icon :icon="personCircleOutline" class="w-5 h-5"></ion-icon>
      </button>
    </div>
  </header>
</template>

<script setup lang="ts">
import { IonIcon } from '@ionic/vue';
import { refreshOutline, personCircleOutline } from 'ionicons/icons';

defineProps<{
  currency: string;
  isLoadingRate: boolean;
  loading: boolean;
}>();

defineEmits(['toggle-currency', 'refresh', 'open-about']);
</script>