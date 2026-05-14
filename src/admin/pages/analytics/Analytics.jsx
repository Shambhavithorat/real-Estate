import React from 'react';

const Analytics = () => {
  return (
    <div className="space-y-10 pb-12 relative min-h-screen bg-[#FBFBFB] -m-4 p-8 rounded-[40px]">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-8 px-2">
        <div className="space-y-1">
          <h1 className="text-5xl font-black text-[#111111] tracking-tighter">Platform <span className="text-[#6B705C] italic font-serif">Analytics</span></h1>
          <p className="text-sm text-[#666666] font-medium tracking-tight">Detailed charts and platform statistics.</p>
        </div>
      </div>
      <div className="bg-white rounded-2xl border border-[#E5E5E5] p-10 text-center shadow-sm">
         <h3 className="text-lg font-bold text-[#111111]">Advanced Reports</h3>
         <p className="text-[#666666] text-sm mt-2">Detailed charts and platform statistics.</p>
      </div>
    </div>
  );
};
export default Analytics;
