import React, { useState } from 'react';
import PropertyCard from '../components/property/PropertyCard';

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
    description: ''
  });

  const [myProperties, setMyProperties] = useState([
    { id: 101, title: 'Bayside Mansion', price: '$12,500,000', location: 'Miami, FL', beds: 7, baths: 6, area: '9,200', type: 'Mansion', status: 'sold', image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80' },
    { id: 102, title: 'The Ivy Estate', price: '$8,200,000', location: 'Greenwich, CT', beds: 5, baths: 5, area: '6,800', type: 'Villa', status: 'sold', image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80' },
    { id: 103, title: 'Urban Loft', price: '$4,150,000', location: 'Chicago, IL', beds: 3, baths: 3, area: '3,100', type: 'Apartment', status: 'sold', image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80' },
    { id: 104, title: 'Canyon View', price: '$6,900,000', location: 'Aspen, CO', beds: 5, baths: 4, area: '5,400', type: 'House', status: 'sold', image: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1200&q=80' },
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      const newProperty = {
        ...formData,
        id: Date.now(),
        price: `$${Number(formData.price).toLocaleString()}`
      };
      setMyProperties([newProperty, ...myProperties]);
      setIsSubmitting(false);
      setFormData({
        title: '',
        price: '',
        location: '',
        type: 'Villa',
        beds: '',
        baths: '',
        area: '',
        image: '',
        description: ''
      });
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#F7F7F5] pt-[120px] pb-24 fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          
          {/* Left: Form */}
          <div className="space-y-12">
            <div className="space-y-4">
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#6B705C] block">Partner with URBN</span>
              <h1 className="text-5xl font-bold text-[#111111]">List Your <br /> <span className="text-[#6B705C] italic font-medium">Architectural</span> Masterpiece</h1>
              <p className="text-[#666666] text-lg font-medium max-w-md">Our global network of high-net-worth individuals is waiting for your property.</p>
            </div>

            <form onSubmit={handleSubmit} className="card-premium p-10 space-y-8 bg-white shadow-2xl">
              <div className="space-y-6">
                <div className="grid grid-cols-1 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-[#666666]">Property Title</label>
                    <input 
                      type="text" name="title" value={formData.title} onChange={handleChange}
                      placeholder="e.g. Minimalist Oceanfront Villa" 
                      className="input-premium py-4" required 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-[#666666]">Price (USD)</label>
                    <input 
                      type="number" name="price" value={formData.price} onChange={handleChange}
                      placeholder="8500000" 
                      className="input-premium py-4" required 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-[#666666]">Location</label>
                    <input 
                      type="text" name="location" value={formData.location} onChange={handleChange}
                      placeholder="City, State" 
                      className="input-premium py-4" required 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-6">
                   <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-[#666666]">Beds</label>
                    <input type="number" name="beds" value={formData.beds} onChange={handleChange} className="input-premium py-4" required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-[#666666]">Baths</label>
                    <input type="number" name="baths" value={formData.baths} onChange={handleChange} className="input-premium py-4" required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-[#666666]">Sqft</label>
                    <input type="number" name="area" value={formData.area} onChange={handleChange} className="input-premium py-4" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-[#666666]">Image URL</label>
                  <input 
                    type="text" name="image" value={formData.image} onChange={handleChange}
                    placeholder="https://images.unsplash.com/..." 
                    className="input-premium py-4" 
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-[#666666]">Description</label>
                  <textarea 
                    name="description" value={formData.description} onChange={handleChange}
                    rows="4" className="input-premium py-4 resize-none" 
                  ></textarea>
                </div>
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full btn-premium py-5 flex items-center justify-center gap-3"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : 'Submit Listing'}
              </button>
            </form>
          </div>

          {/* Right: Preview / Marketing */}
          <div className="hidden lg:block space-y-12">
             <div className="rounded-[40px] overflow-hidden h-[500px] shadow-2xl relative group">
                <img src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80" alt="Marketing" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute bottom-10 left-10 right-10 p-8 bg-white/10 backdrop-blur-md rounded-3xl border border-white/20">
                   <p className="text-white font-bold text-xl leading-relaxed">"URBN turned our property listing into a global sensation. We sold in just 48 hours."</p>
                   <p className="text-white/60 text-xs font-bold uppercase tracking-widest mt-4">— David H., Penthouse Owner</p>
                </div>
             </div>

             <div className="grid grid-cols-2 gap-8">
                {[
                  { label: 'Global Reach', desc: 'Access to 10M+ luxury buyers' },
                  { label: 'AI Matching', desc: 'Predictive buyer analytics' },
                ].map(item => (
                  <div key={item.label} className="space-y-2">
                    <h4 className="text-sm font-bold text-[#111111] uppercase tracking-widest">{item.label}</h4>
                    <p className="text-xs text-[#666666] leading-relaxed">{item.desc}</p>
                  </div>
                ))}
             </div>
          </div>

        </div>

        {/* User Added Properties */}
        {myProperties.length > 0 && (
          <div className="mt-32 space-y-12 fade-in">
             <div className="flex items-center gap-6">
                <div className="h-[1px] flex-1 bg-[#E5E5E5]" />
                <h2 className="text-2xl font-bold text-[#111111] uppercase tracking-[0.2em]">Successful Sales Portfolio</h2>
                <div className="h-[1px] flex-1 bg-[#E5E5E5]" />
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                {myProperties.map(property => (
                  <PropertyCard key={property.id} property={property} />
                ))}
             </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Sell;
