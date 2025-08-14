import React, { useState } from "react";

export default function ProfileForm() {
  const [profile, setProfile] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "johndoe@example.com",
    phone: "+1 234 567 890",
    address: "123 Main St, Cityville, USA",
    profilePic: "https://randomuser.me/api/portraits/men/32.jpg",
  });

  const [formData, setFormData] = useState(profile);
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setProfile(formData);
    setIsEditing(false);
  };

  return (
    <div className="w-full bg-white p-6 shadow-lg rounded-xl border border-gray-200">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <img
          src={profile.profilePic}
          alt="Profile"
          className="w-20 h-20 rounded-full object-cover border shadow-sm"
        />
        <div>
          <h2 className="text-2xl font-lighter text-gray-800">
            {profile.firstName} {profile.lastName}
          </h2>
          <p className="text-gray-500 text-sm">{profile.email}</p>
        </div>
      </div>

      <hr className="mb-6" />

      {!isEditing ? (
        // View Mode
        <div className="space-y-4">
          <div>
            <p className="text-gray-500 text-sm">First Name</p>
            <p className="text-gray-800 font-medium">{profile.firstName}</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Last Name</p>
            <p className="text-gray-800 font-medium">{profile.lastName}</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Email</p>
            <p className="text-gray-800 font-medium">{profile.email}</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Phone</p>
            <p className="text-gray-800 font-medium">{profile.phone}</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Address</p>
            <p className="text-gray-800 font-medium">{profile.address}</p>
          </div>

          <button
            onClick={() => {
              setFormData(profile);
              setIsEditing(true);
            }}
            className="px-5 py-3 mt-4 bg-primary text-white text-xs md:text-sm rounded-lg shadow hover:bg-primary-dark transition"
          >
            Edit Profile
          </button>
        </div>
      ) : (
        // Edit Mode
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-3 focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-3 focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-3 focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Phone
            </label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-3 focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Address
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-3 focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              onClick={handleSave}
              className="px-5 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark shadow transition text-xs md:text-sm"
            >
              Save Changes
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="px-5 py-3 bg-gray-400 text-white rounded-lg text-xs md:text-sm hover:bg-gray-500 shadow transition"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
