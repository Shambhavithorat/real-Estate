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
    <footer className="bg-white border-t border-[#E5E5E5] pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-[#6B705C] rounded-xl flex items-center justify-center text-white">
                 <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                 </svg>
              </div>
              <span className="text-lg font-bold tracking-[0.1em] text-[#111111]">PropertyVishva</span>
            </Link>
            <p className="text-[#666666] text-xs leading-relaxed">
              Defining the future of luxury real estate through architectural excellence and curated living experiences.
            </p>
            <div className="flex items-center gap-3">
              {['facebook', 'instagram', 'twitter', 'linkedin'].map(social => (
                <button key={social} className="w-8 h-8 rounded-full border border-[#E5E5E5] flex items-center justify-center text-[#666666] hover:bg-[#111111] hover:text-white transition-all">
                  <span className="sr-only">{social}</span>
                  <div className="w-3 h-3 bg-current rounded-sm" />
                </button>
              ))}
            </div>
          </div>

          {/* Links 1 */}
          <div className="space-y-4">
             <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#111111]">Platform</h4>
             <ul className="space-y-2">
                <li><button onClick={() => { setCategoryFilter('All'); navigate('/'); window.scrollTo({top: 0, behavior: 'smooth'}); }} className="text-xs font-medium text-[#666666] hover:text-[#6B705C] transition-colors">Home</button></li>
                <li><button onClick={() => handleCategoryClick('Villa')} className="text-xs font-medium text-[#666666] hover:text-[#6B705C] transition-colors">Villa</button></li>
                <li><button onClick={() => handleCategoryClick('Apartment')} className="text-xs font-medium text-[#666666] hover:text-[#6B705C] transition-colors">Apartment</button></li>
                <li><button onClick={() => handleCategoryClick('Houses')} className="text-xs font-medium text-[#666666] hover:text-[#6B705C] transition-colors">Houses</button></li>
                <li><button onClick={() => handleCategoryClick('Plot')} className="text-xs font-medium text-[#666666] hover:text-[#6B705C] transition-colors">Plot</button></li>
             </ul>
          </div>

          {/* Links 2 - Contact Us */}
          <div className="space-y-4">
             <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#111111]">Contact Us</h4>
             <div className="space-y-3">
                <div className="space-y-1">
                  <p className="text-xs text-[#111111] font-semibold">Shop No. 5, Grandstand Apartment</p>
                  <p className="text-xs text-[#666666]">Survey No. 2945, K/10, Pratibha Nagar Road,</p>
                  <p className="text-xs text-[#666666]">Kolhapur</p>
                </div>
                <div className="space-y-1 pt-2">
                  <p className="text-xs text-[#111111] font-semibold">Phone: <span className="text-[#6B705C]">+91-9172020494</span></p>
                  <p className="text-xs text-[#111111] font-semibold">Email: <span className="text-[#6B705C]">mayasindhuofficial@gmail.com</span></p>
                </div>
             </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
             <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#111111]">Newsletter</h4>
             <p className="text-xs text-[#666666]">Join our exclusive list for early access to new architectural listings.</p>
             <form className="space-y-3">
                <input type="email" placeholder="Email Address" className="w-full bg-[#F7F7F5] border-none px-4 py-3 rounded-xl text-xs focus:ring-1 focus:ring-[#6B705C]" />
                <button className="w-full btn-premium py-3 text-xs">Subscribe</button>
             </form>
          </div>

        </div>

        {/* Bottom */}
        <div className="pt-6 border-t border-[#E5E5E5] flex flex-col md:flex-row justify-between items-center gap-4">
           <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#666666]">© 2026 PROPERTYVISHVA LUXURY REAL ESTATE. ALL RIGHTS RESERVED.</p>
           <div className="flex gap-6">
              <Link to="/" className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#666666] hover:text-[#111111]">Privacy Policy</Link>
              <Link to="/" className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#666666] hover:text-[#111111]">Terms of Service</Link>
           </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
