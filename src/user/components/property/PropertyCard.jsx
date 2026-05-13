import React from 'react';
import { Link } from 'react-router-dom';
import { formatPrice } from '../../../shared/utils/formatPrice';

const PropertyCard = ({ property }) => {
  const statusConfig = {
    available: { label: 'Available', color: 'bg-green-600' },
    sold: { label: 'Sold', color: 'bg-red-600' },
    pending: { label: 'Pending', color: 'bg-orange-500' },
    rented: { label: 'Rented', color: 'bg-blue-600' },
    'under-construction': { label: 'Under Construction', color: 'bg-yellow-500' },
  };

  const status = (property.status || 'available').toLowerCase();
  const config = statusConfig[status] || statusConfig['available'];
  const isSold = status === 'sold';

  return (
    <div className={`card-premium group overflow-hidden bg-white transition-all duration-500 ${isSold ? 'opacity-75 grayscale-[0.3]' : ''}`}>
      {/* Image Section */}
      <div className="relative h-60 overflow-hidden">
        <img 
          src={property.image || 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=800&q=80'} 
          alt={property.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Status Badge (Top-Left) */}
        <div className="absolute top-4 left-4">
           <div className={`${config.color} text-white text-[9px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg flex items-center gap-2`}>
              <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              {config.label}
           </div>
        </div>

        <div className="absolute top-4 right-4">
          <button className="w-9 h-9 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-[#111111] hover:bg-[#6B705C] hover:text-white transition-all shadow-lg">
            <svg className="w-4 h-4" fill={isSold ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>

         <div className="absolute bottom-4 left-4">
            <span className="px-3 py-1 bg-white/90 backdrop-blur-md text-[9px] font-bold uppercase tracking-widest text-[#111111] rounded-lg shadow-sm">
              {property.propertyType || property.type || 'House'}
            </span>
         </div>
      </div>

      {/* Info Section */}
      <div className="p-6 space-y-4">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-[#111111] line-clamp-1 group-hover:text-[#6B705C] transition-colors">{property.title || 'Modern Minimalist Villa'}</h3>
            <p className="text-[10px] text-[#666666] font-medium flex items-center gap-1">
               <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
               </svg>
               {property.location || property.city || 'Pune, Maharashtra'}
            </p>
          </div>
          <div className="text-right">
             <p className="text-sm font-bold text-[#111111]">{formatPrice(property.price || 4250000)}</p>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 border-y border-[#F7F7F5] py-4">
           <div className="text-center space-y-1">
              <p className="text-xs font-bold text-[#111111]">{property.beds || 5}</p>
              <p className="text-[8px] font-bold text-[#666666] uppercase tracking-widest">Beds</p>
           </div>
           <div className="text-center space-y-1 border-x border-[#F7F7F5]">
              <p className="text-xs font-bold text-[#111111]">{property.baths || 4}</p>
              <p className="text-[8px] font-bold text-[#666666] uppercase tracking-widest">Baths</p>
           </div>
           <div className="text-center space-y-1">
              <p className="text-xs font-bold text-[#111111]">{property.sqft || property.area || '4,500'}</p>
              <p className="text-[8px] font-bold text-[#666666] uppercase tracking-widest">Area</p>
           </div>
        </div>

        <Link 
          to={isSold ? '#' : `/properties/${property.id || 1}`}
          className={`block w-full py-3.5 border-2 text-center text-[10px] font-bold uppercase tracking-[0.2em] rounded-xl transition-all duration-300 ${
            isSold 
              ? 'bg-[#E5E5E5] border-[#E5E5E5] text-[#666666] cursor-not-allowed' 
              : 'border-[#111111] text-[#111111] hover:bg-[#111111] hover:text-white'
          }`}
        >
          {isSold ? 'Property Sold' : 'View Details'}
        </Link>
      </div>
    </div>
  );
};

export default PropertyCard;
