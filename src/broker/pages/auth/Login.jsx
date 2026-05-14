import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../../shared/hooks/useAuth';

const BrokerLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const { login, userData } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/broker";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { userData } = await login(email, password);
      
      if (userData?.role !== 'broker') {
        await logout();
        setError('UNAUTHORIZED: This portal is reserved for registered brokers only.');
        return;
      }

      navigate(from, { replace: true });
    } catch (err) {
      setError('INVALID CREDENTIALS: Identification failed.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F7F5] flex items-center justify-center px-4 py-24 fade-in">
      <div className="w-full max-w-lg space-y-12">
        <div className="text-center space-y-4">
          <div className="inline-flex w-16 h-16 bg-[#111111] rounded-2xl items-center justify-center text-white mb-4 shadow-xl">
             <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
             </svg>
          </div>
          <h1 className="text-4xl font-bold text-[#111111] tracking-tight">Broker Portal</h1>
          <p className="text-[#666666] font-medium tracking-[0.3em] text-[10px] uppercase">Professional Real Estate Management</p>
        </div>

        <div className="card-premium p-12 space-y-8 bg-white shadow-2xl relative overflow-hidden border border-white text-left">
          {error && (
            <div className="p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 text-[11px] font-bold uppercase tracking-wider flex items-center gap-3">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-3">
               <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#666666]">Broker ID / Email</label>
               <input 
                 type="email" 
                 required
                 value={email}
                 onChange={(e) => setEmail(e.target.value)}
                 placeholder="broker@agency.com" 
                 className="input-premium py-5" 
               />
            </div>
            <div className="space-y-3 relative">
               <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#666666]">Security / Password</label>
               <input 
                 type={showPassword ? "text" : "password"} 
                 required
                 value={password}
                 onChange={(e) => setPassword(e.target.value)}
                 placeholder="••••••••" 
                 className="input-premium py-5" 
               />
               <button 
                 type="button"
                 onClick={() => setShowPassword(!showPassword)}
                 className="absolute right-5 top-[42px] text-[#666666] hover:text-[#111111]"
               >
                 {showPassword ? (
                   <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                   </svg>
                 ) : (
                   <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                   </svg>
                 )}
               </button>
            </div>
            
            <button 
              disabled={loading}
              className="w-full bg-[#111111] text-white py-5 rounded-2xl font-bold uppercase tracking-[0.2em] text-[11px] shadow-2xl shadow-black/20 flex items-center justify-center gap-3 group hover:bg-black transition-all"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  Authenticate Broker
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </>
              )}
            </button>
          </form>
          
          <div className="pt-8 border-t border-[#E5E5E5] text-center">
             <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#666666]">
               Not a partner yet? <Link to="/broker/register" className="text-[#111111] hover:underline">Apply for Partnership</Link>
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrokerLogin;
