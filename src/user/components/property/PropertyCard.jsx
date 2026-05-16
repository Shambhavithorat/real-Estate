import React from 'react';
import { Link } from 'react-router-dom';

const PropertyCard = ({ property }) => {
  const isSold = (property.status || '').toLowerCase() === 'sold';

  return (
    <div className={`relative w-full h-[280px] rounded-[1rem] overflow-hidden group transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_0_2px_#C5A059,0_20px_40px_rgba(197,160,89,0.2)] ${isSold ? 'opacity-70 grayscale' : 'cursor-pointer'}`}>
      {/* Full Card Image */}
      <div className="absolute inset-0 bg-[#111]">
        <img
          src={property.image || 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80'}
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>

      {/* Bottom Dark Overlay Section */}
      <div className="absolute bottom-0 left-0 right-0 h-[100px] bg-black/60 backdrop-blur-md flex flex-col items-center justify-center border-t border-white/10 transition-all duration-300 group-hover:-translate-y-1">

        {/* Inner Gold Gradient Glow */}
        <div className="absolute top-0 inset-x-0 h-16 bg-gradient-to-b from-[#C5A059]/20 to-transparent pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center text-center w-full mt-1">
          <h3 className="text-base font-bold text-white mb-0.5 line-clamp-1 px-4">{property.title || '4BHK Homes'}</h3>

          <div className="flex items-center justify-center gap-1 text-[#C5A059] text-[9px] uppercase font-bold tracking-widest mb-2 w-full px-4">
            <svg className="w-3 h-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="line-clamp-1 truncate max-w-[200px]">{property.location || property.city || 'Maharashtra'}</span>
          </div>

          <div className="flex items-center justify-between w-full px-5">
            <p className="text-[10px] text-white/70">From {property.sqft || '1898'} sq.ft</p>
            <Link
              to={isSold ? '#' : `/properties/${property.id || 1}`}
              className={`bg-white text-black text-[10px] font-bold px-4 py-1.5 rounded transition-colors shadow-sm ${isSold ? 'cursor-not-allowed text-gray-500' : 'hover:bg-[#C5A059] hover:text-white hover:shadow-md'}`}
            >
              {isSold ? 'Sold' : 'View'}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
