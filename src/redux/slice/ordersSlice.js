import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://ecommerce-admin-dashboard-u0nq.onrender.com";

// Fetch all orders
export const fetchOrders = createAsyncThunk("orders/fetchOrders", async () => {
  const response = await axios.get(`${BASE_URL}/orders`);
  return response.data;
});

// Add a new order
export const addNewOrder = createAsyncThunk(
  "orders/addNewOrder",
  async (newOrder) => {
    const response = await axios.post(`${BASE_URL}/orders`, newOrder);
    return response.data;
  }
);

const ordersSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
    loading: false,
    fetchError: null,
    postError: null,
  },
  extraReducers: (builder) => {
    builder
      // FETCH
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.fetchError = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        // sort by orderDate descending
        state.orders = action.payload.sort(
          (a, b) => new Date(b.orderDate) - new Date(a.orderDate)
        );
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.fetchError = action.error.message;
      })

      // ADD
      .addCase(addNewOrder.pending, (state) => {
        state.loading = true;
        state.postError = null;
      })
      .addCase(addNewOrder.fulfilled, (state, action) => {
        state.loading = false;
        // Add to top and sort properly
        state.orders = [action.payload, ...state.orders].sort(
          (a, b) => new Date(b.orderDate) - new Date(a.orderDate)
        );
      })
      .addCase(addNewOrder.rejected, (state, action) => {
        state.loading = false;
        state.postError = action.error.message;
      });
  },
});

export default ordersSlice.reducer;
