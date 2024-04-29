import { createSlice } from "@reduxjs/toolkit";
import {
  activeEmployee,
  banEmployee,
  getAllEmployees,
  updateEmployee,
} from "./employeeApiSlice";

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
      })
      .addCase(getAllEmployees.rejected, (state, action) => {
        state.loader = false;
        state.error = action.error.message;
      })
      .addCase(updateEmployee.pending, (state) => {
        state.loader = true;
      })
      .addCase(updateEmployee.fulfilled, (state, action) => {
        state.loader = false;
        state.message = action.payload.message;
        state.employees[
          state.employees.findIndex(
            (data) => data._id === action.payload.payload.user._id
          )
        ] = action.payload.payload.user;
      })
      .addCase(updateEmployee.rejected, (state, action) => {
        state.loader = false;
        state.error = action.error.message;
      })
      .addCase(banEmployee.pending, (state) => {
        state.loader = true;
      })
      .addCase(banEmployee.fulfilled, (state, action) => {
        state.loader = false;
        state.message = action?.payload?.message;
        state.employees[
          state.employees.findIndex(
            (data) => data._id === action?.payload?.payload?.user?._id
          )
        ] = action?.payload?.payload?.user;
        localStorage.setItem(
          "user",
          JSON.stringify(action.payload.payload.user)
        );
      })
      .addCase(banEmployee.rejected, (state, action) => {
        state.loader = false;
        state.error = action.error.message;
      })
      .addCase(activeEmployee.pending, (state) => {
        state.loader = true;
      })
      .addCase(activeEmployee.fulfilled, (state, action) => {
        state.loader = false;
        state.message = action?.payload?.message;
        state.employees[
          state.employees.findIndex(
            (data) => data._id === action?.payload?.payload?.user?._id
          )
        ] = action?.payload?.payload?.user;
      })
      .addCase(activeEmployee.rejected, (state, action) => {
        state.loader = false;
        state.error = action.error.message;
      })
  },
});

// selectors
export const fetchAllEmployee = (state) => state.employee;

// export actions
export const { setMessageEmpty } = employeeSlice.actions;

// export default
export default employeeSlice.reducer;
