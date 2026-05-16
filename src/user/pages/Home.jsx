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
      <section id="featured-properties" className="py-24 px-6 md:px-12 lg:px-16 bg-white relative" ref={mainRef}>
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16 space-y-4 relative">
            <h2 className="text-4xl md:text-5xl font-bold text-[#C5A059]">Featured Properties</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto font-light leading-relaxed">
              Every property is more than just four walls it's a promise of <br className="hidden md:block"/>
              luxury, comfort and growth. Step into a lifestyle
            </p>

            {/* Sort Dropdown */}
            <div className="absolute right-0 top-0 hidden lg:block w-48">
              <select
                className="w-full bg-white border border-gray-200 rounded-md px-4 py-2 text-xs font-bold uppercase tracking-widest text-black focus:outline-none focus:border-[#C5A059] appearance-none cursor-pointer"
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
                <p className="text-gray-500 text-lg">No Masterpieces Found</p>
                <button
                  onClick={() => setFilters({ location: '', type: 'All Types', listingType: 'All', priceRange: 'Any', bedrooms: 'Any', bathrooms: 'Any', furnishing: 'Any' })}
                  className="text-sm font-medium text-[#C5A059] hover:text-[#a08248] transition-colors"
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
                className={`w-10 h-10 rounded border border-gray-200 bg-white flex items-center justify-center transition-all ${currentPage === 1 ? 'opacity-50 cursor-not-allowed text-gray-400' : 'hover:border-[#C5A059] hover:bg-[#C5A059] hover:text-white text-gray-700'}`}
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
                    className={`w-10 h-10 rounded text-sm transition-all ${currentPage === page ? 'bg-[#C5A059] text-white font-bold' : 'border border-gray-200 bg-white text-gray-700 hover:border-[#C5A059] hover:bg-[#C5A059] hover:text-white'}`}
                  >
                    {page}
                  </button>
                );
              })}
              <button
                onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className={`w-10 h-10 rounded border border-gray-200 bg-white flex items-center justify-center transition-all ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed text-gray-400' : 'hover:border-[#C5A059] hover:bg-[#C5A059] hover:text-white text-gray-700'}`}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 px-6 md:px-12 lg:px-16 bg-[#F9F9F9]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 space-y-4">
            <span className="text-[#C5A059] text-xs font-bold tracking-[0.2em] uppercase">Client Experiences</span>
            <h2 className="text-4xl md:text-5xl font-black text-[#002D52] uppercase tracking-tighter">
              Words Of <span className="italic font-light text-[#C5A059] normal-case">Trust</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-white rounded-3xl p-10 relative shadow-[0_10px_40px_rgba(0,0,0,0.04)] mt-6 border border-gray-100">
              <div className="absolute -top-6 left-10 w-12 h-12 bg-[#002D52] rounded-full flex items-center justify-center shadow-lg border-4 border-white">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
              <p className="text-gray-500 italic text-sm leading-relaxed mb-8 pt-2">
                "PropertyVishva provided an unparalleled level of service. The attention to detail in finding our penthouse was remarkable."
              </p>
              <div>
                <h4 className="text-[#002D52] font-bold text-xs tracking-[0.15em] uppercase mb-1">Alexander Sterling</h4>
                <p className="text-[#C5A059] text-[10px] font-bold tracking-wider uppercase">CEO, Global Holdings</p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-3xl p-10 relative shadow-[0_10px_40px_rgba(0,0,0,0.04)] mt-6 border border-gray-100">
              <div className="absolute -top-6 left-10 w-12 h-12 bg-[#002D52] rounded-full flex items-center justify-center shadow-lg border-4 border-white">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
              <p className="text-gray-500 italic text-sm leading-relaxed mb-8 pt-2">
                "The curation of properties is exceptional. They understand that luxury is not just a price point, but a lifestyle."
              </p>
              <div>
                <h4 className="text-[#002D52] font-bold text-xs tracking-[0.15em] uppercase mb-1">Victoria Rothschild</h4>
                <p className="text-[#C5A059] text-[10px] font-bold tracking-wider uppercase">Art Collector</p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-3xl p-10 relative shadow-[0_10px_40px_rgba(0,0,0,0.04)] mt-6 border border-gray-100">
              <div className="absolute -top-6 left-10 w-12 h-12 bg-[#002D52] rounded-full flex items-center justify-center shadow-lg border-4 border-white">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
              <p className="text-gray-500 italic text-sm leading-relaxed mb-8 pt-2">
                "Seamless, private, and highly professional. PropertyVishva sets the benchmark for ultra-luxury real estate transactions."
              </p>
              <div>
                <h4 className="text-[#002D52] font-bold text-xs tracking-[0.15em] uppercase mb-1">Jonathan Pierce</h4>
                <p className="text-[#C5A059] text-[10px] font-bold tracking-wider uppercase">Tech Entrepreneur</p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
