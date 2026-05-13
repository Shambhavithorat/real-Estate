import React from 'react';

const AddProperty = () => {
  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-[#111111]">Add New Property</h1>
        <p className="text-sm text-[#666666] mt-1">List a new property to your portfolio.</p>
      </div>

      <div className="bg-white rounded-2xl border border-[#E5E5E5] shadow-sm overflow-hidden">
        <div className="p-6 md:p-8 space-y-8">
           <div className="space-y-4">
              <h3 className="text-lg font-bold text-[#111111]">Basic Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="space-y-2 md:col-span-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-[#666666]">Property Title</label>
                    <input type="text" placeholder="e.g. The Glass House, Malibu" className="w-full bg-[#F7F7F5] border-none px-4 py-3 rounded-xl text-sm focus:ring-1 focus:ring-[#6B705C]" />
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-[#666666]">Price ($)</label>
                    <input type="number" placeholder="8500000" className="w-full bg-[#F7F7F5] border-none px-4 py-3 rounded-xl text-sm focus:ring-1 focus:ring-[#6B705C]" />
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-[#666666]">Category</label>
                    <select className="w-full bg-[#F7F7F5] border-none px-4 py-3 rounded-xl text-sm focus:ring-1 focus:ring-[#6B705C] outline-none">
                       <option>Villa</option>
                       <option>Penthouse</option>
                       <option>Mansion</option>
                    </select>
                 </div>
              </div>
           </div>

           <div className="space-y-4 pt-6 border-t border-[#E5E5E5]">
              <h3 className="text-lg font-bold text-[#111111]">Media</h3>
              <div className="border-2 border-dashed border-[#E5E5E5] rounded-2xl p-10 flex flex-col items-center justify-center text-center hover:bg-[#F7F7F5] transition-colors cursor-pointer">
                 <svg className="w-10 h-10 text-[#6B705C] mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                 </svg>
                 <p className="text-sm font-bold text-[#111111]">Drag & Drop Images here</p>
                 <p className="text-xs text-[#666666] mt-2">or click to browse from your computer</p>
              </div>
           </div>

           <div className="pt-6">
              <button className="btn-premium py-4 w-full rounded-xl text-xs">Publish Property</button>
           </div>
        </div>
      </div>
    </div>
  );
};
export default AddProperty;
