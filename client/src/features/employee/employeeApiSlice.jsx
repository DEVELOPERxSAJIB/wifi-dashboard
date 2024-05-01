import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// user login
export const getAllEmployees = createAsyncThunk(
  "employee/getAllEmployees",
  async (role) => {
    try {
      const res = await axios.get(
        `http://localhost:5050/api/v1/user?role=${role}`,
        {
          withCredentials: true,
        }
      );

      return res.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

// create new user
export const createNewEmployee = createAsyncThunk(
  "employee/createNewEmployee",
  async (data) => {
    try {
      const res = await axios.post(
        `http://localhost:5050/api/v1/user/create-user`,
        data,
        {
          withCredentials: true,
        }
      );

      return res.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

// update employee
export const updateEmployee = createAsyncThunk(
  "employee/updateEmployee",
  async (data) => {
    try {
      const res = await axios.put(
        `http://localhost:5050/api/v1/user/update-user/${data.id}`,
        data.data,
        {
          withCredentials: true,
        }
      );

      return res.data;
    } catch (error) {
      console.log(error.response.data.message);
    }
  }
);

// delete employee
export const deleteEmployee = createAsyncThunk("employee/deleteEmployee", async (id) => {
  try {
    
    const res = await axios.delete(`http://localhost:5050/api/v1/user/${id}`, {
      withCredentials: true,
    })

    return res.data;

  } catch (error) {
    console.log(error.response.data.message)
  }
})

// ban employee
export const activeEmployee = createAsyncThunk(
  "employee/activeEmployee",
  async (data) => {
    try {
      const res = await axios.put(
        `http://localhost:5050/api/v1/user/active-user/${data.id}`,
        { active: data.active },
        {
          withCredentials: true,
        }
      );

      return res.data;
    } catch (error) {
      console.log(error.response.data.message);
    }
  }
);

// ban employee
export const banEmployee = createAsyncThunk(
  "employee/banEmployee",
  async (id) => {
    try {
      const res = await axios.put(
        `http://localhost:5050/api/v1/user/ban-user/${id}`,
        "",
        {
          withCredentials: true,
        }
      );

      return res.data;
    } catch (error) {
      console.log(error.response.data.message);
    }
  }
);
