import React from 'react';
import { Link } from 'react-router-dom';

const Signup = () => {
  return (
    <div className="min-h-screen bg-[#F7F7F5] flex items-center justify-center px-4 py-24 fade-in">
      <div className="w-full max-w-lg space-y-12">
        <div className="text-center space-y-4">
          <div className="inline-flex w-16 h-16 bg-[#6B705C] rounded-2xl items-center justify-center text-white mb-4">
             <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
             </svg>
          </div>
          <h1 className="text-4xl font-bold text-[#111111]">Join the Collection</h1>
          <p className="text-[#666666] font-medium tracking-widest text-[10px] uppercase">Experience the future of luxury real estate</p>
        </div>

        <div className="card-premium p-12 space-y-8 bg-white shadow-2xl">
          <form className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
               <div className="space-y-3">
                  <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#666666]">First Name</label>
                  <input type="text" className="input-premium py-4" />
               </div>
               <div className="space-y-3">
                  <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#666666]">Last Name</label>
                  <input type="text" className="input-premium py-4" />
               </div>
            </div>
            <div className="space-y-3">
               <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#666666]">Email Address</label>
               <input type="email" placeholder="your@email.com" className="input-premium py-4" />
            </div>
            <div className="space-y-3">
               <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#666666]">Security / Password</label>
               <input type="password" placeholder="••••••••" className="input-premium py-4" />
            </div>
            <button className="w-full btn-premium py-5 mt-4 shadow-2xl shadow-[#6B705C]/30">Create Account</button>
          </form>
          
          <div className="pt-8 border-t border-[#E5E5E5] text-center">
             <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#666666]">
               Already a member? <Link to="/login" className="text-[#6B705C] hover:underline">Sign In</Link>
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
