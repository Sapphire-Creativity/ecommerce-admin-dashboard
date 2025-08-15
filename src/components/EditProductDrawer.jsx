// src/components/EditProductDrawer.jsx
import React, { useEffect, useState } from "react";
import { Drawer, Box } from "@mui/material";
import { useDispatch } from "react-redux";
import { updateProduct } from "../redux/slice/productSlice";

const EditProductDrawer = ({ open, onClose, product }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    stock: "",
    description: "",
    image: "",
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || "",
        price: product.price || "",
        category: product.category || "",
        stock: product.stock || "",
        description: product.description || "",
        image: product.image || "",
      });
    }
  }, [product]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProduct({ ...product, ...formData }));
    onClose();
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      sx={{
        "& .MuiDrawer-paper": {
          width: 370,
          padding: 2,
          backgroundColor: "#fafafa",
        },
      }}
    >
      <Box component="form" onSubmit={handleSubmit}>
        {/* Drawer Title */}
        <h6 className="text-primary text-lg font-medium mb-6">Edit Product</h6>

        {/* Product Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1 text-gray-700">
            Product Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-3 py-3 focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        {/* Price */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1 text-gray-700">
            Price
          </label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-3 py-3 focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        {/* Category */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1 text-gray-700">
            Category
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-3 py-3 bg-white focus:outline-none focus:ring-1 focus:ring-primary"
          >
            <option value="">Select Category</option>
            <option value="Electronics">Electronics</option>
            <option value="Clothing">Clothing</option>
            <option value="Food">Food</option>
          </select>
        </div>

        {/* Stock */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1 text-gray-700">
            Stock Quantity
          </label>
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-3 py-3 focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        {/* Description */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-1 text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            className="w-full border rounded-lg px-3 py-3 focus:outline-none focus:ring-1 focus:ring-primary"
          ></textarea>
        </div>

        {/* Buttons */}
        <div className="flex gap-2">
          <button className="px-5 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark shadow transition text-xs md:text-sm">
            Save
          </button>

          <button
            type="button"
            onClick={onClose}
            className="px-5 py-3 bg-gray-400 text-white rounded-lg text-xs md:text-sm hover:bg-gray-500 shadow transition"
          >
            Cancel
          </button>
        </div>
      </Box>
    </Drawer>
  );
};

export default EditProductDrawer;
