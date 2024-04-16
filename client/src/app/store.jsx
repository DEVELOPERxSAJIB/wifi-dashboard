import { configureStore } from "@reduxjs/toolkit";
import planSlice from "../features/plan/planSlice";


export const store = configureStore({
  reducer: {
    plan: planSlice,
  },
  middleware : (getDefaultMiddleware) => getDefaultMiddleware() 
});
