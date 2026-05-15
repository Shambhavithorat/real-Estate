import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './shared/hooks/useAuth';

// Protected Routes
import AdminProtectedRoute from './routes/AdminProtectedRoute';
import BrokerProtectedRoute from './routes/BrokerProtectedRoute';
import UserProtectedRoute from './routes/UserProtectedRoute';

// User Imports
import Home from './user/pages/Home';
import Buy from './user/pages/Buy';
import Rent from './user/pages/Rent';
import PropertyDetailsPage from './user/pages/PropertyDetailsPage';
import Login from './user/pages/Login';
import Signup from './user/pages/Signup';
import UserLayout from './user/layouts/UserLayout';
import ScrollToTop from './user/components/common/ScrollToTop';

// Admin Imports
import AdminLayout from './admin/layouts/AdminLayout';
import AdminDashboard from './admin/pages/dashboard/Dashboard';
import AdminLogin from './admin/pages/auth/Login';
import AllProperties from './admin/pages/properties/AllProperties';
import AllUsers from './admin/pages/users/AllUsers';
import AllBrokers from './admin/pages/brokers/AllBrokers';
import Inquiries from './admin/pages/inquiries/Inquiries';
import VisitRequests from './admin/pages/bookings/VisitRequests';
import Settings from './admin/pages/settings/Settings';
import AdminRequests from './admin/pages/requests/Requests';

// Broker Imports
import BrokerLayout from './broker/layouts/BrokerLayout';
import BrokerDashboard from './broker/pages/dashboard/Dashboard';
import BrokerLogin from './broker/pages/auth/Login';
import BrokerProperties from './broker/pages/properties/MyProperties';
import AddProperty from './broker/pages/properties/AddProperty';
import BrokerInquiries from './broker/pages/inquiries/Inquiries';
import BrokerVisits from './broker/pages/visits/VisitRequests';
import BrokerAnalytics from './broker/pages/analytics/Analytics';
import BrokerReviews from './broker/pages/reviews/Reviews';
import ProfileSettings from './broker/pages/profile/ProfileSettings';

function App() {
  return (
    <Router>
      <AuthProvider>
        <ScrollToTop />
        <Routes>
          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Admin Login Route */}
          <Route path="/admin" element={<AdminLogin />} />

          {/* Admin Panel Routes (Protected) */}
          <Route path="/admin/dashboard" element={
            <AdminProtectedRoute>
              <AdminLayout />
            </AdminProtectedRoute>
          }>
            <Route index element={<AdminDashboard />} />
            <Route path="properties" element={<AllProperties />} />
            <Route path="users" element={<AllUsers />} />
            <Route path="brokers" element={<AllBrokers />} />
            <Route path="requests" element={<AdminRequests />} />
            <Route path="inquiries" element={<Inquiries />} />
            <Route path="visits" element={<VisitRequests />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          {/* Broker Login Route */}
          <Route path="/broker" element={<BrokerLogin />} />

          {/* Broker Panel Routes (Protected) */}
          <Route path="/broker/dashboard" element={
            <BrokerProtectedRoute>
              <BrokerLayout />
            </BrokerProtectedRoute>
          }>
            <Route index element={<BrokerDashboard />} />
            <Route path="properties" element={<BrokerProperties />} />
            <Route path="add-property" element={<AddProperty />} />
            <Route path="inquiries" element={<BrokerInquiries />} />
            <Route path="visits" element={<BrokerVisits />} />
            <Route path="analytics" element={<BrokerAnalytics />} />
            <Route path="reviews" element={<BrokerReviews />} />
            <Route path="profile" element={<ProfileSettings />} />
          </Route>

          {/* User Panel Routes (Public by default) */}
          <Route path="/" element={<UserLayout />}>
            <Route index element={<Home />} />
            <Route path="buy" element={<Buy />} />
            <Route path="rent" element={<Rent />} />
            <Route path="properties/:id" element={<PropertyDetailsPage />} />
          </Route>

          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
