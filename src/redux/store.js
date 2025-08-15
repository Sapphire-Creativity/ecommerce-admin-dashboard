import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./slice/productSlice";
import ordersReducer from "./slice/ordersSlice";
//
export const store = configureStore({
  reducer: {
    products: productReducer,
    orders: ordersReducer,
  },
});
