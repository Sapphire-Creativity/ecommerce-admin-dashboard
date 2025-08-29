import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  const user = useSelector((state) => state.auth.user);

  if (!user) {
    // not logged in → redirect to auth page
    return <Navigate to="/auth-page" replace />;
  }

  // logged in → render children (or nested routes)
  return <Outlet />;
}
