import React, { useState, useEffect } from 'react';
import { propertyService } from '../../../user/services/propertyService';

const StatCard = ({ title, value, icon, trend, loading }) => (
  <div className="bg-white p-8 rounded-[2rem] border border-[#002D52]/10 shadow-sm hover:shadow-[0_15px_40px_rgba(0,45,82,0.1)] hover:border-[#C5A059]/50 hover:-translate-y-1 transition-all duration-500 relative overflow-hidden group">
    <div className="absolute -top-6 -right-6 p-4 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-110">
      <svg className="w-40 h-40 text-[#002D52]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d={icon} />
      </svg>
    </div>
    <div className="relative z-10">
      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#333333]/70 mb-3">{title}</p>
      {loading ? (
        <div className="h-10 w-24 bg-gray-200 animate-pulse rounded-lg"></div>
      ) : (
        <h3 className="text-4xl font-black text-[#002D52]">{value}</h3>
      )}
      <div className="mt-5 flex items-center gap-2 text-[10px] font-bold tracking-widest text-[#0A422D] bg-[#0A422D]/10 w-fit px-3 py-1.5 rounded-lg border border-[#0A422D]/20">
         <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
         </svg>
         {trend}
      </div>
    </div>
  </div>
);

const Dashboard = () => {
  const [liveStats, setLiveStats] = useState({
    properties: 0,
    loading: true
  });

  useEffect(() => {
    const fetchLiveData = async () => {
      try {
        const props = await propertyService.getAllProperties();
        setLiveStats({
          properties: props.length,
          loading: false
        });
      } catch (err) {
        console.error("Dashboard live fetch error:", err);
        setLiveStats(prev => ({ ...prev, loading: false }));
      }
    };
    fetchLiveData();
  }, []);

  return (
    <div className="space-y-12 pb-16 relative">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-8">
        <div className="space-y-2">
          <h1 className="text-4xl md:text-5xl font-black text-[#002D52] tracking-tighter uppercase">Admin <span className="text-[#C5A059] italic font-light">Dashboard</span></h1>
          <p className="text-sm text-[#333333] font-light tracking-wide">Real-time statistics and analytics for your luxury platform.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
         <StatCard 
            title="Total Properties" 
            value={liveStats.properties} 
            loading={liveStats.loading}
            trend="+12.5%" 
            icon="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" 
          />
         <StatCard title="Total Users" value="8,592" trend="+5.2%" icon="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
         <StatCard title="Visit Requests" value="142" trend="+18.1%" icon="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
         <StatCard title="Total Revenue" value="$45.2M" trend="+24.8%" icon="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <div className="lg:col-span-2 bg-white rounded-[2rem] border border-[#002D52]/10 p-8 shadow-sm">
            <div className="flex justify-between items-center mb-10">
               <h3 className="text-xl font-bold text-[#002D52]">Revenue Analytics</h3>
               <button className="text-[10px] font-bold text-[#C5A059] uppercase tracking-widest hover:underline">Download Report</button>
            </div>
            <div className="h-72 flex items-end gap-3 justify-between">
               {[40, 70, 45, 90, 65, 85, 100, 60, 40, 75, 50, 80].map((h, i) => (
                  <div key={i} className="w-full bg-[#F9F9F9] rounded-t-xl relative group h-full flex flex-col justify-end overflow-hidden">
                     <div className="w-full bg-[#002D52] rounded-t-xl transition-all duration-500 group-hover:bg-[#C5A059]" style={{ height: `${h}%` }}></div>
                  </div>
               ))}
            </div>
            <div className="flex justify-between mt-6 text-[10px] font-bold text-[#333333]/70 uppercase tracking-widest">
               <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span>
            </div>
         </div>
         
         <div className="bg-white rounded-[2rem] border border-[#002D52]/10 p-8 shadow-sm flex flex-col">
            <h3 className="text-xl font-bold text-[#002D52] mb-8">Recent Activity</h3>
            <div className="space-y-8 flex-1">
               {[
                 { msg: 'New property listed in Beverly Hills', time: '2 hours ago', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
                 { msg: 'User John Doe requested a visit', time: '4 hours ago', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
                 { msg: 'Payment of $1,200 received', time: '5 hours ago', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
                 { msg: 'Broker Emma left a 5-star review', time: '1 day ago', icon: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z' },
               ].map((act, i) => (
                  <div key={i} className="flex gap-5 items-start group">
                     <div className="w-10 h-10 rounded-xl bg-[#F9F9F9] border border-[#002D52]/10 flex items-center justify-center shrink-0 group-hover:bg-[#C5A059] group-hover:text-white text-[#002D52] transition-all">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={act.icon} />
                        </svg>
                     </div>
                     <div>
                        <p className="text-sm font-medium text-[#333333] leading-snug">{act.msg}</p>
                        <p className="text-[10px] font-bold tracking-widest uppercase text-[#333333]/60 mt-1.5">{act.time}</p>
                     </div>
                  </div>
               ))}
            </div>
            <button className="w-full mt-8 py-4 border border-[#002D52]/10 rounded-xl text-[10px] font-bold uppercase tracking-[0.2em] text-[#002D52] hover:bg-[#002D52] hover:text-white transition-all">View All Activity</button>
         </div>
      </div>
    </div>
  );
};
export default Dashboard;
