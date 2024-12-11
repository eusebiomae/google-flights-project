import React, { useState } from "react";

interface SearchFormProps {
  onSearch: (params: {
    origin: string; // SkyId do aeroporto de origem
    destination: string; // SkyId do aeroporto de destino
    departureDate: string; // Data de partida (YYYY-MM-DD)
    returnDate?: string; // Data de retorno (opcional)
    passengers: { adults: number; children: number; infants: number }; // Quantidade de passageiros
    classType: string; // Classe selecionada
  }) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch }) => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [passengers, setPassengers] = useState({ adults: 1, children: 0, infants: 0 });
  const [classType, setClassType] = useState('economy');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!origin || !destination || !departureDate) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    onSearch({ origin, destination, departureDate, returnDate, passengers, classType });
  };

  const handlePassengerChange = (type: keyof typeof passengers, operation: 'increment' | 'decrement') => {
    setPassengers((prev) => {
      const newValue = operation === 'increment' ? prev[type] + 1 : Math.max(prev[type] - 1, 0);
      return { ...prev, [type]: newValue };
    });
  };

  const handleClassChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setClassType(e.target.value);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  // Contar o total de passageiros
  const totalPassengers = passengers.adults + passengers.children + passengers.infants;

  return (
    <form
      className="flex flex-wrap gap-4 bg-[#646569] p-6 rounded-lg shadow-md max-w-[600px] mx-auto relative"
      onSubmit={handleSubmit}
    >
        <div className="flex gap-4 flex-wrap">
            {/* Dropdown para selecionar passageiros */}
            <div className="relative">
                <button
                type="button"
                onClick={toggleDropdown}
                className="border p-2 rounded bg-[#646569] px-3 py-2 w-full"
                >
                {`Passengers: ${totalPassengers}`}
                </button>

                {isDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-full bg-[#646569] p-4 rounded-lg shadow-lg">
                    <div className="flex flex-wrap gap-6">
                    {['adults', 'children', 'infants'].map((type) => (
                        <div key={type} className="flex flex-col items-center">
                        <label htmlFor={type} className="">{type === 'adults' ? 'Adults' : type === 'children' ? 'Crianças (2-11 anos)' : 'Crianças de colo'}</label>
                        <div className="flex items-center gap-2">
                            <button
                            type="button"
                            onClick={() => handlePassengerChange(type as keyof typeof passengers, 'decrement')}
                            className="bg-gray-600  rounded-full px-3 py-1"
                            >
                            -
                            </button>
                            <span className="">{passengers[type as keyof typeof passengers]}</span>
                            <button
                            type="button"
                            onClick={() => handlePassengerChange(type as keyof typeof passengers, 'increment')}
                            className="bg-gray-600  rounded-full px-3 py-1"
                            >
                            +
                            </button>
                        </div>
                        </div>
                    ))}
                    </div>
                </div>
                )}
            </div>

            {/* Select para escolher a classe */}
            <div className="flex flex-col">
                {/* <label htmlFor="classType" className="text-white">Classe</label> */}
                <select
                    id="classType"
                    value={classType}
                    onChange={handleClassChange}
                    className="border p-2 rounded bg-[#646569]"
                >
                    <option value="economy">Economy</option>
                    <option value="premiumEconomy">Premium Economy</option>
                    <option value="business">Business</option>
                    <option value="first">First Class</option>
                </select>
            </div>
        </div>

        <div className="flex flex-wrap gap-4 justify-left">
            <input
                type="text"
                placeholder="From to (SkyId, ex: BOM)"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                className="border p-2 rounded min-w-[268px] bg-[#646569]"
                required
            />
            <input
                type="text"
                placeholder="Where to (SkyId, ex: JFK)"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="border p-2 rounded min-w-[268px] bg-[#646569]"
                required
            />
        </div>

        <div className="flex flex-wrap gap-4 justify-left">            
            <input
                type="date"
                placeholder="Depart"
                value={departureDate}
                onChange={(e) => setDepartureDate(e.target.value)}
                className="border p-2 rounded min-w-[268px] bg-[#646569]"
                required
            />
            <input
                type="date"
                placeholder="Return (optional)"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                className="border p-2 rounded min-w-[268px] bg-[#646569]"
            />
        </div>

        <div className="w-full flex justify-center">
            <button
                type="submit"
                className="bg-[#1a73e8] text-white py-2 px-4 rounded hover:bg-blue-600 min-w-[135px] absolute bottom-[-25px]"
            >
                Search
            </button>
        </div>


    </form>
  );
};

export default SearchForm;
