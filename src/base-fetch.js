const BASE_URL = "https://swapi.dev/api/";

export const baseFetch = async (url, options = {}) => {
  const response = await fetch(url, options);
  return await response.json();
};

export const getStarWarsDetails = async path => baseFetch(BASE_URL + path);
