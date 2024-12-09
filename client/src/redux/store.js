import { configureStore } from "@reduxjs/toolkit";
import sliceReducer from "./baseSlice/slice";
import authReducer from "./auth/authSlice";
import { apiSlice } from "./baseSlice/apiSlice";
import { authApiSlice } from "./auth/authApiSlice";

export const store = configureStore({
  reducer: {
    slice: sliceReducer,
    auth: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    [authApiSlice.reducerPath]: authApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware, authApiSlice.middleware),
});
