import { usePokemonContext } from "_context/PokemonContext";
import { FC } from "react";

const PokemonDetail: FC = () => {
  const { selectedPokemon, setSelectedPokemon } = usePokemonContext();

  if (!selectedPokemon) return null;

  return (
    <div className="pokemon-detail">
      <h2>{selectedPokemon.name}</h2>
      <img
        src={selectedPokemon.sprites.front_default}
        alt={selectedPokemon.name}
      />
      <h3>Habilidades</h3>
      <ul>
        {selectedPokemon.abilities.map((ability, index) => (
          <li key={index}>{ability.ability.name}</li>
        ))}
      </ul>
      <h3>Tipos</h3>
      <ul>
        {selectedPokemon.types.map((type, index) => (
          <li key={index}>{type.type.name}</li>
        ))}
      </ul>
      <button onClick={() => setSelectedPokemon(null)}>
        Volver a la lista
      </button>
    </div>
  );
};

export default PokemonDetail;
