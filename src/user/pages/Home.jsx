import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '../components/hero/Hero';
import PropertyCard from '../components/property/PropertyCard';
import FilterSidebar from '../components/filters/FilterSidebar';
import SkeletonCard from '../components/common/SkeletonCard';
import Dropdown from '../components/common/Dropdown';
import { propertyService } from '../services/propertyService';

const Home = () => {
  const location = useLocation();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState('Newest');
  const [currentPage, setCurrentPage] = useState(1);
  const mainRef = useRef(null);
  const itemsPerPage = 9;
  const [filters, setFilters] = useState({
    location: '',
    type: 'All Types',
    priceRange: 'Any',
    bedrooms: 'Any',
    bathrooms: 'Any',
    furnishing: 'Any'
  });

  useEffect(() => {
    // Handle URL Search Params
    const params = new URLSearchParams(location.search);
    const queryParam = params.get('q');
    if (queryParam) {
      setFilters(prev => ({ ...prev, location: queryParam }));
    }

    // Real Firebase Fetch
    setLoading(true);
    const unsubscribe = propertyService.subscribeProperties((data) => {
      setProperties(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [location.search]);

  const handleFilterChange = (newFilters) => {
    setLoading(true);
    setCurrentPage(1);
    setTimeout(() => {
      setFilters(newFilters);
      setLoading(false);
    }, 400);
  };

  const filteredProperties = properties.filter(property => {
    const propertyLocation = property.location || property.city || "";
    const matchesLocation = propertyLocation.toLowerCase().includes((filters.location || "").toLowerCase());
    
    const propertyType = property.type || property.propertyType || "";
    const matchesType = filters.type === 'All Types' || propertyType === filters.type;

    let matchesPrice = true;
    if (filters.priceRange !== 'Any') {
      const price = property.price;
      if (filters.priceRange === '₹ 0 - 50 L') matchesPrice = price <= 5000000;
      else if (filters.priceRange === '₹ 50 L - 1 Cr') matchesPrice = price > 5000000 && price <= 10000000;
      else if (filters.priceRange === '₹ 1 Cr - 5 Cr') matchesPrice = price > 10000000 && price <= 50000000;
      else if (filters.priceRange === '₹ 5 Cr+') matchesPrice = price > 50000000;
    }

    let matchesBHK = true;
    if (filters.bedrooms !== 'Any') {
      const bhk = property.beds;
      if (filters.bedrooms === '1 BHK') matchesBHK = bhk === 1;
      else if (filters.bedrooms === '2 BHK') matchesBHK = bhk === 2;
      else if (filters.bedrooms === '3 BHK') matchesBHK = bhk === 3;
      else if (filters.bedrooms === '4 BHK') matchesBHK = bhk === 4;
      else if (filters.bedrooms === '4+ BHK') matchesBHK = bhk >= 4;
    }

    return matchesLocation && matchesType && matchesPrice && matchesBHK;
  });

  // Apply Sorting
  const sortedProperties = [...filteredProperties].sort((a, b) => {
    if (sortBy === 'Price: Low to High') return a.price - b.price;
    if (sortBy === 'Price: High to Low') return b.price - a.price;
    
    // Sort by updatedAt (newest first)
    const dateA = new Date(a.updatedAt || 0);
    const dateB = new Date(b.updatedAt || 0);
    if (dateA && dateB && dateA !== dateB) return dateB - dateA;
    
    // Fallback to ID string comparison
    return (b.id || "").localeCompare(a.id || "");
  });

  // Pagination Logic
  const totalPages = Math.ceil(sortedProperties.length / itemsPerPage);
  const paginatedProperties = sortedProperties.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    if (mainRef.current) {
      const offset = mainRef.current.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top: offset, behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-[#F7F7F5] min-h-screen fade-in">
      <Hero />

      <div className="max-w-full mx-auto px-6 md:px-12 lg:px-16 py-12 md:py-16">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-14">

          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block w-80 flex-shrink-0">
            <FilterSidebar onFilterChange={handleFilterChange} onReset={() => setFilters({})} />
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-h-[800px]" ref={mainRef}>

            {/* Sticky Wrapper */}
            <div className="sticky top-[70px] z-30 bg-[#F7F7F5] pt-4 pb-6">
              <div className="flex justify-between items-center bg-white p-4 md:p-6 rounded-2xl border border-[#E5E5E5] shadow-md">
                <p className="text-xs font-bold uppercase tracking-widest text-[#666666]">
                  Showing {loading ? '...' : paginatedProperties.length > 0 ? `${(currentPage - 1) * itemsPerPage + 1}-${Math.min(currentPage * itemsPerPage, sortedProperties.length)}` : '0'} of {sortedProperties.length} properties
                </p>
                <button
                  onClick={() => setIsFilterOpen(true)}
                  className="lg:hidden btn-premium !py-2 !px-4 text-[10px]"
                >
                  Filters
                </button>
                <Dropdown
                  label="Sort by"
                  value={sortBy}
                  options={['Newest', 'Price: Low to High', 'Price: High to Low']}
                  onChange={setSortBy}
                />
              </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {loading ? (
                Array.from({ length: 9 }).map((_, i) => <SkeletonCard key={i} />)
              ) : paginatedProperties.length > 0 ? (
                paginatedProperties.map(property => (
                  <PropertyCard key={property.id} property={property} />
                ))
              ) : (
                <div className="col-span-full py-20 text-center space-y-4">
                  <div className="text-4xl">🏙️</div>
                  <h3 className="text-xl font-bold text-[#111111]">No Properties Found</h3>
                  <p className="text-[#666666] text-sm">Try adjusting your filters to find more properties.</p>
                  <button
                    onClick={() => handleFilterChange({ location: '', type: 'All Types', priceRange: 'Any', bedrooms: 'Any', bathrooms: 'Any', furnishing: 'Any' })}
                    className="text-[#6B705C] font-bold text-xs uppercase tracking-widest hover:underline"
                  >
                    Clear All Filters
                  </button>
                </div>
              )}
            </div>

            {/* Pagination */}
            {!loading && totalPages > 1 && (
              <div className="flex justify-center gap-4 pt-12">
                <button
                  onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className={`w-12 h-12 rounded-xl border border-[#E5E5E5] flex items-center justify-center transition-all ${currentPage === 1 ? 'opacity-30 cursor-not-allowed' : 'hover:border-[#6B705C]'}`}
                >
                  <svg className="w-5 h-5 text-[#666666]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                {Array.from({ length: totalPages }).map((_, i) => {
                  const page = i + 1;
                  return (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`w-12 h-12 rounded-xl text-xs font-bold transition-all ${currentPage === page ? 'bg-[#6B705C] text-white shadow-lg' : 'border border-[#E5E5E5] text-[#666666] hover:bg-white'}`}
                    >
                      {page}
                    </button>
                  );
                })}

                <button
                  onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className={`w-12 h-12 rounded-xl border border-[#E5E5E5] flex items-center justify-center transition-all ${currentPage === totalPages ? 'opacity-30 cursor-not-allowed' : 'hover:border-[#6B705C]'}`}
                >
                  <svg className="w-5 h-5 text-[#666666]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            )}
          </main>

        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {isFilterOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsFilterOpen(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-[300px] bg-white shadow-2xl p-6 overflow-y-auto no-scrollbar animate-[slideInRight_0.3s_ease-out]">
            <div className="flex justify-between items-center mb-8 border-b border-[#E5E5E5] pb-4">
              <h3 className="text-xl font-bold text-[#111111]">Filters</h3>
              <button onClick={() => setIsFilterOpen(false)} className="text-[#666666]">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <FilterSidebar
              onFilterChange={(f) => { handleFilterChange(f); setIsFilterOpen(false); }}
              onReset={() => { setFilters({}); setIsFilterOpen(false); }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
