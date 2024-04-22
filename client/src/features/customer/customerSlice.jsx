import { createSlice } from "@reduxjs/toolkit";
import { createNewCustomer, deleteCustomer, getAllCustomer, getSingleCustomer } from "./customerApiSlice";

const customerSlice = createSlice({
  name: "customer",
  initialState: {
    customers: [],
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
      .addCase(getAllCustomer.pending, (state) => {
        state.loader = true;
      })
      .addCase(getAllCustomer.fulfilled, (state, action) => {
        state.loader = false;
        state.customers = action.payload.payload.customer;
      })
      .addCase(getAllCustomer.rejected, (state, action) => {
        state.loader = false;
        state.error = action.error.message;
      })
      .addCase(getSingleCustomer.pending, (state) => {
        state.loader = true;
      })
      .addCase(getSingleCustomer.fulfilled, (state, action) => {
        state.loader = false;
        state.customers = action.payload.payload.customer;
      })
      .addCase(getSingleCustomer.rejected, (state, action) => {
        state.loader = false;
        state.error = action.error.message;
      })
      .addCase(createNewCustomer.pending, (state) => {
        state.loader = true;
      })
      .addCase(createNewCustomer.fulfilled, (state, action) => {
        state.loader = false;
        state.customers = [...state.customers, action.payload.payload.customer];
        state.message = action.payload.message
      })
      .addCase(createNewCustomer.rejected, (state, action) => {
        state.loader = false;
        state.error = action.error.message;
      })
      .addCase(deleteCustomer.pending, (state) => {
        state.loader = false;
      })
      .addCase(deleteCustomer.fulfilled, (state, action) => {
        state.loader = false;
        state.message = action.payload.message
        state.customers = state.customers.filter(data => data._id !== action.payload.payload.customer._id)
      })
      .addCase(deleteCustomer.rejected, (state, action) => {
        state.loader = false;
        state.error = action.error.message;
      })
  },
});

// selectors (not working)
export const gettingAllCustomers = (state) => state.customer;
export const gettingSingleCustomer = (state) => state.customer;

// export actions
export const { setMessageEmpty } = customerSlice.actions;

// export default
export default customerSlice.reducer;
