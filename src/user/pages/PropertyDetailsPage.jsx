import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { propertyService } from '../services/propertyService';

const PropertyDetailsPage = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const data = await propertyService.getPropertyById(id);
        setProperty(data);
      } catch (error) {
        console.error("Error fetching property details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProperty();
  }, [id]);

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-[#F7F7F5]">
    <div className="text-xl font-bold text-[#6B705C] animate-pulse">Loading Luxury Details...</div>
  </div>;

  if (!property) return <div className="min-h-screen flex flex-col items-center justify-center bg-[#F7F7F5] space-y-4">
    <div className="text-4xl">🏙️</div>
    <h2 className="text-2xl font-bold text-[#111111]">Property Not Found</h2>
    <p className="text-[#666666]">The property you are looking for does not exist or has been removed.</p>
  </div>;

  return (
    <div className="min-h-screen bg-[#F7F7F5] pt-[120px] pb-24 fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Gallery Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[600px] mb-16">
           <div className="md:col-span-2 rounded-[40px] overflow-hidden shadow-2xl">
              <img src={property.image || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"} alt={property.title} className="w-full h-full object-cover" />
           </div>
           <div className="grid grid-rows-2 gap-6">
              <div className="rounded-[30px] overflow-hidden shadow-xl">
                 <img src={property.image2 || "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=800&q=80"} alt="G1" className="w-full h-full object-cover" />
              </div>
              <div className="rounded-[30px] overflow-hidden shadow-xl relative group">
                 <img src={property.image3 || "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=80"} alt="G2" className="w-full h-full object-cover" />
                 <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-white text-xs font-bold uppercase tracking-widest">View All Photos</span>
                 </div>
              </div>
           </div>
        </div>

        {/* Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
           
           {/* Left: Info */}
           <div className="lg:col-span-2 space-y-10">
              <div className="space-y-4">
                 <div className="flex gap-3">
                    <span className="px-3 py-1.5 bg-[#6B705C]/10 text-[#6B705C] text-[10px] font-bold uppercase tracking-widest rounded-full">{property.propertyType || property.type || 'Villa'}</span>
                    <span className="px-3 py-1.5 bg-[#111111]/5 text-[#111111] text-[10px] font-bold uppercase tracking-widest rounded-full">For Sale</span>
                 </div>
                 <h1 className="text-4xl md:text-5xl font-bold text-[#111111] leading-tight">{property.title}</h1>
                 <p className="text-lg text-[#666666] flex items-center gap-2">
                    <svg className="w-5 h-5 text-[#6B705C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                    {property.location?.city || property.location || 'Pune, Maharashtra'}
                 </p>
              </div>

              {/* Specs */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-8 border-t border-b border-[#E5E5E5]">
                 {[
                   { label: 'Bedrooms', value: property.beds || '3' },
                   { label: 'Bathrooms', value: property.baths || '2' },
                   { label: 'Square Ft', value: property.sqft || '2,500' },
                   { label: 'Status', value: property.status || 'Available' },
                 ].map(spec => (
                   <div key={spec.label} className="space-y-1">
                      <p className="text-2xl md:text-3xl font-bold text-[#111111]">{spec.value}</p>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-[#666666]">{spec.label}</p>
                   </div>
                 ))}
              </div>

              {/* Description */}
              <div className="space-y-6">
                 <h3 className="text-xl md:text-2xl font-bold text-[#111111]">Architectural Description</h3>
                 <p className="text-base md:text-lg text-[#666666] leading-relaxed font-medium">
                    {property.description || 'Masterfully designed by renowned architects, this property offers unparalleled panoramic views. The seamless integration of indoor and outdoor spaces creates an atmosphere of sophisticated tranquility.'}
                 </p>
              </div>
           </div>

           {/* Right: Sidebar */}
           <aside className="space-y-8">
              <div className="card-premium p-8 space-y-8 sticky top-[100px]">
                 <div className="space-y-1">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#666666]">Listing Price</p>
                    <p className="text-3xl md:text-4xl font-bold text-[#111111]">
                      {property.price ? `₹${(property.price / 10000000).toFixed(2)} Cr` : '$0'}
                    </p>
                 </div>
                 
                 <div className="pt-6 border-t border-[#E5E5E5] space-y-6">
                    <div className="flex items-center gap-4">
                       <div className="w-14 h-14 rounded-full bg-[#6B705C] flex items-center justify-center text-white text-xl font-bold shrink-0">JD</div>
                       <div>
                          <h4 className="text-base font-bold text-[#111111]">Julianne Davis</h4>
                          <p className="text-[10px] text-[#6B705C] font-bold uppercase tracking-widest mt-1">Luxury Advisor</p>
                       </div>
                    </div>
                    
                    <div className="space-y-3">
                       <button className="w-full btn-premium py-4 text-xs">Schedule a Private Showing</button>
                       <button className="w-full py-4 border-2 border-[#111111] text-[#111111] text-[10px] font-bold uppercase tracking-widest rounded-xl hover:bg-[#111111] hover:text-white transition-all">Contact Agent</button>
                    </div>
                 </div>
              </div>
           </aside>

        </div>
      </div>
    </div>
  );
};

export default PropertyDetailsPage;
