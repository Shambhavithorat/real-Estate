import React from 'react';

const VisitRequests = () => {
  const visits = [
    { id: 1, name: 'Michael Brown', property: 'The Glass House', date: '15 May 2026', time: '10:00 AM', status: 'Pending' },
    { id: 2, name: 'Sarah Connor', property: 'Skyline Penthouse', date: '16 May 2026', time: '02:00 PM', status: 'Approved' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-[#111111]">Visit Requests</h1>
          <p className="text-sm text-[#666666] mt-1">Approve or reschedule property tours.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-[#E5E5E5] overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-white border-b border-[#E5E5E5] text-[10px] uppercase tracking-widest text-[#666666]">
                <th className="p-4 font-bold">Client</th>
                <th className="p-4 font-bold">Property Ref</th>
                <th className="p-4 font-bold">Date</th>
                <th className="p-4 font-bold">Time</th>
                <th className="p-4 font-bold">Status</th>
                <th className="p-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E5E5] bg-white">
              {visits.map(v => (
                <tr key={v.id} className="hover:bg-[#F7F7F5] transition-colors">
                  <td className="p-4 font-bold text-[#111111] text-sm">{v.name}</td>
                  <td className="p-4 text-sm text-[#6B705C] underline cursor-pointer">{v.property}</td>
                  <td className="p-4 text-sm font-medium text-[#111111]">{v.date}</td>
                  <td className="p-4 text-sm text-[#666666]">{v.time}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1.5 text-[9px] font-bold uppercase tracking-widest rounded-full ${v.status === 'Approved' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                      {v.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    {v.status === 'Pending' ? (
                        <>
                           <button className="text-green-600 hover:text-green-800 text-sm font-bold mr-4 transition-colors">Accept</button>
                           <button className="text-red-500 hover:text-red-700 text-sm font-bold transition-colors">Reschedule</button>
                        </>
                    ) : (
                       <button className="text-[#6B705C] hover:text-[#111111] text-sm font-bold transition-colors">View Details</button>
                    )}
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
export default VisitRequests;
