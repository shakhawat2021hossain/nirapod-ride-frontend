import { type ReactElement } from "react";
import { Navigate, useLocation } from "react-router-dom";
import UnAuthorized from "@/pages/UnAuthorized";
import { useUserInfoQuery } from "@/redux/features/user/user.api";

interface RouteProps {
  children: ReactElement;
  allowedRoles?: string[]; 
}

const RoleBasedAccess = ({ children, allowedRoles }: RouteProps) => {
  const { data: userData, isLoading } = useUserInfoQuery(undefined);
  // console.log("role:", userData)
  const location = useLocation();

  if (isLoading) return <div>Loading...</div>;

  if (!userData)
    return <Navigate to="/login" state={{ from: location }} replace />;

  // Role-based check
  if (allowedRoles && !allowedRoles.includes(userData?.role)) {
    return <UnAuthorized />;
  }

  return children;
};

export default RoleBasedAccess;
