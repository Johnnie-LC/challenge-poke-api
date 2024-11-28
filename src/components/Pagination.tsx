import { usePokemonContext } from "_context/PokemonContext";
import { FC } from "react";

interface PaginationProps {
  isSkeleton?: boolean;
}

const Pagination: FC<PaginationProps> = ({ isSkeleton = false }) => {
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
