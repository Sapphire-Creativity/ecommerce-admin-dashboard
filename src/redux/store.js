import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./slice/productSlice";
import ordersReducer from "./slice/ordersSlice";
import customersReducer from "./slice/customerSlice";
//
export const store = configureStore({
  reducer: {
    products: productReducer,
    orders: ordersReducer,
    customers: customersReducer,
  },
});
