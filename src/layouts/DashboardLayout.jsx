import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";

export default function DashboardLayout() {
  const [isActive, setIsActive] = useState(true);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768); // md breakpoint
    };

    handleResize(); // check on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSideBar = () => {
    if (!isSmallScreen) {
      setIsActive(!isActive);
    }
  };

  return (
    <div className="flex h-[100vh] max-h-[100vh] bg-color overflow-hidden">
      {/* Sidebar */}
      <div
        className={`h-full bg-white shadow transition-all duration-300 ${
          isSmallScreen ? "w-20" : isActive ? "w-40" : "w-20"
        } flex-shrink-0`}
      >
        <Sidebar isCollapsed={isSmallScreen || !isActive} />
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
