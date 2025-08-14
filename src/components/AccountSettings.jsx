import React, { useState } from "react";

export default function AccountSecurity() {
  const [accountData, setAccountData] = useState({
    email: "john.doe@example.com",
    password: "********",
  });

  const [editMode, setEditMode] = useState(false);
  const [tempData, setTempData] = useState(accountData);

  const handleEditToggle = () => {
    setTempData(accountData);
    setEditMode(!editMode);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTempData({ ...tempData, [name]: value });
  };

  const handleSave = () => {
    setAccountData(tempData);
    setEditMode(false);
  };

  return (
    <div className="w-full bg-white p-6 shadow-lg rounded-xl border border-gray-200">
      <h3 className="text-2xl font-normal mb-4 text-gray-800">
        Account & Security
      </h3>

      <div className="space-y-4">
        {/* Email */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Email Address
          </label>
          {editMode ? (
            <input
              type="email"
              name="email"
              value={tempData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
            />
          ) : (
            <p className="text-gray-900">{accountData.email}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Password
          </label>
          {editMode ? (
            <input
              type="password"
              name="password"
              value={tempData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
            />
          ) : (
            <p className="text-gray-900">{accountData.password}</p>
          )}
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-6 flex justify-end gap-3">
        {editMode ? (
          <>
            <button
              onClick={handleSave}
              className="px-5 py-3 text-xs md:text-sm bg-primary text-white rounded-lg hover:bg-primary-dark transition"
            >
              Save Changes
            </button>
            <button
              onClick={() => setEditMode(false)}
              className="px-5 py-3 bg-gray-400 text-white rounded-lg text-xs md:text-sm hover:bg-gray-500 shadow transition"
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            onClick={handleEditToggle}
            className="px-5 py-3 text-sm bg-gray-200 rounded-lg hover:bg-gray-300 transition"
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
}
