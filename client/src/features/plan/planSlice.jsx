import { createSlice } from "@reduxjs/toolkit";
import { getAllPlans } from "./planApiSlice"

const planSlice = createSlice({
  name: "plan",
  initialState: {
    plans: [],
    message: null,
    error: null,
    loader: false,
  },
  reducer: {
    setMessageEmpty: (state) => {
      (state.message = null), (state.error = null);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllPlans.fulfilled, (state, actions) => {
        state.plans = actions.payload.payload.plan
      })
  },
});

// selectors (not working)
export const gettingAllPlans = state => state.paln;
// console.log(gettingAllPlans);

// export actions
export const { setMessageEmpty } = planSlice.actions;

// export default
export default planSlice.reducer;
