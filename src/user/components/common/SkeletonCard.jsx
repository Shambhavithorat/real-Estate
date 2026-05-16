import React from 'react';

const SkeletonCard = () => (
  <div className="relative w-full h-[280px] rounded-[1rem] overflow-hidden bg-[#111] animate-pulse">
    <div className="absolute inset-0 bg-[#222]" />
    <div className="absolute bottom-0 left-0 right-0 h-[100px] bg-[#0A0A0A] flex flex-col items-center justify-center border-t border-[#C5A059]/10">
       <div className="h-5 bg-white/10 w-1/2 rounded mb-2" />
       <div className="h-3 bg-white/10 w-1/3 rounded mb-4" />
       <div className="h-6 bg-white/10 w-24 rounded" />
    </div>
  </div>
);

export default SkeletonCard;
