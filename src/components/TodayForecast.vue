<template>
  <IonLabel class="section-title ion-padding-start">
    <IonIcon :icon="calendarClearOutline" />
    Hari Ini
  </IonLabel>

  <div class="horizontal-scroll-wrapper ion-padding-start ion-padding-end">
    <div class="today-forecast-container-glass" ref="scrollContainer">
      <div
        v-for="item in hourlyForecast"
        :key="item.time"
        :class="[
          'today-hour-item',
          {
            'current-hour-highlight':
              formatHour(item.time) === currentHourMarker,
          },
        ]"
      >
        <IonLabel class="today-time">{{
          formatHour(item.time) === currentHourMarker
            ? "Saat ini"
            : formatHour(item.time)
        }}</IonLabel>
        <IonIcon
          :icon="getWeatherIcon(item)"
          class="today-icon"
          :style="{ color: getWeatherIconColor(item) }"
        />
        <IonLabel class="today-temp">{{ Math.round(item.temp) }}°C</IonLabel>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref, onMounted, nextTick } from "vue";
import { IonLabel, IonIcon } from "@ionic/vue";
import { calendarClearOutline } from "ionicons/icons";
import {
  formatHour,
  getWeatherIcon,
  getWeatherIconColor,
} from "../utils/useWeatherUtils";
import type { HourlyWeatherItem } from "../types";

defineProps<{
  hourlyForecast: HourlyWeatherItem[];
  currentHourMarker: string;
}>();

const scrollContainer = ref<HTMLElement | null>(null);

onMounted(() => {
  const container = scrollContainer.value;
  if (container) {
    const observer = new MutationObserver((mutations, obs) => {
      const highlightElement = container.querySelector(
        ".current-hour-highlight"
      ) as HTMLElement;

      if (highlightElement) {
        nextTick(() => {
          const containerRect = container.getBoundingClientRect();
          const elementRect = highlightElement.getBoundingClientRect();

          const scrollOffset =
            elementRect.left +
            elementRect.width / 2 -
            (containerRect.left + containerRect.width / 2);

          container.scrollBy({
            left: scrollOffset,
            behavior: "auto", 
          });
        });

        obs.disconnect(); 
      }
    });

    observer.observe(container, {
      childList: true, 
      subtree: true, 
    });
  }
});
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
.horizontal-scroll-wrapper {
  animation: contentFadeIn 0.5s ease-in-out 0.2s both;
}

.section-title {
  font-size: 1.2em;
  font-weight: 700;
  color: #2d336b; 
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 16px;
  margin-bottom: 8px;
}
.section-title ion-icon {
  font-size: 1.2em;
  opacity: 0.8;
}

.horizontal-scroll-wrapper {
  padding-bottom: 16px;
}
.horizontal-scroll-wrapper::-webkit-scrollbar {
  display: none;
}

.today-forecast-container-glass {
  display: flex;
  gap: 10px;
  background: rgba(169, 181, 223, 0.4);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  padding: 12px;
  overflow-x: auto;
  white-space: nowrap;
  -webkit-overflow-scrolling: touch;
}

.today-forecast-container-glass::-webkit-scrollbar {
  display: none;
}

.today-hour-item {
  flex: 0 0 auto;
  width: 75px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 10px 0;
  gap: 8px;
  transition: all 0.3s ease;
  border-radius: 12px;
  background: transparent;
  color: #2d336b;
  font-weight: 500;
}
.today-hour-item:hover {
  background: rgba(255, 255, 255, 0.2);
}

.today-time {
  font-size: 0.9em;
  color: #2d336b;
  font-weight: 600;
}

.today-icon {
  font-size: 2em;
}

.today-temp {
  font-size: 1em;
  font-weight: 500;
  color: #2d336b;
}

.current-hour-highlight {
  background: #7886c7;
  box-shadow: 0 4px 15px rgba(120, 134, 199, 0.4);
  transform: translateY(-2px);
}

.current-hour-highlight .today-time,
.current-hour-highlight .today-temp,
.current-hour-highlight .today-icon {
  color: #fff2f2 !important;
}

.current-hour-highlight .today-time {
  font-weight: 600;
}

.current-hour-highlight .today-temp {
  font-size: 1.2em;
  font-weight: 700;
}

.current-hour-highlight .today-icon {
  filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.2));
}
</style>
