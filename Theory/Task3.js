// Task 3: Memoización y Optimización de Re-renders (8 minutos)
// Uso de React.memo, useMemo y useCallback para optimizar rendimiento.

// 🔄 React.memo para Componentes
// ¿Cuándo usar React.memo?

// Componentes que re-renderizan frecuentemente
// Con las mismas props
// Que realizan cálculos costosos en render
// Que son deep en el árbol de componentes
// Patrón correcto:

const ProductItem = React.memo(({ product, onUpdate }) => {
  console.log(`Renderizando producto: ${product.id}`);

  return (
    <div className="product-item">
      <h3>{product.nombre}</h3>
      <p>Precio: ${product.precio}</p>
      <button onClick={() => onUpdate(product.id)}>
        Actualizar
      </button>
    </div>
  );
});

// Comparación personalizada si es necesario
const ProductItem = React.memo(({ product, onUpdate }) => {
  // Componente
}, (prevProps, nextProps) => {
  // Comparación personalizada
  return prevProps.product.id === nextProps.product.id;
});
// Concepto clave: React.memo previene re-renders innecesarios comparando props shallow.

// 📊 useMemo para Cálculos Costosos
// Optimización de cálculos:

const ProductList = ({ products, filter }) => {
  // ✅ Memoizar cálculo costoso
  const productosFiltrados = useMemo(() => {
    console.log('Filtrando productos...');
    return products.filter(product =>
      product.nombre.toLowerCase().includes(filter.toLowerCase())
    );
  }, [products, filter]);

  // ❌ Sin memoización - recalcula en cada render
  const productosSinMemo = products.filter(product =>
    product.nombre.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      {productosFiltrados.map(product => (
        <ProductItem key={product.id} product={product} />
      ))}
    </div>
  );
};
// Concepto clave: useMemo cachea resultados de cálculos costosos entre renders.

