import React, { useState } from 'react';
import { db, auth } from '../../../shared/firebase/firebaseConfig';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { createUserWithEmailAndPassword, getAuth, signOut } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../../../shared/firebase/firebaseConfig'; // I'll check if this is exported

const AddBroker = () => {
  const [formData, setFormData] = useState({
    brokerName: '',
    email: '',
    password: '',
    phone: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    // Initialize a secondary Firebase app to create the user without signing out the admin
    const secondaryApp = initializeApp(firebaseConfig, 'Secondary');
    const secondaryAuth = getAuth(secondaryApp);

    try {
      // 1. Create user in Firebase Auth using the secondary instance
      const userCredential = await createUserWithEmailAndPassword(
        secondaryAuth, 
        formData.email, 
        formData.password
      );
      const uid = userCredential.user.uid;

      // 2. Store broker data in Firestore
      await setDoc(doc(db, 'users', uid), {
        displayName: formData.brokerName,
        email: formData.email,
        phone: formData.phone,
        role: 'broker',
        createdAt: serverTimestamp()
      });

      // 3. Sign out from secondary instance and clean up
      await signOut(secondaryAuth);
      
      setMessage({ type: 'success', text: 'Broker account created successfully!' });
      setFormData({ brokerName: '', email: '', password: '', phone: '' });
    } catch (error) {
      console.error('Error creating broker:', error);
      setMessage({ type: 'error', text: error.message || 'Failed to create broker account.' });
    } finally {
      setLoading(false);
      // Optional: destroy secondary app instance if possible, though React handles it well
    }
  };

  return (
    <div className="p-6 lg:p-10 max-w-4xl mx-auto fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#111111] tracking-tight">Create Broker Account</h1>
        <p className="text-[#666666] text-xs font-medium uppercase tracking-[0.3em] mt-2">Authorized Administrative Protocol</p>
      </div>

      <div className="card-premium p-8 lg:p-12 bg-white shadow-2xl border border-[#E5E5E5]">
        {message.text && (
          <div className={`mb-8 p-4 rounded-xl text-[11px] font-bold uppercase tracking-wider flex items-center gap-3 ${
            message.type === 'success' ? 'bg-green-50 text-green-600 border border-green-100' : 'bg-red-50 text-red-600 border border-red-100'
          }`}>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {message.type === 'success' ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              )}
            </svg>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#666666]">Broker Full Name</label>
              <input 
                type="text" 
                name="brokerName"
                required
                value={formData.brokerName}
                onChange={handleChange}
                placeholder="John Doe"
                className="input-premium py-4" 
              />
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#666666]">Phone Number</label>
              <input 
                type="tel" 
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                placeholder="+91 9876543210"
                className="input-premium py-4" 
              />
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#666666]">Professional Email</label>
            <input 
              type="email" 
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="broker@agency.com"
              className="input-premium py-4" 
            />
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#666666]">Initial Access Key (Password)</label>
            <input 
              type="password" 
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="input-premium py-4" 
            />
          </div>

          <div className="pt-4">
            <button 
              disabled={loading}
              className="w-full btn-premium py-5 shadow-2xl shadow-[#6B705C]/20 flex items-center justify-center gap-3 group"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  Register New Broker
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBroker;
