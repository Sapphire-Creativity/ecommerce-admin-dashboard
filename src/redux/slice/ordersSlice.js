import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://ecommerce-admin-dashboard-u0nq.onrender.com";

//
export const fetchOrders = createAsyncThunk("orders/fetchOrders", async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const response = await axios.get(`${BASE_URL}/orders`);
  return response.data;
});

const ordersSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
    loading: false,
    fetchError: null,
    postError: null,
    deleteError: null,
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.fetchError = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.fetchError = action.error.message;
      });
  },
});

export default ordersSlice.reducer;
