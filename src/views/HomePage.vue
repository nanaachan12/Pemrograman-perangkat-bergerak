<template>
  <IonPage>
      <HeaderComponent @open-profile-modal="openProfileModal" />
    <!--  KONTEN -->
    <IonContent :fullscreen="true" :style="{ background: themeStyles.gradient }">
      
      <!-- Wrapper untuk responsivitas -->
      <div class="main-content-wrapper">
        
        <!-- Tampilkan Loading Spinner -->
        <div v-if="loading" class="spinner-container">
          <IonSpinner color="primary" name="crescent"></IonSpinner>
          <p>Mengambil data cuaca...</p>
        </div>

        <!-- Tampilkan Pesan Error -->
        <div v-if="error" class="error-container">
          <IonIcon :icon="cloudyNight" size="large" color="danger"></IonIcon>
          <p>{{ error }}</p>
        </div>

        <!-- Tampilkan Data Cuaca  -->
        <div v-if="!loading && !error && weatherData">
          
          <!--  KOMPONEN: KARTU CUACA TERKINI -->
          <CurrentWeatherCard
            :current-weather="currentWeather"
            :daily-summary="dailySummaryToday"
            :today-date="todayDate"
            :current-time="currentTime"
            :time-of-day-greeting="timeOfDayGreeting" 
            :theme-styles="themeStyles"
          />

          <!-- KOMPONEN: PRAKIRAAN HARI INI -->
          <TodayForecast 
            :hourly-forecast="todayHourlyForecast"
            :current-hour-marker="currentHourMarker"
          />

          <!-- KOMPONEN: HARI BERIKUTNYA (Tabs & List) -->
          <UpcomingForecast
            :upcoming-days="upcomingDays"
            :selected-day="selectedUpcomingDay"
            :selected-day-data="selectedDayHourlyData"
            :loading="loading"
            @day-change="selectedUpcomingDay = $event"
          />

        </div>
      </div>
      <!-- Footer -->
      <FooterComponent :themeStyles="themeStyles" />


      <!-- 7. KOMPONEN: MODAL PROFIL -->
      <ProfileModal
        :is-open="isProfileModalOpen"
        :theme-styles="themeStyles"
        @did-dismiss="closeProfileModal"
      />

    </IonContent>
  </IonPage>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, onUnmounted, watch } from 'vue';
import {
  IonPage,
  IonContent,
  IonSpinner,
  IonIcon,
} from '@ionic/vue';
import { getWeather } from '../services/weatherServices';
import { cloudyNight} from 'ionicons/icons';

// Impor Tipe Data
import type { WeatherData, HourlyWeatherItem, DailySummaryItem } from '../types';

// Impor Komponen Baru
import CurrentWeatherCard from '../components/CurrentWeatherCard.vue';
import TodayForecast from '../components/TodayForecast.vue';
import UpcomingForecast from '../components/UpcomingForecast.vue';
import ProfileModal from '../components/ProfileModal.vue';
import HeaderComponent from '@/components/HeaderComponent.vue';
import FooterComponent from '@/components/FooterComponent.vue';

const THEME_LIGHT = {
  // Background utama 
  gradient: 'linear-gradient(170deg, #FFF2F2 0%, #A9B5DF 100%)', 
  
  // Kartu Cuaca Terkini 
  cardLightBackground: '#A9B5DF', 
  cardColor: '#2D336B', 
  
  //  Toolbar 
  toolbarColor: '#FFFFFF', 
  toolbarTextColor: '#2D336B', 
  
  // Footer
  footerColor: '#A9B5DF', 
  footerTextColor: '#2D336B', 
  
  textColor: '#2D336B', 
  lightTextColor: '#555', 
  
  // Modal Profil
  modalBackground: '#FFF2F2', 
  modalListBackground: '#FFFFFF', 
  modalListTextColor: '#2D336B', 
  socialIconColor: '#7886C7', 
};

// --- State Management ---
const weatherData = ref<WeatherData | null>(null);
const loading = ref(true);
const error = ref<string | null>(null);
const currentTime = ref('');
const todayDate = ref('');
const timeOfDayGreeting = ref(''); 
const currentHourMarker = ref(''); 
let timeInterval: any = null;

const selectedUpcomingDay = ref<string | undefined>(undefined);


const isProfileModalOpen = ref(false);
const themeStyles = ref(THEME_LIGHT);

// --- Lifecycle Hooks ---
onMounted(async () => {
  updateTime(); 
  timeInterval = setInterval(updateTime, 1000); 

  try {
    const data = await getWeather();
    if (data && data.hourly && data.daily) {
      weatherData.value = { hourly: data.hourly, daily: data.daily };
    } else {
      throw new Error('Format data cuaca tidak lengkap atau tidak valid.');
    }
  } catch (err: any) {
    console.error('Error in onMounted:', err);
    error.value = 'Tidak dapat memuat data cuaca. Coba lagi nanti.';
  } finally {
    loading.value = false;
  }
});

onUnmounted(() => {
  if (timeInterval) {
    clearInterval(timeInterval);
  }
});

// --- Computed Properties ---

const hourlyForecastGroupedByDay = computed(() => {
  if (!weatherData.value) return {};
  const { time, temperature_2m, weather_code, relative_humidity_2m } = weatherData.value.hourly;
  
  if (!time || !temperature_2m) return {}; 
  
  const codes = weather_code || []; 
  const humidities = relative_humidity_2m || []; 

  return time.reduce((groups: Record<string, HourlyWeatherItem[]>, t: string, index: number) => {
    const date = t.split('T')[0];
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push({
      time: t,
      temp: temperature_2m[index],
      code: codes[index] || 0, 
      humidity: humidities[index] || 0, 
    });
    return groups;
  }, {});
});

const getTodayString = () => {
  const jakartaDateStr = new Intl.DateTimeFormat('en-US', {
    year: 'numeric', month: '2-digit', day: '2-digit', timeZone: 'Asia/Jakarta'
  }).format(new Date());
  const parts = jakartaDateStr.split('/');
  return `${parts[2]}-${parts[0].padStart(2, '0')}-${parts[1].padStart(2, '0')}`;
};

const todayHourlyForecast = computed((): HourlyWeatherItem[] => {
  const todayStr = getTodayString();
  return hourlyForecastGroupedByDay.value[todayStr] || [];
});

const currentWeather = computed((): HourlyWeatherItem | null => {
  if (todayHourlyForecast.value.length === 0) return null;

  // Dapatkan jam saat ini DI JAKARTA (misal: "07")
  const jakartaHourStr = new Intl.DateTimeFormat('en-US', {
    hour: '2-digit', 
    hour12: false, 
    timeZone: 'Asia/Jakarta'
  }).format(new Date());

  // Format menjadi string 
  const targetHourISO = `T${jakartaHourStr.padStart(2, '0')}:00`;
  
  const matchingItem = todayHourlyForecast.value.find(item => item.time.endsWith(targetHourISO));
  
  return matchingItem || todayHourlyForecast.value[0] || null;
});

const dailyForecastGrouped = computed(() => {
  if (!weatherData.value || !weatherData.value.daily) return {};
  const { time, temperature_2m_max, temperature_2m_min, weathercode } = weatherData.value.daily;
  
  if (!time || !temperature_2m_max || !temperature_2m_min) return {};
  
  const dailyCodes = weathercode || [];

  return time.reduce((groups: Record<string, DailySummaryItem>, t: string, index: number) => {
    groups[t] = {
      date: t,
      maxTemp: temperature_2m_max[index],
      minTemp: temperature_2m_min[index],
      code: dailyCodes[index] || 0, 
    };
    return groups;
  }, {});
});

const dailySummaryToday = computed(() => {
  const todayStr = getTodayString();
  return dailyForecastGrouped.value[todayStr] || null;
});

const upcomingDays = computed(() => {
  const todayStr = getTodayString();
  
  return Object.keys(hourlyForecastGroupedByDay.value)
    .filter(date => date > todayStr)
    .sort((a, b) => a.localeCompare(b)); 
});

const selectedDayHourlyData = computed(() => {
  if (!selectedUpcomingDay.value) return [];
  return hourlyForecastGroupedByDay.value[selectedUpcomingDay.value] || [];
});

// --- Watcher ---

watch(upcomingDays, (newDays) => {
  if (newDays.length > 0 && !selectedUpcomingDay.value) {
    selectedUpcomingDay.value = newDays[0];
  }
});


//  Helper Functions  

function updateTime() {
  const now = new Date();
  
  currentTime.value = new Intl.DateTimeFormat('id-ID', {
    hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Asia/Jakarta', timeZoneName: 'short'
  }).format(now);
  
  todayDate.value = new Intl.DateTimeFormat('id-ID', {
    dateStyle: 'full', timeZone: 'Asia/Jakarta'
  }).format(now);
  
  const currentHourFormatted = new Intl.DateTimeFormat('id-ID', {
    hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Asia/Jakarta'
  }).format(now);
  currentHourMarker.value = currentHourFormatted.substring(0, 2) + '.00';
}

const openProfileModal = () => {
  isProfileModalOpen.value = true;
};
const closeProfileModal = () => {
  isProfileModalOpen.value = false;
};
</script>

<style>
/* Impor Font Poppins */
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap');

:root {
  --ion-color-primary: #7886C7; 
  --ion-color-primary-rgb: 120, 134, 199;
  --ion-color-primary-contrast: #ffffff;
  --ion-color-primary-contrast-rgb: 255, 255, 255;
  --ion-color-primary-shade: #6a76b0;
  --ion-color-primary-tint: #8593cd;

  --ion-color-secondary: #2D336B; 
  --ion-color-secondary-rgb: 45, 51, 107;
  --ion-color-secondary-contrast: #ffffff;
  --ion-color-secondary-contrast-rgb: 255, 255, 255;
  --ion-color-secondary-shade: #282e5e;
  --ion-color-secondary-tint: #434879;
  
  --ion-text-color: #2D336B; 
  --ion-text-color-rgb: 45, 51, 107;
  
  --ion-background-color: linear-gradient(170deg, #FFF2F2 0%, #A9B5DF 100%);
  
  --ion-item-background: rgba(255, 255, 255, 0.9);
  
  --ion-toolbar-background: #FFFFFF;
  --ion-toolbar-color: #2D336B; 
  
  --ion-font-family: 'Poppins', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif;

  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}

body {
  font-family: var(--ion-font-family);
  line-height: 1.6;
  font-weight: 400; 
}

ion-list[inset] {
  margin-left: 16px;
  margin-right: 16px;
  border-radius: 16px;
  background: transparent;
  box-shadow: none;
}

.day-segment {
  --background: transparent;
  padding-bottom: 8px;
  padding-left: 16px;
  padding-right: 16px;
}

ion-segment-button {
  --background: rgba(255, 255, 255, 0.8);
  --background-checked: var(--ion-color-secondary); 
  --color: #555; 
  --color-checked: var(--ion-color-secondary-contrast); 
  --border-radius: 12px;
  --margin-end: 8px;
  min-width: 100px;
  font-family: var(--ion-font-family);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  white-space: nowrap; 
  transition: all 0.3s ease;
}
ion-segment-button:hover {
  --background: rgba(255, 255, 255, 1);
  transform: translateY(-2px);
}

ion-segment-button::part(indicator) {
  display: none;
}
</style>

<style scoped>
@keyframes contentFadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}


ion-content {
  transition: background 0.5s ease-in-out;
}
ion-toolbar {
  transition: --background 0.5s ease-in-out;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}

.main-content-wrapper {
  margin: 0 auto;
  max-width: 800px;
  width: 100%;
}

.profile-button {
  color: var(--ion-toolbar-color);
  opacity: 0.9;
}

.spinner-container,
.error-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 60vh;
  text-align: center;
  padding: 16px;
}

.spinner-container p,
.error-container p {
  margin-top: 10px;
  font-size: 0.9em;
  color: var(--ion-text-color);
}


.footer-toolbar {
  --background: var(--ion-background-color); 
  backdrop-filter: blur(10px);
  --border-width: 0;
}
.footer-toolbar p {
  text-align: center;
  margin: 10px;
  font-size: 0.8em;
  color: var(--ion-text-color); 
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
}
.footer-toolbar ion-icon { 
  font-size: 1.1em;
  opacity: 0.8;
}

</style>