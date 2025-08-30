import React, { useState } from "react";
import {
  Drawer,
  Box,
  IconButton,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import StatsCards from "../components/StatsCards";
import { motion } from "framer-motion";
import EcommerceGuages from "../components/EcommerceGauges";
import { useSelector } from "react-redux";
import SalesRangeFilter from "../components/SalesRangeFilter";
import LineChart from "../components/LineChart";
import RecentOrders from "../components/RecentOrders";

const Dashboard = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const user = useSelector((state) => state.auth.user);
  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const drawerContent = (
    <div className="w-full h-full p-1 flex flex-col gap-2 overflow-y-scroll scrollbar-hide">
      <SalesRangeFilter />

      {/* Recent Orders */}

      <RecentOrders />
    </div>
  );

  return (
    <div className="w-full h-full flex flex-col overflow-hidden">
      {/* Main Content Area */}
      <Box
        sx={{
          display: "flex",
          flexGrow: 1,
          width: "100%",
          overflow: "hidden",
        }}
      >
        {/* Main Content - 75% width on desktop, full width on mobile */}
        <Box
          className="scrollbar-hide"
          sx={{
            width: { xs: "100%", md: "75%" },
            p: 1,
            bgcolor: "background.paper",
            // boxShadow: theme.shadows[1],
            mr: { md: 3 },
            overflowY: "auto",
          }}
        >
          <Box sx={{ mb: 4 }}>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-primary font-normal text-xl md:text-4xl my-1">
                Welcome, {user.displayName || "Admin"} ! 👋
              </h3>

              <p className="text-[0.65rem] md:text-sm">
                Here's what's happening with your store today
              </p>
            </motion.div>
          </Box>

          <Box sx={{ mb: 4 }}>
            <StatsCards />
          </Box>

          {/* Line Chart */}

          <LineChart />
        </Box>

        {/* Sidebar - 25% width on desktop, hidden on mobile */}
        {!isMobile && (
          <Box
            sx={{
              width: "25%",
              p: 2,
              bgcolor: "background.paper",
              boxShadow: theme.shadows[1],
              display: { xs: "none", md: "block" },
            }}
          >
            {drawerContent}
          </Box>
        )}
      </Box>

      {/* Mobile Menu Button */}
      {isMobile && (
        <motion.div>
          <IconButton
            onClick={toggleDrawer(true)}
            sx={{
              position: "fixed",
              bottom: 24,
              right: 24,
              bgcolor: "#ff7a00",
              color: "white",
              width: 40,
              height: 40,
              boxShadow: theme.shadows[4],
              "&:hover": {
                bgcolor: "#e65e00",
              },
            }}
          >
            <MenuIcon className="w-8" />
          </IconButton>
        </motion.div>
      )}

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: {
            width: { xs: "85%", sm: 350 },
            bgcolor: "background.paper",
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </div>
  );
};

export default Dashboard;
