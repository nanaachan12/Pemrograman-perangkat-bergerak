<template>
  <IonModal :is-open="isOpen" @didDismiss="closeModal">
    <IonHeader>
      <IonToolbar :style="{ '--background': themeStyles.toolbarColor, '--color': themeStyles.toolbarTextColor }">
        <IonTitle>Profil Saya</IonTitle>
        <IonButtons slot="end">
          <IonButton @click="closeModal" fill="clear">Tutup</IonButton>
        </IonButtons>
      </IonToolbar>
    </IonHeader>
    
    <IonContent class="ion-padding" :style="{ '--background': themeStyles.cardLightBackground }">
      <div class="profile-card" :style="{ background: themeStyles.modalBackground }">

        <div class="profile-avatar-wrapper" :style="{ background: themeStyles.cardLightBackground }">
          <IonIcon :icon="personCircleOutline" class="profile-avatar" :style="{ color: themeStyles.ionPrimary }" />
        </div>

        <h2 class="profile-name">Nabila Naurotul Ummah</h2>
        <p class="profile-prodi" :style="{ color: themeStyles.ionPrimary }">Sistem Informasi</p>
        <p class="profile-nim">048656024</p>

        <hr class="divider" />

        <div class="profile-socials-simple">
          <IonButton href="https://github.com/nanaachan12" target="_blank" fill="clear" class="social-button-simple" :style="{ '--color': themeStyles.socialIconColor }">
            <IonIcon slot="icon-only" :icon="logoGithub"></IonIcon>
          </IonButton>
          
          <IonButton href="https://linkedin.com/in/nabila-naurotul" target="_blank" fill="clear" class="social-button-simple" :style="{ '--color': themeStyles.socialIconColor }">
            <IonIcon slot="icon-only" :icon="logoLinkedin"></IonIcon>
          </IonButton>
          
          <IonButton href="#" target="_blank" fill="clear" class="social-button-simple" :style="{ '--color': themeStyles.socialIconColor }">
            <IonIcon slot="icon-only" :icon="logoInstagram"></IonIcon>
          </IonButton>
        </div>
        
      </div>
    </IonContent>
  </IonModal>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonContent,
  IonIcon,
} from '@ionic/vue';
import {
  personCircleOutline, 
  logoGithub,
  logoLinkedin,
  logoInstagram,
} from 'ionicons/icons';

defineProps<{
  isOpen: boolean;
  themeStyles: Record<string, any>;
}>();

const emit = defineEmits(['didDismiss']);

const closeModal = () => {
  emit('didDismiss');
};
</script>

<style scoped>
ion-modal ion-content {
  --background: #A9B5DF; 
}

.profile-card {
  border-radius: 20px;
  box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.1);
  padding: 24px;
  text-align: center;
  margin: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.profile-avatar-wrapper {
  border-radius: 50%;
  width: 120px;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
  box-shadow: 0 4px 15px -5px rgba(120, 134, 199, 0.7); 
}

.profile-avatar {
  font-size: 80px;
}

.profile-name {
  font-size: 1.6em; 
  font-weight: 700;
  color: #7886C7;
  margin: 0;
}

.profile-prodi {
  font-size: 1.1em;
  font-weight: 600;
  margin-top: 4px;
  margin-bottom: 0;
  color: #7886C7;
}

.profile-nim {
  font-size: 1em;
  color: #777; 
  margin-top: 4px;
}

.divider {
  border: none;
  border-top: 1px solid #e0e0e0; 
  width: 80%;
  margin: 20px 0;
}


.profile-socials-simple {
  display: flex;
  justify-content: center;
  gap: 16px;
  width: 100%;
}
.social-button-simple {
  --border-radius: 50%;
  font-size: 1.8em;
}
</style>