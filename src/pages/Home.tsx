import React, { useState } from 'react';
import SearchForm from '../components/SearchForm';
import FlightCard from '../components/FlightCard';
import { searchFlights, Flight, FlightSearchParams } from '../api/skyScrapperApi';
import Image from 'next/image';
import BannerHome from '../assets/imgs/banner.jpg'; // Certifique-se de que o caminho está correto

const Home: React.FC = () => {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchMade, setSearchMade] = useState(false); // Estado para controlar se a busca foi feita

  const handleSearch = async (params: FlightSearchParams) => {
    setLoading(true);
    setSearchMade(true); // Marca que a busca foi feita
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
    <div className="p-4 bg-[#16202a] min-h-screen">
      {/* Banner */}
      <div className="mb-6">
        <Image
          src={BannerHome}
          alt="Image Banner Principal"
          className="w-full h-[260px] max-md:h-[130px] object-cover"
        />
      </div>

      <h1 className="text-3xl text-center mb-6 text-white">Google Flights Project</h1>
      <SearchForm onSearch={handleSearch} />
      {loading && <p className="text-white text-center mt-8 ">Loading...</p>}
      <div className="grid gap-4 mt-6">
        {flights.length > 0 ? (
          flights.map((flight, index) => (
            <FlightCard key={index} flight={flight} />
          ))
        ) : (
          !loading && searchMade && (
            <p className="text-center text-white mt-12">
              No flight found in this search.
            </p>
          )
        )}
      </div>
    </div>
  );
};

export default Home;
