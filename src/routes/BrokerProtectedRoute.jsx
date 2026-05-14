import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../shared/hooks/useAuth';

const BrokerProtectedRoute = ({ children }) => {
  const { currentUser, userData, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F7F7F5]">
        <div className="w-12 h-12 border-4 border-[#6B705C] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (userData?.role !== 'broker') {
    if (userData?.role === 'admin') return <Navigate to="/admin" replace />;
    return <Navigate to="/user" replace />;
  }

  return children;
};

export default BrokerProtectedRoute;
