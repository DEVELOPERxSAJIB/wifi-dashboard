import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// user login
export const getAllEmployees = createAsyncThunk(
  "employee/getAllEmployees",
  async () => {
    try {
      const res = await axios.get(`http://localhost:5050/api/v1/user`, {
        withCredentials: true,
      });

      return res.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);
