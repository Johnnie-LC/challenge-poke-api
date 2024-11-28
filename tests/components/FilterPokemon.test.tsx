import { fireEvent, render, screen } from "@testing-library/react";
import { FilterPokemon } from "_/components/FilterPokemon";
import { usePokemonContext } from "_context/PokemonContext";
import { vi } from "vitest";

vi.mock("_context/PokemonContext", () => ({
  usePokemonContext: vi.fn(),
}));

const renderFilterPokemonWithContext = (searchTerm, filteredPokemons) => {
  const mockFetchPokemonDetail = vi.fn();

  (usePokemonContext as jest.Mock).mockReturnValue({
    searchTerm,
    filteredPokemons,
    fetchPokemonDetail: mockFetchPokemonDetail,
  });

  render(<FilterPokemon />);
  return mockFetchPokemonDetail;
};

describe("FilterPokemon", () => {
  it("muestra los resultados filtrados cuando hay un término de búsqueda", () => {
    renderFilterPokemonWithContext("bul", [
      { name: "Bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1" },
      { name: "Charmander", url: "https://pokeapi.co/api/v2/pokemon/4" },
    ]);

    const listItems = screen.getAllByRole("listitem");

    expect(listItems.length).toBe(1);
    expect(listItems[0]).toHaveTextContent("Bulbasaur");
  });

  it("no muestra resultados si el término de búsqueda no coincide con ningún Pokémon", () => {
    renderFilterPokemonWithContext("xyz", [
      { name: "Bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1" },
      { name: "Charmander", url: "https://pokeapi.co/api/v2/pokemon/4" },
    ]);

    const listItems = screen.queryAllByRole("listitem");

    expect(listItems.length).toBe(0);
  });

  it("llama a fetchPokemonDetail cuando se hace clic en un Pokémon", () => {
    const mockFetchPokemonDetail = renderFilterPokemonWithContext("bul", [
      { name: "Bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1" },
      { name: "Charmander", url: "https://pokeapi.co/api/v2/pokemon/4" },
    ]);

    const listItem = screen.getByText("Bulbasaur");

    fireEvent.click(listItem);

    expect(mockFetchPokemonDetail).toHaveBeenCalledWith(
      "https://pokeapi.co/api/v2/pokemon/1"
    );
  });

  it("no muestra nada si no hay término de búsqueda", () => {
    renderFilterPokemonWithContext("", [
      { name: "Bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1" },
      { name: "Charmander", url: "https://pokeapi.co/api/v2/pokemon/4" },
    ]);

    const list = screen.queryByRole("list");
    expect(list).not.toBeInTheDocument();
  });
});
