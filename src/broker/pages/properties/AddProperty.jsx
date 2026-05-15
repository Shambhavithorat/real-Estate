import React, { useState } from 'react';
import { propertyService } from '../../../user/services/propertyService';
import { useAuth } from '../../../shared/hooks/useAuth';

import { useNavigate } from 'react-router-dom';

const AddProperty = () => {
  const { userData } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    type: 'Villa',
    location: '',
    image: '',
    description: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.price || !formData.location) {
      alert("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    try {
      await propertyService.addProperty({
        ...formData,
        price: Number(formData.price),
        status: 'pending',
        brokerId: userData?.uid,
        brokerName: userData?.displayName || 'Unknown Broker',
        submittedAt: new Date().toISOString()
      });
      alert("Property submitted for approval!");
      navigate('/broker/dashboard/properties');
    } catch (error) {
      console.error("Error submitting property:", error);
      alert("Failed to submit property.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl animate-[fadeIn_0.3s_ease-out]">
      <div className="flex items-center gap-4">
        <button 
          onClick={() => navigate('/broker/dashboard/properties')}
          className="w-10 h-10 rounded-full bg-white border border-[#E5E5E5] flex items-center justify-center text-[#111111] hover:bg-[#F7F7F5] transition-colors shrink-0"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>
        <div>
          <h1 className="text-2xl font-bold text-[#111111]">Add New Property</h1>
          <p className="text-sm text-[#666666] mt-1">Submit a new property for administrative review.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* General Details Section */}
        <div className="bg-white rounded-2xl border border-[#E5E5E5] shadow-sm overflow-hidden">
          <div className="p-6 md:p-8 space-y-6">
            <div className="flex items-center gap-3 border-b border-[#E5E5E5] pb-4">
              <div className="w-8 h-8 rounded-full bg-[#F7F7F5] flex items-center justify-center text-[#6B705C]">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-[#111111]">General Details</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="space-y-2 md:col-span-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-[#666666]">Property Title</label>
                  <input 
                    required
                    type="text" 
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    placeholder="e.g. The Glass House, Malibu" 
                    className="w-full bg-[#F7F7F5] border border-transparent px-4 py-3.5 rounded-xl text-sm focus:bg-white focus:border-[#6B705C] focus:ring-4 focus:ring-[#6B705C]/10 transition-all outline-none text-[#111111] placeholder:text-[#999999]" 
                  />
               </div>
               <div className="space-y-2 md:col-span-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-[#666666]">Property Type</label>
                  <select 
                    value={formData.type}
                    onChange={(e) => setFormData({...formData, type: e.target.value})}
                    className="w-full bg-[#F7F7F5] border border-transparent px-4 py-3.5 rounded-xl text-sm focus:bg-white focus:border-[#6B705C] focus:ring-4 focus:ring-[#6B705C]/10 transition-all outline-none text-[#111111] cursor-pointer appearance-none"
                  >
                     <option>Villa</option>
                     <option>Apartment</option>
                     <option>Houses</option>
                     <option>Plot</option>
                  </select>
               </div>
            </div>
          </div>
        </div>

        {/* Pricing & Location Section */}
        <div className="bg-white rounded-2xl border border-[#E5E5E5] shadow-sm overflow-hidden">
          <div className="p-6 md:p-8 space-y-6">
            <div className="flex items-center gap-3 border-b border-[#E5E5E5] pb-4">
              <div className="w-8 h-8 rounded-full bg-[#F7F7F5] flex items-center justify-center text-[#6B705C]">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-[#111111]">Pricing & Location</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-[#666666]">Price (USD)</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#666666] font-bold">$</span>
                    <input 
                      required
                      type="number" 
                      value={formData.price}
                      onChange={(e) => setFormData({...formData, price: e.target.value})}
                      placeholder="8500000" 
                      className="w-full bg-[#F7F7F5] border border-transparent pl-8 pr-4 py-3.5 rounded-xl text-sm focus:bg-white focus:border-[#6B705C] focus:ring-4 focus:ring-[#6B705C]/10 transition-all outline-none text-[#111111] placeholder:text-[#999999]" 
                    />
                  </div>
               </div>
               <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-[#666666]">Location</label>
                  <input 
                    required
                    type="text" 
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    placeholder="e.g. 123 Luxury Way, Beverly Hills" 
                    className="w-full bg-[#F7F7F5] border border-transparent px-4 py-3.5 rounded-xl text-sm focus:bg-white focus:border-[#6B705C] focus:ring-4 focus:ring-[#6B705C]/10 transition-all outline-none text-[#111111] placeholder:text-[#999999]" 
                  />
               </div>
            </div>
          </div>
        </div>

        {/* Media & Details Section */}
        <div className="bg-white rounded-2xl border border-[#E5E5E5] shadow-sm overflow-hidden">
          <div className="p-6 md:p-8 space-y-6">
            <div className="flex items-center gap-3 border-b border-[#E5E5E5] pb-4">
              <div className="w-8 h-8 rounded-full bg-[#F7F7F5] flex items-center justify-center text-[#6B705C]">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-[#111111]">Media & Description</h3>
            </div>
            
            <div className="grid grid-cols-1 gap-6">
               <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-[#666666]">Image URL</label>
                  <input 
                    type="text" 
                    value={formData.image}
                    onChange={(e) => setFormData({...formData, image: e.target.value})}
                    placeholder="https://images.unsplash.com/..." 
                    className="w-full bg-[#F7F7F5] border border-transparent px-4 py-3.5 rounded-xl text-sm focus:bg-white focus:border-[#6B705C] focus:ring-4 focus:ring-[#6B705C]/10 transition-all outline-none text-[#111111] placeholder:text-[#999999]" 
                  />
               </div>
               <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-[#666666]">Description</label>
                  <textarea 
                    rows="5"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    placeholder="Describe the luxury features, amenities, and highlights..." 
                    className="w-full bg-[#F7F7F5] border border-transparent px-4 py-3.5 rounded-xl text-sm focus:bg-white focus:border-[#6B705C] focus:ring-4 focus:ring-[#6B705C]/10 transition-all outline-none text-[#111111] placeholder:text-[#999999] resize-none" 
                  />
               </div>
            </div>
          </div>
        </div>

        {/* Submit Action */}
        <div className="pt-4 flex justify-end">
           <button 
             disabled={loading}
             type="submit" 
             className="btn-premium py-4 px-10 rounded-xl text-xs flex items-center justify-center gap-3 min-w-[200px]"
           >
             {loading ? (
               <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
             ) : (
               <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
               </svg>
             )}
             {loading ? 'SUBMITTING...' : 'SUBMIT PROPERTY'}
           </button>
        </div>
      </form>
    </div>
  );
};
export default AddProperty;

