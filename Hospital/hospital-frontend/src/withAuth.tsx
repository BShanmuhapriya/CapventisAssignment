import React from "react";
import { Navigate } from "react-router-dom";

const withAuth = (Component: React.ComponentType) => {
  return (props: any) => {
    const isAuthenticated = !!localStorage.getItem("token");
    return isAuthenticated ? <Component {...props} /> : <Navigate to="/login" replace />;
  };
};

export default withAuth;
