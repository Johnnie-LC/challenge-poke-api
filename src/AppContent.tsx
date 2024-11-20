/* eslint-disable react/react-in-jsx-scope */
import { useEffect } from "react";
import { FilterPokemon } from "./components/FilterPokemon";
import Pagination from "./components/Pagination";
import PokemonDetail from "./components/PokemonDetail";
import PokemonList from "./components/PokemonList";
import SearchBar from "./components/SearchBar";
import SkeletonList from "./components/SkeletonList";
import { usePokemonContext } from "./context/PokemonContext";

export const AppContent: React.FC = () => {
  const {
    loading,
    error,
    fetchPokemons,
    currentPage,
    selectedPokemon,
    searchTerm,
  } = usePokemonContext();

  useEffect(() => {
    fetchPokemons(currentPage);
  }, [currentPage]);

  const renderContent = () => {
    if (loading) return <SkeletonList />;
    if (error) return <div className="error-message">{error}</div>;
    if (selectedPokemon) return <PokemonDetail />;
    if (searchTerm) return <FilterPokemon />;
    return (
      <>
        <PokemonList />
        <Pagination />
      </>
    );
  };

  return (
    <div className="page">
      <header>
        <h1>Buscador de pokemons</h1>
        <SearchBar />
      </header>
      <main>{renderContent()}</main>
    </div>
  );
};
