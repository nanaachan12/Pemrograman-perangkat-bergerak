<template>
  <IonApp>
    <IonPage>
      <IonContent :fullscreen="true">
        <div class="min-h-screen p-0 sm:p-4 flex justify-center font-inter">
          <div class="w-full max-w-md bg-white dark:bg-gray-950 rounded-none sm:rounded-xl shadow-2xl sm:dark:border sm:dark:border-gray-800 sm:dark:shadow-none overflow-hidden flex flex-col">
            
            <!-- Header -->
            <AppHeader 
              :currency="currency" 
              :is-loading-rate="isLoadingRate" 
              :loading="loading"
              @toggle-currency="toggleCurrency"
              @refresh="fetchData"
              @open-about="isAboutModalOpen = true"
            />
            
            <!-- Sticky Search & Sort -->
            <SearchBar 
              v-model:searchTerm="searchTerm"
              :sort-key="sortKey"
              :sort-direction="sortDirection"
              :currency="currency"
              @sort="handleSort"
            />
            
            <!-- Main List -->
            <main class="overflow-y-auto flex-1">
              <CryptoList 
                :cryptos="processedCryptos"
                :loading="loading"
                :error="error"
                :currency="currency"
                :exchange-rate="exchangeRate"
                @retry="fetchData"
                @select-coin="selectedCoin = $event"
              />

              <!-- Footer -->
              <footer class="p-4 text-center text-xs text-gray-400 dark:text-gray-500 border-t border-gray-200 dark:border-gray-800">
                Data disediakan oleh 
                <a href="https://www.coinlore.com/" target="_blank" rel="noopener noreferrer" class="underline hover:text-gray-600 dark:hover:text-gray-300">CoinLore API</a>. 
                Kurs oleh 
                <a href="https://www.frankfurter.app/" target="_blank" rel="noopener noreferrer" class="underline hover:text-gray-600 dark:hover:text-gray-300">Frankfurter</a>.
              </footer>
            </main>
          </div>
        </div>

        <!-- Modals -->
        <CoinDetailModal 
          :coin="selectedCoin" 
          :currency="currency" 
          :exchange-rate="exchangeRate"
          @close="selectedCoin = null" 
        />
        
        <AboutModal 
          :is-open="isAboutModalOpen" 
          @close="isAboutModalOpen = false" 
        />

      </IonContent>
    </IonPage>
  </IonApp>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue';
import { IonApp, IonPage, IonContent } from '@ionic/vue';

// Import Components
import AppHeader from '../components/AppHeader.vue';
import SearchBar from '../components/SearchBar.vue';
import CryptoList from '../components/CryptoList.vue';
import CoinDetailModal from '../components/CoinDetailModal.vue';
import AboutModal from '../components/AboutModal.vue';

// Import Services (API Logic)
import { getCryptoData, type CryptoData } from '../services/cryptoService';
import { getExchangeRate } from '../services/currencyService';

// State Utama
const cryptos = ref<CryptoData[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);
const searchTerm = ref('');
const selectedCoin = ref<CryptoData | null>(null);
const isAboutModalOpen = ref(false);
const sortKey = ref<'rank' | 'name' | 'price_usd'>('rank');
const sortDirection = ref<'asc' | 'desc'>('asc');

// State Mata Uang
type Currency = 'USD' | 'IDR';
const exchangeRate = ref<number | null>(null);
const isLoadingRate = ref(false);
const currency = ref<Currency>((localStorage.getItem('currency') as Currency) || 'USD');

// Dark Mode Handling
const theme = ref<'light' | 'dark'>(localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark' : 'light');
watch(theme, (newTheme) => {
  if (newTheme === 'dark') {
    document.documentElement.classList.add('dark');
    localStorage.theme = 'dark';
  } else {
    document.documentElement.classList.remove('dark');
    localStorage.theme = 'light';
  }
}, { immediate: true });

// --- LOGIKA API (Menggunakan Service) ---

// 1. Fetch Data Mata Uang
const fetchRate = async () => {
  if (currency.value === 'IDR' && exchangeRate.value === null) {
    isLoadingRate.value = true;
    try {
      const rate = await getExchangeRate('USD', 'IDR');
      exchangeRate.value = rate;
    } catch (err) {
      // Jika gagal, fallback ke USD agar UI tidak rusak
      currency.value = 'USD';
    } finally {
      isLoadingRate.value = false;
    }
  }
};

// 2. Fetch Data Crypto
const fetchData = async () => {
  loading.value = true;
  error.value = null;
  try {
    cryptos.value = await getCryptoData();
  } catch (err: any) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};

// --- LOGIKA MATA UANG ---

const toggleCurrency = () => {
  currency.value = currency.value === 'USD' ? 'IDR' : 'USD';
  localStorage.setItem('currency', currency.value);
};

watch(currency, (newCurrency) => {
  if (newCurrency === 'IDR') fetchRate();
}, { immediate: true });

// Jalankan saat mounted
onMounted(fetchData);

// --- LOGIKA FILTER & SORT ---

const handleSort = (key: 'rank' | 'name' | 'price_usd') => {
  if (sortKey.value === key) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc';
  } else {
    sortKey.value = key;
    sortDirection.value = 'asc';
  }
};

const processedCryptos = computed(() => {
  const filtered = cryptos.value.filter(c => 
    c.name.toLowerCase().includes(searchTerm.value.toLowerCase()) || 
    c.symbol.toLowerCase().includes(searchTerm.value.toLowerCase())
  );
  return [...filtered].sort((a, b) => {
    const aVal = a[sortKey.value];
    const bVal = b[sortKey.value];
    let comparison = 0;
    if (sortKey.value === 'name') comparison = (aVal as string).localeCompare(bVal as string);
    else comparison = parseFloat(aVal as string) - parseFloat(bVal as string);
    return sortDirection.value === 'asc' ? comparison : -comparison;
  });
});
</script>

<style>
/* Global Animation Styles */
@keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
@keyframes slide-up { from { transform: translateY(100%); } to { transform: translateY(0); } }
.animate-fade-in { animation: fade-in 0.2s ease-out; }
.animate-slide-up { animation: slide-up 0.3s ease-out; }
@media (min-width: 640px) {
  @keyframes slide-up {
    from { transform: translateY(50px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
}
</style>