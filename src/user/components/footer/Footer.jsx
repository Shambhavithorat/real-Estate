import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFilter } from '../../context/FilterContext';

const Footer = () => {
  const { setCategoryFilter } = useFilter();
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    setCategoryFilter(category);
    navigate('/');
    setTimeout(() => {
      const propertiesSection = document.getElementById('featured-properties');
      if (propertiesSection) {
        propertiesSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <footer className="bg-[#1A1A1A] border-t border-[#C5A059]/20 pt-20 pb-10">
      <div className="w-full px-4 md:px-8 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand */}
          <div className="space-y-6">
            <Link 
              to="/" 
              onClick={() => {
                setCategoryFilter('All');
                window.scrollTo(0, 0);
              }}
              className="flex items-center space-x-3 group"
            >
              <div className="w-10 h-10 bg-[#002D52] rounded-xl flex items-center justify-center text-white transition-all group-hover:bg-[#C5A059] group-hover:rotate-12 shadow-lg">
                 <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                 </svg>
              </div>
              <span className="text-xl md:text-2xl text-[#F9F9F9] flex items-baseline">
                <span className="font-bold uppercase tracking-[0.1em]" style={{ fontFamily: 'Montserrat, sans-serif' }}>PROPERTY</span>
                <span className="font-normal capitalize ml-1 text-[1.4em] tracking-normal" style={{ fontFamily: '"Alex Brush", cursive' }}>Vishva</span>
              </span>
            </Link>
            <p className="text-[#F9F9F9]/70 text-sm leading-relaxed font-light">
              Defining the future of luxury real estate through architectural excellence and curated living experiences.
            </p>
            <div className="flex items-center gap-4 pt-2">
              {['facebook', 'instagram', 'twitter', 'linkedin'].map(social => (
                <button key={social} className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-[#F9F9F9]/70 hover:bg-[#C5A059] hover:text-white hover:border-[#C5A059] transition-all">
                  <span className="sr-only">{social}</span>
                  <div className="w-4 h-4 bg-current rounded-sm" />
                </button>
              ))}
            </div>
          </div>

          {/* Links 1 */}
          <div className="space-y-6">
             <h4 className="text-xs font-bold uppercase tracking-[0.3em] text-[#C5A059]">Platform</h4>
             <ul className="space-y-4">
                <li><button onClick={() => { setCategoryFilter('All'); navigate('/'); window.scrollTo({top: 0, behavior: 'smooth'}); }} className="text-sm font-medium text-[#F9F9F9]/70 hover:text-[#C5A059] hover:translate-x-1 transition-all">Home</button></li>
                <li><button onClick={() => handleCategoryClick('Villa')} className="text-sm font-medium text-[#F9F9F9]/70 hover:text-[#C5A059] hover:translate-x-1 transition-all">Villa</button></li>
                <li><button onClick={() => handleCategoryClick('Apartment')} className="text-sm font-medium text-[#F9F9F9]/70 hover:text-[#C5A059] hover:translate-x-1 transition-all">Apartment</button></li>
                <li><button onClick={() => handleCategoryClick('Houses')} className="text-sm font-medium text-[#F9F9F9]/70 hover:text-[#C5A059] hover:translate-x-1 transition-all">Houses</button></li>
                <li><button onClick={() => handleCategoryClick('Plot')} className="text-sm font-medium text-[#F9F9F9]/70 hover:text-[#C5A059] hover:translate-x-1 transition-all">Plot</button></li>
             </ul>
          </div>

          {/* Links 2 - Contact Us */}
          <div className="space-y-6">
             <h4 className="text-xs font-bold uppercase tracking-[0.3em] text-[#C5A059]">Contact Us</h4>
             <div className="space-y-4">
                <div className="space-y-2">
                  <p className="text-sm text-[#F9F9F9] font-medium">Shop No. 5, Grandstand Apartment</p>
                  <p className="text-sm text-[#F9F9F9]/70">Survey No. 2945, K/10, Pratibha Nagar Road,</p>
                  <p className="text-sm text-[#F9F9F9]/70">Kolhapur</p>
                </div>
                <div className="space-y-2 pt-2">
                  <p className="text-sm text-[#F9F9F9]/70">Phone: <span className="text-[#C5A059] font-medium">+91-9172020494</span></p>
                  <p className="text-sm text-[#F9F9F9]/70">Email: <span className="text-[#C5A059] font-medium">contact@propertyvishva.com</span></p>
                </div>
             </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-6">
             <h4 className="text-xs font-bold uppercase tracking-[0.3em] text-[#C5A059]">Newsletter</h4>
             <p className="text-sm text-[#F9F9F9]/70">Join our exclusive list for early access to new architectural listings.</p>
             <form className="space-y-3">
                <input type="email" placeholder="Email Address" className="w-full bg-white/5 border border-white/10 px-5 py-4 rounded-xl text-sm text-[#F9F9F9] focus:outline-none focus:border-[#C5A059] transition-all" />
                <button className="w-full btn-premium py-4 text-xs">Subscribe</button>
             </form>
          </div>

        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
           <div className="text-[10px] font-bold tracking-[0.2em] text-[#F9F9F9]/50 flex items-baseline flex-wrap justify-center md:justify-start" style={{ fontFamily: 'Montserrat, sans-serif' }}>
             © 2026 <span className="uppercase mx-1">PROPERTY</span><span className="font-normal capitalize mr-1 text-[1.4em] tracking-normal" style={{ fontFamily: '"Alex Brush", cursive' }}>Vishva</span><span>Luxury Real Estate. All rights reserved.</span>
           </div>
           <div className="flex gap-8">
              <Link to="/" className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#F9F9F9]/50 hover:text-[#C5A059] transition-colors">Privacy Policy</Link>
              <Link to="/" className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#F9F9F9]/50 hover:text-[#C5A059] transition-colors">Terms of Service</Link>
           </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
