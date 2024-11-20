/* eslint-disable react/react-in-jsx-scope */
import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { AppContent } from "./AppContent";
import { PokemonProvider, usePokemonContext } from "./context/PokemonContext";

vi.mock("./context/PokemonContext", () => ({
  usePokemonContext: vi.fn(),
  PokemonProvider: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

vi.mock("./components/SkeletonList", () => ({
  default: () => <div>Loading...</div>,
}));

vi.mock("./components/FilterPokemon", () => ({
  FilterPokemon: () => <div>FilterPokemon Component</div>,
}));

vi.mock("./components/PokemonDetail", () => ({
  default: () => <div>PokemonDetail Component</div>,
}));

vi.mock("./components/PokemonList", () => ({
  default: () => <div>PokemonList Component</div>,
}));

describe("AppContent", () => {
  it("muestra el SkeletonList cuando está cargando", () => {
    (usePokemonContext as jest.Mock).mockReturnValue({
      loading: true,
      error: null,
      fetchPokemons: vi.fn(),
      currentPage: 1,
      selectedPokemon: null,
      searchTerm: "",
    });

    render(
      <PokemonProvider>
        <AppContent />
      </PokemonProvider>
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("muestra un mensaje de error cuando hay un error", () => {
    (usePokemonContext as jest.Mock).mockReturnValue({
      loading: false,
      error: "Hubo un problema al cargar los Pokémon. Intenta nuevamente.",
      fetchPokemons: vi.fn(),
      currentPage: 1,
      selectedPokemon: null,
      searchTerm: "",
    });

    render(
      <PokemonProvider>
        <AppContent />
      </PokemonProvider>
    );

    expect(
      screen.getByText(
        "Hubo un problema al cargar los Pokémon. Intenta nuevamente."
      )
    ).toBeInTheDocument();
  });

  it("muestra el detalle de Pokémon si hay un Pokémon seleccionado", () => {
    (usePokemonContext as jest.Mock).mockReturnValue({
      loading: false,
      error: null,
      fetchPokemons: vi.fn(),
      currentPage: 1,
      selectedPokemon: {
        name: "Pikachu",
        sprites: { front_default: "" },
        abilities: [],
        types: [],
      },
      searchTerm: "",
    });

    render(
      <PokemonProvider>
        <AppContent />
      </PokemonProvider>
    );

    expect(screen.getByText("PokemonDetail Component")).toBeInTheDocument();
  });

  it("muestra el FilterPokemon cuando hay un término de búsqueda", () => {
    (usePokemonContext as jest.Mock).mockReturnValue({
      loading: false,
      error: null,
      fetchPokemons: vi.fn(),
      currentPage: 1,
      selectedPokemon: null,
      searchTerm: "bul",
    });

    render(
      <PokemonProvider>
        <AppContent />
      </PokemonProvider>
    );

    expect(screen.getByText("FilterPokemon Component")).toBeInTheDocument();
  });

  it("muestra PokemonList y Pagination cuando no hay error ni Pokémon seleccionado ni término de búsqueda", () => {
    (usePokemonContext as jest.Mock).mockReturnValue({
      loading: false,
      error: null,
      fetchPokemons: vi.fn(),
      currentPage: 1,
      selectedPokemon: null,
      searchTerm: "",
    });

    render(
      <PokemonProvider>
        <AppContent />
      </PokemonProvider>
    );

    expect(screen.getByText("PokemonList Component")).toBeInTheDocument();

    expect(screen.getByText("Siguiente")).toBeInTheDocument();

    expect(screen.getByText("Anterior")).toBeInTheDocument();
  });

  it("llama a fetchPokemons cuando se monta el componente", async () => {
    const mockFetchPokemons = vi.fn();

    (usePokemonContext as jest.Mock).mockReturnValue({
      loading: false,
      error: null,
      fetchPokemons: mockFetchPokemons,
      currentPage: 1,
      selectedPokemon: null,
      searchTerm: "",
    });

    render(
      <PokemonProvider>
        <AppContent />
      </PokemonProvider>
    );

    await waitFor(() => {
      expect(mockFetchPokemons).toHaveBeenCalledWith(1);
    });
  });
});
