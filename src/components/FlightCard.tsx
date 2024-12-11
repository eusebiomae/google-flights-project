import React from 'react';
import { Flight } from '../api/skyScrapperApi';

interface FlightCardProps {
  flight: Flight;
}

const FlightCard: React.FC<FlightCardProps> = ({ flight }) => {
  return (
    <div className="border p-4 rounded-lg shadow-sm">
      <div>
        <h3 className="text-lg font-bold">
          {flight.origin} → {flight.destination}
        </h3>
        <p>Preço: <span className="font-semibold">${flight.price.toFixed(2)}</span></p>
        <p>Data de partida: {new Date(flight.date).toLocaleDateString()}</p>
      </div>
      <a
        href={flight.link}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 hover:underline"
      >
        Reservar agora
      </a>
    </div>
  );
};

export default FlightCard;
