import Loading from "../Components/Loading";
import useAuth from "../hooks/useAuth";
import { Navigate } from "react-router";

const VolunteerRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <Loading></Loading>
  }

  if (user?.role === "admin" || user?.role === "volunteer") {
    return children;
  }

  return <Navigate to="/dashboard" replace />;
};

export default VolunteerRoute;
