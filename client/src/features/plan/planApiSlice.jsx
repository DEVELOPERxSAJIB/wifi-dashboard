import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllPlans = createAsyncThunk("getAllPlans", async () => {
  try {
    const res = await axios.get(`http://localhost:5050/api/v1/plan`, {
      withCredentials: true,
    });

    return res.data;
  } catch (error) {
    throw new Error(error.message);
  }
});
