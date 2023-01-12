import { Outlet, useLocation, Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthProvider";

export default function ProtectedRoutes({ allowedRoles }: { allowedRoles: Array<number> }) {
  const { auth } = useAuthContext();
  const location = useLocation();

  return auth?.roles?.find((role) => allowedRoles?.includes(role)) ? (
    <Outlet />
  ) : auth?.email ? (
    <Navigate to={"/unauthorized"} state={{ from: location }} replace />
  ) : (
    <Navigate to={"/login"} state={{ from: location }} replace />
  );
}
