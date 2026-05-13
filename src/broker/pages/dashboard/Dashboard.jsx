import React from 'react';

const StatCard = ({ title, value, icon, trend }) => (
  <div className="bg-white p-6 rounded-2xl border border-[#E5E5E5] shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
    <div className="absolute -top-4 -right-4 p-4 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-110">
      <svg className="w-32 h-32 text-[#6B705C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d={icon} />
      </svg>
    </div>
    <div className="relative z-10">
      <p className="text-[10px] font-bold uppercase tracking-widest text-[#666666] mb-2">{title}</p>
      <h3 className="text-3xl font-bold text-[#111111]">{value}</h3>
      <div className="mt-4 flex items-center gap-2 text-[11px] font-bold tracking-wide text-green-600 bg-green-50 w-fit px-2 py-1 rounded-md">
         <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
         </svg>
         {trend}
      </div>
    </div>
  </div>
);

const Dashboard = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-[#111111]">Broker Dashboard</h1>
        <p className="text-sm text-[#666666] mt-1">Manage your properties and client inquiries.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
         <StatCard title="Active Listings" value="14" trend="+2" icon="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
         <StatCard title="Total Views" value="45.2K" trend="+15%" icon="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
         <StatCard title="Pending Inquiries" value="28" trend="+5" icon="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
         <StatCard title="Visit Requests" value="12" trend="+3" icon="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         <div className="lg:col-span-2 bg-white rounded-2xl border border-[#E5E5E5] p-6 shadow-sm">
            <h3 className="text-lg font-bold text-[#111111] mb-6">Listing Performance</h3>
            <div className="h-64 flex items-end gap-2 justify-between">
               {[20, 45, 30, 80, 50, 95, 70].map((h, i) => (
                  <div key={i} className="w-full bg-[#F7F7F5] rounded-t-lg relative group h-full flex flex-col justify-end">
                     <div className="w-full bg-[#6B705C] rounded-t-lg transition-all duration-500 group-hover:bg-[#111111]" style={{ height: `${h}%` }}></div>
                  </div>
               ))}
            </div>
            <div className="flex justify-between mt-4 text-[10px] font-bold text-[#666666] uppercase tracking-widest">
               <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
            </div>
         </div>
         
         <div className="bg-white rounded-2xl border border-[#E5E5E5] p-6 shadow-sm">
            <h3 className="text-lg font-bold text-[#111111] mb-6">Recent Inquiries</h3>
            <div className="space-y-6">
               {[
                 { name: 'Michael Brown', req: 'Visit Request: The Glass House', time: '1 hour ago' },
                 { name: 'Sarah Connor', req: 'Pricing details for Skyline', time: '3 hours ago' },
                 { name: 'David Smith', req: 'Virtual Tour Availability', time: 'Yesterday' },
               ].map((inq, i) => (
                  <div key={i} className="flex gap-4 border-b border-[#E5E5E5] pb-4 last:border-0 last:pb-0">
                     <div className="w-10 h-10 rounded-full bg-[#111111] flex items-center justify-center text-white text-xs font-bold shrink-0">{inq.name.charAt(0)}</div>
                     <div>
                        <p className="text-sm font-bold text-[#111111]">{inq.name}</p>
                        <p className="text-xs text-[#666666] mt-1">{inq.req}</p>
                        <p className="text-[9px] font-bold text-[#6B705C] uppercase tracking-widest mt-2">{inq.time}</p>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </div>
    </div>
  );
};
export default Dashboard;
