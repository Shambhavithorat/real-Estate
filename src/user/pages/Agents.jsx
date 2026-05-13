import React, { useState, useEffect } from 'react';
import AgentCard from '../components/agent/AgentCard';
import Dropdown from '../components/common/Dropdown';
import { agentService } from '../services/agentService';

const Agents = () => {
   const [loading, setLoading] = useState(true);
   const [agents, setAgents] = useState([]);
   const [filters, setFilters] = useState({
      city: 'All Cities',
      experience: 'Any Experience',
      specialization: 'All Specializations'
   });
   const [searchQuery, setSearchQuery] = useState('');

   useEffect(() => {
      const unsubscribe = agentService.subscribeAgents((data) => {
         // For the user panel, we only show 'Active' agents
         const activeAgents = data.filter(a => (a.status || 'Active') === 'Active');
         setAgents(activeAgents);
         setLoading(false);
      });
      return () => unsubscribe();
   }, []);

   const filteredAgents = agents.filter(agent => {
      const matchesSearch = agent.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCity = filters.city === 'All Cities' || agent.city === filters.city;
      const matchesSpec = filters.specialization === 'All Specializations' || agent.specialization === filters.specialization;

      let matchesExp = true;
      if (filters.experience !== 'Any Experience') {
         const exp = parseInt(agent.experience);
         if (filters.experience === '0-5 Years') matchesExp = exp <= 5;
         else if (filters.experience === '5-10 Years') matchesExp = exp > 5 && exp <= 10;
         else if (filters.experience === '10+ Years') matchesExp = exp > 10;
      }

      return matchesSearch && matchesCity && matchesSpec && matchesExp;
   });

   return (
      <div className="min-h-screen bg-[#F7F7F5] pb-24 fade-in">
         {/* Hero Section */}
         <div className="relative h-[600px] flex items-center">
            <div className="absolute inset-0 z-0">
               <img
                  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000&q=80"
                  alt="Office"
                  className="w-full h-full object-cover"
               />
               <div className="absolute inset-0 bg-black/40" />
            </div>

            <div className="relative z-10 max-w-full mx-auto px-6 md:px-12 lg:px-16 w-full pt-20">
               <div className="max-w-4xl space-y-8">
                  <div className="space-y-4">
                     <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/80">Expert Consultation</p>
                     <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
                        Find Trusted Real Estate <br />
                        <span className="text-[#B7B7A4] italic font-medium">Experts</span> in Maharashtra
                     </h1>
                  </div>

                  {/* Search Bar */}
                  <div className="bg-white p-2 md:p-3 rounded-2xl shadow-2xl flex flex-col md:flex-row gap-2 max-w-2xl border border-[#E5E5E5]">
                     <div className="flex-1 px-4 py-2 flex items-center gap-3">
                        <svg className="w-4 h-4 text-[#6B705C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <input
                           type="text"
                           placeholder="Search agent by name..."
                           value={searchQuery}
                           onChange={(e) => setSearchQuery(e.target.value)}
                           className="w-full bg-transparent text-xs font-bold text-[#111111] focus:outline-none placeholder:text-[#666666]/40"
                        />
                     </div>
                     <button className="btn-premium px-10">
                        Search Experts
                     </button>
                  </div>
               </div>
            </div>
         </div>

         {/* Filter Section */}
         <div className="max-w-full mx-auto px-6 md:px-12 lg:px-16 -mt-16 relative z-20">
            <div className="bg-white p-6 md:p-8 rounded-3xl shadow-xl border border-[#E5E5E5] flex flex-wrap gap-8 items-center">
               <div className="flex-1 min-w-[200px]">
                  <Dropdown
                     label="City"
                     value={filters.city}
                     options={['All Cities', 'Pune', 'Mumbai', 'Nagpur', 'Nashik', 'Solapur', 'Kolhapur']}
                     onChange={(val) => setFilters(prev => ({ ...prev, city: val }))}
                  />
               </div>
               <div className="flex-1 min-w-[200px]">
                  <Dropdown
                     label="Experience"
                     value={filters.experience}
                     options={['Any Experience', '0-5 Years', '5-10 Years', '10+ Years']}
                     onChange={(val) => setFilters(prev => ({ ...prev, experience: val }))}
                  />
               </div>
               <div className="flex-1 min-w-[200px]">
                  <Dropdown
                     label="Specialization"
                     value={filters.specialization}
                     options={['All Specializations', 'Villas & Mansions', 'Penthouses', 'Estates', 'Apartments', 'Heritage Homes']}
                     onChange={(val) => setFilters(prev => ({ ...prev, specialization: val }))}
                  />
               </div>
               <button
                  onClick={() => setFilters({ city: 'All Cities', experience: 'Any Experience', specialization: 'All Specializations' })}
                  className="text-[10px] font-bold uppercase tracking-widest text-[#666666] hover:text-[#6B705C] transition-colors"
               >
                  Reset Filters
               </button>
            </div>
         </div>

         {/* Agents Grid */}
         <div className="max-w-full mx-auto px-6 md:px-12 lg:px-16 py-24">
            <div className="flex justify-between items-end mb-16">
               <div className="space-y-3">
                  <h2 className="text-3xl font-bold text-[#111111]">Verified Agents</h2>
                  <p className="text-xs font-bold text-[#666666] uppercase tracking-widest">Showing {filteredAgents.length} available experts</p>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
               {loading ? (
                  Array.from({ length: 4 }).map((_, i) => (
                     <div key={i} className="h-[500px] bg-white rounded-2xl animate-pulse" />
                  ))
               ) : filteredAgents.length > 0 ? (
                  filteredAgents.map(agent => (
                     <AgentCard key={agent.id} agent={agent} />
                  ))
               ) : (
                  <div className="col-span-full py-32 text-center space-y-6 bg-white rounded-3xl border border-dashed border-[#E5E5E5]">
                     <div className="text-5xl">👤</div>
                     <div className="space-y-2">
                        <h3 className="text-xl font-bold text-[#111111]">No Agents Found</h3>
                        <p className="text-sm text-[#666666]">Try adjusting your search or filters to find more experts.</p>
                     </div>
                  </div>
               )}
            </div>
         </div>
      </div>
   );
};

export default Agents;
