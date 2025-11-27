<template>
  <div class="sticky top-[72px] z-10 bg-white dark:bg-gray-950 shadow-sm">
    
    <!-- Search Input -->
    <div class="p-4 border-b border-gray-200 dark:border-gray-800">
      <div class="relative">
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <ion-icon :icon="searchOutline" class="w-5 h-5 text-gray-400 dark:text-gray-500"></ion-icon>
        </div>
        <input
          type="text"
          placeholder="Cari Aset (misal: BTC, Ethereum)..."
          :value="searchTerm"
          @input="$emit('update:searchTerm', ($event.target as HTMLInputElement).value)"
          class="w-full pl-10 pr-12 py-3 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-transparent dark:focus:border-transparent"
        />
        <!-- Tombol X (Clear) -->
        <button
          v-if="searchTerm"
          @click="$emit('update:searchTerm', '')"
          class="absolute inset-y-0 right-0 flex items-center justify-center w-12 h-full text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors"
          aria-label="Hapus pencarian"
        >
          <ion-icon :icon="closeOutline" class="w-5 h-5"></ion-icon>
        </button>
      </div>
    </div>
    
    <!-- Header Tabel (Sorting) -->
    <div class="flex p-4 bg-gray-50 dark:bg-gray-900 font-sans">
      <button
        @click="$emit('sort', 'rank')"
        class="w-12 text-left font-semibold text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wider flex items-center hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
      >
        #
        <ion-icon v-if="sortKey === 'rank'" :icon="chevronDown" :class="['w-4 h-4 ml-1 shrink-0 transition-transform duration-200', { 'rotate-180': sortDirection === 'asc' }]"></ion-icon>
      </button>
      <button
        @click="$emit('sort', 'name')"
        class="flex-1 text-left font-semibold text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wider flex items-center hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
      >
        Aset
        <ion-icon v-if="sortKey === 'name'" :icon="chevronDown" :class="['w-4 h-4 ml-1 shrink-0 transition-transform duration-200', { 'rotate-180': sortDirection === 'asc' }]"></ion-icon>
      </button>
      <button
        @click="$emit('sort', 'price_usd')"
        class="w-36 text-right justify-end font-semibold text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wider flex items-center hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
      >
        Harga ({{ currency }})
        <ion-icon v-if="sortKey === 'price_usd'" :icon="chevronDown" :class="['w-4 h-4 ml-1 shrink-0 transition-transform duration-200', { 'rotate-180': sortDirection === 'asc' }]"></ion-icon>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IonIcon } from '@ionic/vue';
import { searchOutline, closeOutline, chevronDown } from 'ionicons/icons';

defineProps<{
  searchTerm: string;
  sortKey: string;
  sortDirection: 'asc' | 'desc';
  currency: string;
}>();

defineEmits(['update:searchTerm', 'sort']);
</script>