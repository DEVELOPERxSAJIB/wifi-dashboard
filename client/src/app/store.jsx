import { configureStore } from "@reduxjs/toolkit";
import planSlice from "../features/plan/planSlice";
import authSlice from "../features/auth/authSlice";
import employeeSlice from "../features/employee/employeeSlice";


export const store = configureStore({
  reducer: {
    plan: planSlice,
    auth : authSlice,
    employee: employeeSlice,
  },
  middleware : (getDefaultMiddleware) => getDefaultMiddleware() 
});
