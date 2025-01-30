import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./services/authApi";
import { driverApi } from "./services/driverApi";
import { vehicleApi } from "./services/vehicleApi";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [driverApi.reducerPath]: driverApi.reducer,
    [vehicleApi.reducerPath]: vehicleApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      driverApi.middleware,
      vehicleApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
