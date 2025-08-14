import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const response = await axios.get("http://localhost:5000/products");
    return response.data;
  }
);

// To add new products

export const addNewProducts = createAsyncThunk(
  "products/postProducts",
  async (newProduct) => {
    const response = await axios.post(
      "http://localhost:5000/products",
      newProduct
    );

    return response.data;
  }
);

// To delete a product
export const deleteProducts = createAsyncThunk(
  "products/postProducts",
  async (product) => {
    const response = await axios.delete(
      "http://localhost:5000/products",
      product
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
      });
  },
});

export default productSlice.reducer;
