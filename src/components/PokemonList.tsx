import { usePokemonContext } from "_context/PokemonContext";

const PokemonList: React.FC = () => {
  const { filteredPokemons, fetchPokemonDetail } = usePokemonContext();

  return (
    <ul>
      {filteredPokemons.map((pokemon, index) => (
        <li
          key={index}
          onClick={() => fetchPokemonDetail(pokemon.url)}
          style={{ cursor: "pointer" }}
        >
          {pokemon.name}
        </li>
      ))}
    </ul>
  );
};

export default PokemonList;
