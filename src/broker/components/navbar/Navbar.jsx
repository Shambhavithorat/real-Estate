import React, { useState } from 'react';
import { useAuth } from '../../../shared/hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ toggleSidebar }) => {
  const { userData, logout } = useAuth();
  const navigate = useNavigate();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/broker/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const displayName = userData?.displayName || 'Broker User';
  const initials = displayName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();

  return (
    <header className="bg-white border-b border-[#E5E5E5] h-[72px] flex items-center justify-between px-6 z-30 shrink-0">
      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center bg-[#F7F7F5] px-4 py-2.5 rounded-xl border border-[#E5E5E5] focus-within:border-[#6B705C] transition-colors">
          <svg className="w-4 h-4 text-[#666666]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input type="text" placeholder="Search my listings..." className="bg-transparent border-none focus:ring-0 text-sm ml-2 w-64 text-[#111111] placeholder-[#666666]" />
        </div>
      </div>
      
      <div className="flex items-center gap-4 md:gap-6">
         <button className="w-10 h-10 rounded-full border border-[#E5E5E5] flex items-center justify-center text-[#111111] hover:bg-[#F7F7F5] transition-colors relative">
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
         </button>
         
         <div className="relative">
           <div 
             className="flex items-center gap-3 border-l border-[#E5E5E5] pl-4 md:pl-6 cursor-pointer"
             onClick={() => setIsProfileOpen(!isProfileOpen)}
           >
              <div className="w-10 h-10 rounded-full bg-[#111111] text-white flex items-center justify-center font-bold text-sm">
                {initials}
              </div>
              <div className="hidden md:block">
                 <p className="text-sm font-bold text-[#111111]">{displayName}</p>
                 <p className="text-[9px] text-[#6B705C] uppercase tracking-widest font-bold">Premium Broker</p>
              </div>
           </div>

           {isProfileOpen && (
             <div className="absolute right-0 mt-4 w-48 bg-white border border-[#E5E5E5] shadow-xl rounded-2xl py-2 z-50 animate-[fadeIn_0.2s_ease-out]">
               <button 
                 onClick={handleLogout}
                 className="w-full text-left px-5 py-3 text-xs font-bold tracking-wider uppercase text-red-500 hover:bg-red-50 transition-colors flex items-center gap-3"
               >
                 <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                 </svg>
                 Logout
               </button>
             </div>
           )}
         </div>
      </div>
    </header>
  );
};

export default Navbar;
