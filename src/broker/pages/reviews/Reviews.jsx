import React from 'react';

const Reviews = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-[#111111]">Client Reviews</h1>
          <p className="text-sm text-[#666666] mt-1">Feedback from your past clients.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         {[
            { name: "John Smith", prop: "The Glass House", rating: 5, text: "Julianne was fantastic to work with. She made the process seamless and highly professional!" },
            { name: "Emma Wilson", prop: "Skyline Penthouse", rating: 4, text: "Very responsive and helpful during our tour." },
         ].map((r, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl border border-[#E5E5E5] shadow-sm hover:shadow-md transition-shadow">
               <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                     <div className="w-10 h-10 rounded-full bg-[#111111] text-white flex items-center justify-center font-bold text-xs">{r.name.charAt(0)}</div>
                     <div>
                        <h4 className="text-sm font-bold text-[#111111]">{r.name}</h4>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-[#666666]">{r.prop}</p>
                     </div>
                  </div>
                  <div className="flex gap-1 text-yellow-400">
                     {[...Array(5)].map((_, idx) => (
                        <svg key={idx} className={`w-4 h-4 ${idx < r.rating ? 'fill-current' : 'text-gray-300 fill-current'}`} viewBox="0 0 20 20">
                           <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                     ))}
                  </div>
               </div>
               <p className="text-sm text-[#666666] italic">"{r.text}"</p>
               <button className="mt-4 text-[10px] font-bold uppercase tracking-widest text-[#6B705C] hover:text-[#111111] transition-colors">Reply to Review</button>
            </div>
         ))}
      </div>
    </div>
  );
};
export default Reviews;
