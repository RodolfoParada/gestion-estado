// src/App.js
import React, { useState } from 'react';
import { ProductProvider } from './store/productContext';
import { ProductList } from './components/productList';
import { ProductForm } from './components/productForm';
import { useFetchProducts } from './hooks/useFetchProducts';

// 1. Creamos un componente interno para usar el Hook
const MainApp = () => {
  const [search, setSearch] = useState('');
  
  // EL HOOK DEBE ESTAR AQUÍ (DENTRO DEL PROVIDER)
  useFetchProducts(); 

  return (
    <div style={{ padding: '20px' }}>
      <h1>Tienda con Estado Global</h1>
      <ProductForm />
      <input 
        type="text" 
        placeholder="Buscar..." 
        onChange={(e) => setSearch(e.target.value)} 
      />
      <ProductList searchTerm={search} />
    </div>
  );
};

// 2. El export principal SOLO envuelve con el Provider
export default function App() {
  return (
    <ProductProvider>
      <MainApp />
    </ProductProvider>
  );
}