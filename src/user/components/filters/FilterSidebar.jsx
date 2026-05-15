import React, { useState } from 'react';
import Dropdown from '../common/Dropdown';

const FilterSection = ({ title, children, defaultOpen = true }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-[#E5E5E5] last:border-0 py-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center group"
      >
        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#111111] group-hover:text-[#6B705C] transition-colors">{title}</span>
        <svg
          className={`w-4 h-4 text-[#666666] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div className="mt-6 space-y-4 fade-in">
          {children}
        </div>
      )}
    </div>
  );
};

const FilterSidebar = ({ filters = {}, onFilterChange, onReset }) => {
  return (
    <div className="card-premium p-6 space-y-2 bg-white sticky top-[90px] max-h-[calc(100vh-120px)] overflow-y-auto no-scrollbar shadow-xl border-[#E5E5E5]">
      <div className="flex justify-between items-center border-b border-[#E5E5E5] pb-4 mb-2">
        <h3 className="text-lg font-bold text-[#111111]">Filters</h3>
        <button
          onClick={onReset}
          className="text-[9px] font-bold uppercase tracking-widest text-[#6B705C] hover:text-[#5a5e4d]"
        >
          Reset
        </button>
      </div>

      {/* 📍 Search Location */}
      <FilterSection title="Location">
        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#666666]">
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search location..."
            value={filters.city || ''}
            onChange={(e) => onFilterChange && onFilterChange('city', e.target.value)}
            className="w-full bg-[#F7F7F5] border-none pl-9 pr-4 py-2.5 rounded-xl text-[11px] focus:ring-1 focus:ring-[#6B705C]"
          />
        </div>
      </FilterSection>

      {/* 🏠 Property Type */}
      <FilterSection title="Property Type">
        <select
          value={filters.propertyType || ''}
          onChange={(e) => onFilterChange && onFilterChange('propertyType', e.target.value)}
          className="w-full bg-[#F7F7F5] border-none px-4 py-2.5 rounded-xl text-[11px] focus:ring-1 focus:ring-[#6B705C]"
        >
          <option value="">All Types</option>
          <option value="Villa">Villa</option>
          <option value="Apartment">Apartment</option>
          <option value="Penthouse">Penthouse</option>
          <option value="Townhouse">Townhouse</option>
          <option value="Plot">Plot</option>
          <option value="Commercial">Commercial</option>
        </select>
      </FilterSection>

      {/* 💰 Price Range */}
      <FilterSection title="Price Range">
        <div className="space-y-4">
          <div className="flex justify-between text-[10px] font-bold text-[#111111]">
            <span>₹ {filters.minPrice || '0'}</span>
            <span>₹ {filters.maxPrice || 'Any'}</span>
          </div>
          <div className="flex gap-2">
            <input 
              type="number" 
              placeholder="Min Price" 
              value={filters.minPrice || ''}
              onChange={(e) => onFilterChange && onFilterChange('minPrice', e.target.value)}
              className="w-1/2 bg-[#F7F7F5] border-none px-3 py-2 rounded-lg text-[11px]" 
            />
            <input 
              type="number" 
              placeholder="Max Price" 
              value={filters.maxPrice || ''}
              onChange={(e) => onFilterChange && onFilterChange('maxPrice', e.target.value)}
              className="w-1/2 bg-[#F7F7F5] border-none px-3 py-2 rounded-lg text-[11px]" 
            />
          </div>
        </div>
      </FilterSection>

      {/* 🛏️ Bedrooms */}
      <FilterSection title="Bedrooms">
        <div className="grid grid-cols-5 gap-1.5">
          {['Any', '1 BHK', '2 BHK', '3 BHK', '4+ BHK'].map(num => (
            <button key={num} className={`py-2 rounded-lg border text-[9px] font-bold ${num === 'Any' ? 'bg-[#6B705C] text-white border-[#6B705C]' : 'border-[#E5E5E5] text-[#666666] hover:border-[#6B705C]'}`}>
              {num}
            </button>
          ))}
        </div>
      </FilterSection>

      {/* 🛁 Bathrooms */}
      <FilterSection title="Bathrooms">
        <div className="grid grid-cols-5 gap-1.5">
          {['Any', '1+', '2+', '3+', '4+'].map(num => (
            <button key={num} className={`py-2 rounded-lg border text-[9px] font-bold ${num === 'Any' ? 'bg-[#6B705C] text-white border-[#6B705C]' : 'border-[#E5E5E5] text-[#666666] hover:border-[#6B705C]'}`}>
              {num}
            </button>
          ))}
        </div>
      </FilterSection>

      {/* 📏 Area */}
      <FilterSection title="Area (sq ft)">
        <div className="flex gap-2">
          <input type="text" placeholder="Min" className="w-1/2 bg-[#F7F7F5] border-none px-3 py-2 rounded-lg text-[11px]" />
          <input type="text" placeholder="Max" className="w-1/2 bg-[#F7F7F5] border-none px-3 py-2 rounded-lg text-[11px]" />
        </div>
      </FilterSection>

      {/* 🛋️ Furnishing */}
      <FilterSection title="Furnishing">
        <div className="space-y-2">
          {['Any', 'Furnished', 'Semi Furnished', 'Unfurnished'].map(status => (
            <label key={status} className="flex items-center gap-2.5 cursor-pointer group">
              <input type="radio" name="furnishing" className="hidden peer" defaultChecked={status === 'Any'} />
              <div className="w-4 h-4 rounded-full border border-[#E5E5E5] flex items-center justify-center peer-checked:border-[#6B705C] transition-all">
                <div className="w-2 h-2 rounded-full bg-[#6B705C] scale-0 peer-checked:scale-100 transition-transform" />
              </div>
              <span className="text-xs font-medium text-[#666666] group-hover:text-[#111111]">{status}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      <div className="pt-6 space-y-3">
        <button className="w-full btn-premium py-4">Apply Filters</button>
        <button className="w-full py-3.5 border border-[#E5E5E5] rounded-xl text-[10px] font-bold uppercase tracking-widest text-[#666666] hover:bg-[#F7F7F5]">Reset</button>
      </div>
    </div>
  );
};

export default FilterSidebar;
