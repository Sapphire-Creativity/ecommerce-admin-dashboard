import { FiSearch, FiBell } from "react-icons/fi";
import { HiMiniSquares2X2 } from "react-icons/hi2";
import { IoMenu } from "react-icons/io5";

import Box from "@mui/material/Box";
import Badge from "@mui/material/Badge";
import MailIcon from "@mui/icons-material/Mail";
import CurrentDateTime from "../components/DateTime";

const Topbar = ({ toggleSideBar, isActive }) => {
  return (
    <header className="flex items-center justify-between bg-white shadow px-6 py-2">
      {/*  */}
      <div className="flex items-center ">
        <IoMenu
          className="text-2xl mr-5"
          onClick={toggleSideBar}
          isActive={isActive}
        />

        <CurrentDateTime />
      </div>

      {/* Search */}
      <div className="flex items-center bg-white rounded-full px-3 py-2 w-72">
        <FiSearch className="text-gray-500 pr-2 text-2xl" />
        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent border-none rounded-full outline-none p-2 text-sm w-full"
        />
      </div>

      {/* Icons */}
      <div className="flex items-center gap-4">
        <Box sx={{ color: "action.active" }}>
          <Badge
            color="secondary"
            variant="dot"
            sx={{
              "& .MuiBadge-dot": {
                backgroundColor: "#ff5722",
              },
            }}
          >
            <FiBell className="text-gray-500 text-2xl cursor-pointer" />
          </Badge>
        </Box>
        <img
          src="https://i.pravatar.cc/40"
          alt="User Avatar"
          className="w-10 h-10 rounded-full border-2 border-primary"
        />
      </div>
    </header>
  );
};
export default Topbar;
