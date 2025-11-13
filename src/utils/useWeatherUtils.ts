import {
  sunny,
  partlySunny,
  cloudy,
  rainy,
  thunderstorm,
  snow,
  moon,
  cloud,
  cloudyNight as cloudyNightIcon,
} from 'ionicons/icons';
import type { HourlyWeatherItem } from '../types';

export function formatHour(isoString: string): string {
  const date = new Date(isoString);
  return new Intl.DateTimeFormat('id-ID', {
    hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Asia/Jakarta'
  }).format(date);
}

export function formatTabLabel(dateString: string): string {
  const inputDate = new Date(dateString + 'T12:00:00Z');
  
  return new Intl.DateTimeFormat('id-ID', {
    weekday: 'short', 
    day: 'numeric', 
    month: 'short', 
    timeZone: 'UTC', 
  }).format(inputDate);
}

export function getWeatherIcon(item: HourlyWeatherItem): string {
  if (!item) return cloudy; 

  const { temp, humidity, code } = item;

  if (humidity > 0) {
    if (temp <= 23 && humidity >= 80) return cloud; 
    if (temp >= 24 && temp <= 30 && humidity >= 90) return thunderstorm; 
    if (temp >= 24 && temp <= 30 && humidity >= 80) return rainy; 
    if (temp >= 30 && temp <= 34 && humidity <= 60) return sunny; 
    if (temp >= 26 && temp <= 32 && humidity >= 70 && humidity <= 85) return partlySunny; 
  }

  const itemHour = parseInt(item.time.split('T')[1].split(':')[0], 10);
  const isNight = itemHour < 6 || itemHour > 18;
  
  if (code === 0) return isNight ? moon : sunny;
  if (code === 1) return isNight ? cloudyNightIcon : partlySunny; 
  if (code === 2) return isNight ? cloudyNightIcon : cloudy;
  if (code === 3) return cloudy;
  if ([45, 48].includes(code)) return cloud; 
  if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)) return rainy;
  if ([71, 73, 75, 85, 86].includes(code)) return snow;
  if ([95, 96, 99].includes(code)) return thunderstorm;
  
  return cloudy; 
}

export function getWeatherIconColor(item: HourlyWeatherItem): string {
  if (!item) return 'var(--ion-color-primary)';

  const { temp, humidity, code } = item;
if (humidity > 0) {
  if (temp <= 23 && humidity >= 80) return '#9EE6FF'; 
  if (temp >= 24 && temp <= 30 && humidity >= 90) return '#7A80FF'; 
  if (temp >= 24 && temp <= 30 && humidity >= 80) return '#A7C5FF'; 
  if (temp >= 30 && temp <= 34 && humidity <= 60) return '#FFAA80'; 
  if (temp >= 26 && temp <= 32 && humidity >= 70 && humidity <= 85) return '#FFE680'; 
}

  
  
  const itemHour = parseInt(item.time.split('T')[1].split(':')[0], 10);
  const isNight = itemHour < 6 || itemHour > 18;

  if (code === 0) return isNight ? '#F0E68C' : '#FFD700';
  if (code === 1 || code === 2) return isNight ? '#B0E0E6' : '#FFD700'; 
  if (code === 3) return '#B0C4DE'; 
  if ([45, 48].includes(code)) return '#B0C4DE'; 
  if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)) return '#4682B4'; 
  if ([71, 73, 75, 85, 86].includes(code)) return '#ADD8E6';
  if ([95, 96, 99].includes(code)) return '#483D8B'; 
  
  return 'var(--ion-color-primary)'; 
}

export function getWeatherDescription(item: HourlyWeatherItem): string {
  if (!item) return "Berawan"; 

  const { temp, humidity, code } = item;

  if (humidity > 0) {
    if (temp <= 23 && humidity >= 80) return "Berkabut/Mendung Tebal";
    if (temp >= 24 && temp <= 30 && humidity >= 90) return "Hujan Lebat/Badai Petir";
    if (temp >= 24 && temp <= 30 && humidity >= 80) return "Hujan Ringan/Gerimis";
    if (temp >= 30 && temp <= 34 && humidity <= 60) return "Cerah Terik";
    if (temp >= 26 && temp <= 32 && humidity >= 70 && humidity <= 85) return "Cerah Berawan";
  }
  
  if (code === 0) return "Cerah";
  if (code === 1) return "Cerah Berawan";
  if (code === 2) return "Berawan";
  if (code === 3) return "Sangat Berawan";
  if ([45, 48].includes(code)) return "Berkabut";
  if ([51, 53, 55, 61, 63, 65].includes(code)) return "Hujan";
  if ([80, 81, 82].includes(code)) return "Hujan Deras";
  if ([71, 73, 75, 85, 86].includes(code)) return "Salju";
  if ([95, 96, 99].includes(code)) return "Badai Petir";
  
  return "Berawan";
}