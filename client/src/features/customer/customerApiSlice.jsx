import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// get all customers
export const getAllCustomer = createAsyncThunk(
  "customer/getAllCustomer",
  async () => {
    try {
      const res = await axios.get(`http://localhost:5050/api/v1/customer`, {
        withCredentials: true,
      });

      return res.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

// get all customers
export const getSingleCustomer = createAsyncThunk(
  "customer/getSingleCustomer",
  async (id) => {
    try {
      const res = await axios.get(
        `http://localhost:5050/api/v1/customer/${id}`,
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

// create new plan
export const createNewCustomer = createAsyncThunk(
  "customer/createNewCustomer",
  async (data) => {
    try {
      const res = await axios.post(
        `http://localhost:5050/api/v1/customer/create-customer`,
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

// // create new plan
// export const updatePlan = createAsyncThunk("plan/updatePlan", async (data) => {
//   try {
//     const res = await axios.put(
//       `http://localhost:5050/api/v1/plan/update-plan/${data.id}`,
//       data.data,
//       {
//         withCredentials: true,
//       }
//     );

//     return res.data;
//   } catch (error) {
//     throw new Error(error.response.data.message);
//   }
// });

// delete customer
export const deleteCustomer = createAsyncThunk(
  "customer/deleteCustomer",
  async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:5050/api/v1/customer/delete-customer/${id}`,
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
