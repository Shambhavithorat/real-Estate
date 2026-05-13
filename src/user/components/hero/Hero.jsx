import React from 'react';

const Hero = () => {
  return (
    <section className="relative h-[90vh] min-h-[500px] w-full flex items-center overflow-hidden">
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
        <div className="max-w-2xl space-y-6 md:space-y-10">
          <div className="space-y-3 md:space-y-5">
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/80 block">Find your dream home</span>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold leading-tight md:leading-[1.1] text-white">
              Find Your <br />
              <span className="italic font-medium text-[#B7B7A4]">Perfect</span> Space
            </h1>
            <p className="text-white/90 text-sm md:text-base lg:text-lg max-w-lg leading-relaxed font-medium">
              Experience the art of living in curated spaces designed for the modern lifestyle. Browse our exclusive collection of premium properties.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
