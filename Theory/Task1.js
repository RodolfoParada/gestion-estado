// Task 1: Arquitecturas de Estado en Aplicaciones Complejas (8 minutos)
// Comprensión de por qué y cómo gestionar estado global en aplicaciones React.

// 🎯 ¿Por qué Necesitamos Estado Global?
// Problemas del estado local tradicional:

// Prop Drilling: Pasar props a través de múltiples niveles de componentes
// Estado Desincronizado: Componentes con datos diferentes del mismo origen
// Re-renders en cascada: Actualizaciones que afectan componentes no relacionados
// Complejidad de debugging: Estado distribuido hace difícil el seguimiento
// Mantenimiento difícil: Cambios requieren modificar múltiples componentes
// Solución: Estado Global Centralizado

// Single Source of Truth: Un lugar para toda la verdad de datos
// Predictibilidad: Estado determinístico y traceable
// Performance: Actualizaciones optimizadas y controladas
// Mantenibilidad: Lógica centralizada y reutilizable
// Testabilidad: Fácil testing de lógica de estado
// Concepto clave: El estado global resuelve el problema de compartir datos entre componentes no relacionados jerárquicamente.

// 🏗️ Patrón Context API + useReducer
// Ventajas sobre Redux para aplicaciones medianas:

// Cero dependencias externas: Parte del core de React
// TypeScript friendly: Mejor integración con tipos
// Simplicidad: Menos boilerplate que Redux
// Performance: Optimizaciones automáticas de React
// Estructura básica:

const initialState = {
  items: [],
  loading: false,
  error: null,
  filters: { search: '', category: '' }
};

function itemsReducer(state, action) {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, loading: true, error: null };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, items: action.payload };
    case 'FETCH_ERROR':
      return { ...state, loading: false, error: action.payload };
    case 'SET_FILTER':
      return { ...state, filters: { ...state.filters, ...action.payload } };
    default:
      return state;
  }
}
// Concepto clave: useReducer permite manejar lógica de estado compleja de manera declarativa.