import "_/App.css";
import { AppContent } from "_/AppContent";
import { PokemonProvider } from "_context/PokemonContext";
import { FC } from "react";

const App: FC = () => (
  <PokemonProvider>
    <AppContent />
  </PokemonProvider>
);

export default App;
