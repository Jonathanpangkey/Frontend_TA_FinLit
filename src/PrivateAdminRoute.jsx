import React from "react";
import {Navigate} from "react-router-dom";

const PrivateAdminRoute = ({element}) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  return token && role === "ADMIN" ? element : <Navigate to='/' />;
};

export default PrivateAdminRoute;
