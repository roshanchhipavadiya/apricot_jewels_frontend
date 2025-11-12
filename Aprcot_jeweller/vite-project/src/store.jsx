import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./services/apiSlice";
import authReducer from "./services/authtoken"; // Auth slice for token & user

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer, // RTK Query API reducer
    auth: authReducer,                        // Custom auth slice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // ⚠️ Optional: Avoids issues with FormData or non-serializable stuff
    }).concat(apiSlice.middleware),
  devTools: true, // ✅ Enable Redux DevTools
});

export default store;