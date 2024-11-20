const API_BASE_URL = "https://pokeapi.co/api/v2";

export const fetchPokemonList = async (limit: number, offset: number) => {
  const response = await fetch(`${API_BASE_URL}/pokemon?limit=${limit}&offset=${offset}`);
  return await response.json();
};

export const fetchPokemonDetails = async (url: string) => {
  const response = await fetch(url);
  return await response.json();
};
