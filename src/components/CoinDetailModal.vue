<template>
  <div
    v-if="coin"
    @click="$emit('close')"
    class="fixed inset-0 bg-black/60 dark:bg-black/80 z-30 flex justify-center items-end sm:items-center animate-fade-in"
  >
    <div
      @click.stop
      class="bg-white dark:bg-gray-900 w-full max-w-md rounded-t-2xl sm:rounded-xl shadow-2xl dark:border dark:border-gray-700 p-6 transform animate-slide-up"
    >
      <!-- Header Modal -->
      <div class="flex justify-between items-start pb-4 border-b border-gray-200 dark:border-gray-700">
        <div>
          <div class="flex items-center gap-3">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white">{{ coin.name }}</h2>
            <span class="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 text-sm font-semibold px-3 py-1 rounded-full">
              Rank #{{ coin.rank }}
            </span>
          </div>
          <span class="text-lg font-medium text-gray-500 dark:text-gray-400">{{ coin.symbol }}</span>
        </div>
        <button
          @click="$emit('close')"
          class="p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
          aria-label="Tutup modal"
        >
          <ion-icon :icon="closeOutline" class="w-6 h-6"></ion-icon>
        </button>
      </div>

      <!-- Body Modal -->
      <div class="py-2 max-h-[60vh] overflow-y-auto pr-2">
        <!-- Harga Utama -->
        <div class="text-left my-4">
          <span class="text-sm text-gray-500 dark:text-gray-400">Harga Saat Ini ({{ currency }})</span>
          <div class="text-4xl font-bold text-gray-900 dark:text-white">
            {{ formatPrice(coin.price_usd, currency, exchangeRate, true, 2, 6) }}
          </div>
        </div>

        <!-- Chips Performa -->
        <div class="grid grid-cols-3 gap-3 my-5">
          <div v-for="period in periods" :key="period.label" :class="['text-center rounded-xl p-3 border', getChipClasses(coin[period.key])]">
            <div class="text-xs text-gray-500 dark:text-gray-400 mb-1">{{ period.label }}</div>
            <span :class="['flex items-center text-sm justify-center', getChangeClasses(coin[period.key])]">
              <ion-icon v-if="parseFloat(coin[period.key]) > 0" :icon="trendingUpOutline" class="w-4 h-4 mr-0.5"></ion-icon>
              <ion-icon v-if="parseFloat(coin[period.key]) < 0" :icon="trendingDownOutline" class="w-4 h-4 mr-0.5"></ion-icon>
              {{ parseFloat(coin[period.key]).toFixed(2) }}%
            </span>
          </div>
        </div>

        <!-- Data Pasar -->
        <h3 class="text-sm font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider pt-5 pb-2">Data Pasar</h3>
        <div class="flex items-center py-3.5 border-b border-gray-100 dark:border-gray-800">
          <div class="shrink-0 w-8 text-gray-400 dark:text-gray-500"><ion-icon :icon="cashOutline"></ion-icon></div>
          <div class="flex-1 text-sm text-gray-500 dark:text-gray-400">Kapitalisasi Pasar</div>
          <div class="text-right text-base font-semibold text-gray-900 dark:text-white">{{ formatPrice(coin.market_cap_usd, currency, exchangeRate, true, 0) }}</div>
        </div>
        <div class="flex items-center py-3.5 border-b border-gray-100 dark:border-gray-800">
          <div class="shrink-0 w-8 text-gray-400 dark:text-gray-500"><ion-icon :icon="statsChartOutline"></ion-icon></div>
          <div class="flex-1 text-sm text-gray-500 dark:text-gray-400">Volume (24j)</div>
          <div class="text-right text-base font-semibold text-gray-900 dark:text-white">{{ formatPrice(coin.volume24, currency, exchangeRate, true, 0) }}</div>
        </div>
        <div class="flex items-center py-3.5 border-b border-gray-100 dark:border-gray-800">
          <div class="shrink-0 w-8 text-gray-400 dark:text-gray-500"><ion-icon :icon="logoBitcoin"></ion-icon></div>
          <div class="flex-1 text-sm text-gray-500 dark:text-gray-400">Harga (BTC)</div>
          <div class="text-right">
            <span class="text-base font-semibold text-gray-900 dark:text-white">{{ formatPrice(coin.price_btc, currency, exchangeRate, false, 8, 8) }}</span>
            <span class="ml-1.5 text-sm text-gray-500 dark:text-gray-400">BTC</span>
          </div>
        </div>

        <!-- Data Suplai -->
        <h3 class="text-sm font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider pt-5 pb-2">Data Suplai</h3>
        <div class="flex items-center py-3.5 border-b border-gray-100 dark:border-gray-800">
          <div class="shrink-0 w-8 text-gray-400 dark:text-gray-500"><ion-icon :icon="serverOutline"></ion-icon></div>
          <div class="flex-1 text-sm text-gray-500 dark:text-gray-400">Suplai Beredar</div>
          <div class="text-right">
            <span class="text-base font-semibold text-gray-900 dark:text-white">{{ formatPrice(coin.csupply, currency, exchangeRate, false, 0) }}</span>
            <span class="ml-1.5 text-sm text-gray-500 dark:text-gray-400">{{ coin.symbol }}</span>
          </div>
        </div>
        <div v-if="coin.msupply" class="flex items-center py-3.5 border-b border-gray-100 dark:border-gray-800">
          <div class="shrink-0 w-8 text-gray-400 dark:text-gray-500"><ion-icon :icon="serverOutline"></ion-icon></div>
          <div class="flex-1 text-sm text-gray-500 dark:text-gray-400">Maksimal Suplai</div>
          <div class="text-right">
            <span class="text-base font-semibold text-gray-900 dark:text-white">{{ formatPrice(coin.msupply, currency, exchangeRate, false, 0) }}</span>
            <span class="ml-1.5 text-sm text-gray-500 dark:text-gray-400">{{ coin.symbol }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IonIcon } from '@ionic/vue';
import { 
  closeOutline, trendingUpOutline, trendingDownOutline, 
  cashOutline, statsChartOutline, logoBitcoin, serverOutline 
} from 'ionicons/icons';
import { formatPrice } from '../utils/currency';

defineProps<{
  coin: any;
  currency: string;
  exchangeRate: number | null;
}>();

defineEmits(['close']);

const periods = [
  { label: '1 Jam', key: 'percent_change_1h' },
  { label: '24 Jam', key: 'percent_change_24h' },
  { label: '7 Hari', key: 'percent_change_7d' },
];

const getChangeClasses = (value: string): string => {
  const val = parseFloat(value);
  if (val > 0) return 'text-green-600 dark:text-green-400';
  if (val < 0) return 'text-red-600 dark:text-red-400';
  return 'text-gray-500 dark:text-gray-400';
};

const getChipClasses = (value: string): string => {
  const val = parseFloat(value);
  if (val > 0) return 'bg-green-50/50 dark:bg-green-900/40 border-green-200 dark:border-green-700';
  if (val < 0) return 'bg-red-50/50 dark:bg-red-900/40 border-red-200 dark:border-red-700';
  return 'bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700';
};
</script>