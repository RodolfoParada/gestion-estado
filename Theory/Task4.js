// Task 4: Persistencia y Sincronización de Datos (7 minutos)
// Implementación de persistencia de estado y sincronización entre pestañas.

// 💾 Persistencia con localStorage
// Hook personalizado para estado persistente:

function usePersistentState(key, initialValue) {
  const [state, setState] = useState(() => {
    try {
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : initialValue;
    } catch (error) {
      console.warn('Error leyendo localStorage:', error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch (error) {
      console.warn('Error guardando en localStorage:', error);
    }
  }, [state]);

  return [state, setState];
}
// Limitaciones importantes:

// Solo strings (requiere JSON.stringify/parse)
// Bloqueante del hilo principal
// Límite de ~5-10MB por dominio
// No funciona en server-side rendering
// Concepto clave: localStorage es simple pero limitado; usar con precaución.

// 🔄 Sincronización entre Pestañas
// BroadcastChannel API para comunicación:

function useTabSync(key, onMessage) {
  useEffect(() => {
    if ('BroadcastChannel' in window) {
      const channel = new BroadcastChannel(`app-${key}`);

      channel.onmessage = (event) => {
        onMessage(event.data);
      };

      return () => channel.close();
    }
  }, [key, onMessage]);

  const broadcast = (message) => {
    if ('BroadcastChannel' in window) {
      const channel = new BroadcastChannel(`app-${key}`);
      channel.postMessage(message);
      channel.close();
    }
  };

  return { broadcast };
}
// Concepto clave: La sincronización permite mantener consistencia entre múltiples pestañas de la aplicación