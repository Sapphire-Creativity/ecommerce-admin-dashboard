import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://ecommerce-admin-dashboard-u0nq.onrender.com";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const response = await axios.get(`${BASE_URL}/products`);
    return response.data;
  }
);

// To add new products

export const addNewProducts = createAsyncThunk(
  "products/postProducts",
  async (newProduct) => {
    const response = await axios.post(`${BASE_URL}/products`, newProduct);

    return response.data;
  }
);

// To delete a product
export const deleteProducts = createAsyncThunk(
  "products/deleteProducts",
  async (productId) => {
    await axios.delete(`${BASE_URL}/products/${productId}`);

    return productId;
  }
);

// To update a product
export const updateProduct = createAsyncThunk(
  "products/editProducts",
  async (newData) => {
    const response = await axios.put(
      `${BASE_URL}/products/${newData.id}`,
      newData
    );
    return response.data;
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    loading: false,
    fetchError: null,
    postError: null,
    deleteError: null,
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.fetchError = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.fetchError = action.error.message;
      })

      //   Add new product
      .addCase(addNewProducts.pending, (state) => {
        state.loading = true;
        state.addError = null;
      })

      .addCase(addNewProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = [action.payload, ...state.items].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
      })
      .addCase(addNewProducts.rejected, (state, action) => {
        state.loading = false;
        state.addError = action.error.message;
      })

      // Delete product

      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.deleteError = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;

        state.items = state.items.map((item) =>
          item.id === action.payload.id ? action.payload : item
        );
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.deleteError = action.error.message;
      });
  },
});

export default productSlice.reducer;
