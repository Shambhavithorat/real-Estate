import React from 'react';

const MyProperties = () => {
  const properties = [
    { id: 1, img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=100&q=80', title: 'The Glass House', location: 'Malibu, CA', price: '$8,500,000', views: 1240, status: 'Active' },
    { id: 2, img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=100&q=80', title: 'Skyline Penthouse', location: 'New York, NY', price: '$12,400,000', views: 3450, status: 'Active' },
    { id: 3, img: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=100&q=80', title: 'Modern Oasis', location: 'Austin, TX', price: '$4,200,000', views: 890, status: 'Pending' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#111111]">My Properties</h1>
          <p className="text-sm text-[#666666] mt-1">Manage your exclusive listings</p>
        </div>
        <button className="btn-premium py-3 px-6 text-xs flex items-center gap-2 rounded-xl">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add New Property
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-[#E5E5E5] overflow-hidden shadow-sm">
        <div className="p-4 border-b border-[#E5E5E5] flex gap-4 bg-[#F7F7F5]/50">
           <input type="text" placeholder="Search my properties..." className="flex-1 bg-white border border-[#E5E5E5] px-4 py-2.5 rounded-xl text-sm focus:ring-1 focus:ring-[#6B705C] outline-none" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-white border-b border-[#E5E5E5] text-[10px] uppercase tracking-widest text-[#666666]">
                <th className="p-4 font-bold">Property</th>
                <th className="p-4 font-bold">Price</th>
                <th className="p-4 font-bold">Views</th>
                <th className="p-4 font-bold">Status</th>
                <th className="p-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E5E5] bg-white">
              {properties.map(p => (
                <tr key={p.id} className="hover:bg-[#F7F7F5] transition-colors group">
                  <td className="p-4 flex items-center gap-4">
                     <div className="w-16 h-16 bg-gray-200 rounded-xl overflow-hidden shrink-0 shadow-sm relative">
                        <img src={p.img} alt={p.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                     </div>
                     <div>
                        <span className="font-bold text-[#111111] text-sm block">{p.title}</span>
                        <span className="text-xs text-[#666666]">{p.location}</span>
                     </div>
                  </td>
                  <td className="p-4 text-sm font-bold text-[#111111]">{p.price}</td>
                  <td className="p-4 text-sm text-[#666666] font-medium">{p.views.toLocaleString()}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1.5 text-[9px] font-bold uppercase tracking-widest rounded-full ${p.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                      {p.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button className="text-[#6B705C] hover:text-[#111111] text-sm font-bold mr-4 transition-colors">Edit</button>
                    <button className="text-red-500 hover:text-red-700 text-sm font-bold transition-colors">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default MyProperties;
