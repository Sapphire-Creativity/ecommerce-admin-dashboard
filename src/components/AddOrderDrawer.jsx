import React, { useState } from "react";
import { Drawer, Box } from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductPicker from "./ProductPicker";
import { useDispatch } from "react-redux";
import { addNewOrder } from "../redux/slice/ordersSlice";

const AddOrderDrawer = ({ open, onClose }) => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    customerName: "",
    customerEmail: "",
    orderDate: "",
    deliveryDate: "",
    status: "Processing",
    paymentStatus: "Pending",
    paymentMethod: "Credit Card",
    shippingAddress: "",
    billingAddress: "",
    totalAmount: 0,
    currency: "USD",
    shippingMethod: "Standard Delivery",
    trackingNumber: "",
    notes: "",
    items: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // validations
    if (!formData.customerName.trim()) {
      toast.error("Customer name is required");
      return;
    }

    if (!formData.customerEmail.trim()) {
      toast.error("Customer email is required");
      return;
    }

    // Basic email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.customerEmail)) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (formData.items.length === 0) {
      toast.error("Please add at least one product");
      return;
    }

    const orderISO = formData.orderDate
      ? new Date(formData.orderDate).toISOString()
      : new Date().toISOString();
    const deliveryISO = formData.deliveryDate
      ? new Date(formData.deliveryDate).toISOString()
      : "";

    if (deliveryISO && new Date(deliveryISO) < new Date(orderISO)) {
      toast.error("Delivery date cannot be before order date");
      return;
    }

    const computedTotal = formData.items.reduce(
      (sum, it) => sum + Number(it.price || 0) * Number(it.quantity || 0),
      0
    );

    const payload = {
      ...formData,
      orderDate: orderISO,
      deliveryDate: deliveryISO,
      totalAmount: Number(computedTotal.toFixed(2)),
      items: formData.items.map((i) => ({
        ...i,
        productId: String(i.productId),
        price: Number(i.price),
        quantity: Number(i.quantity),
      })),
    };

    try {
      await dispatch(addNewOrder(payload)).unwrap();
      toast.success("Order created successfully!");
      onClose();

      // Reset form
      setFormData({
        customerName: "",
        customerEmail: "",
        orderDate: "",
        deliveryDate: "",
        status: "Processing",
        paymentStatus: "Pending",
        paymentMethod: "Credit Card",
        shippingAddress: "",
        billingAddress: "",
        totalAmount: 0,
        currency: "USD",
        shippingMethod: "Standard Delivery",
        trackingNumber: "",
        notes: "",
        items: [],
      });
    } catch (err) {
      console.error("Order creation error:", err);
      toast.error(err.message || "Failed to create order");
    }
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      sx={{
        "& .MuiDrawer-paper": {
          width: { xs: "100vw", sm: 400 },
          height: "100dvh",
          maxHeight: "100dvh",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#fafafa",
          padding: 0,
          overflow: "hidden",
        },
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          overflow: "hidden",
        }}
        noValidate
      >
        {/* HEADER */}
        <div className="bg-white px-4 py-3 border-b sticky top-0 z-10">
          <h6 className="text-primary text-lg font-semibold">Add New Order</h6>
        </div>

        {/* BODY */}
        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4">
          {/* Customer Name */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Customer Name *
            </label>
            <input
              type="text"
              name="customerName"
              value={formData.customerName}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-3 py-2 bg-white outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Customer Email */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Customer Email *
            </label>
            <input
              type="email"
              name="customerEmail"
              value={formData.customerEmail}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-3 py-2 bg-white outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Order & Delivery Dates */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Order Date
              </label>
              <input
                type="datetime-local"
                name="orderDate"
                value={formData.orderDate}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 bg-white outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Delivery Date
              </label>
              <input
                type="datetime-local"
                name="deliveryDate"
                value={formData.deliveryDate}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 bg-white outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          {/* Product Picker */}
          <ProductPicker
            currency={formData.currency}
            onChange={({ items, total }) =>
              setFormData((prev) => ({
                ...prev,
                items,
                totalAmount: Number(total.toFixed(2)),
              }))
            }
          />

          {/* Status and Payment */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 bg-white outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="Processing">Processing</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Payment Status
              </label>
              <select
                name="paymentStatus"
                value={formData.paymentStatus}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 bg-white outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="Pending">Pending</option>
                <option value="Paid">Paid</option>
                <option value="Refunded">Refunded</option>
                <option value="Failed">Failed</option>
              </select>
            </div>
          </div>

          {/* Payment Method */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Payment Method
            </label>
            <select
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 bg-white outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="Credit Card">Credit Card</option>
              <option value="Bank Transfer">Bank Transfer</option>
              <option value="Bank Transfer">Cash on Delivery</option>
              <option value="PayPal">PayPal</option>
            </select>
          </div>

          {/* Shipping Address */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Shipping Address
            </label>
            <textarea
              name="shippingAddress"
              value={formData.shippingAddress}
              onChange={handleChange}
              rows={2}
              className="w-full border rounded-lg px-3 py-2 bg-white outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Billing Address */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Billing Address
            </label>
            <textarea
              name="billingAddress"
              value={formData.billingAddress}
              onChange={handleChange}
              rows={2}
              className="w-full border rounded-lg px-3 py-2 bg-white outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Tracking Number */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Tracking Number
            </label>
            <input
              type="text"
              name="trackingNumber"
              value={formData.trackingNumber}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 bg-white outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Currency and Total */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Currency</label>
              <select
                name="currency"
                value={formData.currency}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 bg-white outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Total</label>
              <input
                type="text"
                readOnly
                value={`${formData.currency} ${Number(
                  formData.totalAmount || 0
                ).toFixed(2)}`}
                className="w-full border rounded-lg px-3 py-2 bg-gray-50 outline-none"
              />
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium mb-1">Notes</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows={3}
              className="w-full border rounded-lg px-3 py-2 bg-white outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        {/* FOOTER */}
        <div className="bg-white px-4 py-3 border-t sticky bottom-0 flex gap-2">
          <button
            type="submit"
            className="flex-1 px-5 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark shadow transition"
          >
            Save
          </button>
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-5 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 shadow transition"
          >
            Cancel
          </button>
        </div>
      </Box>
    </Drawer>
  );
};

export default AddOrderDrawer;
