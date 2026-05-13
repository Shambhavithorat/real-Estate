import React from 'react';
import { Link } from 'react-router-dom';

const AgentCard = ({ agent }) => {
  return (
    <div className="card-premium group overflow-hidden">
      {/* Image Section */}
      <div className="relative h-72 overflow-hidden">
        <img 
          src={agent.photoURL || agent.image || 'https://i.pravatar.cc/300'} 
          alt={agent.name} 
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
        />
        {agent.verified && (
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full shadow-lg flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#6B705C] animate-pulse" />
            <span className="text-[9px] font-bold uppercase tracking-widest text-[#111111]">Verified</span>
          </div>
        )}
      </div>

      {/* Info Section */}
      <div className="p-6 space-y-4">
        <div className="space-y-1">
           <div className="flex justify-between items-start">
              <h3 className="text-lg font-bold text-[#111111]">{agent.name}</h3>

           </div>
           <p className="text-[10px] font-bold uppercase tracking-widest text-[#6B705C]">{agent.role}</p>
        </div>

        <div className="grid grid-cols-2 gap-y-3 border-y border-[#F7F7F5] py-4">
           <div className="space-y-0.5">
              <p className="text-[9px] font-bold text-[#666666] uppercase tracking-widest">Experience</p>
              <p className="text-xs font-bold text-[#111111]">{agent.experience}</p>
           </div>
           <div className="space-y-0.5">
              <p className="text-[9px] font-bold text-[#666666] uppercase tracking-widest">Properties Sold</p>
              <p className="text-xs font-bold text-[#111111]">{agent.propertiesSold || '25'}+</p>
           </div>
           <div className="space-y-0.5">
              <p className="text-[9px] font-bold text-[#666666] uppercase tracking-widest">City</p>
              <p className="text-xs font-bold text-[#111111]">{agent.city}</p>
           </div>
           <div className="space-y-0.5">
              <p className="text-[9px] font-bold text-[#666666] uppercase tracking-widest">Languages</p>
              <p className="text-[10px] font-bold text-[#111111]">{(agent.languages || ['English', 'Marathi']).join(', ')}</p>
           </div>
        </div>

        <Link 
          to={`/agents/${agent.id}`}
          className="btn-premium block w-full text-center"
        >
          View Profile
        </Link>
      </div>
    </div>
  );
};

export default AgentCard;
