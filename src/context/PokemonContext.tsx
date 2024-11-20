import { createContext, useContext, useState } from "react";
import { fetchPokemonDetails, fetchPokemonList } from "../service/api";

interface Pokemon {
  name: string;
  url: string;
}

interface PokemonDetail {
  name: string;
  sprites: {
    front_default: string;
  };
  abilities: { ability: { name: string } }[];
  types: { type: { name: string } }[];
}

interface PokemonContextValue {
  pokemons: Pokemon[];
  filteredPokemons: Pokemon[];
  selectedPokemon: PokemonDetail | null;
  loading: boolean;
  error: string | null;
  searchTerm: string;
  currentPage: number;
  fetchPokemons: (page: number) => void;
  fetchPokemonDetail: (url: string) => void;
  setSearchTerm: (term: string) => void;
  setSelectedPokemon: (pokemon: PokemonDetail | null) => void;
  setCurrentPage: (page: number) => void;
}

const PokemonContext = createContext<PokemonContextValue | undefined>(
  undefined
);

export const PokemonProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [filteredPokemons, setFilteredPokemons] = useState<Pokemon[]>([]);
  const [selectedPokemon, setSelectedPokemon] = useState<PokemonDetail | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // Estado de error
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 20;

  const fetchPokemons = async (page: number) => {
    setLoading(true);
    setError(null);
    const offset = (page - 1) * limit;
    try {
      const data = await fetchPokemonList(limit, offset);
      setPokemons(data.results);
      setFilteredPokemons(data.results);
    } catch (error: any) {
      setError("Hubo un problema al cargar los Pokémon. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  const fetchPokemonDetail = async (url: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchPokemonDetails(url);
      setSelectedPokemon(data);
    } catch (error: any) {
      setError("Hubo un problema al cargar los detalles del Pokémon.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PokemonContext.Provider
      value={{
        pokemons,
        filteredPokemons,
        selectedPokemon,
        loading,
        error,
        searchTerm,
        currentPage,
        fetchPokemons,
        fetchPokemonDetail,
        setSearchTerm,
        setSelectedPokemon,
        setCurrentPage,
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
};

export const usePokemonContext = () => {
  const context = useContext(PokemonContext);
  if (!context) {
    throw new Error("usePokemonContext must be used within a PokemonProvider");
  }
  return context;
};
