import { configureStore } from '@reduxjs/toolkit';
import { newsApi } from './api';
import newsReducer from './slices/newsSlice';
import uiReducer from './slices/uiSlice';

export const store = configureStore({
  reducer: {
    news: newsReducer,
    ui: uiReducer,
    [newsApi.reducerPath]: newsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(newsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;