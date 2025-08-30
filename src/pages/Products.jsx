import React, { useEffect, useState } from "react";
import ProductTable from "../components/ProductTable";
import { IoAdd } from "react-icons/io5";
import { Drawer, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, addNewProducts } from "../redux/slice/productSlice";
import CircularProgress from "@mui/material/CircularProgress";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditProductDrawer from "../components/EditProductDrawer";

const Products = () => {
  const [editDrawerOpen, setEditDrawerOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const dispatch = useDispatch();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    stock: "",
    description: "",
  });

  const { items, loading, fetchError, postError } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleEdit = (product) => {
    setEditingProduct(product);
    setEditDrawerOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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
      });
    }
  };

  return (
    <div className="h-full flex flex-col">

      {/* Fixed Header */}
      <div className="sticky top-0 z-10 bg-white pb-2">
        <div className="flex justify-between items-center">
          <h3 className="text-primary font-normal text-2xl md:text-4xl my-8">
            Products
          </h3>

          <IoAdd
            onClick={() => setDrawerOpen(true)}
            className="h-8 w-8 text-sm p-1 text-primary bg-gray-100 rounded-lg 
             transition-all duration-300 ease-in-out cursor-pointer
             hover:bg-primary hover:text-white hover:shadow-lg hover:scale-110"
          />
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-auto pb-4">
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <CircularProgress sx={{ color: "#FF7A00" }} size={20} />
          </div>
        ) : fetchError ? (
          <div className="bg-red-50 border-l-4 border-red-500 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-red-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">
                  Error loading products: {fetchError}, please try again.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <ProductTable items={items} handleEdit={handleEdit} />
        )}
      </div>

      {/* Add Product Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        sx={{
          "& .MuiDrawer-paper": {
            width: { xs: "90%", sm: 400 },
            padding: 3,
            backgroundColor: "#fafafa",
          },
        }}
      >
        <Box component="form" onSubmit={handleSubmit} className="space-y-4">
          <h3 className="text-primary text-xl md:text-2xl font-lighter mb-6">
            Add New Product
          </h3>

          {[
            { label: "Product Name", name: "name", type: "text" },
            { label: "Price", name: "price", type: "number" },
            {
              label: "Category",
              name: "category",
              type: "select",
              options: ["Electronics", "Clothing", "Food", "Home", "Beauty"],
            },
            { label: "Stock Quantity", name: "stock", type: "number" },
            { label: "Description", name: "description", type: "textarea" },
          ].map((field) => (
            <div key={field.name}>
              <label className="block text-sm font-medium mb-1 text-gray-700">
                {field.label}
              </label>
              {field.type === "select" ? (
                <select
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="">Select {field.label}</option>
                  {field.options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : field.type === "textarea" ? (
                <textarea
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  rows={3}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              ) : (
                <input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              )}
            </div>
          ))}

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              className="text-[.7rem] md:text-sm flex-1 px-4 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark shadow transition font-medium"
            >
              Save Product
            </button>
            <button
              type="button"
              onClick={() => setDrawerOpen(false)}
              className="text-[.7rem] md:text-sm flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium"
            >
              Cancel
            </button>
          </div>
        </Box>
      </Drawer>

      {/* Edit Product Drawer */}
      <EditProductDrawer
        open={editDrawerOpen}
        onClose={() => setEditDrawerOpen(false)}
        product={editingProduct}
      />
    </div>
  );
};

export default Products;
