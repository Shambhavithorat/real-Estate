import React from 'react';
import Buy from './Buy';

const Rent = () => {
  return (
    <div className="fade-in">
       <div className="bg-[#111111] py-4 text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#6B705C]">Curated Rental Collection</p>
       </div>
       <Buy />
    </div>
  );
};

export default Rent;
