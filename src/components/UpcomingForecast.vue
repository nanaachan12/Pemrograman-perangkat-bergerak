<template>
  <IonLabel class="section-title ion-padding-start">
    <IonIcon :icon="trendingUpOutline" />
    Hari Berikutnya
  </IonLabel>

  <IonSegment
    :value="selectedDay"
    @ionChange="onDayChange"
    :scrollable="true"
    mode="md"
    class="day-segment ion-padding-start ion-padding-end"
  >
    <IonSegmentButton v-for="date in upcomingDays" :key="date" :value="date">
      <IonLabel>{{ formatTabLabel(date) }}</IonLabel>
    </IonSegmentButton>
  </IonSegment>

  <div class="upcoming-hourly-forecast ion-padding">
    <div
      v-if="selectedDayData.length === 0 && !loading"
      class="empty-state ion-padding"
    >
      <IonIcon :icon="calendarOutline" />
      <IonLabel>Pilih tanggal untuk melihat rincian.</IonLabel>
    </div>

    <IonList v-else class="upcoming-list-flat" lines="none">
      <IonItem
        v-for="item in selectedDayData"
        :key="item.time"
        class="upcoming-item-flat"
      >
        <IonLabel class="item-details">
          <IonIcon
            :icon="getWeatherIcon(item)"
            :style="{ color: getWeatherIconColor(item) }"
          />
          <div class="item-text">
            <strong>{{ formatHour(item.time) }}</strong>
            <span>{{ getWeatherDescription(item) }}</span>
          </div>
        </IonLabel>
        <IonLabel slot="end" class="item-suhu">
          {{ Math.round(item.temp) }}°C
        </IonLabel>
      </IonItem>
    </IonList>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from "vue";
import {
  IonLabel,
  IonIcon,
  IonSegment,
  IonSegmentButton,
  IonList,
  IonItem,
} from "@ionic/vue";
import { trendingUpOutline, calendarOutline } from "ionicons/icons";
import {
  formatTabLabel,
  formatHour,
  getWeatherIcon,
  getWeatherIconColor,
  getWeatherDescription,
} from "../utils/useWeatherUtils";
import type { HourlyWeatherItem } from "../types";

defineProps<{
  upcomingDays: string[];
  selectedDay: string | undefined;
  selectedDayData: HourlyWeatherItem[];
  loading: boolean;
}>();

const emit = defineEmits(["dayChange"]);

const onDayChange = (event: CustomEvent) => {
  emit("dayChange", event.detail.value as string);
};
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
.day-segment {
  animation: contentFadeIn 0.5s ease-in-out 0.3s both;
}
.upcoming-hourly-forecast {
  animation: contentFadeIn 0.5s ease-in-out 0.4s both;
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

.upcoming-hourly-forecast {
  padding-bottom: 16px;
}

ion-segment.day-segment {
  --background: transparent;
}

ion-segment-button {
  --background: #fff7f7;
  --color: #7886c7;
  --border-radius: 14px;
  --indicator-color: transparent !important;
  --padding-top: 6px;
  --padding-bottom: 6px;
  --padding-start: 12px;
  --padding-end: 12px;
  border: none;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
  margin-right: 6px;
  transition: all 0.25s ease;
  flex: 0 0 auto;
  min-width: 60px;
  backdrop-filter: blur(6px);
}

ion-segment-button ion-label {
  font-size: 0.85em;
  font-weight: 500;
  color: inherit;
  white-space: pre-wrap;
  line-height: 1.3;
}

ion-segment-button.segment-button-checked {
  background: none;
  --background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(8px);
  --color: #2d336b;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  font-weight: 700;
}

ion-segment-button:hover {
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.06);
  transform: translateY(-1px);
}

.upcoming-list-flat {
  background: transparent;
  backdrop-filter: none;
  box-shadow: none;
  border: none;
  padding: 0;
}

.upcoming-item-flat {
  --background: #fff2f2;
  border: none;
  border-radius: 12px;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  font-size: 1em;
  background-color: #fff2f2;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  transition: all 0.35s ease;
  opacity: 0;
  animation: fadeSlideUp 0.6s ease forwards;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}


.upcoming-item-flat:nth-child(1) {
  animation-delay: 0.1s;
}
.upcoming-item-flat:nth-child(2) {
  animation-delay: 0.2s;
}
.upcoming-item-flat:nth-child(3) {
  animation-delay: 0.3s;
}
.upcoming-item-flat:nth-child(4) {
  animation-delay: 0.4s;
}
.upcoming-item-flat:nth-child(5) {
  animation-delay: 0.5s;
}
.upcoming-item-flat:nth-child(6) {
  animation-delay: 0.6s;
}
.upcoming-item-flat:nth-child(7) {
  animation-delay: 0.7s;
}
.upcoming-item-flat:nth-child(8) {
  animation-delay: 0.8s;
}
.upcoming-item-flat:nth-child(9) {
  animation-delay: 0.9s;
}

@keyframes fadeSlideUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.item-details {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-grow: 1;
  text-align: left;
  position: relative;
  z-index: 1;
}
.item-details ion-icon {
  font-size: 1.9em;
}
.item-details .item-text {
  display: flex;
  flex-direction: column;
}
.item-text strong {
  font-weight: 600;
  font-size: 1em;
  color: #2d336b;
}
.item-text span {
  font-size: 0.8em;
  color: #7886c7;
  white-space: nowrap;
}

.item-suhu {
  background: none;
  padding: 0;
  border-radius: 0;
  box-shadow: none;
  border: none;
  font-weight: 600;
  font-size: 1.1em;
  color: #7886c7;
  text-align: right;
  min-width: 60px;
  flex-basis: auto;
  flex-shrink: 0;
}
</style>
