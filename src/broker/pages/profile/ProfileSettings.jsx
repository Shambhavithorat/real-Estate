import React from 'react';

const ProfileSettings = () => {
  return (
    <div className="space-y-6 max-w-3xl">
      <h1 className="text-2xl font-bold text-[#111111]">Profile Settings</h1>
      
      <div className="bg-white rounded-2xl border border-[#E5E5E5] shadow-sm overflow-hidden">
         <div className="p-6 border-b border-[#E5E5E5]">
            <h3 className="text-lg font-bold text-[#111111]">Broker Profile</h3>
         </div>
         <div className="p-6 space-y-6">
            <div className="flex items-center gap-6">
               <div className="w-24 h-24 bg-gray-200 rounded-full overflow-hidden shrink-0">
                  <img src="https://i.pravatar.cc/150?img=11" alt="Profile" className="w-full h-full object-cover" />
               </div>
               <button className="px-4 py-2 border border-[#E5E5E5] rounded-xl text-xs font-bold uppercase tracking-widest text-[#111111] hover:bg-[#F7F7F5] transition-colors">Change Photo</button>
            </div>
            <div className="space-y-2">
               <label className="text-[10px] font-bold uppercase tracking-widest text-[#666666]">Full Name</label>
               <input type="text" defaultValue="Julianne Davis" className="w-full bg-[#F7F7F5] border-none px-4 py-3 rounded-xl text-sm focus:ring-1 focus:ring-[#6B705C]" />
            </div>
            <div className="space-y-2">
               <label className="text-[10px] font-bold uppercase tracking-widest text-[#666666]">Email Address</label>
               <input type="email" defaultValue="julianne.davis@propertyvishva.com" className="w-full bg-[#F7F7F5] border-none px-4 py-3 rounded-xl text-sm focus:ring-1 focus:ring-[#6B705C]" />
            </div>
            <div className="space-y-2">
               <label className="text-[10px] font-bold uppercase tracking-widest text-[#666666]">Bio</label>
               <textarea rows="4" className="w-full bg-[#F7F7F5] border-none px-4 py-3 rounded-xl text-sm focus:ring-1 focus:ring-[#6B705C]" defaultValue="Luxury real estate advisor specializing in coastal properties and high-end modern estates in California."></textarea>
            </div>
            <button className="btn-premium py-3 px-8 text-xs rounded-xl">Save Changes</button>
         </div>
      </div>
    </div>
  );
};
export default ProfileSettings;
