import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;

// ✅ What ProtectedRoute Does
// It acts like a security guard 🚪
// When user tries to access a route:
// If authenticated → allow access
// If not → redirect to login
// All logic stays in ONE place.
// Clean. Scalable. Professional.

// ProtectedRoute receives children
{/* <ProtectedRoute> */}
   {/* <Dashboard /> */}
{/* </ProtectedRoute> */}
// Dashboard becomes children