<template>
  <div class="current-weather-wrapper">
    <!-- KARTU ATAS  Info Utama -->
    <div class="main-info-card-gradient">
      <div class="text-info">
        <p class="date-time">{{ todayDate }}</p>
        <h2>Jakarta, Indonesia</h2>
        <span class="main-temp" v-if="currentWeather"
          >{{ Math.round(currentWeather.temp)
          }}<span class="degree">°C</span></span
        >
      </div>
      <div class="icon-info" v-if="currentWeather">
        <IonIcon
          :icon="getWeatherIcon(currentWeather)"
          class="main-icon"
          :style="{ color: getWeatherIconColor(currentWeather) }"
        />
        <p class="description" v-if="currentWeather">
          {{ getWeatherDescription(currentWeather) }}
        </p>
      </div>
    </div>

    <!-- KARTU BAWAH Detail -->
    <div class="details-card" v-if="dailySummary">
      <div class="detail-item">
        <IonIcon :icon="arrowDown" />
        <small>Terendah</small>
        <span>{{ Math.round(dailySummary.minTemp) }}°</span>
      </div>
      <div class="detail-item">
        <IonIcon :icon="arrowUp" />
        <small>Tertinggi</small>
        <span>{{ Math.round(dailySummary.maxTemp) }}°</span>
      </div>
      <div class="detail-item">
        <IonIcon :icon="timeOutline" />
        <small>Waktu</small>
        <span>{{ currentTime }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import { IonIcon } from "@ionic/vue";
import { arrowUp, arrowDown, timeOutline } from "ionicons/icons";
import {
  getWeatherIcon,
  getWeatherIconColor,
  getWeatherDescription,
} from "../utils/useWeatherUtils";
import type { HourlyWeatherItem, DailySummaryItem } from "../types";

defineProps<{
  currentWeather: HourlyWeatherItem | null;
  dailySummary: DailySummaryItem | null;
  todayDate: string;
  currentTime: string;
}>();
</script>

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

.current-weather-wrapper {
  animation: contentFadeIn 0.5s ease-in-out 0.1s both;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px; 
}

.main-info-card-gradient {
  background: linear-gradient(160deg, #a9b5df 0%, #7886c7 100%);
  color: #fff2f2;
  border-radius: 16px;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 6px 20px rgba(120, 134, 199, 0.5);
}

.text-info .date-time {
  font-size: 0.9em;
  font-weight: 520;
  color: #2d336b;
  margin: 0;
  opacity: 0.9;
}
.text-info h2 {
  font-size: 1.6em;
  font-weight: 700;
  color: #55629b;
  margin: 2px 0;
  text-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}

.text-info .main-temp {
  font-size: 4.5em;
  font-weight: 700;
  color: #fff2f2;
  line-height: 1;
  text-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}
.text-info .main-temp .degree {
  font-size: 0.4em;
  font-weight: 700;
  vertical-align: top;
  margin-left: 2px;
}

.icon-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px; 
}
.icon-info .main-icon {
  font-size: 7em;
  filter: drop-shadow(0 4px 10px rgba(0, 0, 0, 0.1));
}
.icon-info .description {
  font-size: 1.1em;
  font-weight: 600;
  margin: 0;
  color: #fff2f2; 
}

/* KARTU BAWAH */
.details-card {
  background: #fff2f2; 
  color: #2d336b;
  border-radius: 16px;
  padding: 16px;
  display: flex;
  justify-content: space-around; 
  align-items: center;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
}

.detail-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  font-weight: 600;
  font-size: 1em;
}
.detail-item ion-icon {
  font-size: 1.8em;
  color: #7886c7; 
}
.detail-item small {
  font-size: 0.8em;
  font-weight: 500;
  color: #7886c7; 
}

/*
  RESPONSIF
*/
@media (max-width: 400px) {
  .main-info-card-gradient {
   
    flex-direction: column;
    text-align: center;
    gap: 16px;
  }
  .icon-info .main-icon {
    font-size: 6.5em; 
  }
  .text-info .main-temp {
    font-size: 4em; 
  }
}
</style>
