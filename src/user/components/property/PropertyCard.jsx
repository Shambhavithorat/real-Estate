import React from 'react';
import { Link } from 'react-router-dom';

const PropertyCard = ({ property }) => {
  const isSold = (property.status || '').toLowerCase() === 'sold';

  return (
    <div className={`relative w-full h-[320px] rounded-[1rem] overflow-hidden group transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_0_2px_#C5A059,0_20px_40px_rgba(197,160,89,0.2)] ${isSold ? 'opacity-70 grayscale' : 'cursor-pointer'}`}>
      {/* Top White Section for Image */}
      <div className="absolute inset-0 bg-white h-[240px] p-4 flex justify-center items-center">
        <img 
          src={property.image || 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80'} 
          alt={property.title} 
          className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
        />
      </div>

      {/* Bottom Dark Overlay Section */}
      <div className="absolute bottom-0 left-0 right-0 h-[110px] bg-[#0A0A0A] rounded-[1rem] flex flex-col items-center justify-center border-t border-[#C5A059]/30 transition-all duration-300 group-hover:-translate-y-1">
        
        {/* Inner Gold Gradient Glow */}
        <div className="absolute top-0 inset-x-0 h-16 bg-gradient-to-b from-[#C5A059]/30 to-transparent rounded-t-[1rem] pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center text-center">
          <h3 className="text-lg font-bold text-white mb-1.5 line-clamp-1 px-4">{property.title || '4BHK Homes'}</h3>
          <p className="text-xs text-white/80 mb-3">Starting from {property.sqft || '1898'} sq. ft.</p>
          <Link 
            to={isSold ? '#' : `/properties/${property.id || 1}`}
            className={`bg-white text-black text-[11px] font-bold px-6 py-1.5 rounded transition-colors shadow-sm ${isSold ? 'cursor-not-allowed text-gray-500' : 'hover:bg-[#C5A059] hover:text-white hover:shadow-md'}`}
          >
            {isSold ? 'Sold' : 'View Plan'}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
