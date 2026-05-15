import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const ProtectedRoute = ({ children, allowedRoles }) => {
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
    // Redirect to appropriate login page based on the current path
    if (location.pathname.startsWith('/admin')) {
      return <Navigate to="/admin" state={{ from: location }} replace />;
    }
    if (location.pathname.startsWith('/broker')) {
      return <Navigate to="/broker" state={{ from: location }} replace />;
    }
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && (!userData || !allowedRoles.includes(userData.role))) {
    // Role not authorized, redirect to home or dashboard based on role
    if (userData?.role === 'admin') return <Navigate to="/admin/dashboard" replace />;
    if (userData?.role === 'broker') return <Navigate to="/broker/dashboard" replace />;
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
