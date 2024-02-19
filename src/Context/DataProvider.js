import React, { createContext, useState, useEffect } from 'react';
import FetchApi from '../services/FetchApi';

const DataContext = createContext();

const DataProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const response = await FetchApi('https://star-api-wars.herokuapp.com/');

        if (!isMounted) return;

        const result = await response.json();
        setData(result.results);
        setLoading(false);
      } catch (error) {
        if (!isMounted) return;

        console.error('Erro ao buscar dados da API', error);
        setError('Erro ao buscar dados da API');
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <DataContext.Provider value={{ data }}>
      {children}
    </DataContext.Provider>
  );
};

export { DataContext, DataProvider };