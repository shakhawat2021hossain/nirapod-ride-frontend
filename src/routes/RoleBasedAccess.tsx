import { type ReactElement } from "react";
import { Navigate, useLocation } from "react-router-dom";
import UnAuthorized from "@/pages/UnAuthorized";
import { useUserInfoQuery } from "@/redux/features/user/user.api";
import { RefreshCw } from "lucide-react";

interface RouteProps {
  children: ReactElement;
  allowedRoles?: string[]; 
}

const RoleBasedAccess = ({ children, allowedRoles }: RouteProps) => {
  const { data: userData, isLoading } = useUserInfoQuery(undefined);
  // console.log("role:", userData)
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <RefreshCw className="w-10 h-10 text-primary animate-spin mx-auto mb-4" />
      </div>
    );
  };

  if (!userData)
    return <Navigate to="/login" state={{ from: location }} replace />;

  // Role-based check
  if (allowedRoles && !allowedRoles.includes(userData?.role)) {
    return <UnAuthorized />;
  }

  return children;
};

export default RoleBasedAccess;
