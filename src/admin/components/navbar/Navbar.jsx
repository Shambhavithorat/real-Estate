import React from 'react';

const Navbar = ({ toggleSidebar }) => {
  return (
    <header className="bg-white border-b border-[#002D52]/10 h-24 flex items-center justify-between px-8 z-30 shrink-0">
      <div className="flex items-center gap-6">
        <div className="hidden md:flex items-center bg-[#F9F9F9] px-6 py-3.5 rounded-2xl border border-[#002D52]/10 focus-within:border-[#C5A059] transition-all">
          <svg className="w-5 h-5 text-[#333333]/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input type="text" placeholder="Search dashboard..." className="bg-transparent border-none focus:outline-none text-sm ml-3 w-72 text-[#333333] placeholder-[#333333]/50" />
        </div>
      </div>
      
      <div className="flex items-center gap-6 md:gap-8">
         <button className="w-12 h-12 rounded-full border border-[#002D52]/10 flex items-center justify-center text-[#333333] hover:bg-[#C5A059] hover:text-white hover:border-[#C5A059] transition-all relative shadow-sm">
            <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-red-500 rounded-full shadow-sm"></span>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
         </button>
         <div className="flex items-center gap-4 border-l border-[#002D52]/10 pl-6 md:pl-8 cursor-pointer group">
            <div className="w-12 h-12 rounded-full border border-[#C5A059] bg-[#F9F9F9] text-[#002D52] flex items-center justify-center font-bold text-sm group-hover:bg-[#C5A059] group-hover:text-white transition-colors">SA</div>
            <div className="hidden md:block">
               <p className="text-sm font-bold text-[#002D52]">Super Admin</p>
               <p className="text-[9px] text-[#C5A059] uppercase tracking-[0.2em] font-bold mt-1">Owner</p>
            </div>
         </div>
      </div>
    </header>
  );
};
export default Navbar;
