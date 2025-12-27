import React, { useContext, useMemo, useCallback } from 'react';
import { ProductContext } from '../store/productContext';
import { ProductItem } from './productItem'; // Importación nombrada

export const ProductList = ({ searchTerm }) => {
  const { state, dispatch } = useContext(ProductContext);
  console.log("Productos en el estado:", state.products);

  const filteredProducts = useMemo(() => {
    return state.products.filter(p => 
      p.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [state.products, searchTerm]);

  const handleToggle = useCallback((product) => {
    dispatch({ type: 'TOGGLE_FAVORITE', payload: product });
  }, [dispatch]);

  if (state.loading) return <p>Cargando...</p>;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr' }}>
      {filteredProducts.map(p => (
        <ProductItem 
          key={p.id} 
          product={p} 
          onToggle={handleToggle}
          isFav={state.favorites.some(fav => fav.id === p.id)}
        />
      ))}
    </div>
  );
};