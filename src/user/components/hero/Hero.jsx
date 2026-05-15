import React, { useState } from 'react';

const Hero = ({ onSearch }) => {
  const [searchData, setSearchData] = useState({
    location: '',
    type: 'All Types',
    listingType: 'All'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(searchData);
  };

  return (
    <section className="relative h-[90vh] min-h-[600px] w-full flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80" 
          alt="Luxury Residence" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-16 w-full">
        <div className="max-w-4xl space-y-8">
          <div className="space-y-4">
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/80 block">Find your dream home</span>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold leading-tight text-white">
              Find Your <br />
              <span className="italic font-medium text-[#B7B7A4]">Perfect</span> Space
            </h1>
            <p className="text-white/90 text-sm md:text-base lg:text-lg max-w-lg leading-relaxed font-medium">
              Experience the art of living in curated spaces designed for the modern lifestyle. Browse our exclusive collection of premium properties.
            </p>
          </div>

          {/* Requirement 1, 3, 10: Integrated Search Bar Component */}
          <div className="bg-white/10 backdrop-blur-md p-2 rounded-[2rem] border border-white/20 shadow-2xl w-full max-w-3xl">
            <form onSubmit={handleSubmit} className="flex flex-col md:flex-row items-center gap-2">
              <div className="flex-1 w-full bg-white rounded-2xl flex items-center px-4 py-3">
                <svg className="w-5 h-5 text-[#6B705C] mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <input 
                  type="text" 
                  placeholder="Where are you looking?" 
                  className="w-full focus:outline-none text-sm font-bold text-[#111111] uppercase tracking-widest placeholder:text-[#666666]/50"
                  value={searchData.location}
                  onChange={(e) => setSearchData({...searchData, location: e.target.value})}
                />
              </div>

              <div className="w-full md:w-auto bg-white rounded-2xl flex items-center px-4 py-3">
                <select 
                  className="w-full focus:outline-none text-[10px] font-bold text-[#111111] uppercase tracking-widest appearance-none bg-transparent"
                  value={searchData.type}
                  onChange={(e) => setSearchData({...searchData, type: e.target.value})}
                >
                  <option value="All Types">All Types</option>
                  <option value="Villa">Villa</option>
                  <option value="Apartment">Apartment</option>
                  <option value="Penthouse">Penthouse</option>
                </select>
              </div>

              <div className="w-full md:w-auto bg-white rounded-2xl flex items-center px-4 py-3">
                <select 
                  className="w-full focus:outline-none text-[10px] font-bold text-[#111111] uppercase tracking-widest appearance-none bg-transparent"
                  value={searchData.listingType}
                  onChange={(e) => setSearchData({...searchData, listingType: e.target.value})}
                >
                  <option value="All">Buy/Rent</option>
                  <option value="Sell">Buy</option>
                  <option value="Rent">Rent</option>
                </select>
              </div>

              <button 
                type="submit"
                className="w-full md:w-auto bg-[#6B705C] text-white px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-[#5a5e4d] transition-all shadow-lg active:scale-95"
              >
                Search
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
