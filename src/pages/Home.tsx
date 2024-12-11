import React, { useState } from 'react';
import SearchForm from '../components/SearchForm';
import FlightCard from '../components/FlightCard';
import Loader from '../components/Loader';
import { searchFlights, Flight } from '../api/skyScrapperApi';

const Home: React.FC = () => {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (params: {
    origin: string;
    destination: string;
    departureDate: string;
    returnDate?: string;
  }) => {
    setLoading(true);
    try {
      const data = await searchFlights(params);
      setFlights(data);
    } catch (error) {
      console.error('Erro ao buscar voos:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-center mb-6">Google Flights Project</h1>
      <SearchForm onSearch={handleSearch} />
      {loading && <Loader />}
      <div className="grid gap-4 mt-6">
        {Array.isArray(flights) && flights.length > 0 ? (
          flights.map((flight, index) => (
            <FlightCard key={index} flight={flight} />
          ))
        ) : (
          !loading && <p className="text-center">Nenhum voo encontrado.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
