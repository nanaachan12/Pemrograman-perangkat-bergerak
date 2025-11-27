<template>
  <div
    v-if="isOpen"
    @click="$emit('close')"
    class="fixed inset-0 bg-black/60 dark:bg-black/80 z-40 flex justify-center items-end sm:items-center animate-fade-in"
  >
    <div
      @click.stop
      class="bg-white dark:bg-gray-900 w-full max-w-md rounded-t-2xl sm:rounded-xl shadow-2xl dark:border dark:border-gray-700 p-6 transform animate-slide-up"
    >
      <!-- Header -->
      <div class="flex justify-between items-center pb-4 border-b border-gray-200 dark:border-gray-700">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white">Tentang Pembuat</h2>
        <button
          @click="$emit('close')"
          class="p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
          aria-label="Tutup modal"
        >
          <ion-icon :icon="closeOutline" class="w-6 h-6"></ion-icon>
        </button>
      </div>
      
      <!-- Content -->
      <div class="py-6 flex flex-col items-center text-center">
        <ion-icon :icon="personCircleOutline" class="w-32 h-32 text-blue-500 dark:text-blue-400 mb-4"></ion-icon>
        <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Nabila Naurotul Ummah</h3>
        <p class="text-md text-gray-500 dark:text-gray-400">048656024</p>
        <p class="text-md text-gray-500 dark:text-gray-400">Sistem Informasi</p>

        <div class="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700 w-full">
          <p class="text-sm text-gray-600 dark:text-gray-300">
            Aplikasi ini dibuat untuk memenuhi tugas Pemrograman Berbasis Perangkat Bergerak.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IonIcon } from '@ionic/vue';
import { closeOutline, personCircleOutline } from 'ionicons/icons';

defineProps<{ isOpen: boolean }>();
defineEmits(['close']);
</script>