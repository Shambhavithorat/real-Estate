import React from 'react';

const SkeletonCard = () => (
  <div className="relative w-full h-[320px] rounded-[1rem] overflow-hidden bg-[#111] animate-pulse">
    <div className="absolute inset-0 bg-white/10 h-[240px]" />
    <div className="absolute bottom-0 left-0 right-0 h-[110px] bg-[#0A0A0A] rounded-[1rem] flex flex-col items-center justify-center border-t border-white/5">
       <div className="h-5 bg-white/10 w-1/2 rounded mb-2" />
       <div className="h-3 bg-white/10 w-1/3 rounded mb-4" />
       <div className="h-6 bg-white/10 w-24 rounded" />
    </div>
  </div>
);

export default SkeletonCard;
