import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "../redux/slice/ordersSlice";
import CircularProgress from "@mui/material/CircularProgress";

const RecentOrders = () => {
  const dispatch = useDispatch();
  const { orders, loading, fetchError } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  return (
    <div className="bg-white rounded-2xl shadow-md h-full flex flex-col">
      {/* Fixed header */}
      <div className="p-4 border-b border-gray-100 flex items-center justify-between">
        <h4 className="text-sm font-semibold text-gray-800 flex items-center gap-2">
          <span className="text-[#ff7a00] text-lg">📅</span>
          Recent Orders
        </h4>
      </div>

      {/* Scrollable list with fixed height */}
      <div
        className="p-4 space-y-3 overflow-y-auto scrollbar-hide"
        style={{ maxHeight: "300px" }}
      >
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <CircularProgress sx={{ color: "#FF7A00" }} size={24} />
          </div>
        ) : fetchError ? (
          <p className="text-red-500 text-sm">
            Error loading orders: {fetchError}, please try again.
          </p>
        ) : orders && orders.length > 0 ? (
          orders.slice(0, 10).map((order) => (
            <div
              key={order.id}
              className="flex flex-col gap-1 p-3 rounded-xl shadow-sm border border-gray-100 bg-gray-50 hover:bg-gray-100 transition cursor-pointer"
            >
              <div className="flex justify-between items-center">
                <p className="text-gray-800 font-medium text-[0.65rem] md:text-sm truncate">
                  {order.customerName}
                </p>
                <span
                  className={`text-[0.6rem] px-2 py-0.5 rounded-full ${
                    order.paymentStatus === "Paid"
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {order.paymentStatus}
                </span>
              </div>
              <p className="text-[0.65rem] text-gray-500">
                Order ID: <span className="font-mono">{order.id}</span>
              </p>
              <p className="text-[0.65rem] md:text-sm font-semibold text-[#ff7a00]">
                ${order.totalAmount.toFixed(2)}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-sm">No recent orders available.</p>
        )}
      </div>
    </div>
  );
};

export default RecentOrders;
