export const initialState = {
  products: [],
  loading: false,
  error: null,
  favorites: JSON.parse(localStorage.getItem('favs_cache')) || [],
};

export function productReducer(state, action) {
  console.log("📢 REDUCER RECIBIÓ:", action); 
  
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, loading: true };

    // CAMBIA 'SET_PRODUCTS' POR 'FETCH_SUCCESS' 
    // PARA QUE COINCIDA CON LO QUE ENVÍA TU HOOK
    case 'FETCH_SUCCESS': 
      return { 
        ...state, 
        loading: false, 
        products: action.payload, 
        error: null 
      };

    case 'FETCH_ERROR':
      return { ...state, loading: false, error: action.payload };

    case 'ADD_PRODUCT':
      return { ...state, products: [action.payload, ...state.products] };
     // Dentro del switch de productReducer.js
case 'UPDATE_PRODUCT':
  return {
    ...state,
    products: state.products.map(p => 
      p.id === action.payload.id ? { ...p, ...action.payload } : p
    )
  }; 

    case 'DELETE_PRODUCT':
      return { 
        ...state, 
        products: state.products.filter(p => p.id !== action.payload) 
      };

    case 'TOGGLE_FAVORITE':
      const isFav = state.favorites.find(p => p.id === action.payload.id);
      const newFavs = isFav 
        ? state.favorites.filter(p => p.id !== action.payload.id)
        : [...state.favorites, action.payload];
      return { ...state, favorites: newFavs };

    case 'SYNC_FAVORITES':
      return { ...state, favorites: action.payload };

    default:
      return state;
  }
}