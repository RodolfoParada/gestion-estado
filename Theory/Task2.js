// Task 2: Optimización de Rendimiento con Caching (7 minutos)
// Implementación de estrategias de cache para mejorar performance y UX.

// 🚀 Estrategias de Cache Inteligente
// ¿Por qué el caching es crítico en aplicaciones React?

// Reducción de peticiones: Menos llamadas a API = menos latencia
// Mejor UX: Respuestas instantáneas para datos ya cargados
// Ahorro de ancho de banda: Datos reutilizados eficientemente
// Resiliencia: Funciona parcialmente offline
// Escalabilidad: Reduce carga en servidores
// Tipos de cache por jerarquía:

// Memoria (más rápido)

// Variables JavaScript
// Context API state
// Session Storage
// Persistencia (sobrevive refreshes)

// LocalStorage
// IndexedDB
// Service Worker Cache
// HTTP (nivel de navegador)

// Browser cache
// CDN
// HTTP headers
// Concepto clave: El cache debe balancear frescura de datos con performance.

// ⚡ Patrón de Cache con TTL
// Hook personalizado para cache inteligente:

function useSmartCache(key, fetcher, ttl = 300000) { // 5 minutos
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cached = getFromCache(key);

    if (cached && !isExpired(cached.timestamp, ttl)) {
      setData(cached.data);
      return;
    }

    // Fetch si no hay cache válido
    setLoading(true);
    fetcher()
      .then(result => {
        setData(result);
        saveToCache(key, result);
        setError(null);
      })
      .catch(err => {
        setError(err);
        // Usar cache stale si existe
        if (cached) setData(cached.data);
      })
      .finally(() => setLoading(false));
  }, [key]);

  return { data, loading, error };
}
// Concepto clave: El cache debe ser inteligente, prefiriendo datos frescos pero aceptando datos stale cuando es necesario.