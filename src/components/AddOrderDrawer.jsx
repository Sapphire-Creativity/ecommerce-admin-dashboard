import React, { useState } from "react";
import { Drawer, Box } from "@mui/material";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductPicker from "./ProductPicker";
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
    totalAmount: "",
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Order Data:", formData);
    toast.success("Order created successfully!");
    onClose();
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      sx={{
        "& .MuiDrawer-paper": {
          width: 400,
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#fafafa",
          padding: 0,
        },
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        className="flex flex-col h-full"
      >
        {/* HEADER */}
        <div className="sticky top-0 bg-white z-20 px-4 py-3 border-b">
          <h6 className="text-primary text-lg font-semibold">Add New Order</h6>
        </div>

        {/* SCROLLABLE BODY */}
        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4">
          {/* Customer Name */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Customer Name
            </label>
            <input
              type="text"
              name="customerName"
              value={formData.customerName}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary outline-none bg-white"
            />
          </div>

          {/* Customer Email */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Customer Email
            </label>
            <input
              type="email"
              name="customerEmail"
              value={formData.customerEmail}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary outline-none bg-white"
            />
          </div>

          {/* Order Date */}
          <div>
            <label className="block text-sm font-medium mb-1">Order Date</label>
            <input
              type="datetime-local"
              name="orderDate"
              value={formData.orderDate}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary outline-none bg-white"
            />
          </div>

          {/* Delivery Date */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Delivery Date
            </label>
            <input
              type="datetime-local"
              name="deliveryDate"
              value={formData.deliveryDate}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary outline-none bg-white"
            />
          </div>

          {/* Products */}

          <ProductPicker />

          {/* Status */}
          <div>
            <label className="block text-sm font-medium mb-1">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-primary outline-none"
            >
              <option>Processing</option>
              <option>Shipped</option>
              <option>Delivered</option>
              <option>Cancelled</option>
            </select>
          </div>

          {/* Payment Status */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Payment Status
            </label>
            <select
              name="paymentStatus"
              value={formData.paymentStatus}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-primary outline-none"
            >
              <option>Pending</option>
              <option>Paid</option>
              <option>Failed</option>
            </select>
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
              className="w-full border rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-primary outline-none"
            >
              <option>Credit Card</option>
              <option>Bank Transfer</option>
              <option>PayPal</option>
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
              rows="2"
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary outline-none bg-white"
            ></textarea>
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
              rows="2"
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary outline-none bg-white"
            ></textarea>
          </div>

          {/* Total Amount & Currency */}
          <div className="">
            <div>
              <label className="block text-sm font-medium mb-1">Currency</label>
              <select
                name="currency"
                value={formData.currency}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-primary outline-none"
              >
                <option>USD</option>
                <option>EUR</option>
                <option>GBP</option>
              </select>
            </div>
          </div>

          {/* Shipping Method */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Shipping Method
            </label>
            <select
              name="shippingMethod"
              value={formData.shippingMethod}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-primary outline-none"
            >
              <option>Standard Delivery</option>
              <option>Express Delivery</option>
              <option>Overnight Shipping</option>
            </select>
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
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary outline-none bg-white"
            />
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium mb-1">Notes</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows="3"
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary outline-none bg-white"
            ></textarea>
          </div>
        </div>

        {/* FOOTER */}
        <div className="sticky bottom-0 bg-white z-20 px-4 py-3 border-t flex gap-2">
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
