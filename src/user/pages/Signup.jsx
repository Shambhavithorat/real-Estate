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
    <div className="min-h-screen bg-[#F7F7F5] flex items-center justify-center px-4 py-24 fade-in">
      <div className="w-full max-w-lg space-y-12">
        <div className="text-center space-y-4">
          <div className="inline-flex w-16 h-16 bg-[#6B705C] rounded-2xl items-center justify-center text-white mb-4 shadow-xl">
             <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
             </svg>
          </div>
          <h1 className="text-4xl font-bold text-[#111111] tracking-tight">Join the Collection</h1>
          <p className="text-[#666666] font-medium tracking-[0.3em] text-[10px] uppercase">Experience the future of luxury real estate</p>
        </div>

        <div className="card-premium p-12 space-y-8 bg-white shadow-2xl relative overflow-hidden border border-white">
          {error && (
            <div className="p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 text-[11px] font-bold uppercase tracking-wider flex items-center gap-3">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
               <div className="space-y-3">
                  <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#666666]">First Name</label>
                  <input 
                    type="text" 
                    name="firstName"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    className="input-premium py-4" 
                  />
               </div>
               <div className="space-y-3">
                  <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#666666]">Last Name</label>
                  <input 
                    type="text" 
                    name="lastName"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                    className="input-premium py-4" 
                  />
               </div>
            </div>
            <div className="space-y-3">
               <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#666666]">Email Address</label>
               <input 
                 type="email" 
                 name="email"
                 required
                 value={formData.email}
                 onChange={handleChange}
                 placeholder="your@email.com" 
                 className="input-premium py-4" 
               />
            </div>
            <div className="space-y-3 relative">
               <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#666666]">Security / Password</label>
               <input 
                 type={showPassword ? "text" : "password"} 
                 name="password"
                 required
                 value={formData.password}
                 onChange={handleChange}
                 placeholder="••••••••" 
                 className="input-premium py-4" 
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
               <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#666666]">Confirm Password</label>
               <input 
                 type={showPassword ? "text" : "password"} 
                 name="confirmPassword"
                 required
                 value={formData.confirmPassword}
                 onChange={handleChange}
                 placeholder="••••••••" 
                 className="input-premium py-4" 
               />
            </div>
            <button 
              disabled={loading}
              className="w-full btn-premium py-5 mt-4 shadow-2xl shadow-[#6B705C]/30 flex items-center justify-center gap-3 group"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  Create Account
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </>
              )}
            </button>
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
