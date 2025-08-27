import React, { useEffect, useMemo, useRef, useState } from "react";
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
  CircularProgress,
} from "@mui/material";
import { MdEmail, MdDateRange, MdPhone, MdLocationOn } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { fetchCustomers } from "../redux/slice/customerSlice";

// Table columns (keys aligned to data fields actually rendered)
const columns = [
  { id: "id", label: "ID", minWidth: 80 },
  { id: "name", label: "Name", minWidth: 180 },
  { id: "signupDate", label: "Signup Date", minWidth: 120 },
  { id: "totalOrders", label: "Orders", minWidth: 80 },
  { id: "totalSpent", label: "Spent", minWidth: 100 },
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
      label={status ?? "Unknown"}
      size="small"
      sx={{ backgroundColor: bg, color: text, fontWeight: 400 }}
    />
  );
};

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 2,
});

// Helpers for safety/consistency
const toNumber = (v) => (typeof v === "number" ? v : Number(v)) || 0;
const formatDate = (d) => {
  if (!d) return "—";
  const dt = new Date(d);
  return Number.isNaN(dt.getTime())
    ? "—"
    : dt.toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
};

export default function Customers() {
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Grab customers from Redux; fall back to [] to avoid crashes while loading
  const {
    customersData: customers = [],
    loading,
    fetchError,
  } = useSelector((state) => state.customers || {});

  // Guard against React 18 StrictMode double-invoke (dev)
  const fetchedRef = useRef(false);
  useEffect(() => {
    if (fetchedRef.current) return;
    fetchedRef.current = true;
    dispatch(fetchCustomers());
  }, [dispatch]);

  // Filter customers based on search term
  const filteredCustomers = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return Array.isArray(customers) ? customers : [];
    const list = Array.isArray(customers) ? customers : [];

    return list.filter((c) => {
      const name = c.name?.toLowerCase() || "";
      const email = c.email?.toLowerCase() || "";
      const phone = c.phone?.toLowerCase() || "";
      const address = c.address?.toLowerCase() || "";
      const city = c.city?.toLowerCase() || "";
      const country = c.country?.toLowerCase() || "";
      return (
        name.includes(q) ||
        email.includes(q) ||
        phone.includes(q) ||
        address.includes(q) ||
        city.includes(q) ||
        country.includes(q)
      );
    });
  }, [customers, searchTerm]);

  // Keep page within bounds when search results shrink
  useEffect(() => {
    const maxPage = Math.max(
      0,
      Math.ceil(filteredCustomers.length / rowsPerPage) - 1
    );
    if (page > maxPage) setPage(0);
  }, [filteredCustomers.length, rowsPerPage, page]);

  const handleRowClick = (customer) => {
    setSelectedCustomer(customer);
    setDrawerOpen(true);
  };

  const handleKeyDownRow = (e, customer) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleRowClick(customer);
    }
  };

  const handleChangePage = (_event, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    const value = parseInt(event.target.value, 10);
    setRowsPerPage(value);
    setPage(0);
  };

  const pagedRows = useMemo(() => {
    const start = page * rowsPerPage;
    return filteredCustomers.slice(start, start + rowsPerPage);
  }, [filteredCustomers, page, rowsPerPage]);

  return (
    <>
      {/* Search Input */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between my-8 gap-3">
        <h3 className="text-primary font-normal text-2xl md:text-4xl my-8">
          Customers
        </h3>
        <input
          type="text"
          aria-label="Search customers by name, email, phone or location"
          placeholder="Search by name, email, phone, or location..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary w-full sm:w-72"
        />
      </div>

      {loading ? (
        <div
          className="flex justify-center items-center min-h-[200px]"
          aria-busy="true"
          aria-live="polite"
        >
          <CircularProgress sx={{ color: "#FF7A00" }} size={20} />
        </div>
      ) : fetchError ? (
        <div className="bg-red-50 border-l-4 border-red-500 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-red-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">
                Error loading customers: {String(fetchError)}
              </p>
            </div>
          </div>
        </div>
      ) : (
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
                {pagedRows.map((customer) => (
                  <TableRow
                    hover
                    key={customer.id}
                    onClick={() => handleRowClick(customer)}
                    onKeyDown={(e) => handleKeyDownRow(e, customer)}
                    sx={{ cursor: "pointer" }}
                    tabIndex={0}
                  >
                    <TableCell>{customer.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <img
                          src={customer.profilePic || "/placeholder-avatar.png"}
                          alt={customer.name || "Customer"}
                          className="w-8 h-8 rounded-full object-cover"
                          loading="lazy"
                        />
                        {customer.name}
                      </div>
                    </TableCell>
                    <TableCell>{formatDate(customer.signupDate)}</TableCell>
                    <TableCell>{customer.totalOrders ?? 0}</TableCell>
                    <TableCell>
                      {currency.format(toNumber(customer.totalSpent))}
                    </TableCell>
                    <TableCell>{renderStatusChip(customer.status)}</TableCell>
                  </TableRow>
                ))}

                {filteredCustomers.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      <span className="text-gray-500">
                        No matching customers found
                      </span>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            rowsPerPageOptions={[10, 25, 50]}
            component="div"
            count={filteredCustomers.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      )}

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
                src={selectedCustomer.profilePic || "/placeholder-avatar.png"}
                alt={selectedCustomer.name || "Customer"}
                className="w-16 h-16 rounded-full object-cover border border-gray-200"
                loading="lazy"
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
                {selectedCustomer.email || "—"}
              </p>
              <p className="flex items-center gap-2">
                <MdPhone className="text-gray-500 text-lg" />
                {selectedCustomer.phone || "—"}
              </p>
              <p className="flex items-center gap-2">
                <MdDateRange className="text-gray-500 text-lg" />
                Joined: {formatDate(selectedCustomer.signupDate)}
              </p>
              <p className="flex items-start gap-2">
                <MdLocationOn className="text-gray-500 text-lg" />
                {[
                  selectedCustomer.address,
                  selectedCustomer.city,
                  selectedCustomer.country,
                ]
                  .filter(Boolean)
                  .join(", ") || "—"}
              </p>
            </div>

            <Divider sx={{ my: 2 }} />

            {/* Orders & Spending */}
            <div className="space-y-2 text-sm text-gray-800">
              <div className="flex justify-between">
                <span>Total Orders:</span>
                <span>{selectedCustomer.totalOrders ?? 0}</span>
              </div>
              <div className="flex justify-between">
                <span>Last Order Date:</span>
                <span>{formatDate(selectedCustomer.lastOrderDate)}</span>
              </div>
              <div className="flex justify-between">
                <span>Total Spent:</span>
                <span>
                  {currency.format(toNumber(selectedCustomer.totalSpent))}
                </span>
              </div>
            </div>

            <Divider sx={{ my: 2 }} />

            {/* Recent Orders */}
            <div>
              <h4 className="text-sm font-medium text-gray-800 mb-2">
                Recent Order Items
              </h4>
              <ul className="space-y-1">
                {(selectedCustomer.recentOrders || []).map((item, idx) => (
                  <li
                    key={idx}
                    className="flex justify-between text-xs text-gray-700 border-b border-gray-200 pb-1"
                  >
                    <span>
                      {item.name} × {item.quantity}
                    </span>
                    <span>{currency.format(toNumber(item.price))}</span>
                  </li>
                ))}
                {(!selectedCustomer.recentOrders ||
                  selectedCustomer.recentOrders.length === 0) && (
                  <li className="text-xs text-gray-500">No recent orders</li>
                )}
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
