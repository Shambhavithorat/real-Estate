import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../shared/hooks/useAuth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { userData } = await login(email, password);
      
      if (userData?.role === 'admin') {
        navigate('/admin/dashboard', { replace: true });
      } else if (userData?.role === 'broker') {
        navigate('/broker/dashboard', { replace: true });
      } else {
        navigate('/', { replace: true });
      }
    } catch (err) {
      setError('Invalid email or password. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#111111] flex items-center justify-center px-4 fade-in font-sans">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-5">
          <div className="inline-flex w-16 h-16 bg-white rounded-3xl items-center justify-center text-[#111111] mb-2 shadow-lg">
             <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
             </svg>
          </div>
          <h1 className="text-3xl font-bold text-white tracking-[0.1em]">MEMBER TERMINAL</h1>
          <p className="text-[#888888] font-bold tracking-[0.3em] text-[9px] uppercase">Secure Access Protocol</p>
        </div>

        <div className="p-10 space-y-8 bg-[#18181b] rounded-[2rem] border border-[#27272a] shadow-2xl relative overflow-hidden">
          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-[11px] font-bold uppercase tracking-wider flex items-center gap-3">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-3">
               <label className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#888888]">Member ID</label>
               <input 
                 type="email" 
                 required
                 value={email}
                 onChange={(e) => setEmail(e.target.value)}
                 placeholder="your@email.com" 
                 className="w-full bg-[#f0f4ff] text-[#111111] px-5 py-4 rounded-xl outline-none focus:ring-2 focus:ring-white transition-all text-sm font-medium"
               />
            </div>
            <div className="space-y-3 relative">
               <label className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#888888]">Access Key</label>
               <input 
                 type={showPassword ? "text" : "password"} 
                 required
                 value={password}
                 onChange={(e) => setPassword(e.target.value)}
                 placeholder="••••••••" 
                 className="w-full bg-[#f0f4ff] text-[#111111] px-5 py-4 rounded-xl outline-none focus:ring-2 focus:ring-white transition-all text-sm font-medium"
               />
               <button 
                 type="button"
                 onClick={() => setShowPassword(!showPassword)}
                 className="absolute right-5 top-[38px] text-[#666666] hover:text-[#111111]"
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
              className="w-full bg-white hover:bg-gray-100 text-[#111111] text-xs font-bold uppercase tracking-[0.2em] py-4 rounded-xl transition-colors flex items-center justify-center mt-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-[#111111] border-t-transparent rounded-full animate-spin"></div>
              ) : (
                'Initiate Session'
              )}
            </button>
          </form>
          
          <div className="pt-6 text-center">
             <p className="text-[9px] font-bold uppercase tracking-[0.1em] text-[#666666]">
               New user? <Link to="/signup" className="text-white hover:underline ml-1">Create Account</Link>
             </p>
          </div>
        </div>

        <div className="text-center pt-2">
            <p className="text-[#444444] font-bold tracking-[0.15em] text-[8px] uppercase">
                Unauthorized Access Is Strictly Prohibited
            </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
