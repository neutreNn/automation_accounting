import { configureStore } from '@reduxjs/toolkit';
import apiGear from '../api/apiGear';
import apiWorker from '../api/apiWorker';
import apiLogs from '../api/apiLogs';
import apiUser from '../api/apiUser';

const store = configureStore({
  reducer: {
    [apiGear.reducerPath]: apiGear.reducer,
    [apiWorker.reducerPath]: apiWorker.reducer,
    [apiLogs.reducerPath]: apiLogs.reducer,
    [apiUser.reducerPath]: apiUser.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(apiGear.middleware)
      .concat(apiWorker.middleware)
      .concat(apiLogs.middleware)
      .concat(apiUser.middleware),
});

export default store;