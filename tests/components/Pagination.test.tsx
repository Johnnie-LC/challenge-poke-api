/* eslint-disable react/react-in-jsx-scope */
import { fireEvent, render, screen } from "@testing-library/react";
import Pagination from "_domain/components/Pagination";
import { usePokemonContext } from "_domain/context/PokemonContext";
import { vi } from "vitest";

vi.mock("../../src/context/PokemonContext", () => ({
  usePokemonContext: vi.fn(),
}));

describe("Pagination", () => {
  it("renderiza correctamente con la página inicial", () => {
    const mockSetCurrentPage = vi.fn();

    (usePokemonContext as jest.Mock).mockReturnValue({
      currentPage: 1,
      setCurrentPage: mockSetCurrentPage,
    });

    render(<Pagination />);

    const prevButton = screen.getByText("Anterior");
    const nextButton = screen.getByText("Siguiente");
    const pageDisplay = screen.getByText("Página 1");

    expect(prevButton).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();
    expect(pageDisplay).toBeInTheDocument();

    expect(prevButton).toBeDisabled();
  });

  it("habilita el botón 'Anterior' cuando no está en la primera página", () => {
    const mockSetCurrentPage = vi.fn();

    (usePokemonContext as jest.Mock).mockReturnValue({
      currentPage: 2,
      setCurrentPage: mockSetCurrentPage,
    });

    render(<Pagination />);

    const prevButton = screen.getByText("Anterior");

    expect(prevButton).not.toBeDisabled();
  });

  it("llama a `setCurrentPage` con el valor correcto al hacer clic en 'Anterior'", () => {
    const mockSetCurrentPage = vi.fn();

    (usePokemonContext as jest.Mock).mockReturnValue({
      currentPage: 2,
      setCurrentPage: mockSetCurrentPage,
    });

    render(<Pagination />);

    const prevButton = screen.getByText("Anterior");

    fireEvent.click(prevButton);

    expect(mockSetCurrentPage).toHaveBeenCalledWith(1);
  });

  it("llama a `setCurrentPage` con el valor correcto al hacer clic en 'Siguiente'", () => {
    const mockSetCurrentPage = vi.fn();

    (usePokemonContext as jest.Mock).mockReturnValue({
      currentPage: 2,
      setCurrentPage: mockSetCurrentPage,
    });

    render(<Pagination />);

    const nextButton = screen.getByText("Siguiente");

    fireEvent.click(nextButton);

    expect(mockSetCurrentPage).toHaveBeenCalledWith(3);
  });

  it("no permite valores negativos al intentar ir antes de la página 1", () => {
    const mockSetCurrentPage = vi.fn();

    (usePokemonContext as jest.Mock).mockReturnValue({
      currentPage: 1,
      setCurrentPage: mockSetCurrentPage,
    });

    render(<Pagination />);

    const prevButton = screen.getByText("Anterior");

    fireEvent.click(prevButton);

    expect(mockSetCurrentPage).not.toHaveBeenCalled();
  });
});
