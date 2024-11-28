import { FilterPokemon } from "_components/FilterPokemon";
import Pagination from "_components/Pagination";
import PokemonDetail from "_components/PokemonDetail";
import PokemonList from "_components/PokemonList";
import SearchBar from "_components/SearchBar";
import SkeletonList from "_components/SkeletonList";
import { usePokemonContext } from "_context/PokemonContext";
import { FC, useEffect } from "react";

export const AppContent: FC = () => {
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
