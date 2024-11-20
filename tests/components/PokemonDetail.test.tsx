/* eslint-disable react/react-in-jsx-scope */
import { fireEvent, render, screen } from "@testing-library/react";
import PokemonDetail from "_domain/components/PokemonDetail";
import { usePokemonContext } from "_domain/context/PokemonContext";
import { describe, expect, it, vi } from "vitest";

vi.mock("../../src/context/PokemonContext", () => {
  return {
    usePokemonContext: vi.fn(),
  };
});

describe("PokemonDetail", () => {
  it("renderiza correctamente los detalles del Pokémon", () => {
    const mockSelectedPokemon = {
      name: "bulbasaur",
      sprites: { front_default: "https://example.com/bulbasaur.png" },
      abilities: [{ ability: { name: "overgrow" } }],
      types: [{ type: { name: "grass" } }],
    };
    const mockSetSelectedPokemon = vi.fn();

    (usePokemonContext as jest.Mock).mockReturnValue({
      selectedPokemon: mockSelectedPokemon,
      setSelectedPokemon: mockSetSelectedPokemon,
    });

    render(<PokemonDetail />);

    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      "bulbasaur"
    );

    const image = screen.getByRole("img", { name: /bulbasaur/i });
    expect(image).toBeDefined();
    expect(image).toHaveAttribute("src", "https://example.com/bulbasaur.png");

    expect(screen.getByText("Habilidades")).toBeDefined();
    expect(screen.getByText("overgrow")).toBeDefined();

    expect(screen.getByText("Tipos")).toBeDefined();
    expect(screen.getByText("grass")).toBeDefined();
  });

  it("llama a setSelectedPokemon(null) al hacer clic en el botón 'Volver a la lista'", () => {
    const mockSelectedPokemon = {
      name: "bulbasaur",
      sprites: { front_default: "https://example.com/bulbasaur.png" },
      abilities: [{ ability: { name: "overgrow" } }],
      types: [{ type: { name: "grass" } }],
    };
    const mockSetSelectedPokemon = vi.fn();

    // Mock del contexto
    (usePokemonContext as jest.Mock).mockReturnValue({
      selectedPokemon: mockSelectedPokemon,
      setSelectedPokemon: mockSetSelectedPokemon,
    });

    render(<PokemonDetail />);

    const backButton = screen.getByRole("button", {
      name: /volver a la lista/i,
    });
    fireEvent.click(backButton);

    expect(mockSetSelectedPokemon).toHaveBeenCalledWith(null);
  });

  it("no renderiza nada si no hay un Pokémon seleccionado", () => {
    const mockSetSelectedPokemon = vi.fn();

    (usePokemonContext as jest.Mock).mockReturnValue({
      selectedPokemon: null,
      setSelectedPokemon: mockSetSelectedPokemon,
    });

    const { container } = render(<PokemonDetail />);

    expect(container).toBeEmptyDOMElement();
  });
});
