import React, { useEffect, useState } from "react";
import ProductTable from "../components/ProductTable";
import { IoAdd } from "react-icons/io5";
import { Drawer, Box, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, addNewProducts } from "../redux/slice/productSlice";
import CircularProgress from "@mui/material/CircularProgress";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Products = () => {
  const dispatch = useDispatch();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    stock: "",
    description: "",
  });

  //
  const { items, loading, fetchError, postError } = useSelector(
    (state) => state.products
  );

  // Handle product submission

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("New Product:", formData);

    try {
      await dispatch(addNewProducts(formData)).unwrap();

      toast.success("🎉 Product added successfully!", {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "colored",
      });
      setDrawerOpen(false);
      setFormData({
        name: "",
        price: "",
        category: "",
        stock: "",
        description: "",
      });
    } catch (error) {
      toast.error("❌ Failed to add product", {
        position: "top-right",
        autoClose: 2500,
        theme: "colored",
      });
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center">
        <h3 className="text-primary font-normal text-4xl my-8">Products</h3>
        <IoAdd
          onClick={() => setDrawerOpen(true)}
          className="h-10 w-10 text-xl p-2 text-primary bg-gray-100 rounded-lg 
             transition-all duration-300 ease-in-out cursor-pointer
             hover:bg-primary hover:text-white hover:shadow-lg hover:scale-110"
        />
      </div>

      {/* Product Table */}
      <ProductTable items={items} />

      {/* Drawer for Add Product */}
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
        <Box component="form" onSubmit={handleSubmit}>
          {/* Drawer Title */}
          <h6 className="text-primary text-lg font-medium mb-6">
            Add New Product
          </h6>

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
              onClick={() => setDrawerOpen(false)}
              className="px-5 py-3 bg-gray-400 text-white rounded-lg text-xs md:text-sm hover:bg-gray-500 shadow transition"
            >
              Cancel
            </button>
          </div>
        </Box>
      </Drawer>
    </div>
  );
};

export default Products;
