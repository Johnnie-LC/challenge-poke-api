import { usePokemonContext } from "../context/PokemonContext";

const SearchBar: React.FC = () => {
  const { searchTerm, setSearchTerm } = usePokemonContext();

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
    setSearchTerm(event.target.value);
  };

  return (
    <input
      type="text"
      placeholder="Buscar Pokemon"
      value={searchTerm}
      onChange={handleSearchChange}
    />
  );
};

export default SearchBar;
