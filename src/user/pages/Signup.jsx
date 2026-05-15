import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../shared/hooks/useAuth';

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      return setError('Passwords do not match');
    }

    if (formData.password.length < 6) {
      return setError('Password must be at least 6 characters');
    }

    setLoading(true);

    try {
      const displayName = `${formData.firstName} ${formData.lastName}`;
      await signup(formData.email, formData.password, displayName, 'user');
      navigate('/');
    } catch (err) {
      setError(err.message || 'Failed to create an account');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#111111] flex items-center justify-center px-4 fade-in font-sans py-12">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-5">
          <div className="inline-flex w-16 h-16 bg-white rounded-3xl items-center justify-center text-[#111111] mb-2 shadow-lg">
             <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
             </svg>
          </div>
          <h1 className="text-3xl font-bold text-white tracking-[0.1em]">NEW RECRUIT REGISTRATION</h1>
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
            <div className="grid grid-cols-2 gap-6">
               <div className="space-y-3">
                  <label className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#888888]">First Name</label>
                  <input 
                    type="text" 
                    name="firstName"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full bg-[#f0f4ff] text-[#111111] px-5 py-4 rounded-xl outline-none focus:ring-2 focus:ring-white transition-all text-sm font-medium" 
                  />
               </div>
               <div className="space-y-3">
                  <label className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#888888]">Last Name</label>
                  <input 
                    type="text" 
                    name="lastName"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full bg-[#f0f4ff] text-[#111111] px-5 py-4 rounded-xl outline-none focus:ring-2 focus:ring-white transition-all text-sm font-medium" 
                  />
               </div>
            </div>
            <div className="space-y-3">
               <label className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#888888]">Email Address</label>
               <input 
                 type="email" 
                 name="email"
                 required
                 value={formData.email}
                 onChange={handleChange}
                 placeholder="your@email.com" 
                 className="w-full bg-[#f0f4ff] text-[#111111] px-5 py-4 rounded-xl outline-none focus:ring-2 focus:ring-white transition-all text-sm font-medium" 
               />
            </div>
            <div className="space-y-3 relative">
               <label className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#888888]">Security / Password</label>
               <input 
                 type={showPassword ? "text" : "password"} 
                 name="password"
                 required
                 value={formData.password}
                 onChange={handleChange}
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
            <div className="space-y-3">
               <label className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#888888]">Confirm Password</label>
               <input 
                 type={showPassword ? "text" : "password"} 
                 name="confirmPassword"
                 required
                 value={formData.confirmPassword}
                 onChange={handleChange}
                 placeholder="••••••••" 
                 className="w-full bg-[#f0f4ff] text-[#111111] px-5 py-4 rounded-xl outline-none focus:ring-2 focus:ring-white transition-all text-sm font-medium" 
               />
            </div>
            
            <button 
              disabled={loading}
              className="w-full bg-white hover:bg-gray-100 text-[#111111] text-xs font-bold uppercase tracking-[0.2em] py-4 rounded-xl transition-colors flex items-center justify-center mt-6"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-[#111111] border-t-transparent rounded-full animate-spin"></div>
              ) : (
                'Create Identity'
              )}
            </button>
          </form>
          
          <div className="pt-6 text-center">
             <p className="text-[9px] font-bold uppercase tracking-[0.1em] text-[#666666]">
               Existing Member? <Link to="/login" className="text-white hover:underline ml-1">Initiate Login</Link>
             </p>
          </div>
        </div>

        <div className="text-center pt-2">
            <p className="text-[#444444] font-bold tracking-[0.15em] text-[8px] uppercase">
                Secure User Registration Terminal
            </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
