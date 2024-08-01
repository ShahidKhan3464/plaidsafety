import { getAccessToken } from "utils";
import { Navigate, Outlet } from "react-router-dom";

const AccessControl = ({ routePath, routePermission, isAuthenticatedRoute }) => {
  if (!isAuthenticatedRoute || (isAuthenticatedRoute && getAccessToken())) {
    // * Check domain prefix
    if (["/login"].includes(routePath) && getAccessToken()) {
      return <Navigate to="/dashboard" replace />;
    }
    return <Outlet />;
    // Check permission
    // console.log(routePermission, User.getRole());
    // const hasPermission = isPermissionPresent(routePermission, User.getRole());
    // console.log({ hasPermission });
    // if (hasPermission) {
    //   return <Outlet />;
    // } else {
    //   console.log("false", { hasPermission });
    //   return <Navigate to="/unauthorized" replace />;
    // }
  } else {
    return <Navigate to="/login" replace />;
  }
}

export default AccessControl