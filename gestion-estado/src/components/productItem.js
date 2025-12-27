import React, { useContext, useState } from 'react';
import { ProductContext } from '../store/productContext';

export const ProductItem = React.memo(({ product, isFav, onToggle }) => {
  const { dispatch } = useContext(ProductContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(product.title);
  const [editPrice, setEditPrice] = useState(product.price);
  

  const handleDelete = () => {
    if (window.confirm(`¿Eliminar ${product.title}?`)) {
      dispatch({ type: 'DELETE_PRODUCT', payload: product.id });
    }
  };

  const handleUpdate = () => {
    dispatch({ 
      type: 'UPDATE_PRODUCT', 
      payload: { 
        id: product.id, 
        title: editTitle ,
        price: parseFloat(editPrice)
      
      } 
      
    });
    setIsEditing(false);
  };

  return (
    <div style={{ 
      border: '1px solid #ccc', 
      padding: '15px', 
      borderRadius: '8px', 
      textAlign: 'center', 
      background: 'white' 
      }}>
      <img src={product.image} alt={product.title} style={{ width: '80px', height: '80px', objectFit: 'contain' }} />
      
   {isEditing ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', marginTop: '10px' }}>
          <input value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />
          <input type="number" value={editPrice} onChange={(e) => setEditPrice(e.target.value)} />
          <button onClick={handleUpdate} style={{ background: '#28a745', color: 'white' }}>Guardar</button>
        </div>
      ) : (
        <div style={{ textAlign: 'center' }}>
          <h4 style={{ fontSize: '14px', margin: '10px 0', height: '35px', overflow: 'hidden' }}>{product.title}</h4>
          {/* Mostramos el precio destacado */}
          <p style={{ color: '#2ecc71', fontWeight: 'bold', fontSize: '1.2rem' }}>
            ${product.price?.toFixed(2)}
          </p>


          <h4 style={{ fontSize: '14px', height: '40px', overflow: 'hidden' }}>{product.title}</h4>
          <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '10px' }}>
            <button onClick={() => onToggle(product)}>{isFav ? '❤️' : '🤍'}</button>
            <button onClick={() => setIsEditing(true)} title="Editar">✏️</button>
            <button onClick={handleDelete} style={{ color: 'red' }} title="Eliminar">🗑️</button>
          </div>
        </div>
      )}
    </div>
  );
});