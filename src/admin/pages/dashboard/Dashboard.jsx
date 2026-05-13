import React, { useState, useEffect } from 'react';
import { propertyService } from '../../../user/services/propertyService';

const StatCard = ({ title, value, icon, trend, loading }) => (
  <div className="bg-white p-6 rounded-2xl border border-[#E5E5E5] shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
    <div className="absolute -top-4 -right-4 p-4 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-110">
      <svg className="w-32 h-32 text-[#6B705C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d={icon} />
      </svg>
    </div>
    <div className="relative z-10">
      <p className="text-[10px] font-bold uppercase tracking-widest text-[#666666] mb-2">{title}</p>
      {loading ? (
        <div className="h-9 w-24 bg-gray-100 animate-pulse rounded"></div>
      ) : (
        <h3 className="text-3xl font-bold text-[#111111]">{value}</h3>
      )}
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
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-[#111111]">Admin Dashboard (Connected to Firestore)</h1>
        <p className="text-sm text-[#666666] mt-1">Real-time statistics for your platform.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
         <StatCard 
            title="Total Properties" 
            value={liveStats.properties} 
            loading={liveStats.loading}
            trend="+0.0%" 
            icon="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" 
          />
         <StatCard title="Total Users" value="8,592" trend="+5.2%" icon="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
         <StatCard title="Visit Requests" value="142" trend="+18.1%" icon="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
         <StatCard title="Total Revenue" value="$45.2M" trend="+24.8%" icon="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         <div className="lg:col-span-2 bg-white rounded-2xl border border-[#E5E5E5] p-6 shadow-sm">
            <h3 className="text-lg font-bold text-[#111111] mb-6">Revenue Analytics</h3>
            <div className="h-64 flex items-end gap-2 justify-between">
               {[40, 70, 45, 90, 65, 85, 100, 60, 40, 75, 50, 80].map((h, i) => (
                  <div key={i} className="w-full bg-[#F7F7F5] rounded-t-lg relative group h-full flex flex-col justify-end">
                     <div className="w-full bg-[#6B705C] rounded-t-lg transition-all duration-500 group-hover:bg-[#111111]" style={{ height: `${h}%` }}></div>
                  </div>
               ))}
            </div>
            <div className="flex justify-between mt-4 text-[10px] font-bold text-[#666666] uppercase tracking-widest">
               <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span>
            </div>
         </div>
         
         <div className="bg-white rounded-2xl border border-[#E5E5E5] p-6 shadow-sm">
            <h3 className="text-lg font-bold text-[#111111] mb-6">Recent Activity</h3>
            <div className="space-y-6">
               {[
                 { msg: 'New property listed in Beverly Hills', time: '2 hours ago', color: 'bg-blue-500' },
                 { msg: 'User John Doe requested a visit', time: '4 hours ago', color: 'bg-green-500' },
                 { msg: 'Payment of $1,200 received', time: '5 hours ago', color: 'bg-purple-500' },
                 { msg: 'Broker Emma left a 5-star review', time: '1 day ago', color: 'bg-yellow-500' },
               ].map((act, i) => (
                  <div key={i} className="flex gap-4">
                     <div className={`w-2 h-2 mt-2 rounded-full ${act.color} shrink-0`}></div>
                     <div>
                        <p className="text-sm font-medium text-[#111111]">{act.msg}</p>
                        <p className="text-xs text-[#666666] mt-1">{act.time}</p>
                     </div>
                  </div>
               ))}
            </div>
            <button className="w-full mt-6 py-3 border border-[#E5E5E5] rounded-xl text-[10px] font-bold uppercase tracking-widest text-[#111111] hover:bg-[#F7F7F5] transition-colors">View All Activity</button>
         </div>
      </div>
    </div>
  );
};
export default Dashboard;
