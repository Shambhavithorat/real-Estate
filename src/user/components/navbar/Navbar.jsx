import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Buy', href: '/buy' },
    { name: 'Rent', href: '/rent' },
    { name: 'Sell', href: '/sell' },
    { name: 'Agents', href: '/agents' },
  ];

  const isActive = (path) => location.pathname === path;

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // For now, redirect to Buy page with search param
      navigate(`/buy?q=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 h-[70px] bg-white transition-all duration-500 border-b ${scrolled ? 'border-[#E5E5E5] shadow-sm' : 'border-transparent'
          }`}
      >
        <div className="max-w-full mx-auto px-6 md:px-12 lg:px-16 h-full">
          <div className="flex items-center justify-between h-full">

            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 bg-[#6B705C] rounded-xl flex items-center justify-center transition-transform group-hover:rotate-12">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <span className="text-xl font-bold tracking-[0.3em] text-[#111111]">
                URBN
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center space-x-10">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`relative text-xs font-bold uppercase tracking-widest transition-all duration-300 group ${isActive(link.href) ? 'text-[#6B705C]' : 'text-[#666666] hover:text-[#111111]'
                    }`}
                >
                  {link.name}
                  <span className={`absolute -bottom-1.5 left-0 h-[2px] bg-[#6B705C] transition-all duration-300 ${isActive(link.href) ? 'w-full' : 'w-0 group-hover:w-full'
                    }`} />
                </Link>
              ))}
            </div>

            {/* Actions */}
            <div className="hidden lg:flex items-center space-x-8">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="text-[#111111] hover:text-[#6B705C] transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
              <Link to="/login" className="text-xs font-bold uppercase tracking-widest text-[#111111] hover:text-[#6B705C]">
                Sign In
              </Link>
              <Link to="/signup" className="px-6 py-2.5 bg-[#6B705C] text-white text-[10px] font-bold uppercase tracking-[0.2em] rounded-full hover:bg-[#5a5e4d] transition-all shadow-md">
                Sign Up
              </Link>
            </div>

            {/* Mobile Toggle */}
            <button
              className="lg:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>

          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden absolute top-[70px] left-0 right-0 bg-white border-b border-[#E5E5E5] transition-all duration-500 overflow-hidden ${mobileMenuOpen ? 'max-h-[400px]' : 'max-h-0'}`}>
          <div className="px-4 py-8 space-y-6">
            <button
              onClick={() => { setIsSearchOpen(true); setMobileMenuOpen(false); }}
              className="flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-[#666666]"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Search
            </button>
            {navLinks.map((link) => (
              <Link key={link.name} to={link.href} className="block text-sm font-bold uppercase tracking-widest text-[#666666]">
                {link.name}
              </Link>
            ))}
            <div className="pt-6 border-t border-[#E5E5E5] flex flex-col space-y-4">
              <Link to="/login" className="text-sm font-bold uppercase tracking-widest text-[#111111]">Sign In</Link>
              <Link to="/signup" className="w-full py-4 bg-[#6B705C] text-white text-center text-xs font-bold uppercase tracking-widest rounded-xl">Sign Up</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Global Search Overlay */}
      <div className={`fixed inset-0 z-[100] transition-all duration-500 ${isSearchOpen ? 'visible' : 'invisible'}`}>
        <div
          className={`absolute inset-0 bg-[#111111]/90 backdrop-blur-md transition-opacity duration-500 ${isSearchOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setIsSearchOpen(false)}
        />
        <div className={`absolute top-0 left-0 right-0 p-12 transition-all duration-700 transform ${isSearchOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-12">
              <span className="text-white text-2xl font-bold tracking-[0.3em]">URBN SEARCH</span>
              <button onClick={() => setIsSearchOpen(false)} className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-[#111111] transition-all">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                autoFocus
                placeholder="Search by area, property type, or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border-b-2 border-white/20 py-8 text-3xl md:text-5xl font-light text-white placeholder:text-white/20 focus:outline-none focus:border-[#6B705C] transition-all"
              />
              <button type="submit" className="absolute right-0 top-1/2 -translate-y-1/2 text-white/50 hover:text-[#6B705C] transition-colors">
                <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </form>
            <div className="mt-12">
              <p className="text-white/40 text-[10px] font-bold uppercase tracking-[0.4em] mb-6">Trending Searches</p>
              <div className="flex flex-wrap gap-4">
                {['Pune', 'Kharadi', 'Luxury Villa', 'Mumbai', 'Bandra', 'Penthouse'].map(tag => (
                  <button
                    key={tag}
                    onClick={() => setSearchQuery(tag)}
                    className="px-6 py-2 rounded-full border border-white/10 text-white/60 text-[10px] font-bold uppercase tracking-widest hover:border-[#6B705C] hover:text-white transition-all"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
