import React from 'react';

const Inquiries = () => {
  const inquiries = [
    { id: 1, name: 'Michael Brown', subject: 'Property Availability', property: 'The Glass House', status: 'Unread', date: 'Today, 10:30 AM' },
    { id: 2, name: 'Sarah Connor', subject: 'Pricing details', property: 'Skyline Penthouse', status: 'Read', date: 'Yesterday' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-[#111111]">Client Inquiries</h1>
          <p className="text-sm text-[#666666] mt-1">Messages from potential buyers for your properties.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-[#E5E5E5] overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-white border-b border-[#E5E5E5] text-[10px] uppercase tracking-widest text-[#666666]">
                <th className="p-4 font-bold">Client</th>
                <th className="p-4 font-bold">Subject</th>
                <th className="p-4 font-bold">Property Ref</th>
                <th className="p-4 font-bold">Date</th>
                <th className="p-4 font-bold">Status</th>
                <th className="p-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E5E5] bg-white">
              {inquiries.map(inq => (
                <tr key={inq.id} className="hover:bg-[#F7F7F5] transition-colors">
                  <td className="p-4 flex items-center gap-3">
                     <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold shrink-0">{inq.name.charAt(0)}</div>
                     <span className="font-bold text-[#111111] text-sm">{inq.name}</span>
                  </td>
                  <td className="p-4 text-sm font-medium text-[#111111]">{inq.subject}</td>
                  <td className="p-4 text-sm text-[#6B705C] underline cursor-pointer">{inq.property}</td>
                  <td className="p-4 text-sm text-[#666666]">{inq.date}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1.5 text-[9px] font-bold uppercase tracking-widest rounded-full ${inq.status === 'Unread' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'}`}>
                      {inq.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button className="text-[#6B705C] hover:text-[#111111] text-sm font-bold transition-colors">Reply</button>
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
export default Inquiries;
