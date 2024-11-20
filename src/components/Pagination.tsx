/* eslint-disable react/react-in-jsx-scope */
import { usePokemonContext } from "../context/PokemonContext";

const Pagination: React.FC = () => {
  const { currentPage, setCurrentPage } = usePokemonContext();

  return (
    <div className="pagination">
      <button
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Anterior
      </button>
      <span>Página {currentPage}</span>
      <button onClick={() => setCurrentPage(currentPage + 1)}>Siguiente</button>
    </div>
  );
};

export default Pagination;
