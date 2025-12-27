import React, { useState, useContext } from "react";
import { ProductContext } from "../store/productContext";

export const ProductForm = () => {
  const { dispatch } = useContext(ProductContext);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newProduct = {
      id: Date.now(),
      title: title || "Producto sin nombre",
      price: parseFloat(price) || 0, // Convertimos el string del input a número
      // Si el usuario no pone imagen, usamos una de picsum (fotos aleatorias)
      image: imageUrl || `https://picsum.photos/seed/${Date.now()}/200`,
      category: "custom",
    };

    dispatch({ type: "ADD_PRODUCT", payload: newProduct });

    // Limpiar campos
    setTitle("");
    setPrice("");
    setImageUrl("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", flexDirection: "column", gap: "10px" }}
    >
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Nombre del producto (ej: Café)"
        style={{ padding: "8px" }}
      />
      <input
        type="text"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        placeholder="URL de la imagen (opcional)"
        style={{ padding: "8px" }}
      />
      <input
        type="number"
        placeholder="Precio en USD"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        style={{ padding: "8px", marginBottom: "10px" }}
      />

      <button
        type="submit"
        style={{
          padding: "10px",
          backgroundColor: "#28a745",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        🚀 Crear Producto con Imagen
      </button>
    </form>
  );
};
