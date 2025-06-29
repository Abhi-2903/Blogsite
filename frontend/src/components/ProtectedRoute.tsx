import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

interface ProtectedRouteProps {
  children: ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const token = localStorage.getItem("token");
  const location = useLocation();

  if (!token) {
    alert("Please sign in or register first");
    return <Navigate to="/signin" replace state={{ from: location }} />;
  }

  return children;
};
