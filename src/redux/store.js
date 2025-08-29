import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./slice/productSlice";
import ordersReducer from "./slice/ordersSlice";
import customersReducer from "./slice/customerSlice";
import authReducer from "./slice/authSlice";
//
export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    orders: ordersReducer,
    customers: customersReducer,
  },
});
