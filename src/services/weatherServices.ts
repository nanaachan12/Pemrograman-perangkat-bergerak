import axios from 'axios';

const API_URL ='https://api.open-meteo.com/v1/forecast?latitude=-6.2&longitude=106.8&hourly=temperature_2m,weather_code,relative_humidity_2m&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=Asia%2FJakarta';
export async function getWeather() {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Gagal mengambil data cuaca:', error);
    return null;
  }
}
