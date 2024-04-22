import { configureStore } from "@reduxjs/toolkit";
import planSlice from "../features/plan/planSlice";
import authSlice from "../features/auth/authSlice";
import employeeSlice from "../features/employee/employeeSlice";
import customerSlice from "../features/customer/customerSlice";

export const store = configureStore({
  reducer: {
    plan: planSlice,
    auth: authSlice,
    employee: employeeSlice,
    customer: customerSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
