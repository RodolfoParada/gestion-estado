// src/hooks/useFetchProducts.js
import { useEffect, useContext } from 'react';
import axios from 'axios';
import { ProductContext } from '../store/productContext';

const CACHE_KEY = 'products_data';
const TTL = 5 * 60 * 1000; // 5 minutos

export const useFetchProducts = () => {
  const { state, dispatch } = useContext(ProductContext);

  useEffect(() => {
    const fetchData = async () => {
      const cached = JSON.parse(localStorage.getItem(CACHE_KEY));
      const now = Date.now();

      // Verificar Cache TTL
      if (cached && (now - cached.timestamp < TTL)) {
        dispatch({ type: 'FETCH_SUCCESS', payload: cached.data });
        return;
      }

      dispatch({ type: 'FETCH_START' });
      try {
        const res = await axios.get('https://fakestoreapi.com/products');
        localStorage.setItem(CACHE_KEY, JSON.stringify({
          data: res.data,
          timestamp: now
        }));
        dispatch({ type: 'FETCH_SUCCESS', payload: res.data });
      } catch (err) {
        dispatch({ type: 'FETCH_ERROR', payload: err.message });
      }
    };

    fetchData();
  }, [dispatch]);

  return state;
};