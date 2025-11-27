<template>
  <div class="flex-1">
    <!-- 1. Loading Awal (Skeleton) -->
    <div v-if="loading && cryptos.length === 0">
      <div class="divide-y divide-gray-200 dark:divide-gray-800">
        <div v-for="i in 6" :key="i" class="flex items-center p-4 animate-pulse">
          <div class="w-12"><div class="h-4 bg-gray-200 dark:bg-gray-700 rounded-md w-1/2"></div></div>
          <div class="flex-1 space-y-2">
            <div class="h-5 bg-gray-200 dark:bg-gray-700 rounded-md w-1/3"></div>
            <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded-md w-1/4"></div>
          </div>
          <div class="w-36 flex flex-col items-end space-y-2">
            <div class="h-5 bg-gray-200 dark:bg-gray-700 rounded-md w-3/4"></div>
            <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded-md w-1/2"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- 2. Error State -->
    <div v-else-if="error" class="flex justify-center items-center p-10">
      <div class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50 rounded-lg p-6 text-center shadow-md">
        <ion-icon :icon="alertCircleOutline" class="w-12 h-12 text-red-500 mx-auto mb-4"></ion-icon>
        <div class="text-lg font-semibold text-red-700 dark:text-red-300 mb-2">Terjadi Error</div>
        <p class="text-sm text-red-600 dark:text-red-400 mb-4">{{ error }}</p>
        <button @click="$emit('retry')" class="bg-red-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800 transition-colors duration-200">
          Coba Lagi
        </button>
      </div>
    </div>

    <!-- 3. Tidak Ada Hasil Pencarian -->
    <div v-else-if="cryptos.length === 0" class="text-center p-10 text-gray-500 dark:text-gray-400">
      <p class="font-semibold">Tidak ada aset ditemukan</p>
      <p class="text-sm">Coba kata kunci lain.</p>
    </div>

    <!-- 4. Sukses: Tampilkan List -->
    <div v-else class="divide-y divide-gray-200 dark:divide-gray-800">
      <div
        v-for="crypto in cryptos"
        :key="crypto.id"
        class="flex items-center p-4 hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-colors duration-200 font-sans cursor-pointer"
        @click="$emit('select-coin', crypto)"
      >
        <div class="w-12 text-left text-gray-500 dark:text-gray-400 font-medium">{{ crypto.rank }}</div>
        <div class="flex-1">
          <div class="text-base font-semibold text-gray-900 dark:text-white">{{ crypto.name }}</div>
          <div class="text-sm text-gray-500 dark:text-gray-400">{{ crypto.symbol }}</div>
        </div>
        <div class="w-36 text-right flex flex-col justify-center items-end">
          <span class="text-base font-semibold text-gray-900 dark:text-white">
            {{ formatPrice(crypto.price_usd, currency, exchangeRate) }}
          </span>
          <span :class="['flex items-center text-sm', getChangeClasses(crypto.percent_change_24h)]">
            <ion-icon v-if="parseFloat(crypto.percent_change_24h) > 0" :icon="trendingUpOutline" class="w-4 h-4 mr-0.5"></ion-icon>
            <ion-icon v-if="parseFloat(crypto.percent_change_24h) < 0" :icon="trendingDownOutline" class="w-4 h-4 mr-0.5"></ion-icon>
            {{ parseFloat(crypto.percent_change_24h).toFixed(2) }}%
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IonIcon } from '@ionic/vue';
import { alertCircleOutline, trendingUpOutline, trendingDownOutline } from 'ionicons/icons';
import { formatPrice } from '../utils/currency';

defineProps<{
  cryptos: any[];
  loading: boolean;
  error: string | null;
  currency: string;
  exchangeRate: number | null;
}>();

defineEmits(['retry', 'select-coin']);

const getChangeClasses = (value: string): string => {
  const val = parseFloat(value);
  if (val > 0) return 'text-green-600 dark:text-green-400';
  if (val < 0) return 'text-red-600 dark:text-red-400';
  return 'text-gray-500 dark:text-gray-400';
};
</script>