<template>
  <IonHeader :translucent="true" class="weather-header no-dark">
    <IonToolbar class="glass-toolbar">
      <IonTitle class="weather-title">
        <IonIcon :icon="sunnyOutline" class="weather-icon" />
        Prakiraan Cuaca
      </IonTitle>

      <IonButtons slot="end">
        <IonButton
          @click="$emit('open-profile-modal')"
          fill="clear"
          class="profile-button"
        >
          <IonIcon slot="icon-only" :icon="personCircleOutline" />
        </IonButton>
      </IonButtons>
    </IonToolbar>
  </IonHeader>
</template>

<script setup lang="ts">
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonIcon,
} from "@ionic/vue";
import { personCircleOutline, sunnyOutline } from "ionicons/icons";

defineEmits<{
  (e: "open-profile-modal"): void;
}>();
</script>

<style scoped>
.no-dark {
  color-scheme: only light !important;
  --ion-background-color: #fff2f2 !important;
  --ion-text-color: #2d336b !important;
  --ion-toolbar-background: rgba(255, 242, 242, 0.5) !important;
  --ion-toolbar-color: #2d336b !important;
}
.glass-toolbar {
  background: rgba(255, 255, 255, 0.12); 
  backdrop-filter: blur(16px) saturate(160%);
  -webkit-backdrop-filter: blur(16px) saturate(160%);
  padding: 6px 12px;
  transition: all 0.4s ease-in-out;
}

.weather-title {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  color: #2d336b !important;
  letter-spacing: 0.5px;
  font-size: 1.25rem;
  text-shadow: 0 2px 6px rgba(120, 134, 199, 0.25);
  line-height: 2; 
}

.weather-icon {
  color: #7886c7 !important;
  font-size: 1.6rem; 
  margin-right: 6px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transform: translateY(4px);
  filter: drop-shadow(0 2px 3px rgba(120, 134, 199, 0.3));
}


@keyframes floatIcon {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-4px);
  }
}

.profile-button {
  color: #2d336b !important;

  border-radius: 50%;
  box-shadow: 0 2px 8px rgba(120, 134, 199, 0.15);
  transition: all 0.3s ease;
}

.profile-button:hover {
  transform: scale(1.12);
  background: rgba(169, 181, 223, 0.45);
  box-shadow: 0 4px 14px rgba(120, 134, 199, 0.25);
}
</style>
