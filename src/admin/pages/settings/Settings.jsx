import React from 'react';

const Settings = () => {
  return (
    <div className="space-y-10 pb-12 relative min-h-screen bg-[#FBFBFB] -m-4 p-8 rounded-[40px]">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-8 px-2">
        <div className="space-y-1">
          <h1 className="text-5xl font-black text-[#111111] tracking-tighter">System <span className="text-[#6B705C] italic font-serif">Configurations</span></h1>
          <p className="text-sm text-[#666666] font-medium tracking-tight">Manage core platform parameters and preferences.</p>
        </div>
      </div>
      
      <div className="bg-white rounded-2xl border border-[#E5E5E5] shadow-sm overflow-hidden">
         <div className="p-6 border-b border-[#E5E5E5]">
            <h3 className="text-lg font-bold text-[#111111]">General Information</h3>
         </div>
         <div className="p-6 space-y-6">
            <div className="space-y-2">
               <label className="text-xs font-bold uppercase tracking-widest text-[#666666]">Platform Name</label>
               <input type="text" defaultValue="PropertyVishva" className="w-full bg-[#F7F7F5] border-none px-4 py-3 rounded-xl text-sm focus:ring-1 focus:ring-[#6B705C]" />
            </div>
            <div className="space-y-2">
               <label className="text-xs font-bold uppercase tracking-widest text-[#666666]">Contact Email</label>
               <input type="email" defaultValue="admin@propertyvishva.com" className="w-full bg-[#F7F7F5] border-none px-4 py-3 rounded-xl text-sm focus:ring-1 focus:ring-[#6B705C]" />
            </div>
            <button className="btn-premium py-3 px-8 text-xs rounded-xl">Save Changes</button>
         </div>
      </div>
    </div>
  );
};
export default Settings;
