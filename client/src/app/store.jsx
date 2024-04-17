import { configureStore } from "@reduxjs/toolkit";
import planSlice from "../features/plan/planSlice";
import authSlice from "../features/auth/authSlice";


export const store = configureStore({
  reducer: {
    plan: planSlice,
    auth : authSlice
  },
  middleware : (getDefaultMiddleware) => getDefaultMiddleware() 
});
