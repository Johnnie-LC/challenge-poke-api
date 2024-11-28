import { usePokemonContext } from "_context/PokemonContext";

export const FilterPokemon: React.FC = () => {
  const { searchTerm, filteredPokemons, fetchPokemonDetail } =
    usePokemonContext();

  if (searchTerm) {
    return (
      <>
        <ul className="search-results">
          {filteredPokemons
            .filter((pokemon) =>
              pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((pokemon) => (
              <li
                key={pokemon.name}
                onClick={() => fetchPokemonDetail(pokemon.url)}
                style={{ cursor: "pointer" }}
              >
                {pokemon.name}
              </li>
            ))}
        </ul>
      </>
    );
  }

  return <></>;
};
