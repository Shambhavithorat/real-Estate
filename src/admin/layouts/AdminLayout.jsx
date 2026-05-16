import React, { useState } from 'react';
import Sidebar from '../components/sidebar/Sidebar';
import Navbar from '../components/navbar/Navbar';
import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 1024);
  
  return (
    <div className="flex h-screen bg-[#F9F9F9] overflow-hidden font-sans text-[#333333]">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-[#F9F9F9] p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto animate-[fadeIn_0.3s_ease-out]">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};
export default AdminLayout;
