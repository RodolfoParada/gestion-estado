// src/store/ProductContext.js
import React, { createContext, useReducer, useEffect } from 'react';
import { productReducer, initialState } from './productReducer';

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [state, dispatch] = useReducer(productReducer, initialState);

  // Sincronización entre pestañas (BroadcastChannel)
useEffect(() => {
  // Solo guardamos si hay productos (para evitar sobreescribir con un array vacío al cargar)
  if (state.products.length > 0) {
    const cacheData = {
      data: state.products,
      timestamp: Date.now() // Mantenemos el TTL
    };
    localStorage.setItem('products_data', JSON.stringify(cacheData));
    console.log("💾 Inventario guardado en LocalStorage", localStorage);
  }
}, [state.products]); // Se dispara cada vez que agregas, editas o eliminas

  // Persistencia de Favoritos y notificación a otras pestañas
  useEffect(() => {
    localStorage.setItem('favs_cache', JSON.stringify(state.favorites));
    const bc = new BroadcastChannel('shop_sync');
    bc.postMessage({ type: 'SYNC_FAVS', payload: state.favorites });
  }, [state.favorites]);

  return (
    <ProductContext.Provider value={{ state, dispatch }}>
      {children}
    </ProductContext.Provider>
  );
};