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
const Dashboard = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const drawerContent = (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        p: 3,
        bgcolor: "background.paper",
        boxShadow: theme.shadows[1],
      }}
    >
      <Typography
        variant="h6"
        sx={{ mb: 3, display: "flex", alignItems: "center" }}
      >
        <CalendarTodayIcon fontSize="small" sx={{ mr: 1 }} />
        Calendar & Widgets
      </Typography>

      <Box
        sx={{
          bgcolor: "background.default",

          borderRadius: 2,
          mb: 3,
          boxShadow: theme.shadows[1],
        }}
      >
        <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
          📅 Calendar
        </Typography>
      </Box>

      <Box
        sx={{
          bgcolor: "background.default",
          p: 2,
          borderRadius: 2,
          boxShadow: theme.shadows[1],
        }}
      >
        <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
          📊 Analytics
        </Typography>
      </Box>
    </Box>
  );

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        bgcolor: "background.default",
      }}
    >
      {/* Main Content Area */}
      <Box
        sx={{
          display: "flex",
          flexGrow: 1,
          width: "100%",
        }}
      >
        {/* Main Content - 75% width on desktop, full width on mobile */}
        <Box
          sx={{
            width: { xs: "100%", md: "75%" },
            p: 1,
            bgcolor: "background.paper",
            // boxShadow: theme.shadows[1],
            mr: { md: 3 },
          }}
        >
          <Box sx={{ mb: 4 }}>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-primary font-normal text-2xl md:text-4xl my-1">
                Hello Admin! 👋
              </h3>

              <p className="text-[.7rem] md:text-sm">
                Here's what's happening with your store today
              </p>
            </motion.div>
          </Box>

          <Box sx={{ mb: 4 }}>
            <StatsCards />
          </Box>

          <Box
            sx={{
              bgcolor: "background.paper",
              p: 3,
              borderRadius: 2,
              boxShadow: theme.shadows[1],
            }}
          >
            <h4 className="">Recent Activity</h4>

            <Box
              sx={{
                height: 300,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: "background.default",
                borderRadius: 2,
              }}
            ></Box>
          </Box>
        </Box>

        {/* Sidebar - 25% width on desktop, hidden on mobile */}
        {!isMobile && (
          <Box
            sx={{
              width: "25%",
              p: 3,
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
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
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
            <MenuIcon className="w-20" />
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
    </Box>
  );
};

export default Dashboard;
