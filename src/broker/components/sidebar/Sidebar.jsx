import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../shared/hooks/useAuth';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/broker');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };
  const navItems = [
    { name: 'Dashboard', path: '/broker/dashboard', icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z', exact: true },
    { name: 'My Properties', path: '/broker/dashboard/properties', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' },
    { name: 'Add Property', path: '/broker/dashboard/add-property', icon: 'M12 4v16m8-8H4' },
    { name: 'Inquiries', path: '/broker/dashboard/inquiries', icon: 'M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z' },
    { name: 'Visit Requests', path: '/broker/dashboard/visits', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
    { name: 'Profile Settings', path: '/broker/dashboard/profile', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' }
  ];

  return (
    <>
      <div className={`fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setIsOpen(false)} />
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-[#E5E5E5] flex flex-col transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="p-6 border-b border-[#E5E5E5] flex items-center justify-between">
          <Link to="/broker/dashboard" className="flex items-center gap-3">
             <div className="w-8 h-8 bg-[#6B705C] rounded-xl flex items-center justify-center text-white">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
             </div>
             <span className="text-lg font-bold tracking-[0.2em] text-[#111111]">BROKER</span>
          </Link>
          <button onClick={() => setIsOpen(false)} className="lg:hidden text-[#666666]">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-2 no-scrollbar">
          {navItems.map((item) => (
            <NavLink 
              key={item.name} 
              to={item.path}
              end={item.exact}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) => `
                flex items-center gap-3 px-5 py-4 rounded-2xl text-[10px] font-bold tracking-[0.2em] uppercase transition-all duration-300
                ${isActive 
                  ? 'bg-[#111111] text-white shadow-[0_20px_40px_rgba(0,0,0,0.1)] scale-[1.02]' 
                  : 'text-[#666666] hover:bg-[#F7F7F5] hover:text-[#111111] hover:translate-x-1'}
              `}
            >
              {({ isActive }) => (
                <>
                  <div className={`p-2 rounded-lg transition-colors ${isActive ? 'bg-white/10' : 'bg-transparent'}`}>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                    </svg>
                  </div>
                  {item.name}
                </>
              )}
            </NavLink>
          ))}
        </div>
        

      </aside>
    </>
  );
};
export default Sidebar;
