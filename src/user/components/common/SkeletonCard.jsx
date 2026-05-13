import React from 'react';

const SkeletonCard = () => (
  <div className="card-premium animate-pulse">
    <div className="h-72 bg-[#E5E5E5]" />
    <div className="p-8 space-y-6">
      <div className="h-6 bg-[#E5E5E5] w-3/4 rounded" />
      <div className="h-4 bg-[#E5E5E5] w-1/2 rounded" />
      <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[#E5E5E5]">
        <div className="h-10 bg-[#E5E5E5] rounded" />
        <div className="h-10 bg-[#E5E5E5] rounded" />
        <div className="h-10 bg-[#E5E5E5] rounded" />
      </div>
      <div className="h-12 bg-[#E5E5E5] rounded-2xl" />
    </div>
  </div>
);

export default SkeletonCard;
