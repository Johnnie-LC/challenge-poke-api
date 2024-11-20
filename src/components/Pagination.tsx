import React from "react";
import { usePokemonContext } from "../context/PokemonContext";

interface PaginationProps {
  isSkeleton?: boolean;
}

const Pagination: React.FC<PaginationProps> = ({ isSkeleton = false }) => {
  const { currentPage, setCurrentPage } = usePokemonContext();

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <div className="pagination">
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1 || isSkeleton}
      >
        Anterior
      </button>
      <span>Página {currentPage}</span>
      <button onClick={handleNext} disabled={isSkeleton}>
        Siguiente
      </button>
    </div>
  );
};

export default Pagination;
