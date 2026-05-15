import React, { useState, useEffect } from 'react';
import { userService } from '../../../user/services/userService';
import { db } from '../../../shared/firebase/firebaseConfig';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { createUserWithEmailAndPassword, getAuth, signOut } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../../../shared/firebase/firebaseConfig';

const AllBrokers = () => {
  const [brokers, setBrokers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    brokerName: '',
    email: '',
    password: '',
    phone: ''
  });
  const [formLoading, setFormLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    const unsubscribe = userService.subscribeBrokers((data) => {
      setBrokers(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddBrokerSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    setMessage({ type: '', text: '' });

    const secondaryApp = initializeApp(firebaseConfig, 'Secondary');
    const secondaryAuth = getAuth(secondaryApp);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        secondaryAuth,
        formData.email,
        formData.password
      );
      const uid = userCredential.user.uid;

      await setDoc(doc(db, 'users', uid), {
        displayName: formData.brokerName,
        email: formData.email,
        phone: formData.phone,
        role: 'broker',
        status: 'Active',
        createdAt: serverTimestamp()
      });

      await signOut(secondaryAuth);
      
      setMessage({ type: 'success', text: 'Broker account created successfully!' });
      setFormData({ brokerName: '', email: '', password: '', phone: '' });
      setTimeout(() => {
        setShowAddModal(false);
        setMessage({ type: '', text: '' });
      }, 2000);
    } catch (error) {
      console.error('Error creating broker:', error);
      setMessage({ type: 'error', text: error.message });
    } finally {
      setFormLoading(false);
    }
  };

  const handleStatusToggle = async (brokerId, currentStatus) => {
    const newStatus = currentStatus === 'Active' ? 'Suspended' : 'Active';
    try {
      await userService.updateUserStatus(brokerId, newStatus);
    } catch (error) {
      alert("Error updating broker status: " + error.message);
    }
  };

  const handleDelete = async (brokerId) => {
    if (window.confirm("Are you sure you want to delete this broker account?")) {
      try {
        await userService.deleteUser(brokerId);
      } catch (error) {
        alert("Error deleting broker: " + error.message);
      }
    }
  };

  const filteredBrokers = brokers.filter(b => 
    (b.displayName || '').toLowerCase().includes(searchQuery.toLowerCase()) || 
    (b.email || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    try {
      return new Date(dateStr).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
    } catch (e) {
      return 'Invalid Date';
    }
  };

  if (loading) return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
      <div className="w-12 h-12 border-4 border-[#6B705C]/20 border-t-[#6B705C] rounded-full animate-spin" />
      <p className="text-[#6B705C] font-bold uppercase tracking-widest text-[10px]">Fetching Brokers...</p>
    </div>
  );

  return (
    <div className="space-y-10 pb-12 relative min-h-screen bg-[#FBFBFB] -m-4 p-8 rounded-[40px]">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-8 px-2">
        <div className="space-y-1">
          <h1 className="text-5xl font-black text-[#111111] tracking-tighter">Registered <span className="text-[#6B705C] italic font-serif">Brokers</span></h1>
          <p className="text-sm text-[#666666] font-medium tracking-tight">Manage broker network and permissions</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="bg-[#111111] text-white py-4 px-8 text-xs font-bold uppercase tracking-[0.2em] rounded-[20px] hover:bg-[#6B705C] transition-all shadow-xl hover:-translate-y-1 flex items-center gap-3"
        >
          <span>+</span> Add Broker
        </button>
      </div>

      {/* Add Broker Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[#111111]/40 backdrop-blur-sm" onClick={() => setShowAddModal(false)} />
          <div className="relative bg-white w-full max-w-2xl rounded-[32px] shadow-2xl overflow-hidden animate-in zoom-in duration-300">
            <div className="p-8 border-b border-[#F5F5F5] flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-black text-[#111111] tracking-tight">Create Broker Account</h2>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#6B705C] mt-1">Authorized Administrative Protocol</p>
              </div>
              <button onClick={() => setShowAddModal(false)} className="w-10 h-10 rounded-full bg-[#F7F7F5] flex items-center justify-center text-[#111111] hover:bg-[#E5E5E5] transition-all">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleAddBrokerSubmit} className="p-8 space-y-6">
              {message.text && (
                <div className={`p-4 rounded-xl text-[10px] font-bold uppercase tracking-wider flex items-center gap-3 ${
                  message.type === 'success' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-red-50 text-red-600 border border-red-100'
                }`}>
                  {message.text}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#666666] ml-1">Broker Full Name</label>
                  <input 
                    type="text" 
                    name="brokerName"
                    required
                    value={formData.brokerName}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full bg-[#F7F7F5] border-none px-5 py-4 rounded-2xl text-sm focus:ring-1 focus:ring-[#6B705C] outline-none" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#666666] ml-1">Phone Number</label>
                  <input 
                    type="tel" 
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 9876543210"
                    className="w-full bg-[#F7F7F5] border-none px-5 py-4 rounded-2xl text-sm focus:ring-1 focus:ring-[#6B705C] outline-none" 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#666666] ml-1">Professional Email</label>
                <input 
                  type="email" 
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="broker@agency.com"
                  className="w-full bg-[#F7F7F5] border-none px-5 py-4 rounded-2xl text-sm focus:ring-1 focus:ring-[#6B705C] outline-none" 
                />
              </div>

              <div className="space-y-2">
                <label className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#666666] ml-1">Initial Access Key</label>
                <input 
                  type="password" 
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full bg-[#F7F7F5] border-none px-5 py-4 rounded-2xl text-sm focus:ring-1 focus:ring-[#6B705C] outline-none" 
                />
              </div>

              <div className="pt-4">
                <button 
                  disabled={formLoading}
                  className="w-full bg-[#111111] text-white py-5 rounded-2xl text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-[#6B705C] transition-all disabled:opacity-50"
                >
                  {formLoading ? 'Creating Account...' : 'Register New Broker'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="bg-white rounded-3xl border border-[#E5E5E5] overflow-hidden shadow-sm">
        <div className="p-5 border-b border-[#E5E5E5] bg-[#F7F7F5]/50">
           <div className="relative max-w-md">
             <svg className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-[#BBBBBB]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
             </svg>
             <input 
               type="text" 
               placeholder="Search by broker name or email..." 
               className="w-full bg-white border border-[#E5E5E5] pl-11 pr-4 py-3 rounded-2xl text-xs font-medium focus:ring-1 focus:ring-[#6B705C] outline-none transition-all"
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
             />
           </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-white border-b border-[#E5E5E5] text-[10px] uppercase tracking-widest text-[#666666]">
                <th className="px-8 py-5 font-bold">Broker Name</th>
                <th className="px-8 py-5 font-bold">Email</th>
                <th className="px-8 py-5 font-bold">Phone Number</th>
                <th className="px-8 py-5 font-bold">Created Date</th>
                <th className="px-8 py-5 font-bold">Status</th>
                <th className="px-8 py-5 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F5F5F5] bg-white">
              {filteredBrokers.length > 0 ? filteredBrokers.map(b => (
                <tr key={b.id} className="hover:bg-[#FBFBF9] transition-all duration-300">
                  <td className="px-8 py-6 flex items-center gap-4">
                     <div className="w-10 h-10 bg-[#111111] text-white rounded-xl flex items-center justify-center text-sm font-bold shadow-sm">
                        {(b.displayName || b.email || '?').charAt(0).toUpperCase()}
                     </div>
                     <span className="font-bold text-[#111111] text-sm block tracking-tight">{b.displayName || 'No Name'}</span>
                  </td>
                  <td className="px-8 py-6 text-xs text-[#666666]">{b.email}</td>
                  <td className="px-8 py-6 text-xs text-[#666666]">{b.phone || 'N/A'}</td>
                  <td className="px-8 py-6 text-xs font-medium text-[#666666]">
                    {formatDate(b.createdAt?.toDate ? b.createdAt.toDate() : b.createdAt)}
                  </td>
                  <td className="px-8 py-6">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[9px] font-bold uppercase tracking-widest shadow-sm
                      ${b.status === 'Suspended' ? 'bg-red-50 text-red-600' : 'bg-emerald-50 text-emerald-600'}`}>
                      <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${b.status === 'Suspended' ? 'bg-red-600' : 'bg-emerald-600'}`} />
                      {b.status || 'Active'}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <button 
                        onClick={() => handleStatusToggle(b.id, b.status || 'Active')}
                        className="text-[10px] font-bold uppercase tracking-widest text-[#111111] hover:text-[#6B705C] transition-colors"
                      >
                        {b.status === 'Suspended' ? 'Enable' : 'Suspend'}
                      </button>
                      <button 
                        onClick={() => handleDelete(b.id)}
                        className="text-[10px] font-bold uppercase tracking-widest text-red-500 hover:text-red-700 transition-colors ml-2"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="6" className="py-24 text-center">
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-16 h-16 bg-[#F7F7F5] rounded-[24px] flex items-center justify-center text-[#BBBBBB]">
                        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-[#111111] uppercase tracking-widest">No Brokers Found</h4>
                        <p className="text-[10px] text-[#666666] uppercase tracking-widest mt-1">Try adjusting your search or add a new broker</p>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllBrokers;
