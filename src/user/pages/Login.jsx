import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className="min-h-screen bg-[#F7F7F5] flex items-center justify-center px-4 py-24 fade-in">
      <div className="w-full max-w-lg space-y-12">
        <div className="text-center space-y-4">
          <div className="inline-flex w-16 h-16 bg-[#6B705C] rounded-2xl items-center justify-center text-white mb-4">
             <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
             </svg>
          </div>
          <h1 className="text-4xl font-bold text-[#111111]">Member Access</h1>
          <p className="text-[#666666] font-medium tracking-widest text-[10px] uppercase">A Private Collection of Premier Residences</p>
        </div>

        <div className="card-premium p-12 space-y-8 bg-white shadow-2xl">
          <form className="space-y-8">
            <div className="space-y-3">
               <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#666666]">Identity / Email</label>
               <input type="email" placeholder="your@email.com" className="input-premium py-5" />
            </div>
            <div className="space-y-3">
               <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#666666]">Security / Password</label>
               <input type="password" placeholder="••••••••" className="input-premium py-5" />
            </div>
            <button className="w-full btn-premium py-5 shadow-2xl shadow-[#6B705C]/30">Sign In to Collection</button>
          </form>
          
          <div className="pt-8 border-t border-[#E5E5E5] text-center">
             <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#666666]">
               New to URBN? <Link to="/signup" className="text-[#6B705C] hover:underline">Request Invitation</Link>
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
