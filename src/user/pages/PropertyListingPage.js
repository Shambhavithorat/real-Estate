/**
 * PROPERTY LISTING PAGE WITH FIRESTORE
 * ====================================
 */

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { propertyService } from '../services/propertyService';
import PropertyCard from '../components/property/PropertyCard';
import FilterSidebar from '../components/filters/FilterSidebar';

const PropertyListingPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    // State
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
    const [desktopCollapsed, setDesktopCollapsed] = useState(false);
    const [pagination, setPagination] = useState({
        totalProperties: 0,
    });

    // Filter state
    const [filters, setFilters] = useState({
        city: searchParams.get('city') || '',
        listingType: searchParams.get('listingType') || '',
        propertyType: searchParams.get('propertyType') || '',
        minPrice: searchParams.get('minPrice') || '',
        maxPrice: searchParams.get('maxPrice') || '',
    });

    // Real-time Fetch from Firestore
    useEffect(() => {
        setLoading(true);
        // Using real-time listener for instant updates
        const unsubscribe = propertyService.subscribeProperties((data) => {
            setProperties(data);
            setPagination({ totalProperties: data.length });
            setLoading(false);
        });

        // Cleanup on unmount
        return () => unsubscribe();
    }, []);

    // Handle filter change
    const handleFilterChange = (key, value) => {
        const newFilters = { ...filters, [key]: value };
        setFilters(newFilters);
    };

    // Clear filters
    const clearFilters = () => {
        setFilters({
            city: '',
            listingType: '',
            propertyType: '',
            minPrice: '',
            maxPrice: '',
        });
    };

    return (
        <div className="flex min-h-screen bg-[#FDFDFD]">
            {/* Filter Sidebar */}
            <FilterSidebar 
                filters={filters}
                onFilterChange={handleFilterChange}
                onReset={clearFilters}
                desktopCollapsed={desktopCollapsed}
                setDesktopCollapsed={setDesktopCollapsed}
                isMobileOpen={mobileFiltersOpen}
                setIsMobileOpen={setMobileFiltersOpen}
            />

            <div className={`flex-1 transition-all duration-500 ease-in-out ${desktopCollapsed ? 'lg:ml-0' : 'lg:pl-[340px]'}`}>
                <div className="pt-20 lg:pt-24 px-4 sm:px-6 lg:px-12 py-8 max-w-[1600px] mx-auto">
                    {/* Header Section */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                        <div className="space-y-2">
                             <div className="flex items-center gap-3">
                                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#6B705C] bg-[#6B705C]/5 px-3 py-1 rounded-full">Cloud Database</span>
                                <div className="h-[1px] w-12 bg-[#6B705C]/20" />
                            </div>
                            <h1 className="text-4xl md:text-5xl font-black text-[#111111] tracking-tighter">
                                Premium Collection
                            </h1>
                            <p className="text-[#666666] text-sm font-medium">
                                Showing <span className="text-[#111111] font-bold">{pagination.totalProperties}</span> properties live from Firestore
                            </p>
                        </div>
                    </div>

                    {/* Content Grid */}
                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                            {[1, 2, 3, 4, 5, 6].map((n) => (
                                <div key={n} className="h-[450px] bg-gray-100 rounded-3xl animate-pulse" />
                            ))}
                        </div>
                    ) : properties.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                            {properties.map((property) => (
                                <PropertyCard key={property.id} property={property} />
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-24 text-center">
                            <div className="w-24 h-24 bg-[#F7F7F7] rounded-full flex items-center justify-center mb-6">
                                <svg className="w-10 h-10 text-[#6B705C]/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-[#111111] mb-2">Firestore Empty</h3>
                            <p className="text-[#666666] mb-8">Ajun kontihi property Firestore madhe add keli nahiye.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PropertyListingPage;
