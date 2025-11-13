export interface HourlyWeatherItem {
  time: string;
  temp: number;
  code: number;
  humidity: number; 
}

export interface DailySummaryItem { 
  date: string;
  maxTemp: number;
  minTemp: number;
  code: number;
}

export interface WeatherData {
  hourly: {
    time: string[];
    temperature_2m: number[];
    weather_code?: number[];
    relative_humidity_2m?: number[]; 
  };
  daily: {
    time: string[];
    weathercode: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
  };
}