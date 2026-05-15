import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '../components/hero/Hero';
import PropertyCard from '../components/property/PropertyCard';
import SkeletonCard from '../components/common/SkeletonCard';
import Dropdown from '../components/common/Dropdown';
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
  const itemsPerPage = 9;
  const [filters, setFilters] = useState({
    location: '',
    type: 'All Types',
    listingType: 'All', // Added for Requirement 3
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

  // Requirement 1 & 6: Dynamic handling without page reload
  const handleSearchSubmit = (searchFilters) => {
    setFilters(prev => ({ ...prev, ...searchFilters }));
    // Smooth scroll to property section
    mainRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const filteredProperties = properties.filter(property => {
    // Requirement 4: Case-insensitive search
    const propertyLocation = (property.location || property.city || property.address || "").toLowerCase();
    const searchLocation = (filters.location || "").toLowerCase();
    const matchesLocation = propertyLocation.includes(searchLocation);
    
    // Requirement 3: Property Type filter
    const propertyType = property.type || property.propertyType || "";
    let matchesType = filters.type === 'All Types' || propertyType === filters.type;

    // Integrated Category Filter from Navbar
    if (categoryFilter !== 'All') {
      matchesType = propertyType === categoryFilter;
    }

    // Requirement 3: Listing Type filter (Rent/Sell)
    const listingType = property.listingType || property.status === 'rent' ? 'Rent' : 'Sell'; 
    const matchesListingType = filters.listingType === 'All' || 
                               property.listingType === filters.listingType || 
                               (filters.listingType === 'Rent' && property.status === 'rent') ||
                               (filters.listingType === 'Sell' && property.status === 'sale');

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
      const bhk = property.beds || property.bedrooms;
      if (filters.bedrooms === '1 BHK') matchesBHK = bhk === 1;
      else if (filters.bedrooms === '2 BHK') matchesBHK = bhk === 2;
      else if (filters.bedrooms === '3 BHK') matchesBHK = bhk === 3;
      else if (filters.bedrooms === '4 BHK') matchesBHK = bhk === 4;
      else if (filters.bedrooms === '4+ BHK') matchesBHK = bhk >= 4;
    }

    return matchesLocation && matchesType && matchesListingType && matchesPrice && matchesBHK;
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
      <Hero onSearch={handleSearchSubmit} />

      <div className="max-w-full mx-auto px-6 md:px-12 lg:px-16 py-12 md:py-16">
        <div className="flex flex-col gap-10">

          {/* Main Content */}
          <main id="featured-properties" className="w-full min-h-[800px]" ref={mainRef}>

            {/* Sticky Wrapper */}
            <div className="bg-[#F7F7F5] pb-6">
              <div className="flex justify-between items-center bg-white p-4 md:p-6 rounded-2xl border border-[#E5E5E5] shadow-md">
                <p className="text-xs font-bold uppercase tracking-widest text-[#666666]">
                  {sortedProperties.length > 0 ? (
                    <>Showing {loading ? '...' : `${(currentPage - 1) * itemsPerPage + 1}-${Math.min(currentPage * itemsPerPage, sortedProperties.length)}`} of {sortedProperties.length} properties</>
                  ) : (
                    <>No Properties Found</>
                  )}
                </p>
                <Dropdown
                  label="Sort by"
                  value={sortBy}
                  options={['Newest', 'Price: Low to High', 'Price: High to Low']}
                  onChange={setSortBy}
                />
              </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {loading ? (
                Array.from({ length: 9 }).map((_, i) => <SkeletonCard key={i} />)
              ) : paginatedProperties.length > 0 ? (
                paginatedProperties.map(property => (
                  <PropertyCard key={property.id} property={property} />
                ))
              ) : (
                <div className="col-span-full py-32 flex flex-col items-center justify-center text-center space-y-6">
                  <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-sm border border-[#E5E5E5]">
                    <svg className="w-10 h-10 text-[#6B705C]/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-[#111111] tracking-tight">No Properties Found</h3>
                    <p className="text-[#666666] mt-2 text-sm max-w-xs mx-auto">
                      We couldn't find any properties matching your search criteria. Try adjusting your filters.
                    </p>
                    <button 
                      onClick={() => setFilters({ ...filters, location: '', type: 'All Types', listingType: 'All' })}
                      className="mt-6 text-[10px] font-black uppercase tracking-[0.2em] text-[#6B705C] hover:underline"
                    >
                      Clear All Filters
                    </button>
                  </div>
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
    </div>
  );
};

export default Home;
