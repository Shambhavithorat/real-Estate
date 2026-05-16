import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '../components/hero/Hero';
import PropertyCard from '../components/property/PropertyCard';
import SkeletonCard from '../components/common/SkeletonCard';
import { propertyService } from '../services/propertyService';
import { useFilter } from '../context/FilterContext';

const Home = () => {
  const { categoryFilter } = useFilter();
  const location = useLocation();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('Newest');
  const [currentPage, setCurrentPage] = useState(1);
  const mainRef = useRef(null);
  const itemsPerPage = 8;
  const [filters, setFilters] = useState({
    location: '',
    type: 'All Types',
    listingType: 'All',
    priceRange: 'Any',
    bedrooms: 'Any',
    bathrooms: 'Any',
    furnishing: 'Any'
  });

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const queryParam = params.get('q');
    if (queryParam) {
      setFilters(prev => ({ ...prev, location: queryParam }));
    }

    setLoading(true);
    const unsubscribe = propertyService.subscribeProperties((data) => {
      setProperties(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [location.search]);

  const handleSearchSubmit = (searchFilters) => {
    setFilters(prev => ({ ...prev, ...searchFilters }));
    mainRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const filteredProperties = properties.filter(property => {
    const propertyLocation = (property.location || property.city || property.address || "").toLowerCase();
    const searchLocation = (filters.location || "").toLowerCase();
    const matchesLocation = propertyLocation.includes(searchLocation);
    
    const propertyType = property.type || property.propertyType || "";
    let matchesType = filters.type === 'All Types' || propertyType === filters.type;

    if (categoryFilter !== 'All') {
      matchesType = propertyType === categoryFilter;
    }

    const listingType = property.listingType || property.status === 'rent' ? 'Rent' : 'Sell'; 
    const matchesListingType = filters.listingType === 'All' || 
                               property.listingType === filters.listingType || 
                               (filters.listingType === 'Rent' && property.status === 'rent') ||
                               (filters.listingType === 'Sell' && property.status === 'sale');

    return matchesLocation && matchesType && matchesListingType;
  });

  const sortedProperties = [...filteredProperties].sort((a, b) => {
    if (sortBy === 'Price: Low to High') return a.price - b.price;
    if (sortBy === 'Price: High to Low') return b.price - a.price;
    const dateA = new Date(a.updatedAt || 0);
    const dateB = new Date(b.updatedAt || 0);
    if (dateA && dateB && dateA !== dateB) return dateB - dateA;
    return (b.id || "").localeCompare(a.id || "");
  });

  const totalPages = Math.ceil(sortedProperties.length / itemsPerPage);
  const paginatedProperties = sortedProperties.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    if (mainRef.current) {
      const offset = mainRef.current.getBoundingClientRect().top + window.pageYOffset - 100;
      window.scrollTo({ top: offset, behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-[#F9F9F9] min-h-screen text-[#333333]">
      <Hero onSearch={handleSearchSubmit} />

      {/* Featured Properties Section */}
      <section id="featured-properties" className="py-24 px-6 md:px-12 lg:px-16 bg-[#050505] relative" ref={mainRef}>
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16 space-y-4 relative">
            <h2 className="text-4xl md:text-5xl font-bold text-[#C5A059]">Featured Properties</h2>
            <p className="text-white text-lg max-w-2xl mx-auto font-light leading-relaxed">
              Every property is more than just four walls it's a promise of <br className="hidden md:block"/>
              luxury, comfort and growth. Step into a lifestyle
            </p>
            
            {/* Sort Dropdown */}
            <div className="absolute right-0 top-0 hidden lg:block w-48">
               <select 
                 className="w-full bg-[#111] border border-white/10 rounded-md px-4 py-2 text-xs font-bold uppercase tracking-widest text-white focus:outline-none focus:border-[#C5A059] appearance-none cursor-pointer"
                 value={sortBy}
                 onChange={(e) => setSortBy(e.target.value)}
               >
                 <option value="Newest">Newest First</option>
                 <option value="Price: Low to High">Price: Low to High</option>
                 <option value="Price: High to Low">Price: High to Low</option>
               </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {loading ? (
              Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
            ) : paginatedProperties.length > 0 ? (
              paginatedProperties.map(property => (
                <PropertyCard key={property.id} property={property} />
              ))
            ) : (
              <div className="col-span-full py-20 flex flex-col items-center justify-center text-center space-y-4">
                <p className="text-white/70 text-lg">No Masterpieces Found</p>
                <button 
                  onClick={() => setFilters({ location: '', type: 'All Types', listingType: 'All', priceRange: 'Any', bedrooms: 'Any', bathrooms: 'Any', furnishing: 'Any' })}
                  className="text-sm font-medium text-[#C5A059] hover:text-white transition-colors"
                >
                  Clear Refinements
                </button>
              </div>
            )}
          </div>

          {!loading && totalPages > 1 && (
            <div className="flex justify-center gap-4 pt-16">
              <button
                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className={`w-10 h-10 rounded border border-white/10 bg-[#111] flex items-center justify-center transition-all ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:border-[#C5A059] hover:text-[#C5A059] text-white'}`}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              {Array.from({ length: totalPages }).map((_, i) => {
                const page = i + 1;
                return (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`w-10 h-10 rounded text-sm transition-all ${currentPage === page ? 'bg-[#C5A059] text-black font-bold' : 'border border-white/10 bg-[#111] text-white hover:border-[#C5A059] hover:text-[#C5A059]'}`}
                  >
                    {page}
                  </button>
                );
              })}
              <button
                onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className={`w-10 h-10 rounded border border-white/10 bg-[#111] flex items-center justify-center transition-all ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:border-[#C5A059] hover:text-[#C5A059] text-white'}`}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </section>


    </div>
  );
};

export default Home;
