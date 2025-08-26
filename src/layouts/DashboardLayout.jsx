import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { Outlet } from "react-router-dom";
import { useState } from "react";

export default function DashboardLayout() {
  const [isActive, setIsActive] = useState(true);

  const toggleSideBar = () => {
    setIsActive(!isActive);
  };

  return (
    <div className="flex h-[100vh] max-h-[100vh] bg-color overflow-hidden">
      {/* Sidebar */}
      <div
        className={`h-full bg-white shadow transition-all duration-300 ${
          isActive ? "w-64" : "w-20"
        } flex-shrink-0`}
      >
        <Sidebar isCollapsed={!isActive} />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
        {/* Topbar */}
        <div className="h-16 bg-white shadow z-10 flex-shrink-0">
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
