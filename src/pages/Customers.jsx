import * as React from "react";
import { useState } from "react";
import {
  Drawer,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Chip,
  Divider,
} from "@mui/material";
import { customersData } from "../data/customersdata";
import { CgProfile } from "react-icons/cg";
import { MdEmail, MdDateRange, MdPhone, MdLocationOn } from "react-icons/md";

// Table columns
const columns = [
  { id: "id", label: "ID", minWidth: 80 },
  { id: "name", label: "Name", minWidth: 180 },
  { id: "signupDate", label: "Signup Date", minWidth: 120 },
  { id: "orders", label: "Orders", minWidth: 80 },
  { id: "spent", label: "Spent", minWidth: 100 },
  { id: "status", label: "Status", minWidth: 100 },
];

// Status chip colors
const renderStatusChip = (status) => {
  const colors = {
    Active: { bg: "rgba(76, 175, 80, 0.15)", text: "#4caf50" },
    Inactive: { bg: "rgba(244, 67, 54, 0.15)", text: "#f44336" },
    Pending: { bg: "rgba(255, 193, 7, 0.15)", text: "#ffc107" },
  };

  const { bg, text } = colors[status] || {
    bg: "rgba(158, 158, 158, 0.15)",
    text: "#9e9e9e",
  };

  return (
    <Chip
      label={status}
      size="small"
      sx={{
        backgroundColor: bg,
        color: text,
        fontWeight: 400,
      }}
    />
  );
};

export default function Customers() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  //
  const [searchTerm, setSearchTerm] = useState("");

  // Filter customers based on search

  const filteredCustomers = customersData.filter((customer) => {
    const searchLower = searchTerm.toLowerCase();

    return (
      customer.name?.toLowerCase().includes(searchLower) ||
      false ||
      customer.email?.toLowerCase().includes(searchLower) ||
      false ||
      customer.phone?.toLowerCase().includes(searchLower) ||
      false
    );
  });

  const handleRowClick = (customer) => {
    setSelectedCustomer(customer);
    setDrawerOpen(true);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      {/* Search Input */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between my-8 gap-3">
        <h3 className="text-primary font-normal text-2xl sm:text-4xl mb-2 sm:mb-0">
          Customers
        </h3>
        <input
          type="text"
          placeholder="Search by name, email, location..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary w-full sm:w-72"
        />
      </div>

      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="customers table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    style={{ minWidth: column.minWidth, fontWeight: 600 }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {filteredCustomers
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((customer) => (
                  <TableRow
                    hover
                    key={customer.id}
                    onClick={() => handleRowClick(customer)}
                    sx={{ cursor: "pointer" }}
                  >
                    <TableCell>{customer.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <img
                          src={customer.profilePic}
                          alt={customer.name}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        {customer.name}
                      </div>
                    </TableCell>
                    <TableCell>
                      {new Date(customer.signupDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell>{customer.totalOrders}</TableCell>
                    <TableCell>${customer.totalSpent.toFixed(2)}</TableCell>
                    <TableCell>{renderStatusChip(customer.status)}</TableCell>
                  </TableRow>
                ))}

              {filteredCustomers.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-gray-500">
                    No matching customers found
                  </td>
                </tr>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[10, 25, 50]}
          component="div"
          count={customersData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      {/* Customer Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        sx={{
          "& .MuiDrawer-paper": {
            width: 380,
            padding: 2,
            background: "#fafafa",
          },
        }}
      >
        {selectedCustomer && (
          <Box>
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-primary text-lg font-light">
                Customer Details
              </h3>
              <span className="text-xs text-gray-500 font-medium">
                {selectedCustomer.id}
              </span>
            </div>

            <div className="flex items-center gap-4 mb-4">
              <img
                src={selectedCustomer.profilePic}
                alt={selectedCustomer.name}
                className="w-16 h-16 rounded-full object-cover border border-gray-200"
              />
              <div>
                <h3 className="text-base font-semibold text-gray-800">
                  {selectedCustomer.name}
                </h3>
                <div className="mt-1">
                  {renderStatusChip(selectedCustomer.status)}
                </div>
              </div>
            </div>

            <Divider sx={{ mb: 2 }} />

            {/* Contact Info */}
            <div className="space-y-3 text-sm text-gray-700">
              <p className="flex items-center gap-2">
                <MdEmail className="text-gray-500 text-lg" />
                {selectedCustomer.email}
              </p>
              <p className="flex items-center gap-2">
                <MdPhone className="text-gray-500 text-lg" />
                {selectedCustomer.phone}
              </p>
              <p className="flex items-center gap-2">
                <MdDateRange className="text-gray-500 text-lg" />
                Joined:{" "}
                {new Date(selectedCustomer.signupDate).toLocaleDateString()}
              </p>
              <p className="flex items-start gap-2">
                <MdLocationOn className="text-gray-500 text-lg" />
                {selectedCustomer.address}, {selectedCustomer.city},{" "}
                {selectedCustomer.country}
              </p>
            </div>

            <Divider sx={{ my: 2 }} />

            {/* Orders & Spending */}
            <div className="space-y-2 text-sm text-gray-800">
              <div className="flex justify-between">
                <span>Total Orders:</span>
                <span>{selectedCustomer.totalOrders}</span>
              </div>
              <div className="flex justify-between">
                <span>Last Order Date:</span>
                <span>
                  {new Date(
                    selectedCustomer.lastOrderDate
                  ).toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Total Spent:</span>
                <span>${selectedCustomer.totalSpent.toFixed(2)}</span>
              </div>
            </div>

            <Divider sx={{ my: 2 }} />

            {/* Recent Orders */}
            <div>
              <h4 className="text-sm font-medium text-gray-800 mb-2">
                Recent Order Items
              </h4>
              <ul className="space-y-1">
                {selectedCustomer.recentOrders &&
                  selectedCustomer.recentOrders.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex justify-between text-xs text-gray-700 border-b border-gray-200 pb-1"
                    >
                      <span>
                        {item.name} × {item.quantity}
                      </span>
                      <span>${item.price.toFixed(2)}</span>
                    </li>
                  ))}
              </ul>
            </div>

            <button
              onClick={() => setDrawerOpen(false)}
              className="btn-primary mt-6 text-sm"
            >
              Close
            </button>
          </Box>
        )}
      </Drawer>
    </>
  );
}
