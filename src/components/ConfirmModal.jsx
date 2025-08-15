// src/components/ConfirmModal.jsx
import React, { useEffect, useState } from "react";

const ConfirmModal = ({ visible, onConfirm, onCancel, message }) => {
  const [show, setShow] = useState(visible);

  useEffect(() => {
    if (visible) {
      setShow(true);
    } else {
      const timeout = setTimeout(() => setShow(false), 300);
      return () => clearTimeout(timeout);
    }
  }, [visible]);

  if (!show) return null;

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 transition-opacity duration-300 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
      style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }} // transparent black
    >
      <div
        className={`bg-white rounded-lg p-6 w-80 shadow-lg text-center transform transition-all duration-300`}
        style={{
          animation: visible
            ? "modal-pop 0.3s ease-out forwards"
            : "none",
        }}
      >
        <p className="mb-4 text-sm">{message}</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onCancel}
            className="px-4 py-3 text-xs md:text-sm bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-3 text-xs md:text-sm bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors duration-200"
          >
            Delete
          </button>
        </div>
      </div>

      {/* Add keyframes directly */}
      <style>
        {`
          @keyframes modal-pop {
            0% { transform: scale(0.8); opacity: 0; }
            60% { transform: scale(1.05); opacity: 1; }
            100% { transform: scale(1); opacity: 1; }
          }
        `}
      </style>
    </div>
  );
};

export default ConfirmModal;
