import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// user login
export const authLogin = createAsyncThunk("auth/authLogin", async (data) => {
  try {
    const res = await axios.post(
      `http://localhost:5050/api/v1/auth/login`,
      data,
      {
        withCredentials: true,
      }
    );

    return res.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

// loggedin user info
export const loggedinUserInfo = createAsyncThunk(
  "auth/loggedinUserInfo",
  async () => {
    try {
      const res = await axios.get(`http://localhost:5050/api/v1/auth/me`, {
        withCredentials: true,
      });

      return res.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

// logout user
export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  try {
    const res = await axios.post(`http://localhost:5050/api/v1/auth/logout`, {
      withCredentials: true,
    });

    return res.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});
