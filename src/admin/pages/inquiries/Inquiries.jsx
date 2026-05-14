import React, { useState, useEffect } from 'react';
import { inquiryService } from '../../../user/services/inquiryService';

const Inquiries = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Real-time synchronization with the backend
    const unsubscribe = inquiryService.subscribeInquiries((data) => {
      setInquiries(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleStatusUpdate = async (id, currentStatus) => {
    const nextStatus = currentStatus === 'New' ? 'In Progress' : currentStatus === 'In Progress' ? 'Completed' : 'New';
    try {
      await inquiryService.updateInquiryStatus(id, nextStatus);
    } catch (err) {
      alert("Error updating status");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this inquiry?")) {
      try {
        await inquiryService.deleteInquiry(id);
      } catch (err) {
        alert("Error deleting inquiry");
      }
    }
  };

  const formatPrice = (price) => {
    if (!price) return 'N/A';
    return `₹${Number(price).toLocaleString('en-IN')}`;
  };

  if (loading) return (
    <div className="min-h-[400px] flex flex-col items-center justify-center gap-4">
      <div className="w-10 h-10 border-4 border-[#6B705C]/20 border-t-[#6B705C] rounded-full animate-spin" />
      <p className="text-[10px] font-bold uppercase tracking-widest text-[#6B705C]">Loading Inquiries...</p>
    </div>
  );

  return (
    <div className="space-y-10 pb-12 relative min-h-screen bg-[#FBFBFB] -m-4 p-8 rounded-[40px]">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-8 px-2">
        <div className="space-y-1">
          <h1 className="text-5xl font-black text-[#111111] tracking-tighter">Market <span className="text-[#6B705C] italic font-serif">Inquiries</span></h1>
          <p className="text-sm text-[#666666] font-medium tracking-tight">Direct property inquiries and listing requests from users.</p>
        </div>
      </div>

      <div className="bg-white rounded-[32px] border border-[#E5E5E5] overflow-hidden shadow-md">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="bg-[#FBFBF9] border-b border-[#F5F5F5] text-[10px] uppercase tracking-[0.2em] text-[#999999]">
                <th className="px-8 py-6 font-bold">Property Inquiry</th>
                <th className="px-6 py-6 font-bold">Client Contact</th>
                <th className="px-6 py-6 font-bold">Location</th>
                <th className="px-6 py-6 font-bold">Specifications</th>
                <th className="px-6 py-6 font-bold">Status</th>
                <th className="px-8 py-6 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F5F5F5]">
              {inquiries.length > 0 ? inquiries.map(inq => (
                <tr key={inq.id} className="hover:bg-[#FBFBF9] transition-all group">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-[#F7F7F5] overflow-hidden">
                        <img src={inq.image || 'https://via.placeholder.com/150'} className="w-full h-full object-cover" alt="Property" />
                      </div>
                      <div>
                        <span className="font-bold text-[#111111] text-sm block">{inq.title}</span>
                        <span className="text-[10px] text-[#BBBBBB] font-medium mt-1 truncate max-w-[200px] block">{inq.description || 'No description provided'}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <span className="text-sm font-bold text-[#111111] block">{inq.customerName || 'Anonymous'}</span>
                    <div className="flex flex-col gap-0.5 mt-1">
                      <span className="text-[10px] text-[#666666] font-medium">{inq.customerEmail || 'No Email'}</span>
                      <span className="text-[10px] text-[#666666] font-medium">{inq.customerPhone || 'No Phone'}</span>
                    </div>
                    <span className="text-xs text-[#6B705C] font-bold mt-2 block">{formatPrice(inq.price)}</span>
                  </td>
                  <td className="px-6 py-6">
                    <span className="text-sm font-medium text-[#666666] flex items-center gap-2">
                       📍 {inq.location}
                    </span>
                  </td>
                  <td className="px-6 py-6">
                    <div className="flex items-center gap-3">
                       <span className="text-[10px] font-bold text-[#111111] bg-[#F7F7F5] px-2 py-1 rounded-md">{inq.beds}B</span>
                       <span className="text-[10px] font-bold text-[#111111] bg-[#F7F7F5] px-2 py-1 rounded-md">{inq.baths}T</span>
                       <span className="text-[10px] font-bold text-[#111111] bg-[#F7F7F5] px-2 py-1 rounded-md">{inq.area} ft²</span>
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <button 
                      onClick={() => handleStatusUpdate(inq.id, inq.status)}
                      className={`px-4 py-2 text-[9px] font-bold uppercase tracking-widest rounded-full transition-all border ${
                        inq.status === 'New' ? 'bg-red-50 text-red-600 border-red-100' : 
                        inq.status === 'In Progress' ? 'bg-amber-50 text-amber-600 border-amber-100' : 
                        'bg-emerald-50 text-emerald-600 border-emerald-100'
                      }`}
                    >
                      {inq.status || 'New'}
                    </button>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all">
                      <button 
                        onClick={() => handleDelete(inq.id)}
                        className="p-3 rounded-xl bg-white border border-[#EEEEEE] text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-sm"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="6" className="py-20 text-center">
                    <div className="flex flex-col items-center gap-4">
                      <span className="text-4xl opacity-20">📭</span>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-[#999999]">No listing requests found</p>
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

export default Inquiries;
