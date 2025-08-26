import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://ecommerce-admin-dashboard-u0nq.onrender.com";

// Fetch all customers
export const fetchCustomers = createAsyncThunk(
  "customers/fetchCustomers",
  async () => {
    const response = await axios.get(`${BASE_URL}/customers`);
    return response.data;
  }
);

const customersSlice = createSlice({
  name: "customers",
  initialState: {
    customersData: [],
    loading: false,
    fetchError: null,
    postError: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomers.pending, (state) => {
        state.loading = true;
        state.fetchError = null;
      })
      .addCase(fetchCustomers.fulfilled, (state, action) => {
        state.loading = false;
        state.customersData = Array.isArray(action.payload)
          ? action.payload.sort(
              (a, b) => new Date(b.signupDate) - new Date(a.signupDate)
            )
          : [];
      })
      .addCase(fetchCustomers.rejected, (state, action) => {
        state.loading = false;
        state.fetchError = action.error?.message || "Failed to fetch customers";
      });
  },
});

export default customersSlice.reducer;
