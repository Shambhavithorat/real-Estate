import React from 'react';

const Navbar = ({ toggleSidebar }) => {
  return (
    <header className="bg-white border-b border-[#E5E5E5] h-[72px] flex items-center justify-between px-6 z-30 shrink-0">
      <div className="flex items-center gap-4">
        <button onClick={toggleSidebar} className="lg:hidden text-[#111111]">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
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
         <div className="flex items-center gap-3 border-l border-[#E5E5E5] pl-4 md:pl-6 cursor-pointer">
            <div className="w-10 h-10 rounded-full bg-[#111111] text-white flex items-center justify-center font-bold text-sm">JD</div>
            <div className="hidden md:block">
               <p className="text-sm font-bold text-[#111111]">Julianne Davis</p>
               <p className="text-[9px] text-[#6B705C] uppercase tracking-widest font-bold">Premium Broker</p>
            </div>
         </div>
      </div>
    </header>
  );
};
export default Navbar;
