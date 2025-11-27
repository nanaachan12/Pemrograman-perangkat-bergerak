import axios from 'axios';

export interface CryptoData {
  id: string;
  symbol: string;
  name: string;
  rank: number;
  price_usd: string;
  percent_change_24h: string;
  percent_change_1h: string;
  percent_change_7d: string;
  price_btc: string;
  market_cap_usd: string;
  volume24: string;
  volume24a: string;
  csupply: string;
  tsupply: string;
  msupply: string | null;
}

const API_URL = 'https://api.coinlore.net/api/tickers/';

export const getCryptoData = async (): Promise<CryptoData[]> => {
  try {
    const response = await axios.get(API_URL);

    const data = response.data;

    if (data && data.data) {
      return data.data.map((item: any) => ({
        ...item,
        rank: parseInt(item.rank, 10)
      }));
    } else {
      throw new Error('Format data tidak terduga dari API.');
    }
  } catch (error: any) {
    const msg = error.response ? `Status: ${error.response.status}` : error.message;
    throw new Error(`Gagal mengambil data aset. ${msg}`);
  }
};