import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './shared/hooks/useAuth';

// User Imports
import Home from './user/pages/Home';
import Buy from './user/pages/Buy';
import Rent from './user/pages/Rent';
import Sell from './user/pages/Sell';
import PropertyDetailsPage from './user/pages/PropertyDetailsPage';
import Login from './user/pages/Login';
import Signup from './user/pages/Signup';
import Agents from './user/pages/Agents';
import AgentProfile from './user/pages/AgentProfile';
import MainLayout from './user/layouts/MainLayout';
import ScrollToTop from './user/components/common/ScrollToTop';

// Admin Imports
import AdminLayout from './admin/layouts/AdminLayout';
import AdminDashboard from './admin/pages/dashboard/Dashboard';
import AllProperties from './admin/pages/properties/AllProperties';
import AllUsers from './admin/pages/users/AllUsers';
import AllBrokers from './admin/pages/brokers/AllBrokers';
import AllAgents from './admin/pages/agents/AllAgents';
import Inquiries from './admin/pages/inquiries/Inquiries';
import VisitRequests from './admin/pages/bookings/VisitRequests';
import Settings from './admin/pages/settings/Settings';

// Broker Imports
import BrokerLayout from './broker/layouts/BrokerLayout';
import BrokerDashboard from './broker/pages/dashboard/Dashboard';
import MyProperties from './broker/pages/properties/MyProperties';
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
          {/* Admin Panel Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="properties" element={<AllProperties />} />
            <Route path="users" element={<AllUsers />} />
            <Route path="brokers" element={<AllBrokers />} />
            <Route path="agents" element={<AllAgents />} />
            <Route path="inquiries" element={<Inquiries />} />
            <Route path="visits" element={<VisitRequests />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          {/* Broker Panel Routes */}
          <Route path="/broker" element={<BrokerLayout />}>
            <Route index element={<BrokerDashboard />} />
            <Route path="properties" element={<MyProperties />} />
            <Route path="add-property" element={<AddProperty />} />
            <Route path="inquiries" element={<BrokerInquiries />} />
            <Route path="visits" element={<BrokerVisits />} />
            <Route path="analytics" element={<BrokerAnalytics />} />
            <Route path="reviews" element={<BrokerReviews />} />
            <Route path="profile" element={<ProfileSettings />} />
          </Route>

          {/* User Panel Routes */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/buy" element={<Buy />} />
            <Route path="/rent" element={<Rent />} />
            <Route path="/sell" element={<Sell />} />
            <Route path="/agents" element={<Agents />} />
            <Route path="/agents/:id" element={<AgentProfile />} />
            <Route path="/properties/:id" element={<PropertyDetailsPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
