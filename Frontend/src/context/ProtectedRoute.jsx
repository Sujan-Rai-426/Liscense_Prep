import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
  // Get the logged-in status directly from localStorage
    const isLoggedIn = window.localStorage.getItem("loggedIn");

  // Check if the user is logged in, otherwise redirect to the admin login page
    return isLoggedIn === "true" ? <Outlet /> : <Navigate to="/admin_login" />;
}

export default ProtectedRoute;
