import { useState, useEffect } from "react";
import { getStarWarsDetails } from "./base-fetch";
export function useTheFetch(path) {
  const [result, setResult] = useState({ loading: true, data: null });
  async function fetchData() {
    const data = await getStarWarsDetails(path);
    setResult({ loading: false, data });
  }
  useEffect(() => {
    fetchData();
  }, []);

  return result;
}
