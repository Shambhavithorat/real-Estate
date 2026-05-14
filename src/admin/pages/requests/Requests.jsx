import React, { useState, useEffect } from 'react';
import { propertyService } from '../../../user/services/propertyService';

const Requests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = propertyService.subscribePendingProperties((data) => {
      setRequests(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleApprove = async (id) => {
    try {
      await propertyService.updateProperty(id, { status: 'approved' });
      alert("Property approved and published!");
    } catch (error) {
      console.error("Error approving property:", error);
      alert("Failed to approve property.");
    }
  };

  const handleDeny = async (id) => {
    if (window.confirm("Are you sure you want to deny this property?")) {
      try {
        await propertyService.updateProperty(id, { status: 'denied' });
        alert("Property request denied.");
      } catch (error) {
        console.error("Error denying property:", error);
        alert("Failed to deny property.");
      }
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    return new Date(dateStr).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  if (loading) return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
      <div className="w-12 h-12 border-4 border-[#6B705C]/20 border-t-[#6B705C] rounded-full animate-spin" />
      <p className="text-[#6B705C] font-bold uppercase tracking-widest text-[10px]">Loading Requests...</p>
    </div>
  );

  return (
    <div className="space-y-10 pb-12 animate-in fade-in duration-500">
      <div className="space-y-1 px-2">
        <h1 className="text-5xl font-black text-[#111111] tracking-tighter">Property <span className="text-[#6B705C] italic font-serif">Requests</span></h1>
        <p className="text-sm text-[#666666] font-medium tracking-tight">Review and approve property listings from brokers</p>
      </div>

      <div className="bg-white rounded-[40px] border border-[#E5E5E5] overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="bg-[#F7F7F5]/50 border-b border-[#E5E5E5] text-[10px] uppercase tracking-[0.2em] text-[#666666]">
                <th className="px-8 py-6 font-bold">Property Details</th>
                <th className="px-8 py-6 font-bold">Broker</th>
                <th className="px-8 py-6 font-bold">Type & Price</th>
                <th className="px-8 py-6 font-bold">Location</th>
                <th className="px-8 py-6 font-bold">Submitted Date</th>
                <th className="px-8 py-6 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F5F5F5]">
              {requests.length > 0 ? requests.map((req) => (
                <tr key={req.id} className="hover:bg-[#FBFBF9] transition-all duration-300 group">
                  <td className="px-8 py-8">
                    <div className="flex items-center gap-6">
                      <div className="w-24 h-16 rounded-2xl overflow-hidden bg-[#F7F7F5] shadow-md shrink-0">
                        <img 
                          src={req.image || 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80'} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                          alt={req.title}
                        />
                      </div>
                      <span className="font-bold text-[#111111] text-sm tracking-tight">{req.title}</span>
                    </div>
                  </td>
                  <td className="px-8 py-8">
                    <div className="space-y-1">
                      <p className="text-sm font-bold text-[#111111]">{req.brokerName || 'Unknown Broker'}</p>
                      <p className="text-[10px] text-[#6B705C] uppercase tracking-widest font-bold">Certified Partner</p>
                    </div>
                  </td>
                  <td className="px-8 py-8">
                    <div className="space-y-1">
                      <p className="text-xs font-bold text-[#111111]">{req.type}</p>
                      <p className="text-sm font-black text-[#6B705C]">${Number(req.price).toLocaleString()}</p>
                    </div>
                  </td>
                  <td className="px-8 py-8">
                    <p className="text-xs text-[#666666] font-medium max-w-[200px]">{req.location}</p>
                  </td>
                  <td className="px-8 py-8 text-xs font-medium text-[#666666]">
                    {formatDate(req.submittedAt)}
                  </td>
                  <td className="px-8 py-8 text-right">
                    <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0">
                      <button 
                        onClick={() => handleApprove(req.id)}
                        className="h-10 px-6 rounded-xl bg-[#111111] text-white text-[10px] font-bold uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-lg"
                      >
                        Approve
                      </button>
                      <button 
                        onClick={() => handleDeny(req.id)}
                        className="h-10 px-6 rounded-xl bg-white border border-red-100 text-red-500 text-[10px] font-bold uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all shadow-sm"
                      >
                        Deny
                      </button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="6" className="py-32 text-center">
                    <div className="flex flex-col items-center gap-6">
                      <div className="w-20 h-20 bg-[#F7F7F5] rounded-[32px] flex items-center justify-center text-[#BBBBBB]">
                        <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                        </svg>
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-base font-bold text-[#111111] uppercase tracking-widest">No Pending Requests</h4>
                        <p className="text-[10px] text-[#666666] uppercase tracking-[0.2em] mt-2">All property submissions have been processed</p>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Requests;
