import React, { useEffect } from "react";
import { useProfileQuery } from "../redux/api/userApiSlice";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";

const AdminRoute = () => {
  const { _id } = useSelector((state) => state.auth);

  return _id && _id.role === "admin" ? (
    <Outlet />
  ) : (
    <Navigate to={`/login`} replace />
  );
};

export default AdminRoute;
