import React, { useState } from 'react';
import { propertyService } from '../../../user/services/propertyService';
import { useAuth } from '../../../shared/hooks/useAuth';

const AddProperty = () => {
  const { userData } = useAuth();
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
      setFormData({
        title: '',
        price: '',
        type: 'Villa',
        location: '',
        image: '',
        description: ''
      });
    } catch (error) {
      console.error("Error submitting property:", error);
      alert("Failed to submit property.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-bold text-[#111111]">Add New Property</h1>
        <p className="text-sm text-[#666666] mt-1">Submit a new property for administrative review.</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-[#E5E5E5] shadow-sm overflow-hidden">
        <div className="p-6 md:p-8 space-y-8">
           <div className="space-y-4">
              <h3 className="text-lg font-bold text-[#111111]">Basic Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="space-y-2 md:col-span-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-[#666666]">Property Title</label>
                    <input 
                      required
                      type="text" 
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      placeholder="e.g. The Glass House, Malibu" 
                      className="w-full bg-[#F7F7F5] border-none px-4 py-3 rounded-xl text-sm focus:ring-1 focus:ring-[#6B705C]" 
                    />
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-[#666666]">Price ($)</label>
                    <input 
                      required
                      type="number" 
                      value={formData.price}
                      onChange={(e) => setFormData({...formData, price: e.target.value})}
                      placeholder="8500000" 
                      className="w-full bg-[#F7F7F5] border-none px-4 py-3 rounded-xl text-sm focus:ring-1 focus:ring-[#6B705C]" 
                    />
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-[#666666]">Property Type</label>
                    <select 
                      value={formData.type}
                      onChange={(e) => setFormData({...formData, type: e.target.value})}
                      className="w-full bg-[#F7F7F5] border-none px-4 py-3 rounded-xl text-sm focus:ring-1 focus:ring-[#6B705C] outline-none"
                    >
                       <option>Villa</option>
                       <option>Penthouse</option>
                       <option>Mansion</option>
                       <option>Apartment</option>
                       <option>Office</option>
                    </select>
                 </div>
                 <div className="space-y-2 md:col-span-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-[#666666]">Location</label>
                    <input 
                      required
                      type="text" 
                      value={formData.location}
                      onChange={(e) => setFormData({...formData, location: e.target.value})}
                      placeholder="e.g. 123 Luxury Way, Beverly Hills" 
                      className="w-full bg-[#F7F7F5] border-none px-4 py-3 rounded-xl text-sm focus:ring-1 focus:ring-[#6B705C]" 
                    />
                 </div>
                 <div className="space-y-2 md:col-span-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-[#666666]">Image URL</label>
                    <input 
                      type="text" 
                      value={formData.image}
                      onChange={(e) => setFormData({...formData, image: e.target.value})}
                      placeholder="https://images.unsplash.com/..." 
                      className="w-full bg-[#F7F7F5] border-none px-4 py-3 rounded-xl text-sm focus:ring-1 focus:ring-[#6B705C]" 
                    />
                 </div>
                 <div className="space-y-2 md:col-span-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-[#666666]">Description</label>
                    <textarea 
                      rows="4"
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      placeholder="Describe the luxury features..." 
                      className="w-full bg-[#F7F7F5] border-none px-4 py-3 rounded-xl text-sm focus:ring-1 focus:ring-[#6B705C] resize-none" 
                    />
                 </div>
              </div>
           </div>

           <div className="pt-6">
              <button 
                disabled={loading}
                type="submit" 
                className="btn-premium py-4 w-full rounded-xl text-xs flex items-center justify-center gap-2"
              >
                {loading ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : null}
                {loading ? 'Submitting...' : 'Submit for Approval'}
              </button>
           </div>
        </div>
      </form>
    </div>
  );
};
export default AddProperty;

