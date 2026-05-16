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
    <section className="relative h-screen min-h-[700px] w-full flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1920&q=80" 
          alt="Luxury Residence" 
          className="w-full h-full object-cover"
        />
        {/* Navy Blue Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#002D52]/90 via-[#002D52]/60 to-[#002D52]/80 mix-blend-multiply" />
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-16 w-full text-center flex flex-col items-center mt-16">
        <div className="space-y-6 fade-in max-w-4xl">
          <span className="text-[12px] text-[#C5A059] flex items-baseline justify-center">
            <span className="font-bold uppercase tracking-[0.4em]" style={{ fontFamily: 'Montserrat, sans-serif' }}>PROPERTY</span>
            <span className="font-normal capitalize mx-1.5 text-[2em] tracking-normal -mb-2" style={{ fontFamily: '"Alex Brush", cursive' }}>Vishva</span>
            <span className="font-bold uppercase tracking-[0.4em] ml-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>Real Estate</span>
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-tight text-white tracking-tighter">
            ELEVATE YOUR <br />
            <span className="italic font-light text-[#C5A059]">LIFESTYLE</span>
          </h1>
          <p className="text-white/90 text-sm md:text-lg max-w-2xl mx-auto leading-relaxed font-light mt-6">
            Discover unprecedented luxury. Curated estates and architectural masterpieces designed for the modern connoisseur.
          </p>
        </div>

        {/* Integrated Search Bar Component */}
        <div className="mt-16 bg-white/10 backdrop-blur-md p-3 rounded-[2rem] border border-white/20 shadow-2xl w-full max-w-4xl mx-auto fade-in" style={{animationDelay: '0.2s'}}>
          <form onSubmit={handleSubmit} className="flex flex-col md:flex-row items-center gap-3">
            <div className="flex-1 w-full bg-white rounded-2xl flex items-center px-6 py-4 border border-transparent transition-all hover:border-[#C5A059]">
              <svg className="w-5 h-5 text-[#C5A059] mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <input 
                type="text" 
                placeholder="Where to?" 
                className="w-full bg-transparent focus:outline-none text-sm font-medium text-[#002D52] uppercase tracking-widest placeholder:text-[#333333]/50"
                value={searchData.location}
                onChange={(e) => setSearchData({...searchData, location: e.target.value})}
              />
            </div>

            <div className="w-full md:w-auto bg-white rounded-2xl flex items-center px-6 py-4 border border-transparent transition-all hover:border-[#C5A059]">
              <select 
                className="w-full focus:outline-none text-[11px] font-bold text-[#002D52] uppercase tracking-widest appearance-none bg-transparent cursor-pointer"
                value={searchData.type}
                onChange={(e) => setSearchData({...searchData, type: e.target.value})}
              >
                <option value="All Types">All Types</option>
                <option value="Villa">Villa</option>
                <option value="Apartment">Apartment</option>
                <option value="Penthouse">Penthouse</option>
              </select>
            </div>

            <div className="w-full md:w-auto bg-white rounded-2xl flex items-center px-6 py-4 border border-transparent transition-all hover:border-[#C5A059]">
              <select 
                className="w-full focus:outline-none text-[11px] font-bold text-[#002D52] uppercase tracking-widest appearance-none bg-transparent cursor-pointer"
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
              className="w-full md:w-auto btn-premium py-4 px-10 rounded-2xl text-[11px]"
            >
              Search
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Hero;
