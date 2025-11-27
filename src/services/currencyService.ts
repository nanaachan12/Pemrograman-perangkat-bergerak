import axios from 'axios';

const BASE_URL = 'https://api.frankfurter.app/latest';

export const getExchangeRate = async (from: string, to: string): Promise<number> => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        from: from,
        to: to
      }
    });
    
    return response.data.rates[to];
  } catch (error) {
    console.error('Error fetching exchange rate:', error);
    throw error;
  }
};