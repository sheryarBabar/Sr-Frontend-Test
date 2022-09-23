import axios from "axios";
import { useLocation, Navigate } from "react-router-dom";
import { memoryStrings, routes, sls } from "../../utils";

interface IProtectedRoute {
  children: JSX.Element;
}

const ProtectedRoute = ({ children }: IProtectedRoute) => {
  const location = useLocation();
  let token = sls.decode(memoryStrings.authorizationToken);
  if (!token) {
    return <Navigate to={routes.splashScreen} state={{ from: location }} />;
  }
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  return children;
};

export default ProtectedRoute;
