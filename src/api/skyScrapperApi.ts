import axios from 'axios';

const API_KEY = '5e10df73a0mshc21bb26e095c2adp1844e7jsn12e8bddffe60';

// Define the parameters
export interface FlightSearchParams {
  origin: string;
  destination: string;
  departureDate: string;
  returnDate?: string;
}

export interface Flight {
  origin: string;
  destination: string;
  price: number;
  date: string;
  link: string;
}

export const searchFlights = async (params: FlightSearchParams): Promise<Flight[]> => {
  const options = {
    method: 'GET',
    url: 'https://sky-scrapper.p.rapidapi.com/api/v1/flights/getPriceCalendar',
    params: {
      originSkyId: params.origin,
      destinationSkyId: params.destination,
      fromDate: params.departureDate,
      toDate: params.returnDate || '',
      currency: 'USD',
    },
    headers: {
      'X-RapidAPI-Host': 'sky-scrapper.p.rapidapi.com',
      'X-RapidAPI-Key': API_KEY,
    },
  };

  try {
    const response = await axios.request(options);
    return response.data.data || []; // Retorna os dados de voos
  } catch (error) {
    console.error('Erro ao buscar voos:', error);
    throw error;
  }
};

