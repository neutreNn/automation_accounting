import { configureStore } from '@reduxjs/toolkit';
import apiGear from '../api/apiGear';

const store = configureStore({
  reducer: {
    [apiGear.reducerPath]: apiGear.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiGear.middleware),
});

export default store;