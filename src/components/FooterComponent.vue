<template>
  <IonFooter :translucent="true">
    <IonToolbar
  class="footer-toolbar"
  :style="{
    '--background': themeStyles.footerColor,
    '--color': themeStyles.footerTextColor
  }"
>
  <p class="footer-text">
    <IonIcon :icon="cloudOutline" class="footer-icon" />
    Powered by
    <a
      href="https://open-meteo.com/"
      target="_blank"
      rel="noopener noreferrer"
      class="footer-link"
    >
      Open-Meteo
    </a>
  </p>
</IonToolbar>
  </IonFooter>
</template>

<script setup lang="ts">
import { IonFooter, IonToolbar, IonIcon } from '@ionic/vue';
import { cloudOutline } from 'ionicons/icons';

defineProps<{
  themeStyles: any;
}>();
</script>

<style scoped>
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

.footer-toolbar {
  text-align: center;
  font-size: 0.9rem;
  padding: 10px 0;
 
  background: linear-gradient(
    135deg,
    rgba(255, 242, 242, 0.6),
    rgba(169, 181, 223, 0.4)
  );
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow: none !important;
}

.footer-text {
  color: #2d336b;
  font-weight: 500;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
}

.footer-icon {
  font-size: 1.5rem;
}

.footer-link {
  color: #2d336b;
  font-weight: 600;
  text-decoration: none;
  transition: color 0.3s ease, text-shadow 0.3s ease;
}

.footer-link:hover {
  color: #7886c7;
  text-shadow: 0 0 6px rgba(120, 134, 199, 0.5);
}

</style>