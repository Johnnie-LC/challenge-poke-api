import { fireEvent, render, screen } from "@testing-library/react";
import PokemonList from "_/components/PokemonList";
import { usePokemonContext } from "_context/PokemonContext";
import { describe, expect, it, vi } from "vitest";

vi.mock("_context/PokemonContext", () => {
  return {
    usePokemonContext: vi.fn(),
  };
});

describe("PokemonList", () => {
  it("renderiza la lista de Pokémon correctamente", () => {
    const mockPokemons = [
      { name: "bulbasaur", url: "https://pokeapi.co/bulbasaur" },
      { name: "charmander", url: "https://pokeapi.co/charmander" },
    ];
    const mockFetchPokemonDetail = vi.fn();

    (usePokemonContext as jest.Mock).mockReturnValue({
      filteredPokemons: mockPokemons,
      fetchPokemonDetail: mockFetchPokemonDetail,
    });

    render(<PokemonList />);

    mockPokemons.forEach((pokemon) => {
      expect(screen.getByText(pokemon.name)).toBeDefined();
    });
  });

  it("llama a fetchPokemonDetail al hacer clic en un Pokémon", () => {
    const mockPokemons = [
      { name: "bulbasaur", url: "https://pokeapi.co/bulbasaur" },
      { name: "charmander", url: "https://pokeapi.co/charmander" },
    ];
    const mockFetchPokemonDetail = vi.fn();

    (usePokemonContext as jest.Mock).mockReturnValue({
      filteredPokemons: mockPokemons,
      fetchPokemonDetail: mockFetchPokemonDetail,
    });

    render(<PokemonList />);

    const firstPokemon = screen.getByText("bulbasaur");
    fireEvent.click(firstPokemon);

    expect(mockFetchPokemonDetail).toHaveBeenCalledWith(
      "https://pokeapi.co/bulbasaur"
    );
  });
});
