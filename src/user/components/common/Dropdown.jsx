import React, { useState, useRef, useEffect } from 'react';

const Dropdown = ({ options, value, onChange, label }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 bg-[#F7F7F5] px-5 py-2.5 rounded-xl border border-[#E5E5E5] hover:border-[#6B705C] transition-all group"
      >
        <span className="text-[10px] font-bold uppercase tracking-widest text-[#666666]">
          {label}:
        </span>
        <span className="text-[10px] font-bold uppercase tracking-widest text-[#111111]">
          {value}
        </span>
        <svg 
          className={`w-3.5 h-3.5 text-[#111111] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
          fill="none" viewBox="0 0 24 24" stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-[#E5E5E5] py-2 z-[100] animate-in fade-in zoom-in duration-200">
          {options.map((option) => (
            <button
              key={option}
              onClick={() => {
                onChange(option);
                setIsOpen(false);
              }}
              className={`w-full text-left px-5 py-3 text-[10px] font-bold uppercase tracking-widest transition-colors ${
                value === option 
                  ? 'text-[#6B705C] bg-[#6B705C]/5' 
                  : 'text-[#666666] hover:bg-[#F7F7F5] hover:text-[#111111]'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
