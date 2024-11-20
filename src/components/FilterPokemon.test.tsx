/* eslint-disable react/react-in-jsx-scope */
import { fireEvent, render, screen } from "@testing-library/react";
import { vi } from "vitest";
import { usePokemonContext } from "../context/PokemonContext";
import { FilterPokemon } from "./FilterPokemon";

vi.mock("../context/PokemonContext", () => ({
  usePokemonContext: vi.fn(),
}));

describe("FilterPokemon", () => {
  it("muestra los resultados filtrados cuando hay un término de búsqueda", () => {
    const mockFetchPokemonDetail = vi.fn();

    (usePokemonContext as jest.Mock).mockReturnValue({
      searchTerm: "bul",
      filteredPokemons: [
        { name: "Bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1" },
        { name: "Charmander", url: "https://pokeapi.co/api/v2/pokemon/4" },
      ],
      fetchPokemonDetail: mockFetchPokemonDetail,
    });

    render(<FilterPokemon />);

    const listItems = screen.getAllByRole("listitem");

    expect(listItems.length).toBe(1);
    expect(listItems[0]).toHaveTextContent("Bulbasaur");
  });

  it("no muestra resultados si el término de búsqueda no coincide con ningún Pokémon", () => {
    const mockFetchPokemonDetail = vi.fn();

    // Mock del contexto
    (usePokemonContext as jest.Mock).mockReturnValue({
      searchTerm: "xyz",
      filteredPokemons: [
        { name: "Bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1" },
        { name: "Charmander", url: "https://pokeapi.co/api/v2/pokemon/4" },
      ],
      fetchPokemonDetail: mockFetchPokemonDetail,
    });

    render(<FilterPokemon />);

    const listItems = screen.queryAllByRole("listitem");

    // Verificar que no se muestran elementos cuando no hay coincidencias
    expect(listItems.length).toBe(0);
  });

  it("llama a fetchPokemonDetail cuando se hace clic en un Pokémon", () => {
    const mockFetchPokemonDetail = vi.fn();

    (usePokemonContext as jest.Mock).mockReturnValue({
      searchTerm: "bul",
      filteredPokemons: [
        { name: "Bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1" },
        { name: "Charmander", url: "https://pokeapi.co/api/v2/pokemon/4" },
      ],
      fetchPokemonDetail: mockFetchPokemonDetail,
    });

    render(<FilterPokemon />);

    const listItem = screen.getByText("Bulbasaur");

    // Simular clic en el primer Pokémon
    fireEvent.click(listItem);

    // Verificar que se llama a fetchPokemonDetail con la URL correcta
    expect(mockFetchPokemonDetail).toHaveBeenCalledWith(
      "https://pokeapi.co/api/v2/pokemon/1"
    );
  });

  it("no muestra nada si no hay término de búsqueda", () => {
    const mockFetchPokemonDetail = vi.fn();

    (usePokemonContext as jest.Mock).mockReturnValue({
      searchTerm: "",
      filteredPokemons: [
        { name: "Bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1" },
        { name: "Charmander", url: "https://pokeapi.co/api/v2/pokemon/4" },
      ],
      fetchPokemonDetail: mockFetchPokemonDetail,
    });

    render(<FilterPokemon />);

    const list = screen.queryByRole("list");
    expect(list).not.toBeInTheDocument();
  });
});
