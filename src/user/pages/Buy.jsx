import React, { useState, useEffect } from 'react';
import PropertyCard from '../components/property/PropertyCard';
import FilterSidebar from '../components/filters/FilterSidebar';
import { propertyService } from '../services/propertyService';

const Buy = () => {
  const [activeTab, setActiveTab] = useState('grid');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const data = await propertyService.getApprovedProperties();
        setProperties(data);
      } catch (error) {
        console.error("Error fetching properties for Buy page:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, []);

  return (
    <div className="min-h-screen bg-[#F7F7F5] pt-[120px] pb-24 fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
          <div className="space-y-4">
             <h1 className="text-4xl lg:text-5xl font-bold text-[#111111]">
               Exclusive <span className="text-[#6B705C] italic font-medium">Collections</span>
             </h1>
             <p className="text-[#666666] font-medium uppercase tracking-widest text-xs">
               {loading ? 'Fetching properties...' : `Showing 1–${properties.length} of ${properties.length} properties`}
             </p>
          </div>
          
          <div className="flex items-center gap-6">
            <button 
              onClick={() => setIsFilterOpen(true)}
              className="lg:hidden flex items-center gap-2 px-6 py-3 bg-white border border-[#E5E5E5] rounded-xl text-xs font-bold uppercase tracking-widest"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              Filters
            </button>
            <div className="flex bg-white p-1 rounded-xl border border-[#E5E5E5]">
               <button 
                 onClick={() => setActiveTab('grid')}
                 className={`p-2 rounded-lg transition-all ${activeTab === 'grid' ? 'bg-[#6B705C] text-white shadow-lg' : 'text-[#666666] hover:bg-[#F7F7F5]'}`}
               >
                 <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                 </svg>
               </button>
               <button 
                 onClick={() => setActiveTab('list')}
                 className={`p-2 rounded-lg transition-all ${activeTab === 'list' ? 'bg-[#6B705C] text-white shadow-lg' : 'text-[#666666] hover:bg-[#F7F7F5]'}`}
               >
                 <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                 </svg>
               </button>
            </div>
            <select className="bg-white border border-[#E5E5E5] px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-widest text-[#111111] focus:outline-none shadow-sm cursor-pointer">
              <option>Sort by: Newest</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* Filter Sidebar */}
          <aside className="w-full lg:w-80 flex-shrink-0">
            <FilterSidebar />
          </aside>

          {/* Property Section */}
          <main className="flex-1 space-y-16">
            {/* Map Preview Card */}
            <div className="card-premium h-[300px] overflow-hidden relative group cursor-pointer">
              <img 
                src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1200&q=40" 
                alt="Map" 
                className="w-full h-full object-cover grayscale opacity-40 transition-all duration-700 group-hover:grayscale-0 group-hover:opacity-60"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                 <button className="px-10 py-4 bg-white text-[#111111] text-[10px] font-bold uppercase tracking-[0.2em] rounded-full shadow-2xl hover:bg-[#6B705C] hover:text-white transition-all transform hover:scale-105">
                   View on Map
                 </button>
              </div>
              <div className="absolute top-8 left-8 p-4 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl">
                 <p className="text-[10px] font-bold uppercase tracking-widest text-[#6B705C]">Location: Kharadi, Pune</p>
              </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-12">
               {loading ? (
                 Array.from({ length: 4 }).map((_, i) => (
                   <div key={i} className="h-[400px] bg-gray-200 animate-pulse rounded-3xl" />
                 ))
               ) : properties.length > 0 ? (
                 properties.map(property => (
                   <PropertyCard key={property.id} property={property} />
                 ))
               ) : (
                 <div className="col-span-full py-20 text-center space-y-4">
                   <div className="text-4xl">🏙️</div>
                   <h3 className="text-xl font-bold text-[#111111]">No Properties Available</h3>
                   <p className="text-[#666666] text-sm">Check back later for new exclusive collections.</p>
                 </div>
               )}
            </div>

            {/* Pagination */}
            {!loading && properties.length > 10 && (
              <div className="flex justify-center items-center gap-4 pt-12">
                 <button className="w-12 h-12 rounded-xl border border-[#E5E5E5] flex items-center justify-center text-[#666666] hover:border-[#6B705C] hover:text-[#6B705C] transition-all">
                   <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                   </svg>
                 </button>
                 <button className="w-12 h-12 rounded-xl text-xs font-bold flex items-center justify-center bg-[#6B705C] text-white shadow-lg">1</button>
                 <button className="w-12 h-12 rounded-xl border border-[#E5E5E5] flex items-center justify-center text-[#666666] hover:border-[#6B705C] hover:text-[#6B705C] transition-all">
                   <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                   </svg>
                 </button>
              </div>
            )}

          </main>

        </div>
      </div>

      {/* Mobile Filter Drawer */}
      <div className={`fixed inset-0 z-[60] lg:hidden transition-all duration-500 ${isFilterOpen ? 'visible' : 'invisible'}`}>
         {/* Backdrop */}
         <div 
           className={`absolute inset-0 bg-[#111111]/40 backdrop-blur-sm transition-opacity duration-500 ${isFilterOpen ? 'opacity-100' : 'opacity-0'}`}
           onClick={() => setIsFilterOpen(false)}
         />
         {/* Content */}
         <div className={`absolute right-0 top-0 bottom-0 w-[300px] bg-white shadow-2xl transition-transform duration-500 transform ${isFilterOpen ? 'translate-x-0' : 'translate-x-full'}`}>
            <div className="h-full flex flex-col">
               <div className="p-6 border-b border-[#E5E5E5] flex justify-between items-center">
                  <h3 className="text-xl font-bold text-[#111111]">Refine Search</h3>
                  <button onClick={() => setIsFilterOpen(false)} className="p-2 hover:bg-[#F7F7F5] rounded-lg transition-colors">
                     <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                     </svg>
                  </button>
               </div>
               <div className="flex-1 overflow-y-auto no-scrollbar p-2">
                  <FilterSidebar onReset={() => setIsFilterOpen(false)} />
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default Buy;
