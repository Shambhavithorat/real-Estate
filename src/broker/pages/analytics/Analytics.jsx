import React from 'react';

const Analytics = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-[#111111]">Performance Analytics</h1>
          <p className="text-sm text-[#666666] mt-1">Detailed statistics for your property portfolio.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
         <div className="bg-white rounded-2xl border border-[#E5E5E5] p-6 shadow-sm">
            <h3 className="text-lg font-bold text-[#111111] mb-6">Views Over Time</h3>
            <div className="h-64 flex items-end gap-3 justify-between border-b border-[#E5E5E5] pb-2">
               {[40, 70, 45, 90, 65, 85, 100].map((h, i) => (
                  <div key={i} className="w-full bg-[#F7F7F5] rounded-t-lg relative group h-full flex flex-col justify-end">
                     <div className="w-full bg-[#111111] rounded-t-lg transition-all duration-500 group-hover:bg-[#6B705C]" style={{ height: `${h}%` }}></div>
                  </div>
               ))}
            </div>
            <div className="flex justify-between mt-4 text-[10px] font-bold text-[#666666] uppercase tracking-widest">
               <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
            </div>
         </div>

         <div className="bg-white rounded-2xl border border-[#E5E5E5] p-6 shadow-sm">
            <h3 className="text-lg font-bold text-[#111111] mb-6">Inquiries Source</h3>
            <div className="h-64 flex flex-col justify-center items-center gap-6">
               <div className="w-40 h-40 rounded-full border-[16px] border-[#6B705C] border-t-[#111111] border-r-[#111111] shadow-inner relative flex items-center justify-center">
                  <span className="text-xl font-bold text-[#111111]">142</span>
               </div>
               <div className="flex gap-6 text-xs font-bold text-[#111111]">
                  <div className="flex items-center gap-2"><div className="w-3 h-3 bg-[#111111] rounded-full"></div> Organic Search</div>
                  <div className="flex items-center gap-2"><div className="w-3 h-3 bg-[#6B705C] rounded-full"></div> Direct Traffic</div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};
export default Analytics;
