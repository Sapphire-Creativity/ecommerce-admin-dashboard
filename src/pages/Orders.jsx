import { useState, useEffect } from "react";
import { Drawer, Box, Typography, Button } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Chip from "@mui/material/Chip";
import { ordersData } from "../data/orderdata";
import { CgProfile } from "react-icons/cg";
import { Divider } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import AddOrderDrawer from "../components/AddOrderDrawer";
import {
  MdEmail,
  MdDateRange,
  MdLocalShipping,
  MdPayment,
  MdOutlineShoppingCart,
  MdOutlineSystemUpdate,
  MdOutlineDeliveryDining,
  MdOutlineInventory2,
  MdOutlinePayment,
  MdLocationCity,
  MdLocationOn,
  MdShoppingCart,
  MdOutlineNotes,
  MdOutlineHome,
} from "react-icons/md";
import { FaMoneyBillWave, FaHashtag, FaStickyNote } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "../redux/slice/ordersSlice";
import React from "react";
import { IoAdd } from "react-icons/io5";

//
const columns = [
  { id: "id", label: "Order ID", minWidth: 100 },
  { id: "customerName", label: "Customer Name", minWidth: 170 },
  { id: "status", label: "Status", minWidth: 120 },
  { id: "paymentStatus", label: "Payment Status", minWidth: 150 },
  { id: "orderDate", label: "Order Date", minWidth: 150 },
  { id: "deliveryDate", label: "Delivery Date", minWidth: 150 },
  { id: "totalAmount", label: "Total Amount", minWidth: 150 },
];

export default function Orders() {
  const dispatch = useDispatch();

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [addOrderOpen, setAddOrderOpen] = useState(false);

  //

  const { orders, loading, fetchError } = useSelector((state) => state.orders);
  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const handleRowClick = (order) => {
    setSelectedOrder(order);
    setDrawerOpen(true);
  };

  const handleAddDrawerOpen = () => {
    setAddOrderOpen(true);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // Softer status chip
  const renderStatusChip = (status) => {
    const colors = {
      Delivered: { bg: "rgba(76, 175, 80, 0.15)", text: "#4CAF50" }, // green
      Shipped: { bg: "rgba(33, 150, 243, 0.15)", text: "#2196F3" }, // blue
      Processing: { bg: "rgba(255, 193, 7, 0.15)", text: "#FFC107" }, // yellow
      Cancelled: { bg: "rgba(244, 67, 54, 0.15)", text: "#F44336" }, // red
    };

    const { bg, text } = colors[status] || {
      bg: "rgba(158, 158, 158, 0.15)",
      text: "#9E9E9E",
    };

    return (
      <Chip
        label={status}
        size="small"
        sx={{
          backgroundColor: bg,
          color: text,
          fontWeight: 300,
        }}
      />
    );
  };

  // Softer payment chip
  const renderPaymentChip = (paymentStatus) => {
    const colors = {
      Paid: { bg: "rgba(76, 175, 80, 0.15)", text: "#4CAF50" },
      Pending: { bg: "rgba(255, 193, 7, 0.15)", text: "#FFC107" },
      Refunded: { bg: "rgba(244, 67, 54, 0.15)", text: "#F44336" },
    };

    const { bg, text } = colors[paymentStatus] || {
      bg: "rgba(158, 158, 158, 0.15)",
      text: "#9E9E9E",
    };

    return (
      <Chip
        label={paymentStatus}
        size="small"
        sx={{
          backgroundColor: bg,
          color: text,
          fontWeight: 500,
        }}
      />
    );
  };

  //
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress sx={{ color: "#FF7A00" }} />
      </div>
    );
  }

  if (fetchError) {
    return <p>Error loading products: {fetchError}</p>;
  }

  return (
    <>
      <div className="flex justify-between items-center">
        <h3 className="text-primary font-normal text-4xl my-8">Orders</h3>
        <IoAdd
          onClick={handleAddDrawerOpen}
          className="h-10 w-10 text-xl p-2 text-primary bg-gray-100 rounded-lg 
             transition-all duration-300 ease-in-out cursor-pointer
             hover:bg-primary hover:text-white hover:shadow-lg hover:scale-110"
        />
      </div>

      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="orders table">
            {/*  */}
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    style={{ minWidth: column.minWidth, fontWeight: 600 }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            {/*  */}
            <TableBody>
              {orders
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((order) => (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={order.id}
                    onClick={() => handleRowClick(order)}
                  >
                    <TableCell>{order.id}</TableCell>
                    <TableCell>{order.customerName}</TableCell>
                    <TableCell>{renderStatusChip(order.status)}</TableCell>
                    <TableCell>
                      {renderPaymentChip(order.paymentStatus)}
                    </TableCell>
                    <TableCell>
                      {new Date(order.orderDate).toLocaleDateString("en-US")}
                    </TableCell>
                    <TableCell>
                      {new Date(order.deliveryDate).toLocaleDateString("en-US")}
                    </TableCell>
                    <TableCell>${order.totalAmount.toFixed(2)}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Drawer for Order Details */}
        <Drawer
          anchor="right"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          sx={{
            "& .MuiDrawer-paper": {
              width: 370,
              padding: 2,
              backgroundColor: "#fafafa",
            },
          }}
        >
          {selectedOrder && (
            <Box>
              <Divider sx={{ mb: 2 }} />

              {/* Customer Info */}
              <div className="space-y-2 mb-4">
                <p className="flex items-center gap-2 text-sm text-gray-600">
                  <CgProfile className="text-gray-500 text-lg" />
                  <span>{selectedOrder.customerName}</span>
                </p>
                <p className="flex items-center gap-2 text-sm text-gray-600">
                  <MdEmail className="text-gray-500 text-lg" />
                  <span>{selectedOrder.customerEmail}</span>
                </p>
                <p className="flex items-center gap-2 text-sm text-gray-600">
                  <MdOutlineSystemUpdate className="text-gray-500 text-lg" />
                  <span>
                    Order Date:{" "}
                    {new Date(selectedOrder.orderDate).toLocaleString()}
                  </span>
                </p>
                <p className="flex items-center gap-2 text-sm text-gray-600">
                  <MdOutlineDeliveryDining className="text-gray-500 text-lg" />
                  <span>
                    Delivery Date:{" "}
                    {new Date(selectedOrder.deliveryDate).toLocaleString()}
                  </span>
                </p>
              </div>

              <Divider sx={{ mb: 2 }} />

              {/* Status */}
              <div className="space-y-2 mb-4">
                <p className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 text-gray-600">
                    <MdOutlineInventory2 className="text-gray-500 text-lg" />
                    Status:
                  </span>
                  <span className="text-green-600 font-medium">
                    {selectedOrder.status}
                  </span>
                </p>
                <p className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 text-gray-600">
                    <MdOutlinePayment className="text-gray-500 text-lg" />
                    Payment:
                  </span>
                  <span className="text-blue-600 font-medium">
                    {selectedOrder.paymentStatus} ({selectedOrder.paymentMethod}
                    )
                  </span>
                </p>
              </div>

              <Divider sx={{ mb: 2 }} />

              {/* Addresses */}
              <div className="space-y-2 mb-4">
                <p className="flex items-start gap-2 text-sm text-gray-600">
                  <MdLocationOn className="text-gray-500 text-lg" />
                  <span>
                    <strong className="font-medium">Shipping:</strong>{" "}
                    {selectedOrder.shippingAddress}
                  </span>
                </p>
                <p className="flex items-start gap-2 text-sm text-gray-600">
                  <MdLocationCity className="text-gray-500 text-lg" />
                  <span>
                    <strong className="font-medium">Billing:</strong>{" "}
                    {selectedOrder.billingAddress}
                  </span>
                </p>
              </div>

              <Divider sx={{ mb: 2 }} />

              {/* Items */}
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <MdShoppingCart className="text-gray-500 text-lg" />
                  Items
                </h4>
                <ul className="space-y-1">
                  {selectedOrder.items.map((item) => (
                    <li
                      key={item.productId}
                      className="flex justify-between text-sm text-gray-600"
                    >
                      <span>
                        {item.name} x{item.quantity}
                      </span>
                      <span>
                        {selectedOrder.currency}{" "}
                        {(item.price * item.quantity).toFixed(2)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <Divider sx={{ mb: 2 }} />

              {/* Shipping Info */}
              <div className="space-y-2 mb-4">
                <p className="flex items-center gap-2 text-sm text-gray-600">
                  <MdLocalShipping className="text-gray-500 text-lg" />
                  <span>
                    {selectedOrder.shippingMethod} -{" "}
                    {selectedOrder.trackingNumber}
                  </span>
                </p>
                {selectedOrder.notes && (
                  <p className="flex items-center gap-2 text-sm text-gray-600">
                    <MdOutlineNotes className="text-gray-500 text-lg" />
                    <span>{selectedOrder.notes}</span>
                  </p>
                )}
              </div>

              {/* Total */}
              <div className="flex justify-between items-center mt-4 text-base font-semibold text-gray-800">
                <span>Total:</span>
                <span>
                  {selectedOrder.currency}{" "}
                  {selectedOrder.totalAmount.toFixed(2)}
                </span>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setDrawerOpen(false)}
                className="btn-primary mt-6 text-sm"
              >
                Close
              </button>
            </Box>
          )}
        </Drawer>

        {/*  */}

        <AddOrderDrawer
          open={addOrderOpen}
          onClose={() => setAddOrderOpen(false)}
        />

        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={orders.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
}
