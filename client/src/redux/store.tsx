// src/redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Default is localStorage for web
import authReducer from './features/authSlice';

// Define the persist configuration
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['authReducer'], // Specify which reducers to persist (authReducer in this case)
  timeout: 1000,

};

// Apply the persist configuration to your auth reducer
const persistedReducer = persistReducer(persistConfig, authReducer);

// Configure the Redux store with the persisted reducer
export const store = configureStore({
  reducer: {
    authReducer: persistedReducer, // Use persisted reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // redux-persist needs this
    }),
});

// Set up persistor
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
