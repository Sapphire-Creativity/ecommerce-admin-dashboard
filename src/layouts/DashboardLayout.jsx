import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { Outlet } from "react-router-dom";
import { useState } from "react";

export default function DashboardLayout() {
  const [isActive, setIsActive] = useState(true); // true = expanded, false = collapsed

  const toggleSideBar = () => {
    setIsActive(!isActive);
  };

  return (
    <div className="h-screen bg-color relative flex">
      {/* Sidebar */}
      <div
        className={`h-full bg-white shadow transition-all duration-300 ${
          isActive ? "w-64" : "w-20"
        }`}
      >
        <Sidebar isCollapsed={!isActive} />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <div className="h-16 bg-white shadow z-10">
          <Topbar isActive={isActive} toggleSideBar={toggleSideBar} />
        </div>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto bg-color p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
