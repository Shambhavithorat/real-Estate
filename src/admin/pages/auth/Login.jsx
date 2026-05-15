import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../../shared/hooks/useAuth';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/admin/dashboard";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { userData } = await login(email, password);
      
      if (userData?.role !== 'admin') {
        await logout();
        setError('ACCESS DENIED: You do not have administrative privileges.');
        return;
      }

      navigate(from, { replace: true });
    } catch (err) {
      if (err.code === 'auth/user-not-found' || err.code === 'auth/invalid-credential') {
        setError('ERROR: Account not found or invalid credentials.');
      } else if (err.code === 'auth/wrong-password') {
        setError('ERROR: Incorrect access key.');
      } else {
        setError(`SYSTEM ERROR: ${err.message}`);
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#111111] flex items-center justify-center px-4 fade-in">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-6">
          <div className="inline-flex w-20 h-20 bg-white rounded-3xl items-center justify-center text-[#111111] mb-2 shadow-[0_0_50px_rgba(255,255,255,0.1)]">
             <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
             </svg>
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-white tracking-widest uppercase">Admin Terminal</h1>
            <p className="text-white/40 font-medium tracking-[0.4em] text-[9px] uppercase">Secure Access Protocol</p>
          </div>
        </div>

        <div className="bg-white/[0.03] backdrop-blur-xl p-10 space-y-8 rounded-[32px] border border-white/10 shadow-2xl text-left">
          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-[10px] font-bold uppercase tracking-wider flex items-center gap-3">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-3">
               <label className="text-[9px] font-bold uppercase tracking-[0.4em] text-white/50 ml-1">Administrator ID</label>
               <input 
                 type="email" 
                 required
                 value={email}
                 onChange={(e) => setEmail(e.target.value)}
                 className="w-full bg-white/5 border border-white/10 px-6 py-5 rounded-2xl text-white text-sm focus:outline-none focus:ring-1 focus:ring-white/30 transition-all placeholder:text-white/20"
                 placeholder="admin@urbn.system"
               />
            </div>
            <div className="space-y-3">
               <label className="text-[9px] font-bold uppercase tracking-[0.4em] text-white/50 ml-1">Access Key</label>
               <input 
                 type="password" 
                 required
                 value={password}
                 onChange={(e) => setPassword(e.target.value)}
                 className="w-full bg-white/5 border border-white/10 px-6 py-5 rounded-2xl text-white text-sm focus:outline-none focus:ring-1 focus:ring-white/30 transition-all placeholder:text-white/20"
                 placeholder="••••••••••••"
               />
            </div>
            
            <button 
              disabled={loading}
              className="w-full bg-white text-[#111111] py-5 rounded-2xl font-bold uppercase tracking-[0.3em] text-[10px] shadow-2xl hover:bg-white/90 transition-all flex items-center justify-center gap-3 mt-4"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-[#111111] border-t-transparent rounded-full animate-spin"></div>
              ) : (
                "Initiate Session"
              )}
            </button>
          </form>
        </div>
        
        <p className="text-center text-white/20 text-[9px] font-medium tracking-[0.2em] uppercase">
          Unauthorized Access is Strictly Prohibited
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
