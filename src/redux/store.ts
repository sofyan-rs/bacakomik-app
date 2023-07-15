import {configureStore} from '@reduxjs/toolkit';
import userReducer from './slice/userSlice';
import historyReducer from './slice/historySlice';
import favoriteReducer from './slice/favoriteSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    history: historyReducer,
    favorite: favoriteReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
