import { configureStore } from '@reduxjs/toolkit';
import apiGear from '../api/apiGear';
import apiWorker from '../api/apiWorker';

const store = configureStore({
  reducer: {
    [apiGear.reducerPath]: apiGear.reducer,
    [apiWorker.reducerPath]: apiWorker.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(apiGear.middleware)
      .concat(apiWorker.middleware),
});

export default store;