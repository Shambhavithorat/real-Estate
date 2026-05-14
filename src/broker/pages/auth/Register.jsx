import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../shared/hooks/useAuth';

const BrokerRegister = () => {
  const [formData, setFormData] = useState({
    agencyName: '',
    contactPerson: '',
    email: '',
    password: '',
    licenseNumber: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
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
    setLoading(true);

    try {
      // Register as broker
      await signup(formData.email, formData.password, formData.contactPerson, 'broker');
      navigate('/broker');
    } catch (err) {
      setError(err.message || 'Failed to register as broker');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F7F5] flex items-center justify-center px-4 py-24 fade-in">
      <div className="w-full max-w-lg space-y-12 text-left">
        <div className="text-center space-y-4">
          <div className="inline-flex w-16 h-16 bg-[#111111] rounded-2xl items-center justify-center text-white mb-4 shadow-xl">
             <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
             </svg>
          </div>
          <h1 className="text-4xl font-bold text-[#111111] tracking-tight">Broker Registration</h1>
          <p className="text-[#666666] font-medium tracking-[0.3em] text-[10px] uppercase">Join our network of elite professionals</p>
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
            <div className="space-y-3">
               <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#666666]">Agency / Company Name</label>
               <input 
                 type="text" 
                 name="agencyName"
                 required
                 value={formData.agencyName}
                 onChange={handleChange}
                 className="input-premium py-4" 
               />
            </div>
            <div className="grid grid-cols-2 gap-6">
               <div className="space-y-3">
                  <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#666666]">Contact Person</label>
                  <input 
                    type="text" 
                    name="contactPerson"
                    required
                    value={formData.contactPerson}
                    onChange={handleChange}
                    className="input-premium py-4" 
                  />
               </div>
               <div className="space-y-3">
                  <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#666666]">License Number</label>
                  <input 
                    type="text" 
                    name="licenseNumber"
                    required
                    value={formData.licenseNumber}
                    onChange={handleChange}
                    className="input-premium py-4" 
                  />
               </div>
            </div>
            <div className="space-y-3">
               <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#666666]">Business Email</label>
               <input 
                 type="email" 
                 name="email"
                 required
                 value={formData.email}
                 onChange={handleChange}
                 className="input-premium py-4" 
               />
            </div>
            <div className="space-y-3">
               <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#666666]">Security / Password</label>
               <input 
                 type="password" 
                 name="password"
                 required
                 value={formData.password}
                 onChange={handleChange}
                 className="input-premium py-4" 
               />
            </div>
            <button 
              disabled={loading}
              className="w-full bg-[#111111] text-white py-5 mt-4 rounded-2xl font-bold uppercase tracking-[0.2em] text-[11px] shadow-2xl shadow-black/20 flex items-center justify-center gap-3 group hover:bg-black transition-all"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  Register Agency
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </>
              )}
            </button>
          </form>
          
          <div className="pt-8 border-t border-[#E5E5E5] text-center">
             <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#666666]">
               Already have a broker account? <Link to="/broker/login" className="text-[#111111] hover:underline">Sign In</Link>
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrokerRegister;
