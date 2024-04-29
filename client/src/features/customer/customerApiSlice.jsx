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

// create new customer
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

// update customer
export const updateCustomer = createAsyncThunk(
  "customer/updateCustomer",
  async (data) => {
    try {
      const res = await axios.put(
        `http://localhost:5050/api/v1/customer/update-customer/${data.id}`,
        data.form_data,
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
