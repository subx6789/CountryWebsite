import { useState, useEffect } from "react";
import axios from "axios";

const CACHE_KEY = "countriesCache";

export const useApiCache = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const cachedData = localStorage.getItem(CACHE_KEY);
      if (cachedData) {
        setData(JSON.parse(cachedData));
        setLoading(false);
      } else {
        try {
          const response = await axios.get(url);
          setData(response.data);
          localStorage.setItem(CACHE_KEY, JSON.stringify(response.data));
        } catch (err) {
          setError(err);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
};
