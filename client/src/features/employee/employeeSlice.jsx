import { createSlice } from "@reduxjs/toolkit";
import { getAllEmployees } from "./employeeApiSlice";

const employeeSlice = createSlice({
  name: "employee",
  initialState: {
    employees: [],
    message: null,
    error: null,
    loader: false,
  },
  reducers: {
    setMessageEmpty: (state) => {
      state.message = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllEmployees.pending, (state) => {
        state.loader = true;
      })
      .addCase(getAllEmployees.fulfilled, (state, action) => {
        state.loader = false;
        state.employees = action.payload.payload.user;
        state.message = action.payload.message;
      })
      .addCase(getAllEmployees.rejected, (state, action) => {
        state.loader = false;
        state.error = action.error.message;
      })
    }
});

// selectors
export const fetchAllEmployee = (state) => state.employee;

// export actions
export const { setMessageEmpty } = employeeSlice.actions;

// export default
export default employeeSlice.reducer;
