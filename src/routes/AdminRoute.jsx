import React from 'react';
import useAuth from '../hooks/useAuth';
import Loading from '../Components/Loading';

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading){
    return <Loading></Loading>
  }

  if (user?.role === "admin") {
    return children;
  }

  return <Navigate to="/dashboard" replace />;
};

export default AdminRoute;
