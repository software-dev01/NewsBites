import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute({ adminOnly }) {


  const user = JSON.parse(localStorage.getItem("user"));
  const token = user?.token;
  const role = user?.role;

  console.log('user:>', user)

  // Not logged in
  if (!token) {
    return <Navigate to="/" />;
  }

  // ADMIN ROUTE PROTECTION

  if (adminOnly && role !== "admin") {

    return <Navigate to="/feed" />;

  }

  return <Outlet />;
}

export default ProtectedRoute;