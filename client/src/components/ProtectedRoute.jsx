import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  const isLoggedIn = window.localStorage.getItem("authToken");
  console.log(isLoggedIn);
  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
}
