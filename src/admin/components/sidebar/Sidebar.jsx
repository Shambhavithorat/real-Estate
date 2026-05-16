import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../shared/hooks/useAuth';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/admin');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z', exact: true },
    { name: 'Properties', path: '/admin/dashboard/properties', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { name: 'Users', path: '/admin/dashboard/users', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' },
    { name: 'Brokers', path: '/admin/dashboard/brokers', icon: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
    { name: 'Broker Requests', path: '/admin/dashboard/requests', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4' },
    { name: 'Inquiries', path: '/admin/dashboard/inquiries', icon: 'M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z' },
    { name: 'Visits', path: '/admin/dashboard/visits', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
    { name: 'Settings', path: '/admin/dashboard/settings', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z' }
  ];

  return (
    <>
      <div className={`fixed inset-0 bg-[#002D52]/80 backdrop-blur-sm z-40 lg:hidden transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setIsOpen(false)} />
      <aside className={`z-50 bg-[#002D52] border-r border-white/10 flex flex-col transition-all duration-300 shrink-0 shadow-[4px_0_24px_rgba(0,45,82,0.15)] ${isOpen ? 'fixed lg:static inset-y-0 left-0 w-72' : 'w-24'}`}>
        <div className={`p-6 h-24 flex items-center border-b border-white/10 ${isOpen ? 'justify-between' : 'justify-center'}`}>
          {isOpen && (
            <Link to="/admin/dashboard" className="flex items-center gap-4 group">
              <div className="w-10 h-10 border-2 border-white shrink-0 rounded-xl flex items-center justify-center text-white transition-all group-hover:bg-[#C5A059] group-hover:border-[#C5A059]">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <span className="text-lg font-black tracking-[0.2em] text-white">ADMIN</span>
            </Link>
          )}
          <button onClick={() => setIsOpen(!isOpen)} className="w-10 h-10 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-all">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        <div className={`flex-1 overflow-y-auto py-8 space-y-3 no-scrollbar ${isOpen ? 'px-6' : 'px-4'}`}>
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.exact}
              onClick={() => window.innerWidth < 1024 && setIsOpen(false)}
              className={({ isActive }) => `
                flex items-center ${isOpen ? 'gap-4 px-4' : 'justify-center px-0'} py-3.5 rounded-2xl text-[10px] font-bold tracking-[0.2em] uppercase transition-all duration-300
                ${isActive
                  ? 'bg-[#C5A059] text-white shadow-[0_10px_20px_rgba(197,160,89,0.3)]'
                  : 'text-white/70 hover:bg-white/10 hover:text-white'}
              `}
              title={!isOpen ? item.name : undefined}
            >
              {({ isActive }) => (
                <>
                  <div className={`p-2 rounded-xl transition-colors shrink-0 ${isActive ? 'bg-white/20' : 'bg-transparent'}`}>
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                    </svg>
                  </div>
                  {isOpen && <span className="whitespace-nowrap">{item.name}</span>}
                </>
              )}
            </NavLink>
          ))}
        </div>

        <div className="p-6 border-t border-white/10">
          <button
            onClick={handleLogout}
            className={`flex items-center ${isOpen ? 'gap-4 px-4' : 'justify-center px-0'} w-full py-4 rounded-xl text-[10px] font-bold tracking-[0.2em] uppercase text-red-400 hover:bg-red-500/20 transition-colors`}
            title={!isOpen ? "Logout" : undefined}
          >
            <div className="p-2 shrink-0">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </div>
            {isOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>
    </>
  );
};
export default Sidebar;
