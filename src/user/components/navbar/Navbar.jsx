import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../shared/hooks/useAuth';
import { useFilter } from '../../context/FilterContext';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { categoryFilter, setCategoryFilter } = useFilter();
  const { currentUser, userData, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/', action: () => setCategoryFilter('All') },
    { name: 'Villa', action: () => setCategoryFilter('Villa') },
    { name: 'Apartment', action: () => setCategoryFilter('Apartment') },
    { name: 'Houses', action: () => setCategoryFilter('Houses') },
    { name: 'Plot', action: () => setCategoryFilter('Plot') },
  ];

  const handleLinkClick = (link) => {
    if (link.href) {
      navigate(link.href);
    } else {
      if (location.pathname !== '/') {
        navigate('/');
      }
      setTimeout(() => {
        const propertiesSection = document.getElementById('featured-properties');
        if (propertiesSection) {
          propertiesSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
    
    if (link.action) {
      link.action();
    }
    setMobileMenuOpen(false);
  };

  const isActive = (link) => {
    if (link.href === '/') {
      return location.pathname === '/' && categoryFilter === 'All';
    }
    if (link.href) return location.pathname === link.href;
    if (location.pathname === '/') return categoryFilter === link.name;
    return false;
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
      setIsProfileOpen(false);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/buy?q=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 h-[80px] transition-all duration-500 border-b ${scrolled ? 'bg-[#002D52] shadow-lg border-[#002D52]' : 'bg-transparent border-transparent'
          }`}
      >
        <div className="w-full px-4 md:px-8 lg:px-8 h-full">
          <div className="flex items-center justify-between h-full">

            {/* Logo */}
            <Link 
              to="/" 
              onClick={() => {
                setCategoryFilter('All');
                window.scrollTo(0, 0);
              }}
              className="flex items-center space-x-3 group"
            >
              <div className="w-10 h-10 border-2 border-white rounded-xl flex items-center justify-center transition-all group-hover:bg-[#C5A059] group-hover:border-[#C5A059] group-hover:rotate-12 shadow-sm">
                <svg className="w-6 h-6 text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <span className="text-2xl md:text-3xl text-white flex items-baseline">
                <span className="font-bold uppercase tracking-[0.1em]" style={{ fontFamily: 'Montserrat, sans-serif' }}>PROPERTY</span>
                <span className="font-normal capitalize ml-1 text-[1.4em] tracking-normal" style={{ fontFamily: '"Alex Brush", cursive' }}>Vishva</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center space-x-12">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => handleLinkClick(link)}
                  className={`relative text-xs font-bold uppercase tracking-[0.15em] transition-all duration-300 group ${isActive(link) ? 'text-[#C5A059]' : 'text-white hover:text-[#C5A059]'
                    }`}
                >
                  {link.name}
                  <span className={`absolute -bottom-2 left-0 h-[2px] bg-[#C5A059] transition-all duration-300 ${isActive(link) ? 'w-full' : 'w-0 group-hover:w-full'
                    }`} />
                </button>
              ))}
            </div>

            <div className="hidden lg:flex items-center space-x-8">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="text-white hover:text-[#C5A059] transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
              
              {currentUser ? (
                <div className="relative">
                  <button 
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center gap-3 group"
                  >
                    <div className="text-right">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-white group-hover:text-[#C5A059] transition-colors line-clamp-1">{userData?.displayName || 'User'}</p>
                      <p className="text-[8px] font-bold uppercase tracking-[0.2em] text-white/70">{userData?.role}</p>
                    </div>
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center border border-white group-hover:border-[#C5A059] transition-all shadow-md">
                      <span className="text-[10px] font-bold text-[#002D52] uppercase">{(userData?.displayName || 'U').charAt(0)}</span>
                    </div>
                  </button>

                  {isProfileOpen && (
                    <div className="absolute right-0 mt-4 w-56 bg-white border border-[#002D52]/10 shadow-[0_10px_40px_rgba(0,0,0,0.1)] rounded-2xl py-3 z-50 fade-in">
                      <div className="px-5 py-3 border-b border-[#002D52]/5 mb-2">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-[#002D52]">{userData?.displayName}</p>
                        <p className="text-[8px] font-medium text-[#333333] truncate mt-1">{currentUser.email}</p>
                      </div>
                      
                      {userData?.role === 'admin' && (
                        <Link to="/admin/dashboard" className="block px-5 py-3 text-[10px] font-bold uppercase tracking-widest text-[#333333] hover:text-[#C5A059] hover:bg-[#F9F9F9] transition-all">Admin Dashboard</Link>
                      )}
                      {userData?.role === 'broker' && (
                        <Link to="/broker/dashboard" className="block px-5 py-3 text-[10px] font-bold uppercase tracking-widest text-[#333333] hover:text-[#C5A059] hover:bg-[#F9F9F9] transition-all">Broker Dashboard</Link>
                      )}
                      
                      <button 
                        onClick={handleLogout}
                        className="w-full text-left px-5 py-3 text-[10px] font-bold uppercase tracking-widest text-red-500 hover:bg-red-50 transition-colors"
                      >
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-6">
                  <Link to="/login" className="text-xs font-bold uppercase tracking-widest text-white hover:text-[#C5A059] transition-colors">
                    Sign In
                  </Link>
                  <Link to="/signup" className="btn-premium bg-white !text-[#002D52] hover:bg-[#F9F9F9]">
                    Sign Up
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Toggle */}
            <button
              className="lg:hidden p-2 text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>

          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden absolute top-[80px] left-0 right-0 bg-[#002D52] border-b border-white/10 transition-all duration-500 overflow-hidden ${mobileMenuOpen ? 'max-h-[500px]' : 'max-h-0'}`}>
          <div className="px-6 py-8 space-y-6">
            <button
              onClick={() => { setIsSearchOpen(true); setMobileMenuOpen(false); }}
              className="flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-white hover:text-[#C5A059] transition-colors w-full"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Search
            </button>
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleLinkClick(link)}
                className={`block w-full text-left text-sm font-bold uppercase tracking-widest ${isActive(link) ? 'text-[#C5A059]' : 'text-white'}`}
              >
                {link.name}
              </button>
            ))}
            <div className="pt-6 border-t border-white/10 flex flex-col space-y-4">
              {currentUser ? (
                <>
                  <div className="px-2 py-2">
                    <p className="text-sm font-bold uppercase tracking-widest text-white">{userData?.displayName}</p>
                    <p className="text-xs text-[#C5A059] font-medium">{userData?.role}</p>
                  </div>
                  {userData?.role === 'admin' && (
                    <Link to="/admin/dashboard" onClick={() => setMobileMenuOpen(false)} className="text-sm font-bold uppercase tracking-widest text-white/80 hover:text-[#C5A059]">Admin Dashboard</Link>
                  )}
                  {userData?.role === 'broker' && (
                    <Link to="/broker/dashboard" onClick={() => setMobileMenuOpen(false)} className="text-sm font-bold uppercase tracking-widest text-white/80 hover:text-[#C5A059]">Broker Dashboard</Link>
                  )}
                  <button 
                    onClick={handleLogout}
                    className="w-full py-4 bg-red-500/20 text-red-500 text-center text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-red-500 hover:text-white transition-all"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="text-sm font-bold uppercase tracking-widest text-white text-center w-full block py-2">Sign In</Link>
                  <Link to="/signup" onClick={() => setMobileMenuOpen(false)} className="w-full btn-premium bg-white !text-[#002D52] py-4 block text-center">Sign Up</Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Global Search Overlay */}
      <div className={`fixed inset-0 z-[100] transition-all duration-500 ${isSearchOpen ? 'visible' : 'invisible'}`}>
        <div
          className={`absolute inset-0 bg-[#002D52]/95 backdrop-blur-md transition-opacity duration-500 ${isSearchOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setIsSearchOpen(false)}
        />
        <div className={`absolute top-0 left-0 right-0 p-6 md:p-12 transition-all duration-700 transform ${isSearchOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-12">
              <span className="text-[#C5A059] text-2xl md:text-3xl flex items-baseline">
                <span className="font-bold uppercase tracking-[0.1em] mr-3" style={{ fontFamily: 'Montserrat, sans-serif' }}>Search</span>
                <span className="font-bold uppercase tracking-[0.1em]" style={{ fontFamily: 'Montserrat, sans-serif' }}>PROPERTY</span>
                <span className="font-normal capitalize ml-1 text-[1.4em] tracking-normal" style={{ fontFamily: '"Alex Brush", cursive' }}>Vishva</span>
              </span>
              <button onClick={() => setIsSearchOpen(false)} className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-[#002D52] transition-all">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                autoFocus
                placeholder="Area, type, or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border-b-2 border-white/20 py-6 md:py-8 text-3xl md:text-5xl font-light text-white placeholder:text-white/40 focus:outline-none focus:border-[#C5A059] transition-all"
              />
              <button type="submit" className="absolute right-0 top-1/2 -translate-y-1/2 text-white/50 hover:text-[#C5A059] transition-colors">
                <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </form>
            <div className="mt-12">
              <p className="text-white/60 text-[10px] font-bold uppercase tracking-[0.4em] mb-6">Trending Collections</p>
              <div className="flex flex-wrap gap-4">
                {['Pune', 'Kharadi', 'Luxury Villa', 'Mumbai', 'Bandra', 'Penthouse'].map(tag => (
                  <button
                    key={tag}
                    onClick={() => setSearchQuery(tag)}
                    className="px-6 py-3 rounded-full border border-white/20 text-white text-[10px] font-bold uppercase tracking-widest hover:border-[#C5A059] hover:bg-[#C5A059] hover:text-white transition-all"
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
