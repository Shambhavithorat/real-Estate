import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { agentService } from '../services/agentService';
import { propertyService } from '../services/propertyService';
import PropertyCard from '../components/property/PropertyCard';

const AgentProfile = () => {
  const { id } = useParams();
  const [agent, setAgent] = useState(null);
  const [agentProperties, setAgentProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAgentData = async () => {
      setLoading(true);
      try {
        // Fetch real-time agent data from Firestore
        const unsubscribe = agentService.subscribeAgents((data) => {
          const foundAgent = data.find(a => a.id === id);
          if (foundAgent) {
            setAgent(foundAgent);
            // Fetch properties for this agent/city context
            fetchProperties(foundAgent.city);
          }
          setLoading(false);
        });
        return unsubscribe;
      } catch (error) {
        console.error("Error fetching agent:", error);
        setLoading(false);
      }
    };

    const fetchProperties = async (city) => {
      try {
        const props = await propertyService.getProperties();
        const filtered = props.filter(p => p.city === city || p.location?.includes(city)).slice(0, 3);
        setAgentProperties(filtered);
      } catch (err) {
        console.error("Error fetching properties:", err);
      }
    };

    const unsub = fetchAgentData();
    return () => { if (typeof unsub === 'function') unsub(); };
  }, [id]);

  if (loading) return (
    <div className="min-h-screen bg-[#F7F7F5] flex flex-col items-center justify-center gap-6">
      <div className="w-16 h-16 border-4 border-[#6B705C]/20 border-t-[#6B705C] rounded-full animate-spin" />
      <p className="text-[#6B705C] font-bold uppercase tracking-[0.4em] text-[10px]">Retrieving Professional Profile...</p>
    </div>
  );

  if (!agent) return (
    <div className="min-h-screen bg-[#F7F7F5] flex flex-col items-center justify-center p-16 text-center space-y-6">
      <div className="text-6xl">👤</div>
      <h2 className="text-3xl font-bold text-[#111111]">Profile Unavailable</h2>
      <p className="text-[#666666] max-w-md">This agent or broker profile could not be found in our verified network.</p>
      <Link to="/agents" className="btn-premium px-12">Back to Network</Link>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F7F7F5] pb-24 fade-in">
      {/* Banner */}
      <div className="h-[450px] relative overflow-hidden">
         <img 
           src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2000&q=80" 
           alt="Banner" 
           className="w-full h-full object-cover grayscale opacity-60"
         />
         <div className="absolute inset-0 bg-[#111111]/40 backdrop-blur-[1px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 -mt-40 relative z-10">
         <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Sidebar */}
            <div className="lg:col-span-4 space-y-8">
               <div className="bg-white p-10 rounded-[40px] shadow-2xl border border-[#F0F0F0] text-center space-y-8 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-2 bg-[#6B705C]" />
                  <div className="relative inline-block mt-4">
                     <img 
                       src={agent.photoURL || agent.image || 'https://i.pravatar.cc/400'} 
                       alt={agent.name} 
                       className="w-48 h-48 rounded-[48px] object-cover border-8 border-[#F7F7F5] shadow-2xl mx-auto hover:scale-105 transition-transform duration-700"
                     />
                     {agent.verified && (
                        <div className="absolute bottom-2 right-2 bg-[#6B705C] text-white p-3 rounded-2xl shadow-xl border-4 border-white">
                           <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                           </svg>
                        </div>
                     )}
                  </div>

                  <div className="space-y-2">
                     <h1 className="text-3xl font-black text-[#111111] tracking-tight">{agent.name}</h1>
                     <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#6B705C]">{agent.agencyName || agent.role || 'Senior Associate'}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-6 py-8 border-y border-[#F5F5F5]">
                     <div className="space-y-1">
                        <p className="text-[9px] font-bold text-[#999999] uppercase tracking-widest">Experience</p>
                        <p className="text-lg font-black text-[#111111]">{agent.experience || '10'}y+</p>
                     </div>
                     <div className="space-y-1">
                        <p className="text-[9px] font-bold text-[#999999] uppercase tracking-widest">Location</p>
                        <p className="text-lg font-black text-[#111111] truncate">{agent.city || 'Pune'}</p>
                     </div>
                  </div>

                  <div className="space-y-4 pt-2">
                     <button className="w-full py-5 bg-[#111111] text-white text-[10px] font-bold uppercase tracking-[0.2em] rounded-2xl hover:bg-[#6B705C] transition-all shadow-xl active:scale-95">
                        Send Secure Message
                     </button>
                     <p className="text-[9px] font-bold text-[#BBBBBB] uppercase tracking-widest italic text-center">Responses usually within 2 hours</p>
                  </div>
               </div>

               {/* Location Card */}
               <div className="bg-white p-10 rounded-[40px] shadow-xl border border-[#F0F0F0] space-y-6">
                  <h3 className="text-[10px] font-bold text-[#111111] uppercase tracking-[0.3em] flex items-center gap-3">
                     <span className="w-6 h-[1px] bg-[#6B705C]" />
                     Coverage Area
                  </h3>
                  <div className="flex items-center gap-4 p-4 bg-[#F7F7F5] rounded-2xl">
                     <span className="text-2xl">📍</span>
                     <div>
                        <p className="text-sm font-bold text-[#111111]">{agent.city || 'Pune'}, Maharashtra</p>
                        <p className="text-[9px] font-bold text-[#999999] uppercase tracking-widest">Active Territory</p>
                     </div>
                  </div>
               </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-8 space-y-16 pt-12 lg:pt-48">
               <div className="space-y-8">
                  <div className="inline-block border-b-2 border-[#6B705C] pb-2">
                    <h2 className="text-xs font-bold text-[#6B705C] uppercase tracking-[0.4em]">Professional Overview</h2>
                  </div>
                  <h2 className="text-4xl font-black text-[#111111] leading-tight max-w-2xl">
                     Meet <span className="text-[#6B705C] italic font-serif font-medium">{agent.name}</span>, <br />
                     Your Strategic Realty Partner
                  </h2>
                  <p className="text-[#666666] leading-relaxed text-xl italic font-medium opacity-80">
                     "{agent.description || agent.bio || 'Excellence in every transaction, ensuring the perfect match for your lifestyle needs.'}"
                  </p>
                  <p className="text-[#666666] leading-relaxed text-lg">
                     With a track record of high-value transactions in {agent.city || 'Maharashtra'}, {agent.name.split(' ')[0]} specializes in {agent.specialization || 'Residential Estates'}. Bringing a data-driven approach combined with personalized white-glove service to the marketplace.
                  </p>
               </div>


            </div>

         </div>
      </div>
    </div>
  );
};

export default AgentProfile;
