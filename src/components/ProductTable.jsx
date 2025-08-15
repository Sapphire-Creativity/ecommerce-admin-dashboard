import React, { useEffect, useState } from "react";
import { MdDelete, MdModeEdit } from "react-icons/md";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { useDispatch } from "react-redux";
import { deleteProducts } from "../redux/slice/productSlice";
import { toast, ToastContainer } from "react-toastify";
import ConfirmModal from "../components/ConfirmModal";

export default function Products({ items, handleEdit }) {
  const [products, setProducts] = useState(items);
  const [currentPage, setCurrentPage] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const rowsPerPage = 8;
  const dispatch = useDispatch();

  useEffect(() => {
    setProducts(items);
  }, [items]);

  // Open custom modal
  const confirmDelete = (id) => {
    setSelectedId(id);
    setModalVisible(true);
  };

  // Called when modal confirm is clicked
  const handleDelete = async () => {
    if (!selectedId) return;
    try {
      await dispatch(deleteProducts(selectedId)).unwrap();
      toast.success("Product removed successfully!");
      setModalVisible(false);
      setSelectedId(null);
    } catch (err) {
      toast.error("Failed to delete product");
    }
  };

  const totalPages = Math.ceil(products.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentProducts = products.slice(startIndex, startIndex + rowsPerPage);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <div className="">
      <ToastContainer position="top-right" autoClose={3000} />
      <ConfirmModal
        visible={modalVisible}
        onConfirm={handleDelete}
        onCancel={() => setModalVisible(false)}
        message="Are you sure you want to delete this product?"
      />

      <div className="overflow-x-auto bg-white rounded-lg shadow-xl">
        <table className="min-w-full text-sm text-left border border-gray-100">
          <thead className="uppercase text-xs bg-gray-50">
            <tr>
              <th className="px-4 py-5 border-b text-primary-dark">Image</th>
              <th className="px-4 py-5 border-b text-primary-dark">Name</th>
              <th className="px-4 py-5 border-b text-primary-dark">Category</th>
              <th className="px-4 py-5 border-b text-primary-dark">
                Price ($)
              </th>
              <th className="px-4 py-5 border-b text-primary-dark">Stock</th>
              <th className="px-4 py-5 border-b text-primary-dark text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {currentProducts.map((product) => (
              <tr
                key={product.id}
                className="hover:bg-gray-50 transition duration-200"
              >
                <td className="px-4 py-3 border-b">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-10 h-10 object-cover rounded"
                  />
                </td>
                <td className="px-4 py-3 border-b font-medium text-gray-800">
                  {product.name}
                </td>
                <td className="px-4 py-3 border-b">{product.category}</td>
                <td className="px-4 py-3 border-b">
                  {Number(product.price)?.toFixed(2) || "0.00"}
                </td>
                <td className="px-4 py-3 border-b">{product.stock}</td>
                <td className="px-4 py-3 border-b text-center space-x-2">
                  <button
                    onClick={() => handleEdit(product)}
                    className="p-2 text-gray-600 hover:bg-blue-100 rounded transition duration-200"
                  >
                    <MdModeEdit size={18} />
                  </button>
                  <button
                    onClick={() => confirmDelete(product.id)}
                    className="p-2 text-red-500 hover:bg-red-100 rounded transition duration-200"
                  >
                    <MdDelete size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex items-center justify-between p-4 border-t">
          <span className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </span>
          <div className="flex space-x-2">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
            >
              <GrFormPrevious />
            </button>
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index + 1}
                onClick={() => goToPage(index + 1)}
                className={`px-3 py-1 rounded ${
                  currentPage === index + 1
                    ? "bg-primary text-white"
                    : "bg-gray-100 hover:bg-gray-300"
                }`}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
            >
              <GrFormNext />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
