import React, { useState } from 'react';
import PropertyCard from '../components/property/PropertyCard';
import { inquiryService } from '../services/inquiryService';

const Sell = () => {
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    location: '',
    type: 'Villa',
    beds: '',
    baths: '',
    area: '',
    image: '',
    description: '',
    sellerName: '',
    sellerEmail: '',
    sellerPhone: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const inquiryData = {
        ...formData,
        subject: 'New Property Listing Inquiry',
        type: 'Listing Request',
        customerName: formData.sellerName,
        customerEmail: formData.sellerEmail,
        customerPhone: formData.sellerPhone,
        timestamp: new Date().toISOString()
      };

      await inquiryService.addInquiry(inquiryData);
      
      alert("Success! Your property inquiry has been submitted. Our team will contact you shortly.");
      
      setFormData({
        title: '', price: '', location: '', type: 'Villa', beds: '', baths: '', area: '', image: '', description: '',
        sellerName: '', sellerEmail: '', sellerPhone: ''
      });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      alert("Error sending inquiry. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FBFBFB] pt-[120px] pb-24 fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center space-y-8 mb-20">
          <div className="space-y-4">
            <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#6B705C] block">Professional Partnerships</span>
            <h1 className="text-6xl md:text-7xl font-black text-[#111111] tracking-tighter leading-tight">
              List Your <span className="text-[#6B705C] italic font-serif font-medium">Legacy</span> <br /> 
              With URBN
            </h1>
            <p className="text-[#666666] text-xl font-medium max-w-2xl mx-auto opacity-80">
              Our global network of high-net-worth investors and sophisticated buyers awaits your architectural masterpiece.
            </p>
          </div>
        </div>

        {/* Hero Marketing / Social Proof */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
          {[
            { label: 'Global Exposure', desc: 'Listing translated into 12 languages' },
            { label: 'Targeted Marketing', desc: 'AI-driven buyer matching system' },
            { label: 'Verified Network', desc: 'Access to 50k+ qualified investors' }
          ].map((item, idx) => (
            <div key={idx} className="p-10 bg-white rounded-[40px] border border-[#F0F0F0] shadow-sm text-center space-y-4">
              <h3 className="text-xs font-bold text-[#111111] uppercase tracking-[0.3em]">{item.label}</h3>
              <p className="text-sm text-[#666666] font-medium leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Centered Inquiry Form - Positioned above footer */}
        <div className="max-w-4xl mx-auto relative">
          <div className="absolute inset-0 bg-[#6B705C]/5 blur-[150px] rounded-full -z-10" />
          
          <div className="bg-white p-12 md:p-16 rounded-[60px] shadow-[0_50px_100px_rgba(0,0,0,0.05)] border border-[#F0F0F0] space-y-12">
            <div className="text-center space-y-3">
              <h2 className="text-3xl font-bold text-[#111111] tracking-tight">Property <span className="text-[#6B705C] italic font-medium">Inquiry</span> Form</h2>
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#999999]">Submit your property details for expert valuation</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-12">
              {/* Personal Information */}
              <div className="space-y-8">
                <div className="h-[1px] bg-[#F5F5F5] w-full" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-[#666666]">Full Name</label>
                    <input type="text" name="sellerName" value={formData.sellerName} onChange={handleChange} placeholder="John Doe" className="w-full bg-[#F7F7F5] border-none rounded-2xl px-6 py-5 outline-none focus:ring-2 focus:ring-[#111111]/5 transition-all" required />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-[#666666]">Email Address</label>
                    <input type="email" name="sellerEmail" value={formData.sellerEmail} onChange={handleChange} placeholder="john@example.com" className="w-full bg-[#F7F7F5] border-none rounded-2xl px-6 py-5 outline-none focus:ring-2 focus:ring-[#111111]/5 transition-all" required />
                  </div>
                </div>
              </div>

              {/* Property Details */}
              <div className="space-y-8">
                <div className="grid grid-cols-1 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-[#666666]">Property Title</label>
                    <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="e.g. Modern Cliffside Villa" className="w-full bg-[#F7F7F5] border-none rounded-2xl px-6 py-5 outline-none focus:ring-2 focus:ring-[#111111]/5 transition-all" required />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-[#666666]">Price (₹)</label>
                    <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="85,00,000" className="w-full bg-[#F7F7F5] border-none rounded-2xl px-6 py-5 outline-none" required />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-[#666666]">Location</label>
                    <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="Pune, Maharashtra" className="w-full bg-[#F7F7F5] border-none rounded-2xl px-6 py-5 outline-none" required />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-6">
                   <div className="space-y-3">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-[#666666]">Beds</label>
                    <input type="number" name="beds" value={formData.beds} onChange={handleChange} className="w-full bg-[#F7F7F5] border-none rounded-2xl px-6 py-5" required />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-[#666666]">Baths</label>
                    <input type="number" name="baths" value={formData.baths} onChange={handleChange} className="w-full bg-[#F7F7F5] border-none rounded-2xl px-6 py-5" required />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-[#666666]">Sqft</label>
                    <input type="number" name="area" value={formData.area} onChange={handleChange} className="w-full bg-[#F7F7F5] border-none rounded-2xl px-6 py-5" required />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-[#666666]">Property Description</label>
                  <textarea name="description" value={formData.description} onChange={handleChange} rows="5" className="w-full bg-[#F7F7F5] border-none rounded-[32px] px-8 py-6 outline-none resize-none" placeholder="Describe the unique architectural features..." required></textarea>
                </div>
              </div>

              <button type="submit" disabled={isSubmitting} className="w-full py-6 bg-[#111111] text-white rounded-[24px] text-[11px] font-bold uppercase tracking-[0.4em] shadow-2xl hover:bg-[#6B705C] transition-all flex items-center justify-center gap-4 active:scale-95">
                {isSubmitting ? <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" /> : 'Send Listing Inquiry'}
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Sell;
