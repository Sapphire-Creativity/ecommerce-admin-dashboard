import { NavLink, useNavigate } from "react-router-dom";
import {
  FiHome,
  FiBox,
  FiShoppingCart,
  FiUsers,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";
import { HiMiniSquares2X2 } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import { signOutThunk } from "../redux/slice/authSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Tooltip } from "@mui/material";
import { useState } from "react";

const Sidebar = ({ isCollapsed }) => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  //
  const toggleModal = () => {
    setShowModal(!showModal);
  };
  const handlesignOut = async () => {
    try {
      await dispatch(signOutThunk()).unwrap();
      toast.success("Signed out successfully");
      navigate("/auth-page");
    } catch (err) {
      toast.error(err || "Failed to log out");
    }
  };
  const navItems = [
    { path: "/", label: "Dashboard", icon: FiHome },
    { path: "/products", label: "Products", icon: FiBox },
    { path: "/orders", label: "Orders", icon: FiShoppingCart },
    { path: "/customers", label: "Customers", icon: FiUsers },
    { path: "/settings", label: "Settings", icon: FiSettings },
  ];

  return (
    <>
      <aside className="relative h-full p-5 flex flex-col justify-between overflow-hidden box-shadow">
        {/* Top: Logo + Navigation */}
        <div className="overflow-y-auto flex-1">
          {/* Logo */}
          <div
            className={`flex items-center ${
              isCollapsed ? "justify-center" : "gap-2"
            } mb-20 mt-2`}
          >
            <HiMiniSquares2X2
              className={`text-primary transition-all duration-300 ${
                isCollapsed ? "text-3xl" : "text-2xl"
              }`}
            />
            {!isCollapsed && <h4 className="font-bold text-lg">E-Shop</h4>}
          </div>

          {/* Navigation */}
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center ${
                      isCollapsed ? "justify-center" : "gap-3"
                    } text-xs p-3 rounded-lg transition ${
                      isActive
                        ? "bg-primary text-white"
                        : "hover:bg-primary/70 hover:text-white"
                    }`
                  }
                >
                  <Icon
                    className={`transition-all duration-300 ${
                      isCollapsed ? "text-2xl" : "text-lg"
                    }`}
                  />
                  {!isCollapsed && <span>{item.label}</span>}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Bottom: Profile + Logout */}
        <div className="flex flex-col gap-4 border-t pt-4 flex-shrink-0">
          {/* Profile Preview */}
          <div
            className={`flex items-center ${
              isCollapsed ? "justify-center" : "gap-3"
            }`}
          >
            <img
              src="https://i.pravatar.cc/40"
              alt="User Avatar"
              className="w-10 h-10 rounded-full border-2 border-primary flex-shrink-0"
            />

            {!isCollapsed && (
              <div className="min-w-0">
                <h5 className="text-[0.65rem] font-lighter truncate max-w-[150px]">
                  {user.displayName}
                </h5>

                <Tooltip title={user.uid} arrow>
                  <p className="text-[0.6rem] text-gray-500 truncate max-w-[150px]">
                    {user.uid}
                  </p>
                </Tooltip>

                <Tooltip title={user.email} arrow>
                  <p className="text-[0.6rem] text-gray-500 truncate max-w-[150px] mt-1">
                    {user.email}
                  </p>
                </Tooltip>

                <p className="text-[0.6rem] text-gray-500">Admin</p>
              </div>
            )}
          </div>

          {/* Logout Button */}
          <button
            onClick={toggleModal}
            className={`flex items-center text-red-500 ${
              isCollapsed ? "justify-center" : "gap-2"
            } p-2 rounded-lg hover:bg-red-100 transition`}
          >
            <FiLogOut
              className={`transition-all duration-300 ${
                isCollapsed ? "text-2xl" : "text-lg"
              }`}
            />
            {!isCollapsed && <span className="text-xs">Logout</span>}
          </button>
        </div>
      </aside>

      {/* // Display modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Backdrop */}
          <div
            onClick={() => setShowModal(false)}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
          ></div>

          {/* Modal Box */}
          <div className="relative bg-white flex flex-col rounded-2xl shadow-xl p-6 w-[90%] max-w-sm z-10 animate-modal">
            <h4 className="text-lg font-semibold text-gray-800 text-center">
              Confirm Logout
            </h4>

            <hr className="w-[30%] mx-auto my-2 h-[0.1rem] bg-gray-500 rounded-full" />
            <p className="text-sm text-gray-600 mb-6 text-center">
              Are you sure you want to sign out of your dashboard?
            </p>

            <div className="flex justify-center gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 text-sm hover:bg-gray-100 transition"
              >
                Cancel
              </button>
              <button
                onClick={handlesignOut}
                className="px-4 py-2 rounded-lg bg-primary text-white text-sm hover:bg-red-600 transition"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
