import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import pokemonReducer from './slices/pokemonSlice';
import pokemonDetailReducer from './slices/pokemonDetailSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    pokemon: pokemonReducer,
    pokemonDetail: pokemonDetailReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
