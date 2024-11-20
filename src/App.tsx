import React from "react";
import "./App.css";
import { AppContent } from "./AppContent";
import { PokemonProvider } from "./context/PokemonContext";

const App: React.FC = () => (
  <PokemonProvider>
    <AppContent />
  </PokemonProvider>
);

export default App;
