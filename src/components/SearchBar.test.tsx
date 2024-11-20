/* eslint-disable react/react-in-jsx-scope */
import { fireEvent, render, screen } from "@testing-library/react";
import { vi } from "vitest";
import SearchBar from "./SearchBar";

vi.mock("../context/PokemonContext", () => ({
  usePokemonContext: vi.fn(),
}));

import { usePokemonContext } from "../context/PokemonContext";

describe("SearchBar", () => {
  it("renderiza el input correctamente con el valor inicial", () => {
    const mockSetSearchTerm = vi.fn();

    (usePokemonContext as jest.Mock).mockReturnValue({
      searchTerm: "pikachu",
      setSearchTerm: mockSetSearchTerm,
    });

    render(<SearchBar />);

    const input = screen.getByPlaceholderText("Buscar Pokemon");

    expect(input).toBeInTheDocument();
    expect(input).toHaveValue("pikachu");
  });

  it("llama a `setSearchTerm` cuando se cambia el valor del input", () => {
    const mockSetSearchTerm = vi.fn();

    (usePokemonContext as jest.Mock).mockReturnValue({
      searchTerm: "",
      setSearchTerm: mockSetSearchTerm,
    });

    render(<SearchBar />);

    const input = screen.getByPlaceholderText("Buscar Pokemon");

    fireEvent.change(input, { target: { value: "bulbasaur" } });

    expect(mockSetSearchTerm).toHaveBeenCalledWith("bulbasaur");
  });

  it("refleja los cambios del valor de `searchTerm` en el input", () => {
    const mockSetSearchTerm = vi.fn();

    (usePokemonContext as jest.Mock).mockReturnValue({
      searchTerm: "charmander",
      setSearchTerm: mockSetSearchTerm,
    });

    render(<SearchBar />);

    const input = screen.getByPlaceholderText("Buscar Pokemon");

    expect(input).toHaveValue("charmander");
  });
});
