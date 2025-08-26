import { NavLink } from "react-router-dom";
import {
  FiHome,
  FiBox,
  FiShoppingCart,
  FiUsers,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";
import { HiMiniSquares2X2 } from "react-icons/hi2";

const Sidebar = ({ isCollapsed }) => {
  const navItems = [
    { path: "/", label: "Dashboard", icon: FiHome },
    { path: "/products", label: "Products", icon: FiBox },
    { path: "/orders", label: "Orders", icon: FiShoppingCart },
    { path: "/customers", label: "Customers", icon: FiUsers },
    { path: "/settings", label: "Settings", icon: FiSettings },
  ];

  return (
    <aside className="h-full p-5 flex flex-col justify-between overflow-hidden">
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
            className="w-10 h-10 rounded-full border-2 border-primary"
          />
          {!isCollapsed && (
            <div>
              <h4 className="text-sm font-semibold">John Doe</h4>
              <p className="text-xs text-gray-500">
                sapphirecreativity@gmail.com
              </p>
              <p className="text-xs text-gray-500">Admin</p>
            </div>
          )}
        </div>

        {/* Logout Button */}
        <button
          className={`flex items-center text-red-500 ${
            isCollapsed ? "justify-center" : "gap-2"
          } p-2 rounded-lg hover:bg-red-100 transition`}
        >
          <FiLogOut
            className={`transition-all duration-300 ${
              isCollapsed ? "text-2xl" : "text-lg"
            }`}
          />
          {!isCollapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
