import React, { useState } from "react";

interface SearchFormProps {
  onSearch: (params: {
    origin: string; // SkyId do aeroporto de origem
    destination: string; // SkyId do aeroporto de destino
    departureDate: string; // Data de partida (YYYY-MM-DD)
    returnDate?: string; // Data de retorno (opcional)
  }) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch }) => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validação simples para garantir que os campos obrigatórios estejam preenchidos
    if (!origin || !destination || !departureDate) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    onSearch({ origin, destination, departureDate, returnDate });
  };

  return (
    <form
      className="flex flex-col gap-4 bg-white p-6 rounded-lg shadow-md max-w-md mx-auto"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        placeholder="Origem (SkyId, ex: BOM)"
        value={origin}
        onChange={(e) => setOrigin(e.target.value)}
        className="border p-2 rounded"
        required
      />
      <input
        type="text"
        placeholder="Destino (SkyId, ex: JFK)"
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
        className="border p-2 rounded"
        required
      />
      <input
        type="date"
        placeholder="Data de partida"
        value={departureDate}
        onChange={(e) => setDepartureDate(e.target.value)}
        className="border p-2 rounded"
        required
      />
      <input
        type="date"
        placeholder="Data de retorno (opcional)"
        value={returnDate}
        onChange={(e) => setReturnDate(e.target.value)}
        className="border p-2 rounded"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        Buscar Voos
      </button>
    </form>
  );
};

export default SearchForm;
